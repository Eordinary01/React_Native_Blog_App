import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../components/forms/InputBox';
import SubmitButton from '../../components/forms/SubmitButton';
import axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert('Please Fill All Fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post(
        '/auth/register',
        {name, email, password},
      );
      Alert.alert(data && data.message);
      navigation.navigate("Login")

      console.log('Register Data==> ', {name, email, password});
    } catch (error) {
      Alert.alert(error.response.data.message );
      setLoading(false);
      console.log(error);
    }
    
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Register</Text>
        <View style={{marginHorizontal: 20}}>
          <InputBox inputTitle={'Name'} value={name} setValue={setName} />
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
          btnTitle="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text style={styles.linkText}>
          ALready Register Please{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            LOGIN
          </Text>{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#e1cdbc',
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
  linkText: {
    textAlign: 'center',
  },
  link: {
    color: 'red',
  },
});

export default Register;
