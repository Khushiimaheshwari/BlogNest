import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import Button from '../Button'
import Input from '../InputBox'
import RTE from '../RTE'
import Select from '../Select'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config_service'

export default function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            Title: post?.Title || '',
            Slug: post?.Slug || '',
            Content: post?.Content || '',
            FeaturedImage: post?.FeaturedImage || '',
            Status: post?.Status || 'active',
            UserId: post?.UserId || '',
            Category: post?.Category || 'Select'
        }
    });

    const [imagePreview, setImagePreview] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(post?.Category || "Select"); 
    const [customCategory, setCustomCategory] = useState(""); 
    const navigate = useNavigate()
    const userdata = useSelector((state) => state.auth.userdata)

    const submit = async (data) => {

        const finalCategory = selectedCategory === "Custom Category"
            ? customCategory : 
            (selectedCategory != "Select" ? selectedCategory : "");

            if (!post && !finalCategory) {
                alert("Please select or enter a category.");
                return;
            }

        if(post){            
            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null

            if (file?.$id && post.FeaturedImage) {
                console.log("Previous Featured Image ID:", post.FeaturedImage);
                const isDeleted = await service.deleteFile(post.FeaturedImage);

                if (!isDeleted) {
                    console.error("Failed to delete the previous image.");
                }

            }

            const dbPost = await service.updatePost(post.$id, {...data, 
                FeaturedImage: file ? file.$id : post.FeaturedImage,
                Category: finalCategory
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        }else{
            console.log("User Data before post creation:", userdata);  

            if (!userdata?.$id) {
                console.error("User ID is missing! Aborting post creation.");
                return;
            }

            const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
            
            if (file?.$id) {
                console.log("File uploaded successfully:", file.$id);
            } else {
                console.error("File upload failed or returned null.");
            }

            console.log("Submitting Data:", {
                ...data,
                UserId: userdata?.$id,
            });

            const dbPost = await service.createPost({
                ...data,
                Title: data.Title,
                Slug: data.Slug,
                Content: data.Content,
                Status: data.Status,
                FeaturedImage: file ? file.$id : "",
                UserId: userdata?.$id || "",
                Category: finalCategory,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }else {
                console.error("Post creation failed!");
            }
        } 
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') 
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')

        return '';

    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'Title') {
                setValue('Slug', slugTransform(value.Title, {shouldValidate: true}))              
            }
        })

        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

    useEffect(() => {
        if (post?.FeaturedImage) {
            service.getFilePreview(post.FeaturedImage).then((url) => {
                console.log("Resolved Image Preview URL:", url);
                setImagePreview(url);
            }).catch((error) => {
                console.error("Error fetching image preview:", error);
            });
        }
    }, [post]);

    console.log("Image preview URL:", post?.FeaturedImage ? service.getFilePreview(post.FeaturedImage) : "No image available");

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-row sm:flex-col pt-8">
            <div className="xl:w-1/2 lg:w-2/3 sm:w-full md:w-1/2 px-2 font-bold">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 font-normal"
                    {...register("Title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 font-normal"
                    {...register("Slug", { required: true })}
                    onInput={(e) => {
                        setValue("Slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="xl:w-1/2 lg:w-1/3 md:w-1/2 sm-w-full px-2 mt-6">
                <Input
                    type="file"
                    className="mb-10 font-normal file:bg-gray-100 file:border file:border-gray-300 file:rounded-lg file:px-6 file:py-0.5 file:text-black file:mr-3 file:cursor-pointer"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-[90%] mb-10 ml-4">
                        <p className='font-bold mb-5'>Image Featured:</p>
                        <img
                            src={imagePreview}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-11"
                    {...register("Status", { required: true })}
                />

                <Select
                    options={["Select", "Cooking & Food", "Travel & Adventure", "Health & Wellness", "Finance & Budgeting", "Fashion & Beauty", "Custom Category"]}
                    label="Category"
                    className="mb-6"
                    value={selectedCategory}
                    {...register("Category", { required: true })}
                    onChange={(e) => {
                        setValue("Category", e.target.value);
                        setSelectedCategory(e.target.value)}}
                    required
                />

                {selectedCategory === "Custom Category" && (
                    <>
                        <p className='font-bold mt-3'>Custom Category:</p>
                        <Input
                            placeholder="Enter your category"
                            className="mb-6 mt-1 font-normal"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            required
                        />
                    </>
                )}

                <Button 
                    type="submit" 
                    className={`w-full text-white  transition-all duration-200 rounded-lg ${post ? "bg-rose-400/75 hover:bg-rose-400/94" : "bg-teal-600 hover:bg-teal-700"}`} >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
