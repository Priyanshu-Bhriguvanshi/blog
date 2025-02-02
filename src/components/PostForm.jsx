import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RTE, Input } from "./index";
import databaseService from "../appwrite/databaseCofig";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PostForm = () => {
    const location = useLocation();
    const post = location.state?.postData;
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, getValues, control, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "Hello! Write here...",
            featuredImage: post?.featuredImage || "",
            slug: post?.slug || "",
            status: post?.status || "public",
        },
    });

    const slugTransform = useCallback((value) => {
        return value
            ? value
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z\d\s]+/g, "-") 
                  .replace(/\s+/g, "-") 
            : "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        let image = null;
        let updatedPost = null;
        let postUpload = null;

        if (post) {
            if (data?.image[0]) {
                image = await databaseService.createFile(data.image[0]);
            }

            updatedPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: image ? image.$id : post.featuredImage,
            });

            if (updatedPost) navigate(`/post/${updatedPost.slug}`);
        } else {
            if (data?.image[0]) {
                image = await databaseService.createFile(data?.image[0]);
            }
            const userId = userData.$id;
            const featuredImage = image?.$id;
            postUpload = await databaseService.createPost({ ...data, userId, featuredImage });

            if (postUpload) navigate(`/post/${postUpload.$id}`, { state: { postId: postUpload.$id } });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="min-h-screen flex items-center justify-center p-4 bg-gray-100"
        >
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section */}
                <div className="w-full md:w-2/3 p-6 space-y-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Create Post</h2>

                    {/* Title Input */}
                    <Input
                        label="Title"
                        type="text"
                        placeholder="Enter Title here"
                        {...register("title", { required: "Title is required" })}
                    />

                    {/* Slug Input */}
                    <Input
                        label="Slug"
                        type="text"
                        placeholder="Post URL"
                        {...register("slug", { required: "Slug / URL is required" })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />

                    {/* Content Editor */}
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md shadow text-center"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md shadow text-center"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/3 p-6 bg-gray-200 flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-700">Upload Image</h3>

                    {/* Image Upload Input */}
                    <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image")}
                        className="mt-2 w-full border border-gray-300 rounded-lg shadow-sm p-2"
                    />

                    {/* Image Preview */}
                    {post?.featuredImage && (
                        <img
                            src={databaseService.getFilePreview(post.featuredImage)}
                            alt="Featured"
                            className="w-full h-auto max-h-40 object-cover rounded-lg mt-4 shadow-md"
                        />
                    )}

                    {/* Visibility Select Dropdown */}
                    <div className="mt-4 w-full">
                        <label className="block font-medium text-gray-700">Visibility</label>
                        <select
                            {...register("status")}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PostForm;
