import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <FontAwesome5
          name="home"
          style={[styles.iconStyle, route.name === "Home" && styles.activeIcon]}
        />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Post')}>
        <FontAwesome5
          name="plus-square"
          style={[styles.iconStyle, route.name === 'Post' && styles.activeIcon]}
        />
        <Text style={styles.menuText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Account')}>
        <FontAwesome5
          name="user"
          style={[styles.iconStyle, route.name === 'Account' && styles.activeIcon]}
        />
        <Text style={styles.menuText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Myposts')}>
        <FontAwesome5
          name="list"
          style={[styles.iconStyle, route.name === 'Myposts' && styles.activeIcon]}
        />
        <Text style={styles.menuText}>My Posts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  menuItem: {
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 3,
  },
  activeIcon: {
    color: "orange",
  },
  menuText: {
    fontSize: 12,
    color: '#333',
  },
});

export default FooterMenu;