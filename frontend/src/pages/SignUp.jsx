import { useState } from "react"
import {Link} from "react-router-dom"

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if(data.success === false){
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign UP</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
      <input type="text" placeholder='Username' id='username' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
      <input type="email" placeholder='email' id='email' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
      <input type="password" placeholder='password' id='password' onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' />
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
      {loading ? "Loading...": "Sign UP"}
      </button>
      </form>
      <div className="flex gap-2 mt-5">
      <p>Have an Account?</p>
      <Link to="/signin">
      <span className='text-blue-500'>Sign IN</span>
      </Link>
      </div>
      <p className="text-red-600 mt-5">{error && "Something Went Wrong"}</p>
    </div>
  )
}

export default SignUp
