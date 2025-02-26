import React, { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Button from './Button'
import Input from './InputBox'
import Logo from './Logo'
import {useDispatch} from "react-redux"
import authService from "../appwrite/Auth"
import {useForm} from "react-hook-form"
import Notification from './Notification'

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // handleSubmit is a event in which we have to pass our own function. The passed function should have a name except handleSubmit.
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const handleCloseNotification = () => {
        setNotification({ message: "", type: "", onClose: handleCloseNotification });
    };
    const [notification, setNotification] = useState({message: "", type: "", onClose: handleCloseNotification});

    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect") || "/";

    const login = async(data) => {
        setError("")
        setNotification({message: "", type: "", onClose: handleCloseNotification});

        try {
            const session = await authService.login(data)
            if (session) {
                const userdata = await authService.getCurrentUser()
                if (userdata) dispatch(authLogin(userdata));
                setNotification({message: "Login Successful!", type: "success", onClose: handleCloseNotification})
                setTimeout( () => navigate(redirectPath), 1500);
            }
            
            
        } catch (error) {
            setError(error.message)
            setNotification({message: "Login failed!", type: "error", onClose: handleCloseNotification})
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tl from-sky-300 to-sky-100 sm:p-6 smd:px-15 md:p-1">

            {notification.message && <Notification message={notification.message} type={notification.type} onClose={notification.onClose} />}

            <div className="w-full sm:max-w-lg max-w-xs bg-white/70 backdrop-blur-md rounded-xl p-10 border border-black/10 shadow-md z-10">
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full ml-12 max-w-[100px]">
                            <Link to={"/"}>
                                <Logo width="100%" />
                            </Link>
                        </span>
                </div>
                <h2 className="text-center text-blue-900 md:text-2xl sm:text-lg mt-4 font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center sm:text-sm md:text-base text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-bold text-primary transition-all duration-200 text-sky-600 hover:animate-pulse"> 
                                Sign Up
                            </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5 font-bold sm:text-sm md:text-base'>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        required
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        required
                        {...register("password", {
                            required: true,
                        })}
                        />
                        <Button
                        type="submit"
                        className="w-full bg-blue-800 text-white mt-2 rounded-2xl hover:translate-y-[-4px] hover:shadow-lg hover:shadow-sky-200 transition-all duration-200"
                        >Sign in</Button>
                    </div>
                </form>
            </div>

            <div id="circle-c1" className="w-50 h-50 absolute rounded-[100px] bg-gradient-to-tl from-sky-200 to-white bottom-[100px] left-[80px]"></div>
            <div id="circle-c2" className="w-50 h-50 absolute rounded-[100px] bg-gradient-to-tr from-sky-200 to-white top-[80px] right-[80px]"></div>
        </div>
      )
}