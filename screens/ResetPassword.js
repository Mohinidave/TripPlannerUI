import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ForgetPasswordPage from './ForgetPassword';
const resetjpg = require('../assets/ResetPassword.png'); 
const showIcon = require('../assets/view.png');
const hideIcon = require('../assets/blind.png');


const ResetPassword = ({navigation,route}) => {
  // const navigation=useNavigation();
  // const route=useRoute();
  const userdata=route.params
  console.log(userdata[0]?.email)
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errormsg, setErrormsg] = useState(null);
  
  const handleReset = () => {
    // Send a request to the server to reset the user's password
    // 
    const fdata={
      email:userdata[0]?.email,
      password:newPassword
    }
    console.log(fdata)
     if(newPassword!==confirmNewPassword){
     setErrormsg("Both password are not matching");
     return;
    }
    fetch('http://10.0.2.2:3000/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fdata}),
    })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      navigation.navigate('Login');
      })
      
   };

  return (
    <View style={styles.container}>

      <Image source={resetjpg} style={styles.resetjpg} />

      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true}
      />
      <TextInput
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true}
      />
      {
        errormsg ? <Text style={styles.err}>{errormsg}</Text> : null
      }
      <TouchableOpacity onPress={handleReset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  resetjpg:{
    width: 100,
    height: 100,
 
  },
  heading: {
    fontSize: 25,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ResetPassword;

