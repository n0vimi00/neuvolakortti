import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


export default function AddButton() {
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.AddButton} onPress={() => navigation.navigate('NewCow')}>        
            <Text style={styles.plus}>+ </Text>
            <Text style={styles.text}>Lisää uusi</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    AddButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        color: '#2e2e2e'
    },  
    text: {
        color: '#2e2e2e',
    },
    plus: {
        color: '#2e2e2e',
        fontWeight: 'bold',
    }
})