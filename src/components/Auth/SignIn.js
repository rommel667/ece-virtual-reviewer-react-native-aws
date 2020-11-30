import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from './styles'


const SignIn = () => {

  const dispatch = useDispatch()
  const formState = useSelector(state => state.form.formState)


  const signIn = async () => {
    const { username, password } = formState
    try {
      const user = await Auth.signIn(username, password)
      if(!user) return 
        dispatch({ type: "LOGIN", payload: user})
    } catch (err) {
      console.log("error signing in..", err);
    }
  }


  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.headerText}>Login with account...</Text>
      </View>

      <View style={globalStyles.inputContainer}>
        <FontAwesome style={globalStyles.inputIcon} name='user' size={30} color='black' />
        <TextInput
          style={globalStyles.inputText}
          onChangeText={(text) => {
            dispatch({ type: "SET_USERNAME", payload: text })
          }}
          value={formState.username}
          placeholder="Username"
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <FontAwesome style={globalStyles.inputIcon} name='lock' size={30} color='black' />
        <TextInput
          style={globalStyles.inputText}
          secureTextEntry={true}
          onChangeText={(text) => {
            dispatch({ type: "SET_PASSWORD", payload: text })
          }}
          value={formState.password}
          placeholder="Password"
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => dispatch({ type: "FORGOT_PASSWORD" })}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>


      <TouchableOpacity style={globalStyles.button} onPress={signIn}>
        <Text style={globalStyles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.noAccountContainer} onPress={() => dispatch({ type: "SIGNUP" })}>
        <Text style={styles.noAccountText}>No account yet?</Text>
        <Text style={styles.noAccountTextPress}>Sign up</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: "underline"
  },
  noAccountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  noAccountText: {
    color: 'black'
  },
  noAccountTextPress: {
    color: 'blue',
    marginLeft: 5,
    textDecorationLine: "underline"
  }
})

export default SignIn;