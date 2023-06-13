import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const WelcomeScreen = () => {
  const logo = require('../assets/LOGO.png');
  const image = require('../assets/Earth.png'); 
  const navigation = useNavigation();

  const handleLetsGoPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>DISCOVER THE WORLD WITH US</Text>
        <Image source={image} style={styles.middleImage} />
        <TouchableWithoutFeedback onPress={handleLetsGoPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#014462', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  logo: {
    height: 90,
    width: 300,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  middleImage: {
    height: 300, 
    width: 300, 
    resizeMode: 'contain',
    marginBottom: 70, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80, 
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

export default WelcomeScreen;