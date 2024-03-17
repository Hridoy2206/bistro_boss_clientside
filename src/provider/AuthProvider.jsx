import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContaxt = createContext(null);
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    //?User creation
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //? User Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //?Google Login

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //? Sign out
    const logout = () => {
        signOut(auth);
    }

    //? Update UserName 
    const updateUserInfo = (photo) => {
        return updateProfile(auth.currentUser, {
            displayName: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser?.email }
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data?.token) {
                            localStorage.setItem("access-token", res.data?.token);
                            setLoading(false);
                        }
                    })
                    .catch(error => {
                        console.error('Error in axios post:', error); // Log any errors from the axios post
                    });
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
            console.log("current user", currentUser);
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signInUser,
        logout,
        updateUserInfo,
        googleSignIn,
    }
    return (
        <AuthContaxt.Provider value={authInfo}>
            {children}
        </AuthContaxt.Provider>
    );
};

export default AuthProvider;