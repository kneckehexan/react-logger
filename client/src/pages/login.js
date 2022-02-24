import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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

    axios.post('http://localhost:5000/api/v1/auth/login', {
      email: inputs.email,
      password: inputs.password
    }).then(response => {
      console.log(response.data);
      makeToast("success", response.data.msg);
      localStorage.setItem('accessToken', response.data.token);
    }).then(response => {
      navigate('/dashboard');
    }).catch(err => {
      localStorage.removeItem('accessToken');
      makeToast("error", err.response.data.msg);
      navigate('/login');
    })
  }

  return (
    <div className='prompt'>
      <div className='promptHeader'>Logga in</div>
      <div className='promptBody'>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='email'>E-post</label>
            <input type='email' name='email' value={inputs.email || ''} id='email' onChange={handleInputChange} autoComplete='on' placeholder='example@gmail.com'/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='current-password'>Lösenord</label>
            <input type='password' name='current-password' value={inputs.password || ''} id='password' onChange={handleInputChange} autoComplete='on'/>
          </div>
          <button type='submit'>Logga in</button>
        </form>
      </div>
    </div>
  )
}

export default Login