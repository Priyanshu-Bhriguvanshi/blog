import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import authservice from '../appwrite/auth'
import { PostForm } from '../components'
const EditPost = () => {
    const [post, setPost] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const post= await authservice.getPost(slug);
            if(post){
                setPost(post.document)
            }
        }
        fetchPosts()
    },[slug])
  return (
    <div>
        <PostForm {...post}/>
    </div>
  )
}
export default EditPost