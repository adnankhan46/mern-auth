import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable}  from "firebase/storage"
import { app } from '../firebase';
// for uodate state
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, SignOut } from '../redux/user/userSlice';

// Toastify
import toast, { Toaster } from 'react-hot-toast';

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const {currentUser, loading, error} = useSelector((state)=> state.user);
  const [imgProg, setImgProg] = useState(0);
  const [imgErr, setImgErr] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  // for update State
 const dispatch = useDispatch();

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
  };
      const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
      };
      //*************************** * Handle Submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(updateUserStart());
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
         // console.log(data);
          if(data.success === false){
            dispatch(updateUserFailure(data));
            return;
          }
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true);
          toast.success('Profile Updated Successfull!')
        } catch (error) {
         dispatch(updateUserFailure(error));
        }
      }

      const handleDelete = async ()=>{
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          });
          const data = await res.json();
           if(data.success === false){
             dispatch(deleteUserFailure(data));
             return;
           }
           dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error));
        }
      };

      const handleSignOut = async () => { 
        try {
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          console.log(data);
         dispatch(SignOut());
        } catch (error) {
          console.log(error);
        }
      }
  
      
  return (
    <div className='mx-auto max-w-lg'>
    <Toaster />
     <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
     <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

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
    className='bg-slate-100 rounded-lg p-3 '
    onChange={handleChange} />

    <input
    defaultValue={currentUser.email}
    type="email" 
    id='email' 
    placeholder='Email' 
    className='bg-slate-100 rounded-lg p-3 '
    onChange={handleChange} />

    <input
    type="password" 
    id='password' 
    placeholder='Password' 
    className='bg-slate-100 rounded-lg p-3'
    onChange={handleChange} />

    <button className='bg-slate-700 text-white p-3 rounded-lg mt-2 hover:opacity-95 disabled:opacity-80'>
    {loading ? "Loading..." : "UPDATE"}
    </button>
     </form>
     <p className='text-red-700 mt-1'>{error && "Something went wrong"}</p>
     <p className='text-green-700'>{updateSuccess && "Profile Updated Successfull"}</p>

     <div className="flex justify-between mt-2">
     <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
     <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign OUT</span>
     </div>
    </div>
  )
}

export default Profile
