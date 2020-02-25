import React, { useState } from 'react';
import Todo from './components/todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = props => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const onChangePageHandler = (pageName) => {
    setPage(pageName);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{
        status: authStatus,
        login: login
      }}>
        <Header 
          loadTodos={() => onChangePageHandler('todo')}
          loadAuth={() => onChangePageHandler('auth')} />
        <hr/>
        { page === 'todo' ? <Todo /> : <Auth />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
