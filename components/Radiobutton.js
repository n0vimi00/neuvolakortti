import {Text, View, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';

// Custom radio button for trembling option maybe? If trembling requires yes/no answer
export default function Radiobutton({options, onPress}) {
    const [value, setValue] = useState(null);

    function handlePress(selected) {
        setValue(selected);
        onPress(selected);
    }


    return (
        <>
        {
            options.map((item) => ( 
                <View key={item.value} style={styles.buttonContainer}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Pressable style={styles.circle} onPress={() => handlePress(item.value)}>
                        {value === item.value && <View style={styles.checkedCircle}/> }
                    </Pressable>
                </View>
            ))
        }
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 5
    },
    label: {
        marginRight: 10,
        fontSize: 14,
        paddingLeft: 10
    },
    circle: {
        height: 28,
        width: 28,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
      },
    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 7,
        borderColor: '#dedede',
        borderWidth: 2,
        backgroundColor: '#4791ff'
    },
})