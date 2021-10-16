import React, { useState } from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList, Image, ImageBackground} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import dental from '../assets/dental.png';
import pharmacy from '../assets/pharmacy.png';
import channel from '../assets/channel.png';
import appointment from '../assets/appointment.png';
import report from '../assets/report.png';
import exercise from '../assets/exercise.png';
import new2 from '../assets/new2.png';
import auth from '@react-native-firebase/auth';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';


const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Channel",
    image: channel,
    name: "Categories",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e33d72",
    title: "Appointments",
    image: appointment,
    name: "My Appointments",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Dental",
    image: dental,
    name: "Dental",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Pharmacy",
    image: pharmacy,
    name: "Pharmacy",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e45d72",
    title: "Lab Reports",
    image: report,
    name: "Lab Report",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571d5 9d72",
    title: "Exercise",
    image: exercise,
    name: "Exercises",
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

const Home = () => {
  const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState(null);

    const logOut = () => {
      auth()
        .signOut()
        .then(() => navigation.navigate("SignUp"));

    }
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "rgb(5, 58, 102)" : "white";
      const color = item.id === selectedId ? 'white' : 'rgb(5, 58, 102)';
      return (
      <Item
        item={item}
        onPress={() => navigation.navigate(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );

    }
    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
              <ImageBackground source={new2} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.4}}>
                <TouchableOpacity style={[styles.logout]} onPress={logOut}>
                  <FontAwesome
                    style={styles.iconStyle}
                    icon={SolidIcons.powerOff}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            {/* <View style={[styles.subTopicCon]}>
              <Text style={[styles.subTopic]}>Category</Text>
            </View> */}
            {/* <ScrollView style={[styles.ddd]} nestedScrollEnabled={true}>
                <ScrollView style={[styles.zzz]} >
                    
                </ScrollView>
            
            </ScrollView> */}
            <View style={[ { flex: 1, backgroundColor: "white", width: "100%", justifyContent: "center", alignItems: "center"}]}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                vertical
                numColumns ={2}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor: "white",
   },
    header: {
        height: "30%",
        width: "100%",
        // backgroundColor: "gray",
        borderBottomRightRadius: 100,
   },
   scrollcon: {
       backgroundColor: "white",
       marginTop: 20,
       width: "100%",
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
    elevation: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  subTopic: {
    fontSize: 25,
    marginTop: 10,
    marginBottom:10,
    marginLeft:20,
    fontWeight: 'bold',
    color: "rgb(5, 58, 102)",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    flex: 1,
    overflow: "hidden",
    borderBottomRightRadius: 100,
    backgroundColor: "gray",
  },
  subTopicCon: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 70,
    flexDirection: 'row',
  },
  logout:{
    color: "white",
    fontWeight: "bold",
    width:"100%",
    height:"auto",
    flexDirection:"row",
    justifyContent:"flex-end",
  },
  iconStyle: {
    fontSize: 25,
    margin:5,
    color: "rgb(5, 58, 102)",
  },


})

export default Home;

