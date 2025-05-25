// "use client"

 
// import { useVerifyEmailMutation } from '@/redux/fetures/auth/varifyEmail';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
 
 
// import React, { useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import OTPInput from 'react-otp-input';
 

// const SendOtp = () => {
//   const [otp, setOtp] = useState('');
//   const [error, setEror] = useState('')
//   const router = useRouter();
//   const [email, setEmail] = useState('')
//   const [path, setPath] = useState('')
 
//   useEffect(() => {
//     // Extract query parameters on client-side
   
//     const params = new URLSearchParams(window.location.search);
//     setEmail(params.get('email') || '');
//     setPath(params.get('path') || '');

//   }, []);

//   const [verifyOtp, {isLoading}] = useVerifyEmailMutation()
 
//   const data = {
//     email,
//     oneTimeCode: otp
//   }
//   console.log(data)

//   const handleOtp = async () => {
 
//   //   try {
//   //     const res = await verifyOtp(data).unwrap();
//   //     console.log(res);
  
//   //     if (res?.code === 200) {
//   //         toast.success(res?.message);
  
//   //         if (path === "/auth/singup") {
            
//   //             router.push(`/auth/login`);
//   //         } else if (path === "/auth/forgotPassword") {
//   //           router.push(`/auth/resetPassword?email=${email}`);
//   //         } else {
//   //             // Add any other default navigation or actions if needed
//   //         }
//   //     }
//   // } catch (error) {
//   //     console.log(error);
//   //     setEror(error?.data?.message)
//   //     // setError(error?.data?.message);
//   // } 
   
//   };

//   return (
//     <div className="flex justify-center items-center lg:min-h-[700px] bg-gray-100">
//       <Toaster />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full">
//         <h1 className="text-2xl font-bold mb-6 text-center">Verify Email</h1>
//         <p className="text-center mb-6">
//           Please enter the OTP we have sent you in your email.
//         </p>

//         {/* OTP Input */}
//         <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
//                         <OTPInput
//                                 value={otp}
//                                 onChange={setOtp}
//                                 numInputs={6}
//                                 inputStyle={{
//                                     height: "52px",
//                                     width: "45px", // Default width for mobile
//                                     background: "transparent",
//                                     border: "1px solid green",

//                                     borderRadius: '10px',
//                                     marginRight: "8px",
//                                     outline: "none",
//                                     // Adjusting width for larger screens
//                                     sm: {
//                                         width: "80px" // Width for larger screens
//                                     }
//                                 }}
//                                 renderSeparator={<span className="md:w-6"> </span>}
//                                 renderInput={(props) => <input {...props} className="sm:w-[60px]" />}
//                             />
//                         </div>

//         {/* Didn't receive code? */}
//         {/* <p className="text-center text-blue-500 hover:underline cursor-pointer mb-6">
//           Didn't receive code?
//         </p> */}

//         {/* Verify Button */}
        
//         <p className=' text-red-500 mt-4'>{error}</p>
//         <button
//          className="w-full mt-6 !bg-[#2E7D32] text-white p-2 rounded"
//           onClick={handleOtp}
//         >
//           Verify Account
//         </button>
     
//       </div>
//       <div className='w-full'>
//          <img src="/images/login.png" alt="" />
//       </div>
//     </div>
//   );
// };

// export default SendOtp;



 "use client"

 
 
import { useVerifyEmailMutation } from '@/redux/fetures/auth/varifyEmail';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
 
 
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import OTPInput from 'react-otp-input';
 

const SendOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setEror] = useState('')
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [path, setPath] = useState('')
 
  useEffect(() => {
    // Extract query parameters on client-side
   
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || '');
    setPath(params.get('path') || '');

  }, []);

  const [verifyOtp, {isLoading}] = useVerifyEmailMutation()
 
  const data = {
    email,
    oneTimeCode: otp
  }
  console.log(data)
  const resendOtp = () => {
    console.log('clicked')
  }

  const handleOtp = async () => {
 console.log(data)
 
    try {
      const res = await verifyOtp(data).unwrap();
      console.log(res);
  
      if (res?.code === 200) {
          toast.success(res?.message);
  
          if (path === "/auth/singup") {
            
              router.push(`/auth/login`);
          } else if (path === "/auth/forgotPassword") {
            router.push(`/auth/resetPassword?email=${email}`);
          } else {
              // Add any other default navigation or actions if needed
          }
      }
  } catch (error) {
      console.log(error);
      setEror(error?.data?.message)
      // setError(error?.data?.message);
  } 
   
  };

  const Back = () => {
    router.push('/auth/forgotPassword')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
        <div className="max-w-md w-full">
        <div className="flex items-center gap-2 mb-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png" // Replace with your logo URL
              alt="Logo"
              className="w-20 h-20"
            />
            <Link href="/"> 
            <img
              src="/images/logo.png" // Replace with your logo URL
              alt="Logo"
              className=""
            />
            </Link>
          </div>

          <h2 className="text-2xl font-semibold mb-1"><LeftOutlined onClick={Back} className=' cursor-pointer' /> Verify Email</h2>
          <p className="text-xs text-gray-400 mb-6">
          Please enter the OTP we have sent you in your email.
          </p>

          {/* OTP Input */}
          <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                        <OTPInput
                                value={otp}
                                
                                onChange={setOtp}
                                numInputs={6}
                                inputStyle={{
                                    height: "52px",
                                    width: "45px", // Default width for mobile
                                    background: "transparent",
                                    borderBottom: "3px solid #006FF4",

                                    borderRadius: '3px',
                                    fontSize:'20px',
                                    marginRight: "8px",
                                    outline: "none",
                                    // Adjusting width for larger screens
                                    sm: {
                                        width: "80px" // Width for larger screens
                                    }
                                }}
                                renderSeparator={<span className="md:w-6"> </span>}
                                renderInput={(props) => <input {...props} className="sm:w-[60px]" />}
                            />
                        </div>

        {/* Didn't receive code? */}
        <p className=" my-6 flex items-center justify-between">
          <span >Didn't receive code?</span>
          <button onClick={resendOtp} className=' text-green-600'>Resend</button>
          
        </p>

        {/* Verify Button */}
        
        <p className=' text-red-500 mt-4'>{error}</p>
        <button
         className="w-full !bg-[#000000] text-white p-2 rounded"
          onClick={handleOtp}
        >
          Verify Account
        </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png" // Place your banner image in public/login-banner.png
          alt="Forgot Password Banner"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
};

export default SendOtp;



 