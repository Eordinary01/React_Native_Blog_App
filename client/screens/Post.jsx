import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FooterMenu from '../components/Menus/FooterMenu'

const Post = () => {
    return (
        <View style={styles.container}>
          <View style={styles.footer}>
            <FooterMenu/>
          </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container:{
            flex:1,
            margin:10,
            justifyContent:"space-between",
            
        },
        footer:{
            flex:1,
            justifyContent:"flex-end"
        }
    })

export default Post