import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    main: {
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flex: 1
      },
      row: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    rowText: {
      
    },
    header: {
        fontSize: 20,
    },
    subHeader: {
      fontSize: 15,
    },
    contentContainer: {
      marginBottom: 100,
      padding: 10,
      backgroundColor: '#dff0e3',
      borderRadius: 10,
    },
    textInputLabel: {
        color: 'black'
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 2,
        paddingLeft: 20,
        borderRadius: 6,
        marginBottom: 20,
        color: 'black'
    },
    formArea: {
        paddingTop: 20
    },
    customButton: {
        backgroundColor: '#02ab56',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
    },
    grayButton: {
        backgroundColor: 'darkgrey',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },
})

export default styles;