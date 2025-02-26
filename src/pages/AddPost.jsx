import React, { useEffect, useState } from 'react'
import Container from '../componenets/Container/Container';
import PostForm from '../componenets/post-form/PostForm';
import { motion } from "framer-motion";
import { Megaphone, Pencil } from "lucide-react";
import { Link } from 'react-router-dom';

// const textVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: (i) => ({
//         opacity: 1,
//         scale: 1.1,
//         color: ["#ff5733", "#2a9d8f", "#d97706"][i], // Cycle through colors
//         transition: { delay: i * 0.6, duration: 0.8, ease: "easeInOut" }
//     })
// };

function AddPost() {

    const messages = [
        "✨ First time posting? Just start typing—every great journey begins with a single word!",
        "🚀 Already a pro? Keep your thoughts flowing and let your content shine.",
        <>
            <Megaphone className="w-5 h-5 mr-2 text-sky-600" />
            Let the world hear your voice—hit "Submit" and make an impact!
        </>
    ];

    const colors = ["#ff5733", "#2a9d8f", "#d97706"];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='py-8 lg:px-10 md:px-8 smd:px-10 sm:px-5 overflow-x-hidden'>
            <div className='flex px-5 md:py-5 sm:py-2 justify-center md:mb-10 sm:mb-5'>
                <h1 className='text-3xl font-bold text-rose-700'>Create Your Post 
                    <span className='text-gray-500'> - </span> 
                    <span className='text-teal-600 animate-pulse'>Your Voice, </span>
                    <span className='text-yellow-600 animate-pulse'>Your Story!</span></h1>
            </div>

            <motion.div 
                className='flex mb-10 justify-center px-6'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <p className='md:text-lg sm:text-base font-bold text-sky-600'>
                    Got something to share?
                    <span className='font-normal text-black'> Whether it's your first post or another amazing addition to your collection, this is your space to express, inspire, and connect.</span>
                </p>
            </motion.div>

            <motion.div>
            <div className="flex flex-col items-center md:mb-10 sm:mb-8 px-5 text-center space-y-3">
                {messages.map((text, i) => (
                    <motion.p
                        key={i}
                        className="md:text-base sm:text-sm font-semibold flex items-center"
                        animate={i === activeIndex ? { scale: [1, 1.1, 1], color: [colors[i], colors[i]] } : {}}
                        transition={i === activeIndex ? { duration: 2, ease: "easeInOut" } : {}}>
                        {text}
                    </motion.p>
                ))}
            </div>
            </motion.div>

            <div className='mb-10'>
                <div className='flex justify-center'>
                    <img src="Images/line.png" alt="" />
                </div>
                <Link to="#createform">
                    <p className="md:mt-8 sm:mt-5 md:text-lg px-2 sm:text-base text-blue-800 md:hover:scale-115 sm:hover:scale-110 transition-all duration-500 font-semibold cursor-pointer"
                    onClick={() => document.getElementById("createform")?.scrollIntoView({ behavior: "smooth" })}>
                        📝 "Ready to Share? Fill in the Details Below!"
                    </p>
                </Link>
            </div>
            
            <div id='createform'>
                <Container>
                    <PostForm />
                </Container>
            </div>
        </div>
    )
}

export default AddPost