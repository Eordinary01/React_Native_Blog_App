import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import PostCard from '../components/PostCard';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserPosts = async () => {
    try {
      setLoading(true);

      const {data} = await axios.get('/post/get-user-post');
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };


  useEffect(()=>{

    getUserPosts();
  },[])
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>MyPosts</Text> */}
        <PostCard posts={posts} myPostScreen={true}/>
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
    marginTop: 40,
  },
});

export default MyPosts;
