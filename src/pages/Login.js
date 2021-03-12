import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { login } from '../store/action/userAction'
import { Link, useHistory } from 'react-router-dom'
import axios from '../api/axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  // const dispatch = useDispatch()

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }
  const loginHandler = () => {
    axios({
      url: '/login',
      method: 'POST',
      data: {email, password}
    })
    .then(({ data }) => {
      console.log(data, 'data')
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('who', data.who)
      history.push('/')
      // dispatch(login())
    })
    .catch(err => console.log(err, 'error'))
  }

  return (
    <>
      <div className="register-title">
        <h3>Sign In</h3>
        <p>Welcome to Sprout Digital Labs</p>
      </div>

      <form>
        <input className="form-input-text" type="text" placeholder="Email" value={email} onChange={(value) => emailHandler(value)}></input><br/>
        <input className="form-input-text" type="password" placeholder="Password" value={password} onChange={(value) => passwordHandler(value)}></input><br/>
        <button type="button" className="button" onClick={() => loginHandler()} to="/">Sign In</button>
      </form>
      <p style={{fontSize: '12px', lineHeight: '14px', marginTop: '2%'}}>New to Sprout? <b style={{color: '#f69621', cursor: 'pointer'}} onClick={() => history.push('/register')}>Create account</b></p>
    </>
  )
}