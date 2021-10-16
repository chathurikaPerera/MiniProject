import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import well4 from '../assets/well4.png';
import auth from '@react-native-firebase/auth';

const SignIn = ({navigation}) => {
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [email, setEmail] =  React.useState("");
    const [password, setPassword] = React.useState("");
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const doSignIn = () => {
        if(!fname){
            setError("First name required ");
            setValid(false);
            return;
        }else if(!lname){
            setError("Last name");
        }else if(!email){
            setError("Email required ");
            setValid(false);
            return;
        }else if(password.length < 6 ){
            setError("Weak password ");
            setValid(false);
            return;
        }else if(password != confirmPassword){
            setError("Password not match ");
            setValid(false);
            return;
        }

        createUser(email, password);
    }

    const createUser = (email, password) => {
        //jane.doe@example.com', 'SuperSecretPassword!
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setFname("");
                setLname("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setError('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    setError('That email address is invalid!');
                }

                setError(error);
            });
        }


    return (
        <ScrollView style={[styles.container]}>
            <ImageBackground source={well4} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.4}}>
                <View style={[styles.subCon]}>
                    <Text style={[styles.topic]} >Sign Up</Text>
                    {error ? (
                        <View style={styles.errorLabelContainerStyle}>
                            <Text style={styles.errorTextStyle}>{error}</Text>
                        </View>
                    ) : null}
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>First Name</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]}
                        placeholder="chathurika" 
                        value={fname}
                        error={isValid} 
                        onChangeText={setFname}/>
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
                        style={[styles.input]} 
                        placeholder="password"
                        value={password}
                        secureTextEntry={true} 
                        onChangeText={setPassword}
                        error={isValid}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Confirm Password</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]} 
                        placeholder="password"
                        value={confirmPassword} 
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                        error={isValid}/>
                    <View style={[ {width: "80%"}]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={doSignIn}>
                       <Text style={[{color: "white", fontSize: 20}]}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={[{flexDirection:"row",marginTop:10, justifyContent:"center"}]}>
                       <Text>If you have an account?</Text>
                       <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                          <Text style={[{marginLeft:5, color:"rgb(5, 58, 102)"}]}>Sign In</Text>
                       </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    // flex: 1,
    // width: "100%",
    // height: "100%",
   },
   topic:{
       fontWeight: 'bold',
       fontSize: 30,
       color: "rgb(5, 58, 102)",
       marginBottom: 15,
   },
    subCon: {
       flexDirection:"column",
       justifyContent:"center",
       alignItems:"center",
       width: "100%",
       height: "100%",
    },
   input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
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
        fontSize: 17,
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

export default SignIn;
