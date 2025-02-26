import React, {useState} from 'react'
import authService from '../appwrite/Auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import Button from './Button'
import Input from './InputBox'
import Logo from './Logo'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import Notification from './Notification.jsx'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const handleCloseNotification = () => {
        setNotification({ message: "", type: "", onClose: handleCloseNotification });
    };
    const [notification, setNotification] = useState({message: "", type: "", onClose: handleCloseNotification});

    const create = async(data) => {
        setError("")
        setNotification({message: "", type: "", onClose: handleCloseNotification})

        try {
            const info = await authService.createAccount(data)
            setNotification({message: "Account Created Successfully!", type: "success", onClose: handleCloseNotification})

            if (info) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                };
                setTimeout(() => navigate("/"), 3000)
            }
        } catch (error) {
            setError(error.message)

            if (error.message.includes("already exists")) {
                console.log("Already Exists");
                setNotification({message: "Account already exist", type: "info", onClose: handleCloseNotification})
                setTimeout(() => navigate("/login"), 3000)

            }else{
                setNotification({message: "SignIn failed!", type: "error", onClose: handleCloseNotification})
            }
        }
    }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tl from-sky-300 to-sky-100 sm:p-6 smd:px-20 md:p-1">

        {notification.message && <Notification message={notification.message} type={notification.type} onClose={notification.onClose} />}

        <div className="w-full sm:max-w-lg max-w-xs bg-white/70 backdrop-blur-md rounded-xl p-10 border border-black/10 shadow-md z-10">
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full ml-14 max-w-[100px]">
                    <Link to={"/"}>
                        <Logo width="100%" />
                    </Link>
                    </span>
                </div>
                <h2 className="text-center text-blue-900 md:text-2xl sm:text-lg mt-4 font-bold leading-tight">Signup to create account</h2>
                <p className="mt-2 mb-8 sm:text-sm md:text-base text-center text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-bold text-primary transition-all duration-200 text-sky-600 hover:animate-pulse">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 font-bold sm:text-sm md:text-base'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
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
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full mt-2 bg-blue-800 text-white rounded-2xl hover:translate-y-[-4px] hover:shadow-lg hover:shadow-sky-200 transition-all duration-200">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        <div id="circle-c1" className="w-50 h-50 absolute rounded-[100px] bg-gradient-to-tl from-sky-200 to-white bottom-[100px] left-[80px]"></div>
        <div id="circle-c2" className="w-50 h-50 absolute rounded-[100px] bg-gradient-to-tr from-sky-200 to-white top-[80px] right-[80px]"></div>
    </div>
  )
}

export default Signup;