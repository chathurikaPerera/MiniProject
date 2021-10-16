import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import well4 from '../assets/well4.png';
import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignUp = ({navigation}) => {
    const [email, setEmail] =  React.useState("");
    const [password, setPassword] = React.useState("");
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState("");

    const validate = () => {
        if(!email){
            setError("Email required ");
            setValid(false);
            return;
        }else if(!password){
            setError("Password required ");
            setValid(false);
            return;
        }
        signInUser(email, password);
    }

    const signInUser = (email, passsword) => {
        auth()
            .signInWithEmailAndPassword(email, passsword)
            .then((res) => {
                setEmail("");
                setPassword("");
                navigation.navigate("Home");
            })
    }
    return (
        <View style={[styles.container]}>
            <ImageBackground source={well4} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.4}}>
                <View style={[styles.subCon]}>
                    <Text style={[styles.topic]} >Sign In</Text>
                    {error ? (
                        <View style={styles.errorLabelContainerStyle}>
                            <Text style={styles.errorTextStyle}>{error}</Text>
                        </View>
                    ) : null}
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Email</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]} 
                        placeholder="example@gmail.com"
                        value={email} 
                        onChangeText={setEmail}
                        error={isValid}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Password</Text>
                    </View>
                    <TextInput
                        placeholder="password" 
                        style={[styles.input]} 
                        value={password}
                        secureTextEntry={true} 
                        onChangeText={setPassword}
                        error={isValid}/>
                    <View style={[ {width: "80%"}]}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={validate}>
                        <Text style={[{color: "white", fontSize: 20}]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[{flexDirection:"row",marginTop:10}]}>
                       <Text>If you don't have an account?</Text>
                       <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                          <Text style={[{marginLeft:5, color:"rgb(5, 58, 102)"}]}>Sign Up</Text>
                       </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    subCon: {
       flexDirection:"column",
       justifyContent:"center",
       alignItems:"center",
       width: "100%",
       height: "100%",
    },
    topic:{
       fontWeight: 'bold',
       fontSize: 30,
       color: "rgb(5, 58, 102)",
       marginBottom: 25,
    },
   input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    // backgroundColor:"rgb(240, 239, 239)",
    borderColor: "rgb(5, 58, 102)",
    padding: 10,
    width: "80%",
    borderRadius: 7,
    },
    button: {
       width: "100%",
       height: 50,
       backgroundColor: "rgb(5, 58, 102)",
       alignItems: "center",
       justifyContent: "center",
       borderRadius: 10,
       marginTop: 20,
   },
    inputCon: {
      flexDirection: "column",
       justifyContent: "flex-start",
       alignItems:"flex-start",
       height: "auto",
       width: "80%"
    },
    label: {
        fontSize: 20,
    },
    image: {
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
        height: "100%",
    },
    errorTextStyle:{
        color: "red",
    }

})

export default SignUp;

