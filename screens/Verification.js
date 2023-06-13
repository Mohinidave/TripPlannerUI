import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Verification = ({ navigation, route }) => {
    const { userdata } = route.params;

    const [usercode, setusercode] = useState("XXXX");
    const [errormsg, setErrormsg] = useState(null);
    const [actualcode,setactualcode]=useState(null)
    const OTPimage = require("../assets/ResetPassword.png")
     
    useEffect(() => {
    setactualcode(userdata[0]?.VerificationCode)
    }, [])

    const handleSubmit = () => {
        // console.log(actualcode)
        // console.log(usercode)
        if(usercode=="XXXX" || usercode==""){
            setErrormsg("Please Enter 6-digit code which sent to your email ")
        }
        else if(usercode==actualcode){
          const fdata={
            email:userdata[0]?.email,
            password:userdata[0]?.password,
            name:userdata[0]?.name,
            city:userdata[0]?.city
          }
          fetch('http://10.0.2.2:3000/signup',{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(fdata)
        })
        .then(res=>res.json()).then(
          data=>{
            console.log(data);
            if(data.message==="User Registered Successfully"){
            alert(data.message)
            navigation.navigate("PreferencePage")
            }
            
          }
         )
        }
        else if(usercode!=actualcode){
            setErrormsg("Enter correct code")
        }
      };


    return (
        <View style={styles.container}>
        <Image source={OTPimage} style={styles.image} />
      <Text style={styles.heading}>Enter the Code</Text>
      <Text style={styles.subtitle}>We've sent a 6-digit code to your email. Please enter it below.</Text>
      <TextInput
        value={usercode}
        onChangeText={(text)=>setusercode(text)}
        style={styles.input}
        placeholder="Enter 6-digit code"
        placeholderTextColor="#8F8F8F"
        keyboardType="numeric"
        maxLength={6}
        onPressIn={() => setErrormsg(null)}
      />
      {
        errormsg ? <Text style={styles.err}>{errormsg}</Text> : null
      }
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button]}
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
      err: {
        fontSize: 15,
        color: '#007bff',
        paddingBottom: 40,
      }
});

export default Verification;
