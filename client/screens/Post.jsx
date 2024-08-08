import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState, useContext } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PostContext } from '../context/postContext';
import axios from 'axios';

const Post = ({ navigation }) => {
  const { posts, setPosts } = useContext(PostContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title");
        setLoading(false);
        return;
      }
      if (!description) {
        alert("Please add post description");
        setLoading(false);
        return;
      }

      const { data } = await axios.post('/post/create-post', {
        title, description
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");

    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Create Post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Add Post Title"
            placeholderTextColor={'#888'}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={[styles.inputBox, styles.textArea]}
            placeholder="Add Post Description"
            placeholderTextColor={'#888'}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          {loading ? (
            <Text style={styles.loadingText}>Creating post...</Text>
          ) : (
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postBtnText}>
                <FontAwesome5 name="plus-square" size={18} /> Create Post
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFDE7',
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#000000',
    marginBottom: 20,
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 10,
    color: '#000000',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  postBtn: {
    backgroundColor: '#000000',
    width: '100%',
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtnText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
  },
});

export default Post;
