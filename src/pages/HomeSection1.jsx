import React, { useEffect, useState } from 'react';
import authService from '../appwrite/Auth';
import Button from '../componenets/Button';
import { useNavigate } from 'react-router-dom';

function HomeSection1({ selectedTheme }) {
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

    const handleCreatePost = () => {
        if (user) {
            navigate("/add-posts"); 
        } else {
            navigate("/login?redirect=/add-posts"); 
        }
    };

    // Define images based on selected theme
    const images = {
        "Cooking & Food": ["Images/Cooking1.png", "Images/Cooking2.png", "Images/Cooking3.png", "Images/Cooking4.png", "Images/Cooking5.png", "Images/Cooking6.png", "Images/Cooking7.png"],
        "Travel & Adventure": ["Images/Travel1.png", "Images/Travel2.png", "Images/Travel3.png", "Images/Travel4.png", "Images/Travel5.png", "Images/Travel6.png", "Images/Travel7.png"],
        "Health & Wellness": ["Images/Health1.png", "Images/Health2.png", "Images/Health3.png", "Images/Health4.png", "Images/Health5.png", "Images/Health6.png", "Images/Health7.png"],
        "Finance & Budgeting": ["Images/Finance1.png", "Images/Finance2.png", "Images/Finance3.png", "Images/Finance4.png", "Images/Finance5.png", "Images/Finance6.png", "Images/Finance7.png"],
        "Fashion & Beauty": ["Images/Fashion1.png", "Images/Fashion2.png", "Images/Fashion3.png", "Images/Fashion4.png", "Images/Fashion5.png", "Images/Fashion6.png", "Images/Fashion7.png"],
    };

    // Positions for images
    const positions = [
        "top-0 left-0",   
        "top-0 left-100", 
        "top-15 left-180", 
        "top-100 left-0",    
        "top-85 left-70",  
        "top-75 left-130", 
        "top-80 left-190" 
    ];

    return (
        <div className='relative flex flex-row md:mb-15 sm:mb-0'>
            <div className='flex md:flex-row sm:flex-col md:justify-between sm:items-center md:mt-4 sm:mt-0 w-full xl:gap-15 lg:gap-10 sm:gap-4'>
                 {/* Main Text Section */}
                <div className='flex flex-col justify-center xl:mt-10 md:pl-10 sm:pl-0 md:w-3/4 sm:w-full'>
                    <h1 className="lg:text-5xl font-extrabold sm:text-4xl mt-10 md:text-left sm:items-center md:mb-12 sm:mb-7 text-gray-900">
                        Welcome to BlogNest !!
                    </h1>
                    <p className="md:text-xl sm:text-lg md:text-left sm:text-center text-gray-600">
                        Discover, create, and share insightful blogs on topics that matter.  
                        Join a community of passionate writers and readers today!
                    </p>
                    <div className='md:mt-10 sm:mt-7 md:justify-start sm:justify-center flex gap-4'>
                            {user ? (
                                <Button 
                                    className="md:text-lg sm:text-base px-5 py-3 text-white bg-blue-800 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                                    onClick={() => navigate("/all-posts")}
                                >
                                    View All Posts
                                </Button>
                            ) : (
                                <Button 
                                    className="md:text-lg sm:text-base px-5 py-3 text-white bg-blue-800 rounded-3xl hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-sky-300 transition-all duration-200"
                                    onClick={handleCreatePost}
                                >
                                    Create Your Posts
                                </Button>
                            )}
                        </div>                    
                </div>

                {/* Image Section */}
                <div className='relative flex w-1/2 xl:ml-25 sm:ml-0 items-center justify-center'>
                    {/* Main Blog Picture */}
                    <img className='max-w-full min-w-sm rounded-lg h-auto xl:scale-85 md:scale-80 sm:scale-70 smd:scale-80 sm:mt-[-35px]' 
                        src="Images/Home_page1.png" 
                        alt="Blog_Pic" 
                    />
                </div>  
            </div>
           
            {/* Thematic Floating Images */}
            {images[selectedTheme]?.map((image, index) => (
                <img 
                    key={index} 
                    src={image} 
                    alt={`${selectedTheme}-${index}`} 
                    className={`absolute w-40 h-40 object-contain sm:hidden xl:block ${positions[index % positions.length]}`} 
                />
            ))}   
        </div>
    );
}

export default HomeSection1;
