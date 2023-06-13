import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const forgetimage = require("../assets/ResetPassword.png")

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const navigation = useNavigation();
 const fdata={
  email:email
 }
  const handleSendCode = () => {
    if(email=="" || handleEmailChange(email)){
      setErrormsg("Please Enter valid Email")
    }
    else{
      fetch('http://10.0.2.2:3000/passwordemailverify',{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(fdata)
        })
        .then(res=>res.json()).then(
          data=>{
            console.log(data);
            if(data.error==="Invalid Credentials"){
              setErrormsg("Invalid Credential")
            }
            else if(data.message==="Verification Code Sent to your Email"){
              alert(data.message);
              navigation.navigate('OTPpage',{userdata :data.udata})
            }
          }
         )
      }
     };

  const handleEmailChange = (value) => {
    setEmail(value);
    // Check if the entered email is valid
    setValidEmail(/^\S+@\S+\.\S+$/.test(value));
  };

  return (
    <View style={styles.container}>
      <Image source = {forgetimage} style = {styles.image}/>
      <Text style={styles.heading}>Reset Your Password</Text>
      <Text style={styles.subtitle}>Enter your email address and we'll send you a code to reset your password.</Text>
      <TextInput
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#8F8F8F"
      />
      <TouchableOpacity onPress={handleSendCode} style={[styles.button, !validEmail && styles.disabledButton]} disabled={!validEmail}>
      {
        errormsg ? <Text style={styles.err}>{errormsg}</Text> : null
      }
        <Text style={styles.buttonText}>Send Code</Text>
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

export default ForgetPasswordPage;
