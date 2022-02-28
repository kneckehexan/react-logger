import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {

  return(
    <div>
      <div className='startcard'>
        <h1 className='promptHeader'>Välkommen</h1>
        <nav className='startnav'>
          <Link to='/register'><div className='startnavlink'>Registrera</div></Link>
          <Link to='/login'><div className='startnavlink'>Logga in</div></Link>
        </nav>
      </div>
      <Outlet />
    </div>
  )}

export default App;
