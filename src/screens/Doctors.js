import React, { useState,useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import doc from '../assets/doc.png';
import firestore from '@react-native-firebase/firestore';


const Doctors = ({navigation,route}) => {

    const [selectedId, setSelectedId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { otherParam } = route.params;
    useEffect(() => {
    getCategories();
    }, [])

    const getCategories = () => {
    const result = firestore()
      .collection('doctors')
      .where('field', "==", otherParam).get()
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

    if (loading) {
      return <ActivityIndicator size="large" style={[styles.load]}/>;
    }
    
    return (
        <View style={[styles.container]}>
            <View style={[ { flex: 1, width: "100%", justifyContent: "flex-start", alignItems: "flex-start", marginTop: 15}]}>
                <FlatList
                  data={doctors}
                  style={[{width: "100%"}]}
                  // numColumns ={2}
                  // vertical
                  renderItem={({ item }) => (
                  // <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  //   <Text>User ID: {item.id}</Text>
                  //   <Text>User Name: {item.name}</Text>
                  // </View>
                  <TouchableOpacity style={[styles.item]} onPress={() => navigation.navigate("Appointment",{data: item.name},)}>
                    <View style={[styles.card]}>
                      <Image source={doc} style={{ width: 50, height: 50, margin: 5 }}/>
                      <Text style={[styles.title]}>{item.name}</Text>
                    </View>  
                  </TouchableOpacity>
                )}
              />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    load:{
      marginTop: 40,
    },
    container: {
      flex: 1,
      backgroundColor: "white"
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5,
    },
    title: {
      fontSize: 20,
    },
    card: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
})

export default Doctors;
