/* eslint-env mocha */
import { expect } from 'chai';
import {
  getCompletedTodos,
  getIncompletedTodos,
  getLoading,
  getTodos,
} from '../selectors';

describe('The getCompletedTodos selector', () => {
  it('returns only completed todos ', () => {
    const fakeTodos = [
      {
        text: 'go to the store',
        isCompleted: true,
      },
      {
        text: 'go to work',
        isCompleted: false,
      },
      {
        text: 'prepare breakfast',
        isCompleted: false,
      },
    ];
    const expected = [
      {
        text: 'go to the store',
        isCompleted: true,
      },
    ];
    expect(getCompletedTodos.resultFunc(fakeTodos)).to.deep.equal(expected);
  });
});

describe('The getIncompletedTodos selector', () => {
  it('returns only incompleted todos ', () => {
    const fakeTodos = [
      {
        text: 'go to the store',
        isCompleted: true,
      },
      {
        text: 'go to work',
        isCompleted: false,
      },
      {
        text: 'prepare breakfast',
        isCompleted: false,
      },
    ];
    const expected = [
      {
        text: 'go to work',
        isCompleted: false,
      },
      {
        text: 'prepare breakfast',
        isCompleted: false,
      },
    ];
    expect(getIncompletedTodos.resultFunc(fakeTodos)).to.deep.equal(expected);
  });
});

describe('The getTodos selector', () => {
  it('returns todos ', () => {
    const fakeState = {
      todosReducer: {
        data: [
          {
            text: 'go to work',
            isCompleted: false,
          },
          {
            text: 'prepare breakfast',
            isCompleted: false,
          },
        ],
      },
    };
    const expected = [
      {
        text: 'go to work',
        isCompleted: false,
      },
      {
        text: 'prepare breakfast',
        isCompleted: false,
      },
    ];
    expect(getTodos(fakeState)).to.deep.equal(expected);
  });
});

describe('The getLoading selector', () => {
  it('returns loading status ', () => {
    const fakeState = {
      todosReducer: {
        isLoading: true,
      },
    };
    const expected = true;

    expect(getLoading(fakeState)).to.equal(expected);
  });
});
