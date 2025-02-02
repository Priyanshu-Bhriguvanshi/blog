import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseCofig";
import {PostCard} from "../components";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getAllpost();
        setPosts(response?.documents || []); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {posts.length === 0 && (
        <div className="text-center text-gray-600 text-lg font-medium">
          Please login to read posts.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.$id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default AllPost;
