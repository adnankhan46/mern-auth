import {Link} from "react-router-dom"

function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign UP</h1>
      <form action="" className='flex flex-col gap-4 '>
      <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
      <input type="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' />
      <input type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' />
      <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>SignUP</button>
      </form>
      <div className="flex gap-2 mt-5">
      <p>Have an Account?</p>
      <Link to="/signin">
      <span className='text-blue-500'>Sign IN</span>
      </Link>
      </div>
    </div>
  )
}

export default SignUp
