import React, { useState, useEffect, createContext, useCallback } from 'react';
import axios from 'axios';

const PostContext = createContext();

const PostProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllPosts = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await axios.get('/post/get-all-post');
      console.log("Fetched posts:", data);
      setLoading(false);
      setPosts(data?.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <PostContext.Provider value={{ posts, setPosts, getAllPosts, loading }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };