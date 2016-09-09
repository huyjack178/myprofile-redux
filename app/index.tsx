import * as _ from "lodash";
import * as Redux from "redux";
import * as React from 'react';
import * as ReactDom from 'react-dom';

interface Action {
    type?: string,
    id?: number,
    data?: any
}

interface ToDoState {
    id?: number,
    text?: string,
    completed?: boolean
}

const todo = (state: ToDoState, action: Action): ToDoState => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.data,
                completed: false
            };

        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return _.assign(state, { completed: !state.completed });
        default:
            return state;
    }
}

const todoReducer = (state: ToDoState[] = [], action: Action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return _.concat(state, [todo(undefined, action)]);
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));

        default:
            return state;
    }
}

const visibilityFilterReducer = (state: string = 'SHOW_ALL', action: Action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.data;

        default:
            return state;
    }
}
const todoApp = Redux.combineReducers({ todos: todoReducer, filter: visibilityFilterReducer });
const store: Redux.Store<any> = Redux.createStore(todoApp);

class Todo extends React.Component<{todo: ToDoState, onClickTodo: any}, {}>{
    public render(): React.ReactElement<any> {
        return (
            <li key={this.props.todo.id}
                onClick={() => this.props.onClickTodo()}
                style={{ textDecoration: this.props.todo.completed ? 'line-through' : 'none' }}
                >
                {this.props.todo.text}
            </li>
        );
    }
}

class TodoList extends React.Component<{todos: ToDoState[], onClickTodo: any},{}>{
    public render(): React.ReactElement<any>{
        return(
            <ul>
                {this.props.todos.map(todo => 
                    <Todo todo={todo} onClickTodo={() => this.props.onClickTodo(todo.id)}/>
                )}
            </ul>
        );
    }
}

class FilterLink extends React.Component<{ filter: string, text: string }, {}>{
    public render(): React.ReactElement<any> {
        return (
            <a href='#'
                onClick={e => {
                    e.preventDefault();
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        data: this.props.filter
                    })
                } }>
                {this.props.text}
            </a>
        )
    }
}

const getTodosFilter = (filter: string = 'SHOW_ALL', todos: ToDoState[]): ToDoState[] => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
    }
}

let nextTodoId = 0;
class TodoApp extends React.Component<{ todos: ToDoState[], filter: string }, {}> {

    public render(): React.ReactElement<any> {

        const visibleTodos: ToDoState[] = getTodosFilter(this.props.filter, this.props.todos);
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        data: 'Test',
                        id: nextTodoId++
                    })
                } }>
                    Add Todo
                </button>
                <TodoList todos={visibleTodos} onClickTodo={id => 
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    })} />
                
                <p>
                    Show:
                    {' '}
                    <FilterLink filter='SHOW_ALL' text='All' />
                    {' '}
                    <FilterLink filter='SHOW_ACTIVE' text='Active' />
                    {' '}
                    <FilterLink filter='SHOW_COMPLETED' text='Completed' />
                </p>
            </div>
        );
    }
}

const render = () => {
    ReactDom.render(
        <TodoApp todos={store.getState().todos} filter={store.getState().filter}/>,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();