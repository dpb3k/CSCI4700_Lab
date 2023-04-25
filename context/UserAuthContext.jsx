import { useContext, createContext, useEffect, useState } from "react"

import {
  AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, getAuth
} from 'firebase/auth'
import { auth } from "../firebase";



const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
 
  const [currentuser, setuser] = useState()
  onAuthStateChanged(auth, user => {
    // console.log(user)
    if (user) {
      setuser(user)
  
    }
    else {
      // alert("logged out")
    }
  })

  

// Login Functinallity

  const UserLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  //logout Functionllity
  const logout = () => {
    return signOut(auth)
  }

  // sign User
  const SignUp = async (email, password) => {

     return  createUserWithEmailAndPassword(auth, email, password);

  }
  const value = {
    SignUp,
    currentuser,
    UserLogin,
    logout
  }
  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext