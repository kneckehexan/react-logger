import React from 'react'

const Login = () => {
  return (
    <div className='prompt'>
      <div className='promptHeader'>Logga in</div>
      <div className='promptBody'>
        <form>
          <div className='inputGroup'>
            <label htmlFor='email'>E-post</label>
            <input type='email' name='email' id='email' placeholder='example@gmail.com'/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='password'>Lösenord</label>
            <input type='password' name='password' id='password'/>
          </div>
          <button>Logga in</button>
        </form>
      </div>
    </div>
  )
}

export default Login