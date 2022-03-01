import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Logga ut</button>
      </form>
    </div>
  )
}

export default Logout;