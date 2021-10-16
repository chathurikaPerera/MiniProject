import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Button, TouchableOpacity} from 'react-native';
import logo from '../assets/logo.png';
import auth from '@react-native-firebase/auth';
import Home from './Home.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Welcome = ({ navigation }) => {
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState(false);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if(user != null){
        setUser(user);
        if (initializing) setInitializing(false);
    }
    
  }

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
        if(user != null){
           setUser(true);
        }
      
   });
  }, []);


    if(user){
        return (
            <Home/>
        );
   }
    return (
        <View style={[styles.container]}>
            <Text style={[styles.topic]} >CareMe</Text>
            <View style={[styles.imageContainer]}>
              <Image source={logo} style={{ width: 300, height: 250 }}/>
            </View>
            <Text style={[styles.subTopic]}>Say Hello to Your</Text>
            <Text style={[styles.subTopic2]}>Healthcare partner</Text>
            <View style={[ {width: "90%", marginTop:20}]}>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.navigate('SignUp')}
                >
                <Text style={[{color: "white", fontSize: 20}]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={[ {width: "90%"}]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignIn')}
                >
                <Text style={[{color: "white", fontSize: 20}]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    // backgroundColor: "red",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"center",
    marginHorizontal: 16,
    marginVertical: 16,
   },
   imageContainer: {
    //    backgroundColor: "pink",
       height: "auto",
   },
   topic:{
       fontWeight: 'bold',
       fontSize: 30,
       color: "rgb(5, 58, 102)",
   },
   subTopic:{
       fontSize:20,
       color:"rgb(13, 121, 148)",
   },
   subTopic2:{
       fontSize:20,
       color:"rgb(13, 121, 148)",
       marginBottom: 25,
   },
   con2:{
       width:"90%",
       marginTop: 20,
       height:50,
       backgroundColor: "yellow",
   },
   button: {
       width: "100%",
       height: 50,
       backgroundColor: "rgb(5, 58, 102)",
       alignItems: "center",
       justifyContent: "center",
       borderRadius: 10,
       marginTop: 20,

   }
})

export default Welcome;

