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
    titleRow: {
        flexDirection: 'row'
    },
    header: {
        fontSize: 20,
    },
    subHeader: {
      fontSize: 15,
    },
    contentContainer: {
      marginBottom: 70,
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
        alignSelf: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: 'black',
        elevation: 2,
    },
    grayButton: {
        backgroundColor: 'darkgrey',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: 'black',
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        marginHorizontal: 4
    }
})

export default styles;