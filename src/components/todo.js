import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = (props) => {
  // const [todoState, setTodoState] = useState({userInput: '', todoList: []});
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('https://test-hook-9ed9b.firebaseio.com/todos.json')
      .then( result => {
        const todoData = result.data;
        const todos = [];
        for ( let key in todoData) {
          todos.push({id: key, name: todoData[key]});
        };
        setTodoList(todos);
      })
      .catch(error => {
        console.log(error);
      });
    return(() => {
      console.log('Clean up');
    });
  }, []);

  const mouseMovehandler = event => {
    console.log( event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMovehandler);
    return(() => {
      document.removeEventListener('mousemove', mouseMovehandler);
    });
  }, []);

  useEffect(() => {
    if(submittedTodo) { 
      setTodoList(todoList => todoList.concat(submittedTodo)) 
    };
    },
    [submittedTodo]
  );

  const inputChangeHandler = (event) => {
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
    setTodoName(event.target.value);
  };
  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });
    axios.post('https://test-hook-9ed9b.firebaseio.com/todos.json', JSON.stringify(todoName))
      .then(res => {
        setTimeout(() => {
          const todoItem = {id: res.data.name, name: todoName};
          setSubmittedTodo(todoItem);
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return ( 
  <React.Fragment>
    <input 
      type="text" 
      placeholder="Todo" 
      onChange={inputChangeHandler} 
      value={todoName} />
    <button type="button" onClick={todoAddHandler} >Add</button>
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  </React.Fragment>
  );
};

export default Todo;