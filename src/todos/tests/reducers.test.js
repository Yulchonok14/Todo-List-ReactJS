/* eslint-env mocha */
import { expect } from 'chai';
import todosReducer from '../reducers';
import {
  LOAD_TODOS_FAIL_ERROR, CREATE_TODO_FAIL_ERROR, REMOVE_TODO_FAIL_ERROR, COMPLETE_TODO_FAIL_ERROR,
} from '../todos.constants';

describe('The todos reducer', () => {
  it('adds a new todo when CREATE_TODO action is received', () => {
    const fakeTodo = {
      text: 'Go to the store',
      isCompleted: false,
    };
    const action = {
      type: 'CREATE_TODO',
      payload: { todo: fakeTodo },
    };
    const initialState = {
      isLoading: false,
      error: '',
      data: [],
    };
    const expected = {
      isLoading: false,
      error: '',
      data: [fakeTodo],
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('adds an error when CREATE_TODO_FAIL action is received', () => {
    const action = { type: 'CREATE_TODO_FAIL' };
    const initialState = {
      isLoading: false,
      error: '',
      data: [],
    };
    const expected = {
      isLoading: false,
      error: CREATE_TODO_FAIL_ERROR,
      data: [],
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('removes a todo when REMOVE_TODO action is received', () => {
    const fakeTodo = {
      id: '111',
      text: 'Go to the store',
      isCompleted: false,
    };
    const action = {
      type: 'REMOVE_TODO',
      payload: { todo: fakeTodo },
    };
    const initialState = {
      isLoading: false,
      data: [fakeTodo],
      error: '',
    };
    const expected = {
      isLoading: false,
      data: [],
      error: '',
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('adds an error when REMOVE_TODO_FAIL action is received', () => {
    const action = { type: 'REMOVE_TODO_FAIL' };
    const initialState = {
      isLoading: false,
      error: '',
      data: [],
    };
    const expected = {
      isLoading: false,
      error: REMOVE_TODO_FAIL_ERROR,
      data: [],
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('completes a todo when COMPLETE_TODO action is received', () => {
    const fakeTodos = [
      {
        id: '111',
        text: 'Go to the store',
        isCompleted: false,
      },
      {
        id: '222',
        text: 'Go to the store',
        isCompleted: true,
      },
    ];
    const fakeCompletedTodo = {
      id: '111',
      text: 'Go to the store',
      isCompleted: true,
    };
    const fakeExpectedTodos = [
      {
        id: '111',
        text: 'Go to the store',
        isCompleted: true,
      },
      {
        id: '222',
        text: 'Go to the store',
        isCompleted: true,
      },
    ];
    const action = {
      type: 'COMPLETE_TODO',
      payload: { todo: fakeCompletedTodo },
    };
    const initialState = {
      isLoading: false,
      data: fakeTodos,
      error: '',
    };
    const expected = {
      isLoading: false,
      data: fakeExpectedTodos,
      error: '',
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('adds an error when COMPLETE_TODO_FAIL action is received', () => {
    const action = { type: 'COMPLETE_TODO_FAIL' };
    const initialState = {
      isLoading: false,
      error: '',
      data: [],
    };
    const expected = {
      isLoading: false,
      error: COMPLETE_TODO_FAIL_ERROR,
      data: [],
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('sets loading process to true', () => {
    const action = {
      type: 'LOAD_TODOS_LOADING',
    };
    const initialState = {
      isLoading: false,
      data: [],
      error: '',
    };
    const expected = {
      isLoading: true,
      data: [],
      error: '',
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('loads a todo successfully when LOAD_TODOS_SUCCESS action is received', () => {
    const fakeTodo = {
      id: '111',
      text: 'Go to the store',
      isCompleted: false,
    };
    const action = {
      type: 'LOAD_TODOS_SUCCESS',
      payload: { todos: [fakeTodo] },
    };
    const initialState = {
      isLoading: false,
      data: [],
      error: '',
    };
    const expected = {
      isLoading: false,
      data: [fakeTodo],
      error: '',
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('indicates loading as false when LOAD_TODOS_FAIL action is received', () => {
    const action = {
      type: 'LOAD_TODOS_FAIL',
    };
    const initialState = {
      isLoading: false,
      error: '',
      data: [],
    };
    const expected = {
      isLoading: false,
      data: [],
      error: LOAD_TODOS_FAIL_ERROR,
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('does not change the state when unknown action is received', () => {
    const fakeTodo = {
      id: '111',
      text: 'Go to the store',
      isCompleted: false,
    };
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const initialState = {
      isLoading: false,
      data: [fakeTodo],
      error: '',
    };
    const expected = {
      isLoading: false,
      data: [fakeTodo],
      error: '',
    };
    const actual = todosReducer(initialState, action);

    expect(actual).to.deep.equal(expected);
  });

  it('sets default initial state when state is undefined', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const expected = {
      data: [],
      isLoading: false,
      error: '',
    };
    const actual = todosReducer(undefined, action);

    expect(actual).to.deep.equal(expected);
  });
});
