import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import React from "react";
import camera from '../icons/camera.png' ;

const CameraFAB = (props) => {
    return (
        <TouchableOpacity style={styles.container}
            onPress={props.onPress}>
            <Image source={camera} style={styles.FABicon}/>
        </TouchableOpacity>
    );
};
  
export default CameraFAB;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40,
        position: "absolute",
        bottom: 15,
        right: 20,
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
        width: 35,
        height: 30, 
    }
});