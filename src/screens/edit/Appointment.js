import React,{useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView, Picker} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import well2 from '../../assets/well2.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Appointment = ({route,navigation}) => {
    const { ename, edr, edate, emobile, etime, key } = route.params
    const [name, setName] = useState(ename);
    const [drname, setDrName] = useState(edr);
    const [date, setDate] = useState(edate);
    const [mobile, setMobile] = useState(emobile)
    const [time, setTime] = useState(etime);
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState("");
    
    const doSignIn = () => {
        if(!name){
            setError("Name required ");
            setValid(false);
            return;
        }else if(!drname){
            setError("Last name");
        }else if(!date){
            setError("Date required ");
            setValid(false);
            return;
        }else if(!time ){
            setError("Time required");
            setValid(false);
            return;
        }

        saveAppointment(name, drname, mobile, date, time); 
    }

    const saveAppointment = (name, dr, mobile, date, time) => {
        //let uid = auth().currentUser.user.uid;
        auth().onAuthStateChanged((user) => {
            if(user != null){
                firestore()
            .collection('appointments')
            .doc(key)
            .set({
                name: name,
                doctor: dr,
                mobile: mobile,
                date: date,
                time: time,
                status: "Pending", 
                id: user.uid,
            }).then(() => {
                
        });

            }
            
        })

    }

    return (
        <ScrollView style={[styles.container]}>
            <ImageBackground source={well2} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.4}}>
                <View style={[styles.subCon]}>
                    {error ? (
                        <View style={styles.errorLabelContainerStyle}>
                            <Text style={styles.errorTextStyle}>{error}</Text>
                        </View>
                    ) : null}
                    <View style={[styles.inputConUp]}>
                        <Text style={[styles.label]}>Name</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]} 
                        value={name}
                        error={isValid} 
                        onChangeText={setName}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Dr Name</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]}
                        editable={false }
                        value={drname} 
                        onChangeText={setDrName}
                        error={isValid}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Mobile</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]} 
                        value={mobile} 
                        onChangeText={setMobile}
                        error={isValid}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Date</Text>
                    </View>
                    <TextInput 
                        style={[styles.input]} 
                        value={date} 
                        onChangeText={setDate}
                        error={isValid}/>
                    <View style={[styles.inputCon]}>
                        <Text style={[styles.label]}>Time</Text>
                    </View>
                    <View style={[styles.picker]}>
                        <Picker
                            selectedValue={time}
                            style={{height:"100%", width: "100%"}}
                            onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
                            <Picker.Item label="7.00 am" value="morning" />
                            <Picker.Item label="4.00 pm" value="evening" />
                        </Picker>
                    </View>
                    {/* <TextInput 
                        style={[styles.input]} 
                        value={time} 
                        onChangeText={setTime}
                        error={isValid}/> */}
                    <View style={[ {width: "80%"}]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={doSignIn}>
                       <Text style={[{color: "white", fontSize: 20}]}>Submit</Text>
                    </TouchableOpacity>
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
       marginBottom: 25,
   },
    subCon: {
       flexDirection:"column",
       justifyContent:"center",
       alignItems:"center",
       width: "100%",
       height: "100%",
    },
   input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "rgb(5, 58, 102)",
    padding: 10,
    width: "80%",
    borderRadius: 7,
    },
    picker:{
        height: 40,
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
    inputConUp: {
      flexDirection: "column",
       justifyContent: "flex-start",
       alignItems:"flex-start",
       height: "auto",
       width: "80%",
       marginTop:20,
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

export default Appointment;
