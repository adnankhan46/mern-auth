import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const {currentUser} = useSelector((state)=> state.user);
  return (
    <div className='mx-auto max-w-lg'>
     <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
     <form className='flex flex-col gap-4'>
     <img className='h-24 w-24 self-center mt-4 cursor-pointer rounded-full object-cover' alt='' src={currentUser.profilePicture}/>
    <input 
    defaultValue={currentUser.username}
    type="text" 
    id='username' 
    placeholder='Username' 
    className='bg-slate-100 rounded-lg p-3 ' />

    <input
    defaultValue={currentUser.email}
    type="email" 
    id='email' 
    placeholder='Email' 
    className='bg-slate-100 rounded-lg p-3 ' />

    <input
    type="password" 
    id='password' 
    placeholder='Password' 
    className='bg-slate-100 rounded-lg p-3 ' />

    <button className='bg-slate-700 text-white p-3 rounded-lg mt-2 hover:opacity-95 disabled:opacity-80'>UPDATE</button>
     </form>

     <div className="flex justify-between">
     <span className='text-red-700 cursor-pointer mt-4'>Delete Account</span>
     <span className='text-red-700 cursor-pointer mt-4'>Sign OUT</span>
     </div>
    </div>
  )
}

export default Profile
