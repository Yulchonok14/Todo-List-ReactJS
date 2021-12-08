import {
  completeTodo,
  createTodo,
  loadTodosFail,
  loadTodosLoading,
  loadTodosSuccess,
  removeTodo,
} from './actions';

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadTodosLoading());
    const result = await fetch('http://localhost:8080/todos');
    const todos = await result.json();
    dispatch(loadTodosSuccess(todos));
  } catch (e) {
    dispatch(loadTodosFail());
  }
};

export const addNewTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const result = await fetch('http://localhost:8080/todos', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body,
    });
    const newTodo = await result.json();
    dispatch(createTodo(newTodo));
  } catch (e) {
    alert(e);
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const result = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'delete',
    });
    const todo = await result.json();
    dispatch(removeTodo(todo));
  } catch (e) {
    alert(e);
  }
};

export const completedTodoRequest = (id) => async (dispatch) => {
  try {
    const result = await fetch(`http://localhost:8080/todos/${id}/completed`, {
      method: 'post',
    });
    const todo = await result.json();
    dispatch(completeTodo(todo));
  } catch (e) {
    alert(e);
  }
};
