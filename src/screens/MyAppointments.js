import React, { useState,useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import doc from '../assets/doc.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const MyAppointments = ({navigation,route}) => {

    const [selectedId, setSelectedId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    getCategories();
    }, [])

    const getCategories = () => {
    auth().onAuthStateChanged((user) => {
        if(user != null){
          const result = firestore()
            .collection('appointments')
            .where('id', "==", user.uid).get()
            .then(querySnapshot => {
            const users = [];

            querySnapshot.forEach(documentSnapshot => {
                users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
      });
      setDoctors(users);
      setLoading(false);
      
    });
        }
    })

  }

  const deteleItem = (id) => {
    firestore()
      .collection("appointments")
      .doc(id)
      .delete()
      .then(() => getCategories())
  }

    if (loading) {
      return <ActivityIndicator size="large" style={[styles.load]}/>;
    }
    
    return (
        <View style={[styles.container]}>
            <View style={[ { flex: 1, width: "100%", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 15}]}>
                <FlatList
                  data={doctors}
                  style={[{width: "100%"}]}
                  renderItem={({ item }) => (
                  <View style={[styles.item]}>
                    <View style={[styles.card]}>
                      <View style={[{justifyContent:"flex-start", flexDirection:"row", alignItems:"center",marginBottom:10}]}>
                        <Text style={{ color: "rgb(5, 58, 102)", fontSize:18, fontWeight:"bold" }}>Patient :</Text>
                        <Text style={[styles.title]}>{item.name}</Text>
                      </View>
                      <View style={[{justifyContent:"flex-start", flexDirection:"row", alignItems:"center", marginBottom:10}]}>
                        <Text style={{ color: "rgb(5, 58, 102)", fontSize:18, fontWeight:"bold" }}>Doctor Name :</Text>
                        <Text style={[styles.title]}>{item.doctor}</Text>
                      </View>   
                      <View style={[{justifyContent:"flex-start", flexDirection:"row", alignItems:"center", marginBottom:10}]}>
                        <Text style={{ color: "rgb(5, 58, 102)", fontSize:18, fontWeight:"bold" }}>Date :</Text>
                        <Text style={[styles.title]}>{item.date}</Text>
                      </View>  
                      <View style={[{justifyContent:"flex-start", flexDirection:"row", alignItems:"center", marginBottom:10}]}>
                        <Text style={{ color: "rgb(5, 58, 102)", fontSize:18, fontWeight:"bold" }}>Time :</Text>
                        <Text style={[styles.title]}>{item.time}</Text>
                      </View>
                      <View style={[{justifyContent:"flex-start", flexDirection:"row", alignItems:"center", marginBottom:10}]}>
                        <TouchableOpacity
                          style={styles.delete}
                          onPress={()=>deteleItem(item.key)}>
                          <Text style={[{color: "white", fontSize: 20}]}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.edit}
                          onPress={()=>navigation.navigate("Edit Appointments", {ename: item.name, edr:item.doctor, edate:item.date, emobile:item.mobile, etime:item.time, key:item.key})}>
                          <Text style={[{color: "white", fontSize: 20}]}>Edit</Text>
                        </TouchableOpacity>
                      </View>

                    </View> 
                  </View>
                )}
              />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  delete: {
       width: "40%",
       height: 50,
       backgroundColor: "rgb(175, 10, 10)",
       alignItems: "center",
       justifyContent: "center",
       borderRadius: 10,
       marginTop: 20,
   },
   edit: {
       width: "40%",
       height: 50,
       backgroundColor: "rgb(5, 58, 102)",
       alignItems: "center",
       justifyContent: "center",
       borderRadius: 10,
       marginTop: 20,
       marginLeft:15,
   },
    load:{
      marginTop: 40,
    },
    container: {
      flex: 1,
      backgroundColor: "white"
    },
    item: {
      width:"90%",
      height: 250,
      padding: 0,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      backgroundColor:"white",
      shadowRadius: 2,  
      elevation: 9,
    },
    title: {
      fontSize: 18,
      marginLeft:10
    },
    card: {
      margin:20,
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
    },
})

export default MyAppointments;
