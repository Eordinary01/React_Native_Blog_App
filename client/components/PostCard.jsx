import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import EditModal from './EditModal';

const PostCard = ({post, myPostScreen}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDeleteRequest = () => {
    Alert.alert('Attention!', 'Are you Sure You Want To Delete This Post?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel Press');
        },
      },
      {
        text: 'Delete',
        onPress: () => handleDeletePost(post._id),
      },
    ]);
  };

  const handleDeletePost = async id => {
    try {
      setLoading(true);
      const {data} = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      Alert.alert(data?.message);
      navigation.push('Myposts');
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <TouchableOpacity onPress={toggleExpand}>
      <Animated.View style={[styles.card, expanded && styles.expandedCard]}>
        {myPostScreen && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={{marginHorizontal: 15}}
              onPress={() => setModalVisible(true)}>
              <FontAwesome5 name="pen" size={18} color="darkblue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteRequest}>
              <FontAwesome5 name="trash" size={18} color="red" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.titleContainer}>
          <FontAwesome5 name="star" size={16} color="#FFD700" />
          <Text style={styles.title}>{post?.title}</Text>
        </View>
        {expanded && <Text style={styles.desc}>{post?.description}</Text>}
        <View style={styles.footer}>
          {post?.postedBy?.name && (
            <View style={styles.footerItem}>
              <FontAwesome5 name="user" size={14} color="#FFD700" />
              <Text style={styles.footerText}>{post?.postedBy?.name}</Text>
            </View>
          )}
          <View style={styles.footerItem}>
            <FontAwesome5 name="clock" size={14} color="#FFD700" />
            <Text style={styles.footerText}>
              {moment(post?.createdAt).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </Animated.View>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFE0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  expandedCard: {
    backgroundColor: '#FFF8DC',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B8860B',
    marginLeft: 10,
  },
  desc: {
    fontSize: 16,
    color: '#8B4513',
    marginTop: 10,
    marginBottom: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black',
  },
});

export default PostCard;
