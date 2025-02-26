import React, { useEffect, useState } from 'react'
import service from '../appwrite/config_service'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import authService from '../appwrite/Auth';

// In appwrite ID is written as $id, it the syntax
function PostCard({$id, Title, FeaturedImage, Likes, LikedBy}) {
  const [imageUrl, setImageUrl] = useState('');
  const [likeCount, setLikeCount] = useState(Likes || 0);
  const [likedByUsers, setLikedByUsers] = useState(LikedBy || []);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const user = await authService.getCurrentUser();
            if (user) {
                setCurrentUser(user.$id);
                setHasLiked(LikedBy.includes(user.$id));
            }
        }
        fetchUser();
    }, [LikedBy]);

    const handleLike = async () => {
        if (!currentUser) return;

        const updatedPost = await service.likePost($id, currentUser, likeCount, likedByUsers);
        if (updatedPost) {
            setLikeCount(updatedPost.Likes);
            setLikedByUsers(updatedPost.LikedBy);
            setHasLiked(updatedPost.LikedBy.includes(currentUser));
        }
    };
    
  useEffect(() => {
    console.log("FeaturedImage received:", FeaturedImage); 

    if (FeaturedImage) {
        service.getFilePreview(FeaturedImage)
            .then((url) => {
                console.log("Fetched Image URL:", url);
                setImageUrl(url);
            })
            .catch(err => console.error("Error fetching image:", err));
    } else {
        console.warn("FeaturedImage is undefined!");
    }
  }, [FeaturedImage]);

    return (
          <div className='w-full h-[300px] bg-sky-100 rounded-xl p-4 flex flex-col items-center'>
              <div 
              onClick={() => navigate(`/post/${$id}`)}
              className='w-full h-[200px] cursor-pointer bg-white flex justify-center items-center overflow-hidden mb-4'>
                  {imageUrl ? (
                      <img src={imageUrl} alt={Title} className='w-full h-full object-cover'/>
                  ) : (
                      <Loader/>
                  )}
              </div>
              <div className='flex gap-5'>
                <h2 className='md:text-xl sm:text-lg font-bold text-center '>{Title}</h2>
              </div>
              <div className='flex'>
                        <span className="p-1">{likeCount}</span>
                        <button 
                            onClick={handleLike} 
                            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800">
                            {hasLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                        </button>
                    </div>
          </div>
    )
  }
  

export default PostCard
