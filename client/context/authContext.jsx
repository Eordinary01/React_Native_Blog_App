import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  //initial local storage
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem('@auth');
      let loginData = JSON.parse(data);

      setState({...state, user: loginData?.user, token: loginData?.token});
    };
    loadLocalStorageData();
  }, []);


  let token = state && state.token;


  //axios settings
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.baseURL = "https://react-native-blog-app-backend.onrender.com/api/v1";


  return(
    <AuthContext.Provider value={[state,setState]}>
    {children}
    </AuthContext.Provider>
  );
};

export {AuthContext,AuthProvider};
