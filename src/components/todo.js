import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const Todo = (props) => {
  //const [inputIsValid, setInputIsValid] = useState(false);
  // const [todoState, setTodoState] = useState({userInput: '', todoList: []});
  //const [todoName, setTodoName] = useState('');
 // const [submittedTodo, setSubmittedTodo] = useState(null);
  //const [todoList, setTodoList] = useState([]);
  //const todoInputRef  = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch(action.type){
      case 'ADD':
        return state.concat(action.payload);
      case 'SET': 
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;  
    }
  }
  useEffect(() => {
    axios.get('https://test-hook-9ed9b.firebaseio.com/todos.json')
      .then( result => {
        const todoData = result.data;
        const todos = [];
        for ( let key in todoData) {
          todos.push({id: key, name: todoData[key]});
        };
        dispatch({type: 'SET', payload: todos});
      })
      .catch(error => {
        console.log(error);
      });
    return(() => {
      console.log('Clean up');
    });
  }, []);

  // const mouseMovehandler = event => {
  //   console.log( event.clientX, event.clientY);
  // };
  
  // const onValidity = (event) => {
  //   if(event.target.value.trim() === ''){
  //     setInputIsValid(false);
  //   } else {
  //     setInputIsValid(true);
  //   }
  // }

  const [todoList, dispatch] =  useReducer(todoListReducer, []);

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMovehandler);
  //   return(() => {
  //     document.removeEventListener('mousemove', mouseMovehandler);
  //   });
  // }, []);

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });

    const todoName = todoInput.value;

    axios.post('https://test-hook-9ed9b.firebaseio.com/todos.json', JSON.stringify(todoName))
      .then(res => {
        setTimeout(() => {
          const todoItem = {id: res.data.name, name: todoName};
          dispatch({type: 'ADD', payload: todoItem});
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const todoRemoveHandler = (id) => {
    axios.delete('https://test-hook-9ed9b.firebaseio.com/todos/' + id + '.json')
    .then(res => {
      dispatch({type: 'Remove', payload: id});
    })
    .catch(err => {console.log(err)})
  };

  return ( 
  <React.Fragment>
    <input 
      type="text" 
      placeholder="Todo" 
      onChange={todoInput.onChange}
      value={todoInput.value}
      style={{backgroundColor: todoInput.validity ? 'transparent' : 'red' }} />
    <button type="button" onClick={todoAddHandler} >Add</button>
    {useMemo(() => <List items={todoList} clicked={todoRemoveHandler} />
    , [todoList]
    )}
  </React.Fragment>
  );
};

export default Todo;