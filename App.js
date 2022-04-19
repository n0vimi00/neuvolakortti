import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Individual from './screens/Individual';
import NewCow from './screens/NewCow';
import AddButton from './components/AddButton';
import Camera from './screens/Camera';

export default function App() {
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

      <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: "Camera",
            headerTitle: "Skannaa korvanumero"
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
