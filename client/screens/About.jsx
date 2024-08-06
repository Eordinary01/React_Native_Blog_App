import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';


const About = () => {
    return (
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <FooterMenu />
          </View>
        </View>
      );
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
      },
    });
export default About;