import React from "react";
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { Auth } from 'aws-amplify'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from './styles'

const ConfirmSignUp = () => {

  const dispatch = useDispatch()
  const formState = useSelector(state => state.form.formState)

  const confirmSignUp = async () => {
    const { username, confirmationCode } = formState
    try {
      await Auth.confirmSignUp(username, confirmationCode)
      dispatch({ type: "SIGNIN" })
    } catch (err) {
      console.log('error signing up..', err);
    }
  }

  return (
    <View style={globalStyles.container}>

      <View style={globalStyles.inputContainer}>
        <FontAwesome style={globalStyles.inputIcon} name='lock' size={30} color='black' />
        <TextInput
          style={globalStyles.inputText}
          onChangeText={(text) => {
            dispatch({ type: "SET_CONFIRMATION_CODE", payload: text })
          }}
          value={formState.confirmationCode}
          placeholder="Enter confirmation code"
        />
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={confirmSignUp}>
        <Text style={globalStyles.buttonText}>VERIFY</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ConfirmSignUp;
