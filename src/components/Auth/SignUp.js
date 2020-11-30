import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Text, TouchableOpacity } from 'react-native'
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import globalStyles from './styles'

const SignUp = () => {

  const dispatch = useDispatch()
  const formState = useSelector(state => state.form.formState)

  const signUp = async () => {
    const { username, email, password } = formState
    try {
      await Auth.signUp({ username, password, attributes: { email } })
      dispatch({ type: "CONFIRM_SIGNUP" })
    } catch (err) {
      console.log("error signing up..", err);
    }
  }

  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.headerText}>Create an account...</Text>
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
        <Ionicons style={globalStyles.inputIcon} name='mail' size={30} color='black' />
        <TextInput
          style={globalStyles.inputText}
          onChangeText={(text) => {
            dispatch({ type: "SET_EMAIL", payload: text })
          }}
          value={formState.email}
          placeholder="Email Address"
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

      <TouchableOpacity style={globalStyles.button} onPress={signUp}>
        <Text style={globalStyles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.haveAccountContainer} onPress={() => dispatch({ type: "SIGNIN" })}>
        <Text style={styles.haveAccountText}>Already have an account?</Text>
        <Text style={styles.haveAccountTextPress}>Sign in</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  haveAccountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  haveAccountText: {
    color: 'black'
  },
  haveAccountTextPress: {
    color: 'blue',
    marginLeft: 5,
    textDecorationLine: "underline"
  }
})

export default SignUp;
