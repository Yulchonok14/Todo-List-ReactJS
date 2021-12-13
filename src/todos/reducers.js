import {
  COMPLETE_TODO,
  CREATE_TODO,
  CREATE_TODO_FAIL,
  LOAD_TODOS_FAIL,
  LOAD_TODOS_LOADING,
  LOAD_TODOS_SUCCESS,
  REMOVE_TODO,
  REMOVE_TODO_FAIL,
  COMPLETE_TODO_FAIL,
} from './actions';

import {
  CREATE_TODO_FAIL_ERROR,
  LOAD_TODOS_FAIL_ERROR,
  REMOVE_TODO_FAIL_ERROR,
  COMPLETE_TODO_FAIL_ERROR,
} from './todos.constants';

const initialState = {
  data: [],
  isLoading: false,
  error: '',
};

const todosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: [...state.data, todo],
        error: '',
      };
    }
    case CREATE_TODO_FAIL: {
      return {
        ...state,
        error: CREATE_TODO_FAIL_ERROR,
      };
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
        error: '',
      };
    }
    case REMOVE_TODO_FAIL: {
      return {
        ...state,
        error: REMOVE_TODO_FAIL_ERROR,
      };
    }
    case COMPLETE_TODO: {
      const { todo: todoCompleted } = payload;
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === todoCompleted.id) {
            return todoCompleted;
          }
          return todo;
        }),
        error: '',
      };
    }
    case COMPLETE_TODO_FAIL: {
      return {
        ...state,
        error: COMPLETE_TODO_FAIL_ERROR,
      };
    }
    case LOAD_TODOS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_TODOS_SUCCESS: {
      const { todos } = payload;
      return {
        ...state,
        data: [...todos],
        isLoading: false,
        error: '',
      };
    }
    case LOAD_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: LOAD_TODOS_FAIL_ERROR,
      };
    default:
      return state;
  }
};

export default todosReducer;
