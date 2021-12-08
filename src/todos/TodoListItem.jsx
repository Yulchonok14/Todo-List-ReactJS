import React from 'react';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

export const getBorder = (startDate, today) => (
  startDate > new Date(today - 86400000 * 8) ? 'none' : '2px solid red'
);

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${(props) => getBorder(props.createdAt, Date.now())};
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const RemoveButton = styled(Button)`
    display: inline-block;
    background-color: #ee2222;
    margin-left: 8px;
`;

const CompletedButton = styled(Button)`
    display: inline-block;
    background-color: #22ee22;
`;

const TodoListItem = ({ todo, onRemoveTodoClicked, onCompleteTodoClicked }) => {
  const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;
  return (
    <Container createdAt={todo.createdAt}>
      <h3>{todo.text}</h3>
      <p>
        Created at:&nbsp;
        {new Date(todo.createdAt).toLocaleDateString()}
      </p>
      <ButtonsContainer>
        {todo.isCompleted
          ? null
          : (
            <CompletedButton
              onClick={() => onCompleteTodoClicked(todo.id)}
            >
              Mark As Completed
            </CompletedButton>
          )}
        <RemoveButton
          onClick={() => onRemoveTodoClicked(todo.id)}
        >
          Remove
        </RemoveButton>
      </ButtonsContainer>
    </Container>
  );
};

export default TodoListItem;
