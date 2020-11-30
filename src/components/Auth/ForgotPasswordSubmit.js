import React from "react";
import { TextInput, Button, View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { Auth } from 'aws-amplify'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from './styles'

const ForgotPasswordSubmit = () => {

  const dispatch = useDispatch()
  const formState = useSelector(state => state.form.formState)

  const forgotPasswordSubmit = async () => {
    const { username, confirmationCode, password } = formState
    try {
        await Auth.forgotPasswordSubmit(username, confirmationCode, password)
        dispatch({ type: "SIGNIN" })
    } catch (err) {
        console.log('error updating password...:', err);
    }
}

  return (
    <View>

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

      <View style={globalStyles.inputContainer}>
        <FontAwesome style={globalStyles.inputIcon} name='lock' size={30} color='black' />
        <TextInput
          style={globalStyles.inputText}
          secureTextEntry={true}
          onChangeText={(text) => {
            dispatch({ type: "SET_PASSWORD", payload: text })
          }}
          value={formState.password}
          placeholder="New Password"
        />
      </View>

      <TouchableOpacity style={globalStyles.button} onPress={forgotPasswordSubmit}>
        <Text style={globalStyles.buttonText}>SAVE NEW PASSWORD</Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default ForgotPasswordSubmit;
