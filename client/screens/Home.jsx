import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {AuthContext} from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';

const Home = () => {
  const [state] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
    justifyContent: 'space-between',
  },
});

export default Home;
