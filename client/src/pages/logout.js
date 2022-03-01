import React from 'react';
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = React.useState({});
  const handleInputChange = (e) => {
    setInputs(prevState => ({...prevState, [e.target.id]: e.target.value}));
  }
  //const [email, setEmail] = React.useState('');
  //const [password, setPassword] = React.useState('');

  //const handleInputChange = (e) => {
  //  
  //}

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