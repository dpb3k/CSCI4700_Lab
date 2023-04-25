import { AuthErrorCodes } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "wouter"
import { useAuth } from '../context/UserAuthContext'
import './Signup.css'
const Signup = () => {
    const [location, setLocation] = useLocation();
    const { SignUp } = useAuth()
    const [err, setError] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
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
        const { email, password, confirmPassword, mnumber } = user
        if (password == "" || confirmPassword == "" || email == "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Please fill all the fields ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password Must be Greater then 6 Length")
        }
        else {
            try {
                await SignUp(email, password)
                alert("Welcome New User Created successfully")
                setLocation('/login')
            } catch (err) {
                if (err.code === "auth/email-already-in-use") {
                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("Email already in use. Please use another email")
                }
                else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

                    setInterval(() => {
                        setError("")
                    }, 5000)
                    setError("Password Must be 6 charecter")
                }

                else {
                    setError(err.message)
                }
            }
        }
    }
    return (


        <div className='box'>
            {
                err && <p className='error'>{err}</p>

            }

            <form onSubmit={SubmitHandler} className="form">
                <h2>Signup</h2>

                <div className="inputfield">
                    <input type="text" placeholder="Email" value={user.email} name='email' onChange={UserHandler} />
                </div>

                <div className="inputfield">
                    <input type="password" placeholder="Password" value={user.password} name='password' onChange={UserHandler} />
                </div>
                <div className="inputfield">
                    <input type="password" placeholder="Confirm Password" value={user.confirmPassword} name='confirmPassword' onChange={UserHandler} />
                </div>
                <div className="inputfield">
                    <input type="submit" />
                </div>
                <p className="forget"><Link href="/login">Already have an account? Login</Link></p>
            </form>

        </div>

    )
}

export default Signup