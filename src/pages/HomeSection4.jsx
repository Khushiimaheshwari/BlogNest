import React, { useEffect, useState } from 'react'
import { BsStars } from "react-icons/bs";
import { MdLibraryAddCheck } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../componenets/Button';
import authService from '../appwrite/Auth';

function HomeSection4() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <section className='w-full mb-8'>
            <div className='flex flex-col items-center text-center gap-10 mb-14 md:px-10 sm:px-5'>
                <h3 className='xl:text-4xl lg:text-3xl sm:text-3xl font-extrabold'>Share Your Thoughts, Inspire the World!</h3>
                <p className='text-lg max-w-4xl'> 
                <span className='mr-1 text-xl font-semibold text-sky-700'> Your voice matters! </span> 
                Whether it's an idea, an experience, or a creative spark — this is your space to express, connect, and inspire.</p>
            </div>

            <div className='flex w-full flex-col items-center mb-4'>
                <div className='flex items-center gap-1'>
                <BsStars className='text-amber-500 text-2xl'/>
                <h4 className='sm:text-2xl lg:text-3xl font-bold text-center items-center'>
                 Why Post ?</h4>
                </div>
                <div className='flex md:flex-row sm:flex-col py-5 gap-10 justify-center'>
                    <div className='flex flex-col items-center text-center'>
                        <img src="Images/CreatePost1.png" width={"75%"} alt="Engage with Community" />
                        <div className='flex items-center md:text-lg smd:text-base sm:text-sm gap-1'>
                            <MdLibraryAddCheck className='md:text-lg smd:text-lg sm:text-base mt-3 text-blue-800'/>
                            <p className='mt-2 font-medium text-amber-700'>Engage with a like-minded community</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <img src="Images/CreatePost2.png" width={"75%"} alt="Showcase Perspective" />
                        <div className='flex items-center md:text-lg smd:text-base sm:text-sm gap-1'>
                            <MdLibraryAddCheck className='md:text-lg smd:text-lg sm:text-base mt-3 text-blue-800'/>
                            <p className='mt-2 font-medium text-rose-700'>Showcase your unique perspective</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <img src="Images/CreatePost3.png" width={"75%"} alt="Start Conversations" />
                        <div className='flex items-center md:text-lg smd:text-base sm:text-sm gap-1'>
                            <MdLibraryAddCheck className='md:text-lg smd:text-lg sm:text-base mt-3 text-blue-800'/>
                            <p className='mt-2 font-medium text-teal-700'>Start meaningful conversations</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
            {user ? (
                <Button className="flex items-center gap-2 md:text-lg sm:text-base mt-3 bg-blue-800 text-white px-6 py-3 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                    onClick={() => navigate("/add-posts")}>
                    Create Post
                    <IoMdCreate className='mt-1'/>
                </Button>
            ) : (
                <Button className="flex items-center gap-2 md:text-lg sm:text-base mt-3 bg-blue-800 text-white px-6 py-3 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                    onClick={() => alert("Login to explore posts")}>
                    Create Post
                    <IoMdCreate className='mt-1'/>
                </Button>
            )} 
            </div>      
        </section>
    )
}

export default HomeSection4
