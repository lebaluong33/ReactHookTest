import React from 'react';

const list = props => {
  console.log('Rendering the List ...');
  return(
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id} onClick={() => props.clicked(todo.id)} >{todo.name}</li>
      ))}
    </ul>
  );
};

export default list;