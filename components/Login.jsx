import React, {  useState } from 'react'
import './Signup.css'
import { useAuth } from '../context/UserAuthContext'
import { Link, useLocation } from "wouter"

const Login = () => {
  const { UserLogin } = useAuth()
  const [err, setError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: "",
    mNumber: ""
  })
  const [location, setLocation] = useLocation();

  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const { email, password} = user
    if (email === "" || password === "" ) {
      setError("Please fill in all fields")
      setTimeout(() => {
        setError("")
      }, 5000)
      return;
    }
    try {
      await UserLogin(email, password)
      setLocation("/logged")
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found")
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password")
      } else {
        setError(`${error.message}`)
      }
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <div className='box'>
      {err && <p className='error'>{err}</p>}
      <form onSubmit={SubmitHandler} className="form">
        <h2>Login</h2>
        <div className="inputfield">
          <input type="email" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
        </div>
        <div className="inputfield">
          <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
        </div>
        <div className="inputfield">
          <input type="submit" value="Login" />
        </div>
        <p className="forget"><Link href="/signup">Don't have an account? Signup</Link></p>
      </form>
    </div>
  )
}

export default Login
