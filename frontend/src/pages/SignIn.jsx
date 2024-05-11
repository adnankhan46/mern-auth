import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
// Step 4 - Using Actions
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [formData, setFormData] = useState({});
  // using use Selector
  const {loading, error} = useSelector((state) => state.user);
// Navigating to another page
  const navigate = useNavigate();
// Initialse use Dispatch
 const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      // using dispatch
     dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if(data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
     dispatch(signInFailure(error));
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign IN</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input type="email" placeholder='email' id='email' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
      <input type="password" placeholder='password' id='password' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
      {loading ? "Loading...": "Sign IN"}
      </button>
      </form>
      <div className="flex gap-2 mt-5">
      <p>Create a New Account</p>
      <Link to="/signup">
      <span className='text-blue-500'>Sign UP</span>
      </Link>
      </div>
      <p className="text-red-600 mt-5">{error ? error.message || "Something Went Wrong": ""}</p>
    </div>
  )
}

export default SignIn
