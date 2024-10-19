import React, { useState, createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ ...user });
                setUserLoggedIn(true);
            } else {
                setUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Function to handle user sign up
    const signUp = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);  // Update the context with the new user
            setUserLoggedIn(true);
            console.log("user is", user)
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const value = {
        user,
        userLoggedIn,
        loading,
        signUp,  // Include signUp function in context value
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
