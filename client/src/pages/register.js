import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'

class Register extends React.Component {
  constructor() {
    super();
    this.state={
      username: '',
      email: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/v1/auth/register', {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      console.log(response.data);
      makeToast("success", response.data.message);
      //history.push('/login');
    }).catch(err => {
      makeToast("error", err.response.data.message);
    })
  }
  
  render() { 
    return (
      <div className='prompt'>
        <div className='promptHeader'>Registrera</div>
        <div className='promptBody'>
          <form onSubmit={this.handleSubmit}>
            <div className='inputGroup'>
              <label htmlFor='username'>Namn</label>
              <input type='text' name='username' id='username' autoComplete='on' onChange={this.handleInputChange}/>
            </div>
            <div className='inputGroup'>
              <label htmlFor='email'>E-post</label>
              <input type='email' name='email' id='email' autoComplete='on' placeholder='example@gmail.com' onChange={this.handleInputChange}/>
            </div>
            <div className='inputGroup'>
              <label htmlFor='new-password'>Lösenord</label>
              <input type='password' name='new-password' id='password' autoComplete='on' onChange={this.handleInputChange}/>
            </div>
            <button type='submit'>Registrera</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Register