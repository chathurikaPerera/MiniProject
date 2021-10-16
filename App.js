import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Welcome from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import Categories from './src/screens/Categories';
import Doctors from './src/screens/Doctors';
import Appointment from './src/screens/Appointment';
import Dental from './src/screens/Dental';
import Pharmacy from './src/screens/Pharmacy';
import Report from './src/screens/Report';
import Exercise from './src/screens/Exercise';
import MyAppointments from './src/screens/MyAppointments';
import EditAppointment from './src/screens/edit/Appointment';
//import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false
        // }}
        initialRouteName={"Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <Stack.Screen name="Categories" component={Categories} options={{ title: 'Categories' }} />
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name ="Appointment" component={Appointment}/>
        <Stack.Screen name ="My Appointments" component={MyAppointments}/>
        <Stack.Screen name ="Edit Appointments" component={EditAppointment}/>
        <Stack.Screen name ="Pharmacy" component={Pharmacy}/>
        <Stack.Screen name ="Dental" component={Dental}/>
        <Stack.Screen name ="Lab Report" component={Report}/>
        <Stack.Screen name ="Exercises" component={Exercise}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
