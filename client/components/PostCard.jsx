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

const PostCard = ({posts, myPostScreen}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = id => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDeleteRequest = id => {
    Alert.alert('Attention!', 'Are you Sure You Want To Delete This Post?..', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel Press');
        },
      },
      {
        text: 'Delete',
        onPress: () => hanadleDeletePost(id),
      },
    ]);
  };

  const hanadleDeletePost = async id => {
    try {
      setLoading(true);

      const {data} = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      Alert.alert(data?.message);
      navigation.push('Myposts');
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total Posts: {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((post, i) => (
        <TouchableOpacity key={i} onPress={() => toggleExpand(post._id)}>
          <Animated.View
            style={[
              styles.card,
              expandedId === post._id && styles.expandedCard,
            ]}>
            {myPostScreen && (
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{marginHorizontal: 17}}>
                  <FontAwesome5
                    name="pen"
                    size={18}
                    color="darkblue"
                    onPress={() => {
                      setPost(post), setModalVisible(true);
                    }}
                  />
                </Text>
                <Text>
                  <FontAwesome5
                    name="trash"
                    size={18}
                    color="red"
                    onPress={() => handleDeleteRequest(post?._id)}
                  />
                </Text>
              </View>
            )}

            <View style={styles.titleContainer}>
              <FontAwesome5 name="star" size={16} color="#FFD700" />
              <Text style={styles.title}>{post?.title}</Text>
            </View>
            {expandedId === post._id && (
              <Text style={styles.desc}>{post?.description}</Text>
            )}
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
            <View style={styles.expandIcon}></View>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFAF0', // Light yellow background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff00',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFE0', // Light yellow for cards
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'black', // Gold border
  },
  expandedCard: {
    backgroundColor: '#FFF8DC', // Darker yellow when expanded
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B8860B', // Dark goldenrod color for title
    marginLeft: 10,
  },
  desc: {
    fontSize: 16,
    color: '#8B4513', // Saddle brown color for description
    marginTop: 10,
    marginBottom: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'white', // Gold border
    paddingTop: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black', // Goldenrod color for footer text
  },
  expandIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

export default PostCard;
