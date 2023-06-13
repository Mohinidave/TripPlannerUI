import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const showIcon = require('../assets/view.png');
const hideIcon = require('../assets/blind.png');

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [city, setCity] = useState('');

  const navigation = useNavigation();
  const handleEmailChange = (value) => {
    setEmail(value);
    // Check if the entered email is valid
    setValidEmail(/^\S+@\S+\.\S+$/.test(value));
  };

  const loginGif = require('../assets/Authenticate.gif');
  
  

  const handleSignup = () => {
    console.log(fdata)
    if(fdata.name==""
    ||fdata.email==""
    ||fdata.password== "" 
    || fdata.city=="" 
    || fdata.confirmPassword==""){
      setErrormsg("Fill all the detail")
    }
    else{
      if(fdata.password!=fdata.confirmPassword){
        setErrormsg("Password and Comfirm Password are not matching");
      }
      else{
        fetch('http://10.0.2.2:3000/verify',{
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
              console.log(data.udata);
              alert(data.message);
              navigation.navigate('Verification',{userdata :data.udata})
            }
          }
         )
      }

    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const fdata = {
    name: name,
    email: email,
    password: password,
    city: city,
    confirmPassword: confirmPassword
  }
  const [errormsg, setErrormsg] = useState(null);
  return (


    <View style={styles.container}>

      <Image source={loginGif} style={styles.gif} />
      <Text style={styles.heading}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        onPressIn={() => setErrormsg(null)}
        value={name}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        onPressIn={() => setErrormsg(null)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your City"
        onChangeText={setCity}
        onPressIn={() => setErrormsg(null)}
        value={city}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputpassword}
          placeholder="Password"
          onChangeText={setPassword}
          onPressIn={() => setErrormsg(null)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={togglePasswordVisibility}>
          <Image
            source={showPassword ? hideIcon : showIcon}
            style={styles.passwordVisibilityIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputpassword}
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          onPressIn={() => setErrormsg(null)}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          style={styles.passwordVisibilityButton}
          onPress={toggleConfirmPasswordVisibility}>
          <Image
            source={showConfirmPassword ? hideIcon : showIcon}
            style={styles.passwordVisibilityIcon}
          />
        </TouchableOpacity>
      </View>
      {
        errormsg ? <Text style={styles.err}>{errormsg}</Text> : null
      }
      <TouchableOpacity style={[styles.button ,!validEmail && styles.disabledButton] } onPress={handleSignup} disabled={!validEmail}>
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
  gif: {
    width: 100,
    height: 100,
    marginBottom: -10,
  },
  heading: {
    fontSize: 32,
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.5,
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
  inputpassword: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 20,
    fontSize: 18,
    flex: 1,
  },

  passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  passwordVisibilityButton: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    top: 0,
  },
  passwordVisibilityIcon: {
    width: 20,
    height: 20,
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
  err: {
    fontSize: 15,
    color: '#007bff',
    paddingBottom: 20,
  }
});

export default Register;