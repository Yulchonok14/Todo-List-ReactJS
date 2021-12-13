export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: { todo },
});

export const CREATE_TODO_FAIL = 'CREATE_TODO_FAIL';
export const createTodoFail = () => ({
  type: CREATE_TODO_FAIL,
});

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = (todo) => ({
  type: REMOVE_TODO,
  payload: { todo },
});

export const REMOVE_TODO_FAIL = 'REMOVE_TODO_FAIL';
export const removeTodoFail = () => ({
  type: REMOVE_TODO_FAIL,
});

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const completeTodo = (todo) => ({
  type: COMPLETE_TODO,
  payload: { todo },
});

export const COMPLETE_TODO_FAIL = 'COMPLETE_TODO_FAIL';
export const completeTodoFail = () => ({
  type: COMPLETE_TODO_FAIL,
});

export const LOAD_TODOS_LOADING = 'LOAD_TODOS_LOADING';
export const loadTodosLoading = () => ({
  type: LOAD_TODOS_LOADING,
});

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos },
});

export const LOAD_TODOS_FAIL = 'LOAD_TODOS_FAIL';
export const loadTodosFail = () => ({
  type: LOAD_TODOS_FAIL,
});
