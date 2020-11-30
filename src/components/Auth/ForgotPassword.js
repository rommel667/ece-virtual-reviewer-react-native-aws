import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from './styles'

const ForgotPassword = () => {

  const dispatch = useDispatch()
  const formState = useSelector(state => state.form.formState)


  const forgotPassword = async () => {
    const { username } = formState
    try {
      await Auth.forgotPassword(username)
      dispatch({ type: "FORGOT_PASSWORD_SUBMIT" })
    } catch (err) {
      console.log('error submitting username to reset password...', err);
    }
  }

  return (
    <View style={globalStyles.container}>

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

      <TouchableOpacity style={globalStyles.button} onPress={forgotPassword}>
        <Text style={globalStyles.buttonText}>RESET PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.haveAccountContainer} onPress={() => dispatch({ type: "SIGNIN" })}>
        <Text style={styles.haveAccountTextPress}>Back to Sign in</Text>
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
  haveAccountTextPress: {
    color: 'blue',
    marginLeft: 5,
    textDecorationLine: "underline"
  }
})

export default ForgotPassword;
