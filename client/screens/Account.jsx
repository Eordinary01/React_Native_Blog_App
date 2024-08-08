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
import InputBox from '../components/forms/InputBox';

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put('/auth/update-user', {
        name,
        password,
        email,
      });
      setLoading(false);
      if (data && data.updatedUser) {
        setState(prevState => ({
          ...prevState,
          user: data.updatedUser
        }));
        alert(data.message || "Profile updated successfully");
        setState(prevState => ({ ...prevState, token: '', user: null }));
        navigation.navigate('Login');
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.headerText}>Account Settings</Text>
        </View>
        
        <Text style={styles.warningText}>
          Currently, you can only update your Name and Password*
        </Text>
        
        <View style={styles.formContainer}>
          <InputBox
            inputTitle="Name"
            value={name}
            setValue={setName}
            autoComplete="name"
            keyboardType="default"
          />
          <InputBox
            inputTitle="Email"
            value={email}
            setValue={() => {}}
            autoComplete="email"
            keyboardType="email-address"
            editable={false}
          />
          <InputBox
            inputTitle="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoComplete="password"
            keyboardType="default"
          />
          <InputBox
            inputTitle="Role"
            value={state?.user.role}
            setValue={() => {}}
            keyboardType="default"
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateBtnText}>
            {loading ? 'Please Wait' : 'Update Profile'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#000',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  warningText: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  updateBtn: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  updateBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFD700',
  },
});

export default Account;
