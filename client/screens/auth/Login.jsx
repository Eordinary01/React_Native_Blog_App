import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState,useContext} from 'react';
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/forms/InputBox';
import SubmitButton from '../../components/forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}) => {

  //global state
   const[state,setState] = useContext(AuthContext);




  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //function
  // btn funcn
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert('Please Fill All Fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post(
        '/auth/login',
        { email, password},
      );
      setState(data);
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      Alert.alert(data && data.message);
      navigation.navigate("Home");

      console.log('Login Data==> ', {email, password});
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  //temp func to check local storage data..

  const getLocalStorageData = async ()=>{
    let data = await AsyncStorage.getItem('@auth');
    console.log("Local Storage==> ", data);
  }
  getLocalStorageData();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Login</Text>
        <View style={{marginHorizontal: 20}}>
          <InputBox
            inputTitle={'Email'}
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={'Password'}
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
        </View>

        <SubmitButton
          btnTitle="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text style={styles.linkText}>
          Not Registered Pls! <Text style={styles.link} onPress={()=>navigation.navigate("Register")}>Register</Text>{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent: 'center',
    backgroundColor: '#e1cdbc',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: 'black',
  },
  linkText: {
    textAlign: 'center',
  },
  link: {
    color: 'red',
  },
});

export default Login;
