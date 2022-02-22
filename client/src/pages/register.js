import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'

const Register = () => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios.post('/user/register', {
      name,
      email,
      password
    }).then(response => {
      console.log(response.data);
      makeToast("success", response.data.message);
    }).catch(err => {
      makeToast("success", err.response.data.message);
    })
  }

  return (
    <div className='prompt'>
      <div className='promptHeader'>Registrera</div>
      <div className='promptBody'>
        <form>
          <div className='inputGroup'>
            <label htmlFor='name'>Namn</label>
            <input type='text' name='name' id='name' ref={nameRef}/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='email'>E-post</label>
            <input type='email' name='email' id='email' placeholder='example@gmail.com' ref={emailRef}/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='password'>Lösenord</label>
            <input type='password' name='password' id='password' ref={passwordRef}/>
          </div>
          <button onClick={registerUser}>Registrera</button>
        </form>
      </div>
    </div>
  )

}

export default Register