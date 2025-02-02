import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/databaseCofig";

const PostCard = ({ title, featuredImage, $id ,slug}) => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/post/${slug}`}  state={{postId:$id}} className="block">
        {/* Image Section */}
        <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
          <img
            src={databaseService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
