import React, { useState, useEffect, createContext} from 'react';
import axios from 'axios';

const PostContext = createContext();

const PostProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    setLoading(true);

    try {
      const {data} = await axios.get('/post/get-all-post');
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(()=>{
    getAllPosts();
  },[]);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export {PostContext,PostProvider};
