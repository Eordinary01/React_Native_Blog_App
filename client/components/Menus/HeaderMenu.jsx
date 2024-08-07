import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React,{useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {

    //global state
    const[state,setState] = useContext(AuthContext);

    //logout
    const handleLogout = async ()=>{

        setState({token:'',user:null});
        await AsyncStorage.removeItem("@auth");
        alert("Logout Successfully..")
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons 
        name="logout"
        style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:10,
        justifyContent:'space-between'
    },
    iconStyle: {
        marginBottom: 2,
        alignSelf: 'center',
        fontSize: 30,
        color:'yellow'
      },
})

export default HeaderMenu;
