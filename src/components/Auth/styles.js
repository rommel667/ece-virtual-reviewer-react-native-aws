import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 3,
        width: '90%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10
      },
      headerContainer: {
        alignItems: 'center',
        marginBottom: 20
      },
      headerText: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      inputContainer: {
        borderWidth: 2,
        
        borderRadius: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 10
      },
      inputIcon: {
        marginRight: 10,
      },
      inputText: {
        color: 'black',
        fontWeight: '500',
        flex: 1
      },
      button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 10
      },
      buttonText: {
        color: 'white'
      },
})


export default globalStyles