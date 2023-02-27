import React from 'react'
import loginFormStyles from '../styles/loginForm.module.css'
const LoginForm = () => {
  return ( 
    <div className='login-form-container w-full h-[100vh] flex flex-row justify-center items-center'>
      <div className="login-form-wrapper flex gap-10">
         <div className="logo-container flex justify-center items-center">
            {/* LOGO  */}
            <h1 className="text-[3em] font-bold"> SSVM </h1>
         </div>

         <div className="line-divider bg-slate-500 w-[2px]">
      
         </div>

         <div className="form-container flex flex-col gap-4">
            <form className="flex flex-col gap-[2.5em]">
               <div className="form-group flex flex-col gap-4">
                  <input className={`${loginFormStyles.txtBox}`} type="text" placeholder="Username" />
                  <input className={`${loginFormStyles.txtBox}`} type="password" placeholder="Password" />
               </div>
   

               <button className='bg-[#d64040] p-2 hover:bg-[#ff4848] ease-in duration-300'>Login</button>
            </form>

            <div className="footer-form">
               <p className='text-[14px] text-gray-500'>Forgot Password?</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default LoginForm