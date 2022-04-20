import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import React from "react";
import microphoneOn from '../icons/microphone-on.png';
import microphoneOff from '../icons/microphone-off.png';

  
const MicFAB = (props) => {
    if (props.title == 'microphone-on')  {
        return (
            <TouchableOpacity style={styles.container}
            onPress={props.onPress}>
            <Image style={styles.FABicon} source={microphoneOn}/>
            </TouchableOpacity>
        )
    } else if (props.title == 'microphone-off') {
        return (
            <TouchableOpacity style={styles.container}
            onPress={props.onPress}>
            <Image style={styles.FABicon} source={microphoneOff}/>
            </TouchableOpacity>
        )
    }
 /*    return (
        <TouchableOpacity style={styles.container}
            onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    ); */
};
  
export default MicFAB;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        position: "absolute",
        bottom: 15,
        left: 20,
        backgroundColor: "#02ab56",
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: 'black',
        elevation: 5,
        height: 75,
        width: 75
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    FABicon: {
        width: 20,
        height: 40,
        
    }
});