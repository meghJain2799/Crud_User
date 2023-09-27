import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { editUser, postUser } from '../Api/api';
import { emitEvent } from './eventEmitter';

export const AddEditUser = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date and time
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [falsetoggleCheckBox, setFalseToggleCheckBox] = useState(false)
  const [id, setId]= useState()

  useEffect(() => {
    const receivedParams = route.params; // Access the entire params object
    const initialData = receivedParams?.item;
    console.log(initialData)
    if (initialData) {
      setFirstName(initialData['First Name'] || '');
      setLastName(initialData['Last Name'] || '');
      setSelectedDate(initialData['Date of Birth'] || null)
      setImageUri(initialData['photo'])
      setId(initialData['id'])
      if(initialData['married']){
        setToggleCheckBox(true)
        setFalseCheckbox(false)
      }else{
        setToggleCheckBox(false)
        setFalseCheckbox(true)
      }
    }
  }, []); 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const formattedDate = selectedDate ? selectedDate : '';
  const handleConfirm = date => {
    console.log(date.toLocaleDateString('en-CA'))
    setSelectedDate(date.toLocaleDateString('en-CA'));
    hideDatePicker();
  };

  const selectImage = async () => {
    ImagePicker.openPicker({
      width: 250,
      height: 150,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path);
        console.log(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setCheckbox = (newValue) => {
   console.log(newValue)
   setToggleCheckBox(newValue)
   setFalseToggleCheckBox(!newValue)
  }

  const setFalseCheckbox = (newValue) => {
    console.log(newValue)
   setFalseToggleCheckBox(newValue)
   setToggleCheckBox(!newValue)
  }

  const handleSave = () => {
    if(imageUri === ''){
      ToastAndroid.show("Please select Image", ToastAndroid.SHORT)
    }else if(firstName == ''){
      console.log("===========")
      ToastAndroid.show("Please enter first name", ToastAndroid.SHORT)
    }else if (lastName == ''){
      ToastAndroid.show("Please enter last name", ToastAndroid.SHORT)
    } else if (selectedDate == null){
      ToastAndroid.show("Please enter Date of Birth", ToastAndroid.SHORT)
    }else if (!toggleCheckBox && !falsetoggleCheckBox){
      ToastAndroid.show("Please select marital status", ToastAndroid.SHORT)
    }else {
      console.log(toggleCheckBox)
      console.log(falsetoggleCheckBox)
      let newObj = {
          "First Name": firstName,
          "Last Name": lastName,
          "Date of Birth": selectedDate,
          "married": toggleCheckBox ? true : false,
          "photo": imageUri
      }
      if(id){
        editUser(newObj, id).then((responsejson) => {
          console.log("put ==> ",responsejson)
          ToastAndroid.show("User Updated Successfully", ToastAndroid.SHORT)
          emitEvent('refreshUsers');
           navigation.navigate("Dashboard")
        }).catch(error => {
          console.log("put error",error)
        })
      }else{
      postUser(newObj).then((responsejson) => {
        console.log("Post ==> ",responsejson)
        ToastAndroid.show("User Added Successfully", ToastAndroid.SHORT)
        emitEvent('refreshUsers');
        navigation.navigate("Dashboard")
      }).catch(error => {
        console.log("POST error",error)
      })
    }
    }
  };

  
  return (
    <View style={{padding: 20, backgroundColor: "white", borderColor: '#03254c', borderWidth:1, margin: 20}}>
      <View style={{width: "40%", alignSelf:'center', marginBottom: 10}}>
        <Image
          source={imageUri !== '' ? { uri: `${imageUri}` } : require('../Assets/Images/Logo.png')
          }
          style={{ width: 150, height: 150, borderRadius: 100, borderColor: '#03254c', borderWidth:1, }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: -5,
            bottom: -5,
            borderWidth: 1.5,
            borderColor: '#fff',
            borderRadius: 100,
            zIndex: 900
          }}
          onPress={() => {
            selectImage();
          }}>
          <Image
            source={require('../Assets/Images/newCamera.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
     <Text style={{color: '#03254c', marginTop: 10, fontSize:18, fontWeight:"400"}}> First Name</Text> 
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color: 'black',
          marginLeft:5,
          paddingLeft:10
        }}
        onChangeText={text => setFirstName(text)}
        value={firstName}
        placeholder="First Name"
        placeholderTextColor={'gray'}
      />

<Text style={{color: '#03254c', marginTop: 10, fontSize:18, fontWeight:"400"}}> Last Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color: 'black',
          marginLeft:5,
          paddingLeft:10
        }}
        onChangeText={text => setLastName(text)}
        value={lastName}
        placeholder="Last Name"
        placeholderTextColor={'gray'}
      />
      <Text style={{color: '#03254c', marginTop: 10, fontSize:18, fontWeight:"400"}}> Date of Birth</Text>
      <View>
        <TouchableOpacity onPress={showDatePicker}>
        <TextInput
         style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          color: 'black',
          marginLeft:5,
          paddingLeft:10
        }}
          placeholder="Select Date and Time"
          placeholderTextColor={'gray'}
          value={formattedDate}
          editable={false}
        />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <Text style={{color: '#03254c', marginTop: 10, fontSize:18, fontWeight:"400"}}> Marital Status</Text>

      <View style={{flexDirection:'row', justifyContent:"flex-start", alignItems:"center"}}>
      <CheckBox
      tintColors={{true: '#03254c', false:'#03254c'}}
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setCheckbox(newValue)}
  />
  <Text style={{color: '#03254c',  fontSize:18, fontWeight:"400"}}>Married</Text>
  <CheckBox
  tintColors={{true: '#03254c', false:'#03254c'}}
    disabled={false}
    value={falsetoggleCheckBox}
    onValueChange={(newValue) => setFalseCheckbox(newValue)}
  />
  <Text style={{color: '#03254c', fontSize:18, fontWeight:"400"}}>Unmarried</Text>
  </View>
  <TouchableOpacity style={{backgroundColor:"#03254c", width:"25%", height: 40, alignSelf:"center", marginTop: 30, justifyContent:"center", borderRadius: 15}} onPress={() => handleSave()}> 
          <Text style={{fontSize: 18, alignSelf:"center", fontWeight:"600"}}> Save </Text> 
          </TouchableOpacity>
    </View>
  );
};
