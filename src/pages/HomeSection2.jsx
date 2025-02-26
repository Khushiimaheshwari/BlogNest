import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function HomeSection2({ setSelectedTheme, selectedTheme }) {
    const themes = ["Cooking & Food", "Travel & Adventure", "Health & Wellness", "Finance & Budgeting", "Fashion & Beauty"];
    const colors = ["bg-orange-300", "bg-blue-300", "bg-red-400", "bg-teal-400", "bg-rose-300" ];
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedTheme((prevTheme) => {
                const currentIndex = themes.indexOf(prevTheme);
                const nextIndex = (currentIndex + 1) % themes.length;
                return themes[nextIndex];
            });
        }, 2000); 

        return () => clearInterval(interval); 
    }, [setSelectedTheme]);

    const handleCategoryClick = (theme) => {
        setSelectedTheme(theme);
        navigate('/explore-posts', {state: { selectedTheme: theme }})
    }

    return (
        <div className='flex flex-col md:mb-15 sm:mb-8 items-center'>
            <h2 className='text-3xl p-5 mb-2 font-extrabold'>Choose Across Various Themes</h2>
            <div className='flex md:flex-row sm:flex-col p-6 lg:text-lg sm:text-md justify-between gap-5'>
                {themes.map((theme, index) => (
                    <div 
                    key={theme}
                    className={`
                        ${colors[index]} 
                        xl:py-3 xl:px-6 lg:py-3 lg:px-4 md:py-3 md:px-3 smd:py-3 smd:px-15 sm:px-6 sm:py-3 rounded-3xl cursor-pointer font-semibold 
                        transition-transform duration-300 ease-in-out 
                        ${selectedTheme === theme ? "scale-115 shadow-lg md:animate-bounce sm:animate-pulse" : "hover:scale-105"}
                    `}
                    onClick={() => handleCategoryClick(theme)}>
                    {theme}
                </div>
                ))}
            </div>
        </div>
    );
}

export default HomeSection2;
