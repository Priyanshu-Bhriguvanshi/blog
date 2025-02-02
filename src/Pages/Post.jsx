import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseCofig";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const postId = location.state?.postId;

  useEffect(() => {
    (async () => {
      try {
        const fetchedPost = await databaseService.getPost(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    })();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    
    try {
        await databaseService.deletePost(post?.$id);

        if (post?.featuredImage) {
            await databaseService.deleteFile(post.featuredImage);
        }

        navigate("/"); 
    } catch (error) {
        console.error("Error deleting post:", error.message);
    }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {post ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          
          {post.featuredImage && (
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt="Post Cover"
              className="w-full h-64 object-cover"
            />
          )}

         
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4 text-gray-900">{post.title}</h1>
            <div className="text-gray-700 leading-relaxed">{parse(post.content)}</div>

            
            {isAuthor && (
              <div className="flex justify-end space-x-4 mt-6">
                <Link
                  to={`/edit-post/${post.slug}`} state={{postData:post}}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={deletePost}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg font-medium">Loading post...</div>
      )}
    </div>
  );
};

export default Post;
