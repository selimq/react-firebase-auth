import { CircularProgress } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [isAuth, setIsAuth] = useState(false)
    const [isAuthFinished, setIsAuthFinished] = useState(false)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function logout() {
        return auth.signOut()
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user != null) {
                setIsAuth(true)
                setIsAuthFinished(true)
            }
            else {
                setIsAuth(false)
                setIsAuthFinished(true)

            }
        })
        return unsubscribe

    }, [])



    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        isAuth,
        isAuthFinished
    }


    return (
        <AuthContext.Provider value={value}>
            {
                isAuthFinished ? children : <CircularProgress />}
        </AuthContext.Provider>
    )
}

export default AuthProvider
