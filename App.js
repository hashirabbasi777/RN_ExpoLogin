import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState,useEffect,  } from "react";

import {firebase} from "./config";


import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header  from "./components/Header";


const Stack = createStackNavigator();

function App() {
  const [initilaizing,setIntilazing] = useState(true)
  const [ user , setUser] = useState();



  //handled user State Changed 

  function onAuthStateChanged(user){
    setUser(user);
    if(initilaizing) setIntilazing(false)
  }
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    if(initilaizing) return null; 

    if(!user){
        return(
          <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: () => <Header name="Fusion Logics" />,
              headerStyle:{
                height:150,
                borderBottomLeftRadius:50,
                backgroundColor:'skyblue',
                shadowColor:'white',
                elevation:25
              }
            }}
             />

          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerTitle: () => <Header name="Registration" />,
              headerStyle:{
                height:150,
                borderBottomLeftRadius:50,
                backgroundColor:'skyblue',
                shadowColor:'white',
                elevation:25
              }
            }}
             />
          </Stack.Navigator>
        );
    }
  

  return (
     <Stack.Navigator>
      <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => <Header name="Dashboard" />,
              headerStyle:{
                height:150,
                borderBottomLeftRadius:50,
                backgroundColor:'skyblue',
                shadowColor:'white',
                elevation:25
              }
            }}
             />
     </Stack.Navigator>
  );


}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
