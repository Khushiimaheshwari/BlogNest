import React, {useState, useEffect} from 'react'
import Container from '../componenets/Container/Container';
import PostCard from '../componenets/PostCard';
import service from "../appwrite/config_service";
import Loader from '../componenets/Loader';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from "react-icons/md";
import authService from '../appwrite/Auth';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchPostsAndUser() {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setCurrentUser(user.$id);
                }

                const fetchedPosts = await service.getAllPost([]);
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPostsAndUser();
    }, []);

    const userPosts = posts.filter((post) => post.UserId === currentUser);
    
    return (
        <div className='w-full py-8 px-8'>
            {loading ? (
                <div className="flex justify-center">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className='relative flex justify-end'>
                        <Link 
                            to= "/add-posts"
                            className='group  flex items-center gap-1 px-5 py-2 text-lg text-rose-700 font-medium rounded-3xl
                                        hover:text-rose-800 hover:scale-110 transition-all duration-200'>
                            <MdAddCircleOutline className='mt-1' /> 
                            <p className='md:block sm:hidden'>Create Post</p>
                            <p className='sm:block md:hidden'>
                                <span className='absolute top-8 right-0 hidden group-hover:block bg-rose-100/50 text-rose-700 text-sm px-3 py-1 rounded-md shadow-md'>
                                Create </span>
                            </p>    
                        </Link>
                    </div>
                    <div className='flex px-2 py-4 -mt-13 mb-10 justify-center'>
                        <h1 className='text-3xl font-bold'>Your Posts</h1>
                    </div>
                   
                    {userPosts.length > 0 ? (
                    <Container>
                        <div className='grid sm:grid-cols-1 smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 md:gap-5 smd:gap-4 sm:gap-8'>
                            {userPosts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </Container>             
                ) : (
                <div className="flex justify-center items-center h-[300px]">
                    <h1 className='text-3xl font-bold text-gray-500'>
                        You do not have any posts!
                    </h1>
                </div>
            )}
            </>
        )}
        </div>
    );
}

export default AllPosts