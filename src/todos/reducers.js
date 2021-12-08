import {
  COMPLETE_TODO,
  CREATE_TODO,
  LOAD_TODOS_FAIL,
  LOAD_TODOS_LOADING,
  LOAD_TODOS_SUCCESS,
  REMOVE_TODO,
} from './actions';

const initialState = {
  data: [],
  isLoading: false,
};

const todosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return {
        ...state,
        data: [...state.data, todo],
      };
    }
    case REMOVE_TODO: {
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
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
      };
    }
    case LOAD_TODOS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;
