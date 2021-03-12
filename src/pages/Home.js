import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { logout } from '../store/action/userAction'
import axios from '../api/axios'
import del from '../assets/del.png'

export default function Home() {
  const [ users, setUsers ] = useState([])
  console.log(localStorage.access_token, '<<<<< dari home');
  // const dispatch = useDispatch()

  const fetch = () => {
    axios({
      url: '/user',
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({ data }) => {
      setUsers(data)
    })
    .catch(err => console.log(err))
  }

  const deleteHandler = (id) => {
    axios({
      url: `/user/${id}`,
      method: 'DELETE',
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({ data }) => {
      console.log(data, 'deleted');
      fetch()
    })
    .catch(err => console.log(err))
  }

  const logoutHandler = () => {
    // dispatch(logout())
    localStorage.clear()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <h4 className="home-title">Great, <i>{localStorage.who}</i>! Here's your registered name</h4>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <table style={{alignItems: 'center'}}>
          <thead style={{height: '15vh'}}>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map(e => {
                const initial = e.name.split(' ').map(n => n[0].toUpperCase()).join('')
                
                return <tr className="table-row" key={e._id}>
                  <td className="oval">{initial}</td>
                  <td style={{width: '20vh'}}>{e.name}</td>
                  <td style={{width: '30vh'}}>{e.phone_number}</td>
                  <td style={{width: '35vh'}}>{e.email}</td>
                  <td style={{textAlign: 'left'}}><img className="del-icon" src={del} alt={`del-${e._id}`} onClick={() => deleteHandler(e._id)}/></td>
                </tr>
              })
            }
          </tbody>
        </table>

        <div>
          <Link type="button" className="button" onClick={() => logoutHandler()} to="/login">Sign Out</Link>
        </div>
      </div>    
    </>
  )
}