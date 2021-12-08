/* eslint-env mocha */
import { expect } from 'chai';
import todosReducer from '../reducers';

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
      data: [],
    };
    const expected = {
      isLoading: false,
      data: [fakeTodo],
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
    };
    const expected = {
      isLoading: false,
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
    };
    const expected = {
      isLoading: false,
      data: fakeExpectedTodos,
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
    };
    const expected = {
      isLoading: true,
      data: [],
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
    };
    const expected = {
      isLoading: false,
      data: [fakeTodo],
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
      data: [],
    };
    const expected = {
      isLoading: false,
      data: [],
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
    };
    const expected = {
      isLoading: false,
      data: [fakeTodo],
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
    };
    const actual = todosReducer(undefined, action);

    expect(actual).to.deep.equal(expected);
  });
});
