/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Dashboard} from './src/components/Dashboard';
import {AddEditUser} from './src/components/AddEditUser';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createNativeStackNavigator();


// Function renders custom header
function HeaderLogo() {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent:"center"}}>
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./src/Assets/Images/Logo.png')}
      />
      <Text style={{color: 'white', padding: 5, fontSize: 22}}>Employee Data</Text>
    </View>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator 
       initialRouteName="Dashboard"
       screenOptions={{
          headerStyle: {
            backgroundColor: '#03254c',
          },
          headerTitleAlign:'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          // options={{ headerTitle: () => <HeaderLogo /> }} // Code to render custom header
          options={{ headerTitle: 'Employee Data'}}
        />
        <Stack.Screen
          name="AddEditUser"
          component={AddEditUser}
          options={{ headerTitle: "Add Edit User"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
