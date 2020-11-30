const initialState = {
    formType: 'signIn',
    formState: {
        username: '',
        password: '',
        email: '',
        confirmationCode: ''
    }
}

const form = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNIN": {
            return {
                ...state,
                formType: 'signIn'
            }
        }
        case "SIGNUP": {
            return {
                ...state,
                formType: 'signUp'
            }
        }
        case "CONFIRM_SIGNUP": {
            return {
                ...state,
                formType: 'confirmSignUp'
            }
        }
        case "FORGOT_PASSWORD": {
            return {
                ...state,
                formType: 'forgotPassword'
            }
        }
        case "FORGOT_PASSWORD_SUBMIT": {
            return {
                ...state,
                formType: 'forgotPasswordSubmit'
            }
        }
        case "SET_USERNAME": {
            return {
                ...state,
                formState: { ...state.formState, username: action.payload }
            }
        }
        case "SET_EMAIL": {
            return {
                ...state,
                formState: { ...state.formState, email: action.payload }
            }
        }
        case "SET_PASSWORD": {
            return {
                ...state,
                formState: { ...state.formState, password: action.payload }
            }
        }
        case "SET_CONFIRMATION_CODE": {
            return {
                ...state,
                formState: { ...state.formState, confirmationCode: action.payload }
            }
        }
        default: {
            return state
        }
    }
}

export default form