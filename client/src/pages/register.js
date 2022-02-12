import React from 'react'

const Register = () => {
  return (
    <div className='prompt'>
      <div className='promptHeader'>Registrera</div>
      <div className='promptBody'>
        <form>
          <div className='inputGroup'>
            <label htmlFor='name'>Namn</label>
            <input type='text' name='name' id='name'/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='email'>E-post</label>
            <input type='email' name='email' id='email' placeholder='example@gmail.com'/>
          </div>
          <div className='inputGroup'>
            <label htmlFor='password'>Lösenord</label>
            <input type='password' name='password' id='password'/>
          </div>
          <button>Registrera</button>
        </form>
      </div>
    </div>
  )

}

export default Register