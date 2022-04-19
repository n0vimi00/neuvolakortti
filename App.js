import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Individual from './Individual';
import NewCow from './NewCow';
import AddButton from './AddButton';

export default function App({navigation}) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' 
        screenOptions={{
            headerStyle: {
              backgroundColor: '#02ab56'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}>
      <Stack.Screen
          name="Home"
          component={Home}
          
          options={{
            title: "Home",
            headerTitle: "Vasikan neuvolakortti",
            headerRight: () => (
             /*  <Button
                onPress={() => navigate('NewCow')}
                title=" + Lisää uusi "
                color="#008746"
                /> */
                <AddButton />
            ),
          }} 
          
        />

      <Stack.Screen
          name="NewCow"
          component={NewCow}
          options={{
            title: "New Cow",
            headerTitle: "Lisää uusi vasikka"
          }} 
        />  

        <Stack.Screen
          name="Individual"
          component={Individual}
          options={{
            title: "Edit cow",
            headerTitle: "Muokkaa vasikan tietoja"
          }} 
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
