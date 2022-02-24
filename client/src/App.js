import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {

  return(
    <div>
      <h1>Welcome</h1>
      <nav>
        <Link to='/register'>Register</Link> |{" "}
        <Link to='/login'>Login</Link>
      </nav>
      <Outlet />
    </div>
  )}

export default App;
