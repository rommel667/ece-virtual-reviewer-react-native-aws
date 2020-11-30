/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Auth, Hub } from 'aws-amplify'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './redux/store/store';
import AuthScreen from './src/screens/AuthScreen'
import HomeScreen from './src/screens/HomeScreen'

const Stack = createStackNavigator()

const InitialScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (!user) return
      dispatch({ type: "INITIALIZE_USER", payload: user })
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    checkUser();
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signOut") {
        dispatch({ type: "SIGNOUT" })
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name='Home' component={user ? HomeScreen : AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}


const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <InitialScreen />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
