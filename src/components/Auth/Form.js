import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import SignUp from './SignUp'
import ConfirmSignUp from './ConfirmSignUp'
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordSubmit from './ForgotPasswordSubmit'
import { useDispatch, useSelector } from 'react-redux'



const Form = () => {

    const dispatch = useDispatch()
    const formType = useSelector(state => state.form.formType)

    const [ showKeyboard, setShowKeyboard ] = useState(false)

    const subscribe = () => {
        Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true))
        Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false))
    }

    const unsubscribe = () => {
        Keyboard.removeListener('keyboardDidShow')
        Keyboard.removeListener('keyboardDidHide')
    }
    

    useEffect(() => {
         subscribe()
         return () => unsubscribe()
    }, [])


    const renderForm = () => {
        switch (formType) {
            case 'signUp':
                return (
                    <SignUp />
                )
            case 'confirmSignUp':
                return (
                    <ConfirmSignUp />
                )
            case 'signIn':
                return (
                    <SignIn />
                )
            case 'forgotPassword':
                return (
                    <ForgotPassword />
                )
            case 'forgotPasswordSubmit':
                return (
                    <ForgotPasswordSubmit />
                )
            default:
                return null
        }
    }

    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            {showKeyboard ?  null :
            <View style={styles.headerContainer}>
                <Text>LOGO</Text>
            </View>}

            {renderForm()}


            {/* {
                formType === 'signUp' && (
                    <View>
                        <Text>Already have an account?</Text>
                        <TouchableWithoutFeedback onPress={() => dispatch({ type: "SIGNIN" })}>
                            <Text>Sign In</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )
            }
            {
                formType === 'signIn' && (
                    <View>
                        <Text>Need an account?</Text>
                        <TouchableWithoutFeedback onPress={() => dispatch({ type: "SIGNUP" })}>
                            <Text style={styles.anchor}>Sign Up</Text>
                        </TouchableWithoutFeedback>
                        <Text>Forgot your password?</Text>
                        <TouchableWithoutFeedback onPress={() => dispatch({ type: "FORGOT_PASSWORD" })}>
                            <Text tyle={styles.anchor}>Reset Password</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )
            } */}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center'
    },
    headerContainer: {
        alignItems: 'center',
    },
    headerTitleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'blue'
    },
    headerSubtitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue'
    },
    logo: {

    }
})



export default Form