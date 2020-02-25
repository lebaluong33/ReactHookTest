import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const Header = props => {
  const auth = useContext(AuthContext);

  return(
    <div>
      { auth.status ? <button onClick={props.loadTodos} >Todo</button> : null  }
      <button onClick={props.loadAuth} >Auth</button>
    </div>
  );
};

export default Header;