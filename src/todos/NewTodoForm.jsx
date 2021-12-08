import React, { useState } from 'react';

import styled from 'styled-components';

const NewTodoFormStyle = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewTodoForm = ({ todos, onCreateNewTodoClicked }) => {
  const [newTodo, setNewTodo] = useState('');

  return (
    <NewTodoFormStyle>
      <NewTodoInput
        placeholder="Type new todo item here"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <NewTodoButton
        onClick={() => {
          const isDuplicated = todos.some((todo) => todo.text === newTodo);
          if (!isDuplicated) {
            onCreateNewTodoClicked(newTodo);
            setNewTodo('');
          }
        }}
      >
        Craft Todo
      </NewTodoButton>
    </NewTodoFormStyle>
  );
};

export default NewTodoForm;
