import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = React.useState({});

  const handleInputChange = (e) => {
    setInputs(prevState => ({...prevState, [e.target.id]: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/v1/auth/register', {
      name: inputs.username,
      email: inputs.email,
      password: inputs.password
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.token);
      makeToast("success", response.data.msg);
    })
    .then(response => {
      navigate('/dashboard');
    })
    .catch(error => {
      makeToast("error", error.response.data.msg);
    })
  }
  
  return (
    <div className='prompt'>
      <div className='promptHeader'>Registrera</div>
      <div className='promptBody'>
        <form onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label htmlFor='username'>Namn</label>
            <input type='text' name='username' id='username' autoComplete='on' onChange={handleInputChange}/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='email'>E-post</label>
            <input type='email' name='email' id='email' autoComplete='on' placeholder='example@gmail.com' onChange={handleInputChange}/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='new-password'>Lösenord</label>
            <input type='password' name='new-password' id='password' autoComplete='on' onChange={handleInputChange}/>
          </div>
          <button type='submit'>Registrera</button>
        </form>
      </div>
    </div>
  )
}

export default Register