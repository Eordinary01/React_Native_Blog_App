import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const menuItems = [
    { name: 'Home', icon: 'home' },
    { name: 'Post', icon: 'plus-square' },
    { name: 'Account', icon: 'user' },
    { name: 'Myposts', icon: 'list' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.name)}
        >
          <FontAwesome5
            name={item.icon}
            style={[styles.iconStyle, route.name === item.name && styles.activeIcon]}
          />
          <Text style={[styles.menuText, route.name === item.name && styles.activeText]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const {width} = Dimensions.get('window');

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
    height: 60,
    width: width,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconStyle: {
    fontSize: 24,
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
  activeText: {
    color: "orange",
  },
});

export default FooterMenu;