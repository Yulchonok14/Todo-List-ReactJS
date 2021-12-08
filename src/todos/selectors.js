import { createSelector } from 'reselect';

export const getTodos = (state) => state.todosReducer.data;

export const getLoading = (state) => state.todosReducer.isLoading;

export const getCompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter((todo) => todo.isCompleted),
);

export const getIncompletedTodos = createSelector(
  getTodos,
  (todos) => todos.filter((todo) => !todo.isCompleted),
);
