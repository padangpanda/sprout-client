import './App.css';
import company from './assets/company.png'
import logo from './assets/logo.png'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import GuardedRoute from './components/GuardedRoute'
import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

function App() {
  // const isLogin = useSelector(state => state.isLogin)
  const isLogin = () => {
    if (localStorage.access_token) {
      return true
    } else {
      return false
    }
  }
  const history = useHistory()
  console.log(isLogin);

  useEffect(() => {
   if (isLogin()) {
    history?.push('/')
   } else {
    history?.push('/login')
   }
  }, [history])

  return (
    <Router>
      <div className="container-logo">
        <img id="logo" src={logo} alt="logo"></img>
        <img id="company" src={company} alt="company"></img>
      </div>
      <div className="container-content">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <GuardedRoute path='/' component={Home} auth={isLogin()} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
