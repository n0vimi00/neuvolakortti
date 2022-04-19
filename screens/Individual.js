import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { ref, update } from "firebase/database";
import Radiobutton from '../components/Radiobutton';
import styles from '../style';

export default function Individual({navigation, route}) {
    const [currentCow, setCurrentCow] = useState([]);
    const [index, setIndex] = useState(null);
    const [cowName, setCowName] = useState(null);
    const [temperature, setTemperature] = useState(null);
    // const [trembling, setTrembling] = useState(null);
    // const tremblingOptions = [
    //     {label: 'Yes', value: true},
    //     {label: 'No', value: false}
    //   ]; //Need to find a way to not have to repeat the options on every screen

    function saveChanges() {
        update(ref(db, ROOT_REF + index), { // index = cowNumber
        name: cowName,
        temperature: temperature,
        // trembling: trembling
      })
      .then(navigation.navigate('Home'));
    }
    


    useEffect(() => {
        if (route.params?.cow) {
           // alert(JSON.stringify(route.params?.cow));
            setCurrentCow(route.params?.cow);
            setCowName(route.params?.cow.name);
            setTemperature(route.params?.cow.temperature);
            setIndex(route.params?.key)
            // setTrembling(route.params?.cow.trembling);
        }
      }, [route.params?.cow]);


      function removeThisCow() {
        db.ref(ROOT_REF + index).remove();
        navigation.navigate('Home');
      }

    return (
        <View style={styles.main}>
            <Text style={styles.header}>Vasikan numero: {index}</Text>

        <ScrollView style={styles.formArea}>
        <Text style={styles.textInputLabel}>Nimi</Text>
            <TextInput style={styles.textInput} placeholderTextColor='#a3a3a3' 
                placeholder='Vasikan nimi (valinnainen)' // placeholder visible if value is null!
                value={cowName} onChangeText={setCowName}/>

            <Text style={styles.textInputLabel}>Ruumiinlämpö (°C)</Text>
            <TextInput style={styles.textInput} placeholderTextColor='#a3a3a3' 
                placeholder='Temperature of the cow (optional)' value={temperature}
                onChangeText={setTemperature} keyboardType='numeric' />
           
           {/* <Text>Trembling?</Text>
            <Radiobutton options={tremblingOptions} value={trembling}
                onPress={(value) => {setTrembling(value)}} /> */}
            
            <TouchableOpacity style={styles.customButton} onPress={() => saveChanges()}>
                <Text style={styles.buttonText}>Tallenna muutokset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.grayButton} onPress={() => removeThisCow()}>
                <Text style={styles.buttonText}>Poista vasikka tietokannasta</Text>
            </TouchableOpacity>
            {/* <Button title="Save & Return" onPress={() => saveChanges()}/> */}
            {/* <Button title="Save & Return" onPress={() => navigation.navigate('Home')}/> */}
            {/* <Button title ="Remove this cow from database" onPress={() => removeThisCow()} /> */}
            
            </ScrollView>
        </View>
    )
}

