import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import y from '../assets/y.png'
import n from '../assets/n.png'

export default function Register() {
  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setConfirm] = useState('')
  const [match, setMatch] = useState(false)
  const history = useHistory()
  
  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const phoneNumbeHandler = (e) => {
    setPhoneNumber(e.target.value)
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }
  const confirmHandler = (e) => {
    setConfirm(e.target.value)
  }

  const submithandler = () => {
    const input = {
      name,
      phone_number,
      email,
      password
    }

    axios({
      url: '/register',
      method: 'POST',
      data: input
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => console.log(err))
  }

  
  useEffect(() => {
    if (password === password_confirm) {
      setMatch(true)
    } else {
      setMatch(false)
    }
  }, [password_confirm, password])

  return (
    <>
      <div className="register-title">
        <h3>Sign Up</h3>
        <p>Welcome to Sprout Digital Labs</p>
      </div>
      <form>
        <input className="form-input-text" type="text" placeholder="Name" value={name} onChange={(value) => nameHandler(value)}></input><br/>
        <input className="form-input-text" type="text" placeholder="Phone Number" value={phone_number} onChange={(value) => phoneNumbeHandler(value)}></input><br/>
        <input className="form-input-text" type="text" placeholder="Email" value={email} onChange={(value) => emailHandler(value)}></input><br/>
        <input className="form-input-text" type="password" placeholder="Password" value={password} onChange={(value) => passwordHandler(value)}></input><br/>
        <input className="form-input-text" type="password" placeholder="Password Confirmation" value={password_confirm} onChange={(value) => confirmHandler(value)}></input>
        <img style={{width: '20px', height: '20px'}} src={match ? y : n} alt="confirm-icon"></img>
        <br/>
        <Link type="submit" className="button" onClick={() => submithandler()} to="/login">Sign Up</Link>
      </form>
      <p style={{fontSize: '12px', lineHeight: '14px', marginTop: '2%'}}>Already have an account? <b style={{color: '#f69621', cursor: 'pointer'}} onClick={() => history.push('/login')}>Log In</b></p>
      
    </>
  )
}