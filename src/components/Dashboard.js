import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import { getUsers, removeUser } from '../Api/api';
import { addEventListener, removeEventListener } from './eventEmitter';

export const Dashboard = ({navigation, route}) => {

  const isDarkMode = useColorScheme() === 'dark';
  const [newData, setNewData] = useState([])

  useEffect(() => {
    fetchUsers()
    const refreshUsersListener = () => {
      fetchUsers();
    };
    addEventListener('refreshUsers', refreshUsersListener);

    return () => {
      removeEventListener('refreshUsers', refreshUsersListener);
    };
  }, [])

  const fetchUsers = () => {
    getUsers().then((responseJson) => {
      console.log(responseJson)
      setNewData(responseJson)
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const handleEdit = (item) => {
   const params = {
    item : item,
   }
   navigation.navigate('AddEditUser', params)
  }

  const handleDelete = (id) => {
      Alert.alert('Delete', 'Are you sure, you want to delete this record?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteUser(id)},
      ]);
  }

  const deleteUser = (id) => {
    removeUser(id).then((responseJson) => {
      console.log("delete response", responseJson)
      ToastAndroid.show("User Deleted Successfully", ToastAndroid.SHORT)
      setNewData([])
      fetchUsers()
    }).catch(err => {
      console.log("delete error", err)
    })
  }
  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{padding: 10, backgroundColor: "white", borderColor: '#03254c', borderWidth:1, margin: 10}} onPress={() => 
       handleEdit(item)}>
        <TouchableOpacity onPress={() => 
       handleDelete(item['id'])}>
      <Image
       style={{ width: 20, height: 20, borderRadius: 50, position:"absolute", top: 10, right:10 }}
       source={ require('../Assets/Images/delete.png')}
       onError={(error) => console.error('Image error:', error)}
      />
      </TouchableOpacity>
       <View style={{flexDirection:"row", alignItems:"center"}}>
       <View style={{width: "30%"}}>
       <Image
       style={{ width: 100, height: 100, borderRadius: 50 }}
       source={item['photo'] !== '' ? { uri: `${item['photo']}` } : require('../Assets/Images/Logo.png')}
       onError={(error) => console.error('Image error:', error)}
      />
        </View> 
        <View> 
      <Text style={{color:'black'}}> Name: {item['First Name']} {item['Last Name']}</Text>
      <Text style={{color:'black'}}> Date of Birth: {item['Date of Birth']}</Text>
      <Text style={{color:'black'}}> Marital Status: {item['married'] ? 'Married' : 'Unmarried'}</Text>
      </View>
      </View>
      
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <TouchableOpacity style={{backgroundColor:"#03254c", width:"22%", height: 35, alignSelf:"flex-end", margin: 10, justifyContent:"center", borderRadius: 15}} onPress={() => navigation.navigate('AddEditUser')}> 
          <Text style={{fontSize: 16, alignSelf:"center", fontWeight:"600"}}> Add </Text> 
          </TouchableOpacity>
          {newData.length > 0 &&
        <FlatList data={newData} renderItem={renderItem} keyExtractor={item => item.id}/>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
