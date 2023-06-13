import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/signup';
import WelcomePage from './screens/welcome';
import ForgetPassword from './screens/ForgetPassword';
import OTPpage from './screens/OTPpage';
import ResetPassword from './screens/ResetPassword';
import Verification from './screens/Verification';
import PreferencePage from './screens/Preferencepage';

const Stack = createStackNavigator();

function App() {
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/men_with_luggage-removebg.png')}
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">


        <Stack.Screen name="Login" component={Login} options={{ title: '' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: '' }} />
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ title: '' }} />
        <Stack.Screen name="OTPpage" component={OTPpage} options={{ title: ''  }} />
        <Stack.Screen name="Verification" component={Verification} options={{ title: '' , headerShown: false}} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: '' }} />
        <Stack.Screen name="PreferencePage" component={PreferencePage} options={{ title: '',headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default App;
