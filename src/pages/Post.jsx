import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config_service";
import Button from "../componenets/Button";
import Container from "../componenets/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../componenets/Loader";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { Slug } = useParams();
    const navigate = useNavigate();

    const userdata = useSelector((state) => state.auth.userdata);

    const isAuthor = post && userdata ? post.UserId === userdata.$id : false;

    useEffect(() => {
        if (Slug) {
            service.getPost(Slug).then((post) => {
                console.log("Post data:", post); 
                if (post) {
                    setPost(post);
                } else {    
                    console.log("The post no more exists");
                }
            }).catch(err => console.error("Error fetching post:", err));
        } else {
            console.log("No slug");
            navigate("/");
        }
    }, [Slug, navigate]);
    
    useEffect(() => {
        console.log("User Data:", userdata); 
        console.log("Post Data:", post); 
        if (post) {
            console.log("Post UserId:", post.UserId);
            console.log("Current UserId:", userdata?.$id);
        }
    }, [post, userdata]);

    useEffect(() => {
        if (post?.FeaturedImage) {
            service.getFilePreview(post.FeaturedImage)
            .then(setImageUrl);
        }
    }, [post]);

    const deletePost = () => {
        console.log("Post Object:", post); 
        console.log("Post ID:", post?.$id); 
    
        if (!post || !post.$id) {
            console.error("Error: Post ID is undefined.");
            return;
        }
    
        service.deletePost({ Slug: post.$id })  
            .then((Status) => {
                if (Status) {
                    service.deleteFile(post.FeaturedImage);
                    navigate("/");
                }
            })
            .catch(err => console.error("Error deleting post:", err));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                       (day % 10 === 2 && day !== 12) ? "nd" :
                       (day % 10 === 3 && day !== 13) ? "rd" : "th";
    
        const options = { month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", options);
    
        return `${day}${suffix} ${formattedDate}`;
    };
    
    
    return post ? (
        <div className="md:p-8 smd:p-5 smd-p-10 sm:py-5 sm:px-2 md:mb-0 sm:mb-5">
            <Container>
                <div className="w-full flex md:flex-row sm:flex-col relative rounded-xl md:p-2 md:pt-0 sm:pt-8 sm:p-0">
                    {imageUrl ? (
                        <div className="flex flex-col">
                            <div className="flex sm:justify-center mr-5">
                                <img src={imageUrl} alt={post.Title} className="rounded-xl sm:w-3/4 xl:w-115 xl:h-75 md:w-88 md:h-62 lg:w-96 lg:h-68" />
                            </div>
                        </div>
                    ) : (
                        <Loader/>
                    )}
        
                <div className="flex flex-col px-6 sm:py-5 md:py-0 md:pr-0 gap-5">
                    <div className="md:hidden sm:block flex flex-col p-4">
                        <div className="w-full flex sm:justify-center md:justify-start gap-5 mb-6">
                            <div className="text-xl md:block sm:hidden font-bold">Title :</div> 
                            <div className="text-xl font-medium -mb-1">{post.Title}</div>
                        </div>
                        <div className="flex gap-5 sm:justify-center md:justify-start browser-css mb-5">
                            <div className="text-xl md:block sm:hidden font-bold">Content :</div> 
                            <div className="mt-0.5 flex flex-wrap">{parse(post.Content)}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:py-10 sm:pl-0 sm:py-0 sm:-mt-7 md:mt-0 md:pl-0 gap-7 ">
                        <div className="flex gap-5 sm:justify-center md:justify-start browser-css">
                            <div className="text-xl md:block sm:hidden font-bold">Created On :</div> 
                            <div className="mt-0.5">{formatDate(post.$createdAt)}</div>
                        </div>
                        <div className="flex gap-5 sm:justify-center md:justify-start browser-css">
                            <div className="text-xl md:block sm:hidden font-bold">Category :</div> 
                            <div className="mt-0.5">{post.Category}</div>
                        </div>
                        <div className="flex gap-5 sm:justify-center md:justify-start browser-css">
                            <div className="text-xl md:block sm:hidden font-bold">Status :</div> 
                            <div className="mt-0.5">{post.Status}</div>
                        </div>
                        <div className="flex gap-5 sm:justify-center md:justify-start browser-css">
                            <div className="text-xl md:block sm:hidden font-bold">Likes :</div> 
                            <div className="flex items-center gap-1 mt-0.5">
                                <AiFillLike className="md:hidden"/>
                                {post.Likes}</div>
                        </div>
                    </div>
                </div>

                {isAuthor && (
                    <div className="flex absolute sm:bottom-[-40px] sm:left-1/2 transform sm:-translate-x-1/2 md:-translate-x-0 md:left-[550px] md:bottom-[0px] lg:left-[600px] lg:bottom-[0px] gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-teal-400/60" className="flex items-center gap-2 py-2 px-6 rounded-3xl font-medium w-auto hover:bg-teal-400 hover:scale-110 transition-all duration-200">
                                    <FaRegEdit />
                                    <p className="sm:hidden lg:block">Edit</p>
                                </Button>
                        </Link>
                        <Button bgcolor="bg-rose-400/75" className="flex items-center gap-2 py-2 px-6 rounded-3xl font-medium w-auto hover:bg-rose-400/94 hover:scale-110 transition-all duration-200" onClick={deletePost}>
                            <RiDeleteBin5Line />
                            <p className="sm:hidden lg:block">Delete</p>
                        </Button>
                    </div>
                )}
                </div>
            </Container>

            <div className="sm:hidden md:block md:-mt-5 lg:mt-0 flex flex-col p-4">
                <div className="w-full flex sm:justify-center md:justify-start mb-5 gap-5">
                    <div className="text-xl md:block sm:hidden font-bold">Title :</div> 
                    <div className="text-xl font-medium -mb-1">{post.Title}</div>
                </div>
                <div className="flex gap-5 sm:justify-center md:justify-start browser-css">
                    <div className="text-xl md:block sm:hidden font-bold">Content :</div> 
                    <div className="mt-0.5 flex flex-wrap">{parse(post.Content)}</div>
                </div>
            </div>
        </div>
    ) : null;
}