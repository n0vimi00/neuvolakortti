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
      backgroundColor: '#e8ede9',
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
    },
    overviewImage: {
        width: 90,
        height: 90,
        marginRight: 10,
        backgroundColor: '#edf2ee',
        borderRadius: 45,
        alignSelf: 'center',
        //borderWidth: 4,
       // borderColor: '#a6baaa' 
       // borderColor: '#e8ede9' 
    },
    overview: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#e8ede9',
        borderRadius: 20,
        shadowColor: 'black',
        elevation: 10,
        marginVertical: 10
    },
    overviewText: {
        color: 'black',
        fontSize: 14,
    }
})

export default styles;