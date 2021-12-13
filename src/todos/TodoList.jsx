import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  addNewTodoRequest,
  completedTodoRequest,
  loadTodos,
  removeTodoRequest,
} from './thunks';
import {
  getCompletedTodos,
  getIncompletedTodos,
  getLoading,
  getTodos,
} from './selectors';

import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({
  incompletedTodos,
  completedTodos,
  isLoading,
  onRemoveTodoClicked,
  onCompleteTodoClicked,
  onLoadTodos,
  onCreateNewTodoClicked,
  todos,
}) => {
  useEffect(() => {
    onLoadTodos();
  }, []);

  const loading = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm
        todos={todos}
        onCreateNewTodoClicked={onCreateNewTodoClicked}
      />
      <h3 className="title incomplete">Incompleted:</h3>
      {incompletedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          onCompleteTodoClicked={onCompleteTodoClicked}
          onRemoveTodoClicked={onRemoveTodoClicked}
          todo={todo}
        />
      ))}
      <h3 className="title complete">Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          onCompleteTodoClicked={onCompleteTodoClicked}
          onRemoveTodoClicked={onRemoveTodoClicked}
          todo={todo}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loading : content;
};

const mapStateToProps = (state) => ({
  incompletedTodos: getIncompletedTodos(state),
  completedTodos: getCompletedTodos(state),
  isLoading: getLoading(state),
  todos: getTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveTodoClicked: (id) => dispatch(removeTodoRequest(id)),
  onCompleteTodoClicked: (id) => dispatch(completedTodoRequest(id)),
  onLoadTodos: () => dispatch(loadTodos()),
  onCreateNewTodoClicked: (text) => dispatch(addNewTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

export { TodoList };
