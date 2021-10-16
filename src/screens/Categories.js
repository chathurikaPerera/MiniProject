import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import channel from '../assets/channel.png';
import kidney from '../assets/kidney.png';
import heart from '../assets/heart.png';
import surgon from '../assets/surgon.png';
import stomach from '../assets/stomach.png';
import news from '../assets/new.png';
import ray from '../assets/ray.png';
import bladder from '../assets/bladder.png';
import firestore from '@react-native-firebase/firestore';

const DATA = [
  {
    id: "1",
    title: "Phycology",
    image: channel,
  },
  {
    id: "2",
    title: "Cardiologist",
    image: heart,
  },
  {
    id: "3",
    title: "Urologist",
    image: bladder,
  },
  {
    id: "4",
    title: "Surgeon",
    image: surgon,
  },
  {
    id: "5",
    title: "Nephrologist",
    image: kidney,
  },
  {
    id: "6",
    title: "Endocrinologists",
    image: news,
  },
  {
    id: "7",
    title: "Radiologist",
    image: ray,
  },
  {
    id: "8",
    title: "Gastroenterologist",
    image: stomach,
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View style={[styles.card]}>
      <Image source={item.image} style={{ width: 50, height: 50, margin: 5 }}/>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </View>  
  </TouchableOpacity>
);

const Categories = ({navigation}) => {
  
    const [selectedId, setSelectedId] = useState(null);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const routesx = (id, name) => {
      setSelectedId(id);
      navigation.navigate(name);
    }
    //const categories = await firestore().collection("categories");
    //#f9c2ff () => setSelectedId(item.id)
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "rgb(13, 121, 148)" : "white";
      const color = item.id === selectedId ? 'white' : 'rgb(13, 121, 148)';
      return (
      <Item
        item={item}
        onPress={() => navigation.navigate("Doctors",{otherParam: item.title})}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );}

    // if (loading) {
    //   return <ActivityIndicator />;
    // }
    
    return (
        <View style={[styles.container]}>
            <View style={[ { flex: 1, backgroundColor: "white", width: "100%", justifyContent: "center", alignItems: "center"}]}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                vertical
                numColumns ={2}/>
              {/* <FlatList
                data={category}
                numColumns ={2}
                vertical
                renderItem={({ item }) => (
                  // <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  //   <Text>User ID: {item.id}</Text>
                  //   <Text>User Name: {item.name}</Text>
                  // </View>
                  <TouchableOpacity style={[styles.item]}>
                    <View style={[styles.card]}>
                      <Image source={channel} style={{ width: 50, height: 50, margin: 5 }}/>
                      <Text style={[styles.title]}>{item.name}</Text>
                    </View>  
                  </TouchableOpacity>
                )}
              /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "pink",
    },
    item: {
    width: "42%",
    height: 150,
    padding: 0,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: "rgb(13, 121, 148)",
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
})

export default Categories;
