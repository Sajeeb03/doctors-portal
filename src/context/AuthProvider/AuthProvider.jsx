import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true);
    console.log(user);

    //register user
    const userRegistration = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    //login user 
    const logIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google sign in 
    const googleSignIn = (provider) => {
        setLoader(true);
        return signInWithPopup(auth, provider);
    }

    //update Profile
    const updateUser = name => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })

    }

    // log out 

    const logOut = () => {
        return signOut(auth)
    }

    //resetPassword
    const resetPassword = email => {
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("User updated", currentUser);
            setUser(currentUser);
            setLoader(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setLoader,
        userRegistration,
        logIn,
        googleSignIn,
        updateUser,
        logOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;