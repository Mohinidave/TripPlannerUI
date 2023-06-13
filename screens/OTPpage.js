import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPpage = ({navigation,route}) => {
  const {userdata } = route.params;
  const [usercode, setusercode] = useState("XXXX");
  const [errormsg, setErrormsg] = useState(null);
  const [actualcode,setactualcode]=useState(null)
  const OTPimage = require("../assets/ResetPassword.png")
  const email=userdata[0]?.email
  // console.log(email)
  // console.log(userdata)
  // const fdata={
  //   email:userdata[0]?.email
  // }
  
  useEffect(() => {
    setactualcode(userdata[0]?.VerificationCode)
    }, [])
  const handleSubmit = () => {
    // console.log(actualcode) 
    // console.log(usercode)
    if(usercode==actualcode){
      navigation.navigate("ResetPassword",userdata)
    }
     
  };

  return (
    <View style={styles.container}>

      <Image source={OTPimage} style={styles.image} />
      <Text style={styles.heading}>Enter the Code</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to your email. Please enter it below.</Text>
      <TextInput
        value={usercode}
        onChangeText={setusercode}
        style={styles.input}
        placeholder="OTP"
        placeholderTextColor="#8F8F8F"
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, usercode.length < 6 && styles.disabledButton]}
        disabled={usercode.length < 6}
      >
        <Text style={styles.buttonText}>Submit</Text>
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
  image:{
    width:100,
    height:100,
    marginBottom:10
  },
  heading: {
    fontSize: 25,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#8F8F8F',
    textAlign: 'center',
    width:'85%'
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
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OTPpage;
