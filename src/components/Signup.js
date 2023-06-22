import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link,  useNavigate } from 'react-router-dom';
import  {getAuth, RecaptchaVerifier,signInWithPhoneNumber}  from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert';
import { usersRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';



const auth =getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loding, setLoding] = useState(false);
    const [otpsent, setOtpSent] = useState(false);
    const [OTP,setOTP]  = useState("");

    const generatRecaptha =()=>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, auth);
    }

    const requestOtp = ()=>{
        setLoding(true);
        generatRecaptha();
       let appVerifire = window.recaptchaVerifier;
       signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifire).then(confirmationResult =>{
        window.confirmationResult = confirmationResult;
        swal({
            text:"OTP Sent",
            icon:"success",
            buttons:false,
            timer:3000
        });
        setOtpSent(true);
        setLoding(false);
       }).catch((error)=>{
        console.log(error)
       })
    }
     const verifyOTP =  () =>{
        try {
            setLoding(true);
            window.confirmationResult.confirm(OTP).then((result)=>{
                uploadData();
              swal({
                text:"Sucessful Registered",
                icon:"sucess",
                buttons:false,
                timer:3000
              })
              navigate('/login')
              setLoding(false);
            });
        } catch (error) {
            alert(error);
        }
     }

     const uploadData = async ()=>{
        try{
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(form.password,salt);
        await addDoc(usersRef,{
          name:form.name,
          password:hash,
          mobile:form.mobile
        });
      }catch(err){
        alert(err);
      }
     }


    return (
        <div className='w-full flex flex-col items-center mt-4 justify-center'>
            <h1 className='text-xl font-bold'>Sign up</h1>
            {otpsent ?
                <>
                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="text" class="leading-7 text-sm text-white">Enter OTP</label>
                            <input

                                id="text"
                                name="text"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <button 
                         onClick={verifyOTP}
                        class="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loding ? <TailSpin height={23} color='white' /> : "Confirm OTP"}</button>
                    </div>
                </>
                :
                <>

                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="text" class="leading-7 text-sm text-white">User Name</label>
                            <input
                                type="text"
                                id="text"
                                name="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="Number" class="leading-7 text-sm text-white">Mobile Number</label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                value={form.mobile}
                                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div class="p-2 w-full md:w-1/3">
                        <div class="relative">
                            <label for="password" class="leading-7 text-sm text-white">password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <button
                          onClick={requestOtp}
                        class="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loding ? <TailSpin height={23} color='white' /> : "Requestotp"}</button>
                    </div>
                </>
            }
            <div>
                <p>Do not have account? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
            </div>
            <div id='recaptcha-container'></div>
        </div>
    )
}

export default Signup
