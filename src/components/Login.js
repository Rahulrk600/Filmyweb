import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { query, where, getDocs} from 'firebase/firestore';
import { usersRef } from '../firebase/firebase'
import { Appstate } from '../App'
import bcrypt from 'bcryptjs';



const Login = () => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loding, setLoding] = useState(false);

    const login = async () => {
        setLoding(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/');
                }
                else {
                    swal({
                        title: "invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }

            })

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoding(false);
    }

    return (
        <div className='w-full flex flex-col items-center mt-4 justify-center'>
            <h1 className='text-xl font-bold'>Login</h1>
            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="Number" class="leading-7 text-sm text-white">Mobile Number</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        class="w-full bg-white  rounded-lg border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                        class="w-full bg-white rounded-lg border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div class="p-2 w-full">
                <button
                    onClick={login}
                    class="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded-lg text-lg">{loding ? <TailSpin height={23} color='white' /> : "Login"}</button>
            </div>
            <div>
                <p>Do not have account? <Link to={'/signup'}><span className='text-blue-500'>Signup</span></Link></p>
            </div>
        </div>
    )
}

export default Login
