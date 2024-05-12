import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth" 
import { app } from '../firebase';
import { signInSuccess } from "../redux/user/userSlice";
import {useDispatch} from "react-redux";

function OAuth() {
    {/** Kyunki ye button form ke andar h, toh submission prevent krne ke liye type button krenge */}
    const dispatch = useDispatch();

    const handleGoogleClick = async () =>{

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data)
            // Sending to Redux
            dispatch(signInSuccess(data));

        } catch (error) {
            console.log("Failed to login with google", error);
        }

    }
    return (
        <button 
        type='button'
        className='w-full uppercase bg-blue-600 rounded-lg text-white p-3'
        onClick={handleGoogleClick}>
        LogIn with GOOGLE
        </button>
  )
}

export default OAuth
