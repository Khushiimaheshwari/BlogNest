import React, { useEffect, useState } from 'react';
import Button from '../componenets/Button';
import { useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import authService from '../appwrite/Auth';
import { motion } from "framer-motion";
import { FcIdea } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import Notification from '../componenets/Notification';

export default function HomeSection3() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleCloseNotification = () => {
        setNotification({ message: "", type: "", onClose: handleCloseNotification });
    };
    const [notification, setNotification] = useState({message: "", type: "", onClose: handleCloseNotification});

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

    const showNotification = () => {
        setNotification({message: "Login to explore posts", type: "warning", onClose: handleCloseNotification})
        console.log("Show Notification");
    }

    const scaleVariants = {
        animate: {
          scale: [0.9, 1.1, 0.9], 
          transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity, 
          },
        },
      };
    
    return (
        <section className='w-full flex flex-col mb-14 gap-20'>

            {notification.message && <Notification message={notification.message} type={notification.type} onClose={notification.onClose} />}

            <div className="relative md:pl-2 sm:pl-0">
                <div className="absolute md:block sm:hidden inset-0 z-0 border-2 bg-gray-100 border-blue-800 shadow-xl rounded-lg translate-x-[-12px] translate-y-7"></div>
                <div className="relative flex flex-col md:ml-2 z-10 md:flex-row items-center justify-between w-full md:px-8 md:pt-14 sm:px-8 sm:pt-12 pb-10 bg-blue-50 border-2 border-blue-800 rounded-lg xl:gap-20 sm:gap-5">
                    <div className="flex md:pl-10 flex-col md:w-1/2 text-center md:text-left gap-6">
                        <h2 className="lg:text-4xl sm:text-3xl font-extrabold text-gray-900">
                            Take a Step Forward To...
                        </h2>
                        <h3 className="flex gap-2 xl:text-3xl sm:text-2xl md:justify-start sm:justify-center text-red-700/70 font-semibold mt-2">
                            <span className="italic">
                                <Typewriter
                                    words={["Discover", "Engage", "Inspire"]}
                                    loop={Infinity}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </span>
                        </h3>
                        <p className="xl:text-xl lg:text-lg text-gray-700 mt-4">
                            Explore new ideas, connect with like-minded individuals, and embark on a journey of growth and inspiration. Whether you're seeking knowledge or sharing your insights, this space is for you.
                        </p>
                        <div className='flex sm:justify-center md:justify-start'>
                        {user ? (
                            <Button className="flex items-center gap-2 md:text-lg sm:text-base mt-3 bg-blue-800 text-white px-6 py-3 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                                onClick={() => navigate("/explore-posts")}>
                                Explore Now
                                <FaArrowRightLong className='mt-1'/>
                            </Button>
                        ) : (
                            <Button className="flex items-center gap-2 md:text-lg sm:text-base mt-3 bg-blue-800 text-white px-6 py-3 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                                onClick={showNotification}>
                                Explore Now
                                <FaArrowRightLong className='mt-1'/>
                            </Button>
                        )} 
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                        <img 
                            src="Images/Home_page3.png" 
                            alt="Exploration illustration" 
                            className="w-full max-w-sm md:h-[320px] xl:scale-120 lg:scale-100"
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col px-10 items-center text-center gap-8'>
                <div className='flex items-center gap-1'>
                    <FcIdea className='lg:text-3xl sm:text-2xl'/>
                    <h4 className='md:text-3xl sm:text-2xl xl:text-4xl font-bold'> What's on your mind today?</h4>
                </div>
                <div className='flex lg:flex-row sm:flex-col gap-8 p-5 justify-center'>
                    <div className='flex smd:flex-row sm:flex-col gap-8'>
                        <motion.div className='border bg-orange-300/80 md:text-lg sm:text-base rounded-4xl py-3 px-5'
                        variants={scaleVariants}
                        animate="animate"
                        transition={{ delay : 0 }} >
                        A game-changing idea?</motion.div>

                        <motion.div className='border bg-red-400/80 md:text-lg sm:text-base rounded-4xl py-3 px-5'
                        variants={scaleVariants}
                        animate="animate"
                        transition={{ delay : 0.5 }}>
                         A personal journey?</motion.div>
                    </div>
                    <div className='flex smd:flex-row sm:flex-col gap-8'>
                        <motion.div className='border bg-teal-400/80 md:text-lg sm:text-base rounded-4xl py-3 px-5'
                        variants={scaleVariants}
                        animate="animate"
                        transition={{ delay : 1 }}> 
                        A creative masterpiece?</motion.div>
                        
                        <motion.div className='border bg-rose-200 md:text-lg sm:text-base rounded-4xl py-3 px-5'
                        variants={scaleVariants}
                        animate="animate"
                        transition={{ delay : 1.5 }}> 
                        A trending topic?</motion.div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}