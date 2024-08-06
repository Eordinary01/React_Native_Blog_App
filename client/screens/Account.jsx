import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import axios from 'axios';
import FooterMenu from '../components/Menus/FooterMenu';
import {AuthContext} from '../context/authContext';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const {user, token} = state;
  //local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      console.log("Sending update request with:", { name, password, email });
  
      const { data } = await axios.put('/auth/update-user', {
        name,
        password,
        email,
      });
  
      // console.log("Received response:", data);
  
      setLoading(false);
  
      if (data && data.updatedUser) {
        setState(prevState => ({
          ...prevState,
          user: data.updatedUser
        }));
        alert(data.message || "Profile updated successfully");
  
        // Log out the user
        setState(prevState => ({ ...prevState, token: '', user: null }));
  
        // Navigate to the login screen
        navigation.navigate('Login');  // Make sure 'Login' is the correct screen name
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      setLoading(false);
      console.error("Update error:", error);
      alert(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
            }}
            style={{height: 200, width: 200, borderRadius: 100}}
          />
        </View>
        <Text style={styles.warningtext}>
          Currently You Can Only Update Your Name And Password*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user.role}
            editable={false}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? 'Please Wait' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <FooterMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
    marginTop: 40,
  },
  warningtext: {
    color: 'red',
    fontSize: 13,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontWeight: 'bold',
    width: 70,
    color: 'gray',
  },
  inputBox: {
    width: 250,
    backgroundColor: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: 'black',
    color: 'white',
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Account;
