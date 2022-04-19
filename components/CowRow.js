import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';

// A single row for rendering cow information on the main list
export const CowRow = ({cowNumber, cowName, temperature}) => {

    const onRemove = () => {
        db.ref(ROOT_REF + [cowNumber]).remove();
    }

    return (
       <View style={styles.row}>
            <Text style={styles.rowText}>
            <Text style={{fontWeight: 'bold'}}>{cowNumber} </Text>
            {cowName ? ' ⋯ "' + cowName + '"': null}
            {temperature ? " ⋯ Ruumiinlämpö: " + temperature + "°C" : null}
           {/*  - {cowName} - {temperature} */}  {/* trembling: {trembling ? 'Yes' : 'No'} */} 
           </Text>
        </View>   
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        margin: 3,
        paddingHorizontal: 10,
        paddingBottom: 5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#86a68e'
    },
    rowText: {
      color: 'black'
    },
})
