import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase/config'
import { signInWithPopup, signOut } from 'firebase/auth'

import Logo from '../assets/logo.png'
import { useState } from 'react'

export const Header = () => {
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem('isAuth')) || false
  )
  const navigate = useNavigate()

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then(result => {
        // console.log(result)
        setIsAuth(true)
        localStorage.setItem('isAuth', true)
      })
      .catch(error => {
        // console.log(error)
      })
  }

  function handleLogout() {
    signOut(auth)
      .then(result => {
        // console.log("You're now logged out!")
        setIsAuth(false)
        localStorage.setItem('isAuth', false)
        navigate('/')
      })
      .catch(error => {
        // console.log(error)
      })
  }
  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} alt="WriteNode Logo" />
        <span>WriteNode</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="link" end>
          Home
        </NavLink>
        {isAuth ? (
          <>
            <NavLink to="/create" className="link">
              Create
            </NavLink>
            <button onClick={handleLogout} className="auth">
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className="auth">
            <i className="bi bi-google"></i> Login
          </button>
        )}
      </nav>
    </header>
  )
}
