/* eslint-env mocha */
import 'node-fetch';

import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import {
  loadTodos, addNewTodoRequest, removeTodoRequest, completedTodoRequest,
} from '../thunks';

describe('The loadTodos thunk', () => {
  it('dispatches LOAD_TODOS_LOADING and LOAD_TODOS_SUCCESS actions with success scenario', async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodos = [{ text: '1' }, { text: '2' }];
    fetchMock.get('http://localhost:8080/todos', fakeTodos);

    const expectedLoadingAction = { type: 'LOAD_TODOS_LOADING' };
    const expectedSuccessAction = {
      type: 'LOAD_TODOS_SUCCESS',
      payload: {
        todos: fakeTodos,
      },
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedLoadingAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSuccessAction);

    fetchMock.reset();
  });

  it('dispatches LOAD_TODOS_FAIL action with fail scenario', async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.get('http://localhost:8080/todos', { throws: new Error() });

    const expectedLoadingAction = { type: 'LOAD_TODOS_LOADING' };
    const expectedFailAction = { type: 'LOAD_TODOS_FAIL' };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedLoadingAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedFailAction);

    fetchMock.reset();
  });
});

describe('The addNewTodoRequest thunk', () => {
  it('dispatches CREATE_TODO action with success scenario', async () => {
    const fakeDispatch = sinon.spy();

    const fakeTodo = { text: 'meet with friends' };
    fetchMock.post('http://localhost:8080/todos', fakeTodo);

    const expectedCreateToDoAction = {
      type: 'CREATE_TODO',
      payload: {
        todo: fakeTodo,
      },
    };

    await addNewTodoRequest('meet with friends')(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedCreateToDoAction);

    fetchMock.reset();
  });

  it('dispatches CREATE_TODO_FAIL action with fail scenario', async () => {
    const fakeDispatch = sinon.spy();

    fetchMock.post('http://localhost:8080/todos', { throws: new Error() });

    const expectedFailAction = { type: 'CREATE_TODO_FAIL' };

    await addNewTodoRequest('meet with friends')(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFailAction);

    fetchMock.reset();
  });
});

describe('The removeTodoRequest thunk', () => {
  it('dispatches REMOVE_TODO action with success scenario', async () => {
    const fakeDispatch = sinon.spy();
    const fakeTodo = { text: 'go to the shop' };
    const removedId = 1;

    fetchMock.delete(`http://localhost:8080/todos/${removedId}`, fakeTodo);

    const expectedRemoveToDoAction = {
      type: 'REMOVE_TODO',
      payload: {
        todo: fakeTodo,
      },
    };

    await removeTodoRequest(removedId)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedRemoveToDoAction);

    fetchMock.reset();
  });

  it('dispatches REMOVE_TODO_FAIL action with fail scenario', async () => {
    const fakeDispatch = sinon.spy();
    const removedId = 1;

    fetchMock.delete(`http://localhost:8080/todos/${removedId}`, { throws: new Error() });

    const expectedFailAction = { type: 'REMOVE_TODO_FAIL' };

    await removeTodoRequest(removedId)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFailAction);

    fetchMock.reset();
  });
});

describe('The completedTodoRequest thunk', () => {
  it('dispatches COMPLETE_TODO action with success scenario', async () => {
    const fakeDispatch = sinon.spy();
    const fakeTodo = { text: 'go to the shop', isCompleted: true };
    const completedId = 1;

    fetchMock.post(`http://localhost:8080/todos/${completedId}/completed`, fakeTodo);

    const expectedCompletedToDoAction = {
      type: 'COMPLETE_TODO',
      payload: {
        todo: fakeTodo,
      },
    };

    await completedTodoRequest(completedId)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedCompletedToDoAction);

    fetchMock.reset();
  });

  it('dispatches COMPLETE_TODO_FAIL action with fail scenario', async () => {
    const fakeDispatch = sinon.spy();
    const completedId = 1;

    fetchMock.post(`http://localhost:8080/todos/${completedId}/completed`, { throws: new Error() });

    const expectedFailAction = { type: 'COMPLETE_TODO_FAIL' };

    await completedTodoRequest(completedId)(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFailAction);

    fetchMock.reset();
  });
});
