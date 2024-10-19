import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = async () => {
    return await signOut(auth);
}