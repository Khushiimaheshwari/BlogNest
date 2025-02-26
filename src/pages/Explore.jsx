import React, { useEffect, useState } from 'react';
import service from '../appwrite/config_service';
import PostCard from '../componenets/PostCard';
import Loader from '../componenets/Loader';
import { ImCross } from "react-icons/im";
import Container from '../componenets/Container/Container';
import { useLocation, useOutletContext } from 'react-router-dom';

export default function ExplorePage() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);

    const { selectedTheme } = useOutletContext();

    useEffect(() => {
        service.getAllPost()
            .then((response) => {
                if (response && response.documents) {
                    console.log("Fetched Posts:", response.documents);
                    setPosts(response.documents);
                    setLoading(false);

                    // Extract unique categories from posts
                    const uniqueCategories = [...new Set(response.documents.map(post => post.Category))];
                    setCategories(uniqueCategories);
                } else {
                    console.warn("No posts found!");
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setLoading(false);
            });

            if (location.state?.selectedTheme) {
                setSearchTerm(location.state.selectedTheme);
            }
        }, [location.state]);

    // Filter posts based on the search term
    const filteredPosts = posts.filter(post =>
        post.Category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen xl:px-10 lg:py-8 md:px-6 sm:px-7 sm:py-10 bg-white">
            <h1 className="text-4xl font-bold text-center mb-12">Explore Posts</h1>
            
            {/* Search Bar */}
            <div className='flex justify-center mb-6'>
                <div className="relative md:w-3/4 sm:w-full sm:px-2">
                    <input 
                        type="text"
                        placeholder="Search by category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    /> 
                    {searchTerm && (
                        <ImCross 
                            onClick={() => setSearchTerm("")} 
                            title="Clear search"
                            className="absolute top-1/2 right-6 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                        />
                    )}
                </div>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex overflow-x-auto whitespace-nowrap mb-16 px-2 scrollbar-hide">
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSearchTerm(category)}
                            className={`px-4 text-black transition-all duration-200 ${
                                searchTerm === category 
                                ? 'text-gray-600' 
                                : 'text-black  hover:text-gray-700 hover:scale-102'}`}>
                            {category}
                        </button>
                    ))
                ) : null }
            </div>

            {/* Posts Grid */}
            {loading ? (
                <Loader />
            ) : (
                <Container>
                    {filteredPosts.length > 0 ? (
                        <div className="grid sm:grid-cols-1 smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 md:gap-5 smd:gap-4 sm:gap-7">
                            {filteredPosts.map(post => (
                                <PostCard key={post.$id} {...post}></PostCard>
                                
                            ))}
                        </div>
                    ) : (
                        <div className="flex w-full justify-center items-center h-[300px]">
                            <p className="text-center text-xl text-gray-500 col-span-3">No posts found.</p>
                        </div>
                    )}
                </Container>
            )}
        </div>
    );
}