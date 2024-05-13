import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable}  from "firebase/storage"
import { app } from '../firebase';

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const {currentUser} = useSelector((state)=> state.user);
  const [imgProg, setImgProg] = useState(0);
  const [imgErr, setImgErr] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(()=>{
    if(image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image)=> {
   // console.log(image);
   const storage = getStorage(app);
   const fileName = new Date().getTime() + image.name;
   const storageRef = ref(storage, fileName);
   const uploadTask = uploadBytesResumable(storageRef, image);
   uploadTask.on(
    'state_changed',
    (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         // console.log(`Upload is ${progress} % done`);
          setImgProg(Math.round(progress));
    },
    (error) => {
      setImgErr(true);
    },
     ()=> {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
setFormData({...formData, profilePicture: downloadUrl})
     });
     }
    );
  }
  return (
    <div className='mx-auto max-w-lg'>
     <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
     <form className='flex flex-col gap-4'>

     <input type="file"
     ref={fileRef} hidden 
     accept='image/*' 
     onChange={(e)=> setImage(e.target.files[0])}/>

     <img className='h-24 w-24 self-center mt-4 cursor-pointer rounded-full object-cover' 
     src={formData.profilePicture || currentUser.profilePicture}
     onClick={() => fileRef.current.click()} />
    
      <p className='text-sm self-center'>
      {imgErr ? (<span className='text-red-700'>Error Uploading image (file size must be 2 MB)</span>)
        : imgProg > 0 && imgProg < 100 ? (
          <span className='text-slate-700'>{`Uploading : ${imgProg} %`}</span>)
        : imgProg === 100 ? (<span className='text-green-700 font-semibold'>Image Uploaded Successfully</span>) : ""
      }
      </p>

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
