import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { ref, update } from "firebase/database";
import Radiobutton from '../components/Radiobutton';
import styles from '../style';
import LeftFAB from '../components/LeftFAB';

export default function Individual({navigation, route}) {
    const [currentCow, setCurrentCow] = useState([]);
    const [index, setIndex] = useState(null);
    const [cowName, setCowName] = useState('');
    const [temperature, setTemperature] = useState('');
    // const [trembling, setTrembling] = useState(null);
    // const tremblingOptions = [
    //     {label: 'Yes', value: true},
    //     {label: 'No', value: false}
    //   ]; //Need to find a way to not have to repeat the options on every screen

    
    const [cowList, setCowList] = useState({});
    useEffect(() => {
            db.ref(ROOT_REF).on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let cows = {...data};
            setCowList(cows);
            })
            if (route.params?.cowNumber) {
                // alert(JSON.stringify(cowList));
                // setIndex(route.params?.cowNumber);
            }
        }, []);
    // When coming from camera screen with scanned code
   /*  useEffect(() => {
        if (route.params?.cowNumber) {
        alert(JSON.stringify(cowList));
        setCowName(cowList[index].cowName);
        setTemperature(cowList[index].temperature);
        }
      }, [route.params?.cowNumber]);
 */
   

    
    function saveChanges() {
        // Json parse used to prevent sending undefined values to database (not allowed)
        let saveData = JSON.parse(JSON.stringify({ name: cowName,
            temperature: temperature,
          }))

        update(ref(db, ROOT_REF + index), saveData)
     /*  update(ref(db, ROOT_REF + index), { // index = cowNumber
            
        name: cowName,
        temperature: temperature,
        // trembling: trembling
      }) */
      .then(navigation.navigate('Home'));
    }
    

    useEffect(() => {
        if (route.params?.cow) {
            setCurrentCow(route.params?.cow);
            setCowName(route.params?.cow.name);
            setTemperature(route.params?.cow.temperature);
            setIndex(route.params?.key);
        }
      }, [route.params?.cow]);


      function removeThisCow() {
        db.ref(ROOT_REF + index).remove();
        navigation.navigate('Home');
      }

    return (
        <View style={styles.main}>
            <View style={styles.titleRow}>            
                <Text style={styles.header}># {index}</Text>
                <View style={{justifyContent: 'flex-end',position: "absolute", right: 20,}}>
                    <Text style={{fontSize: 15, color: '#8c0010'}} onPress={() => removeThisCow()}>Poista vasikka</Text>
                </View>

                {/* <TouchableOpacity style={styles.grayButton} onPress={() => removeThisCow()}>
                    <Text style={styles.buttonText}>Poista vasikka tietokannasta</Text>
                </TouchableOpacity> */}

            </View>

        <ScrollView style={styles.formArea}>
        <Text style={styles.textInputLabel}>Nimi</Text>
            <TextInput style={styles.textInput} placeholderTextColor='#a3a3a3' 
                placeholder='Vasikan nimi (valinnainen)'
                value={cowName} onChangeText={setCowName}/>

            <Text style={styles.textInputLabel}>Ruumiinlämpö (°C)</Text>
            <TextInput style={styles.textInput} placeholderTextColor='#a3a3a3' 
                placeholder='Temperature of the cow (optional)' value={temperature}
                onChangeText={setTemperature} keyboardType='numeric' />
           
           {/* <Text>Trembling?</Text>
            <Radiobutton options={tremblingOptions} value={trembling}
                onPress={(value) => {setTrembling(value)}} /> */}
            
            
            
            
            {/* <RightFAB title="Camera" onPress={() => navigation.navigate('Camera')} /> */}
        <TouchableOpacity style={styles.customButton} onPress={() => saveChanges()}>
            <Text style={styles.buttonText}>Tallenna muutokset</Text>
        </TouchableOpacity>       
                    
            </ScrollView>     
            
            
            <LeftFAB title="Microphone" onPress={() => alert('Pressed Microphone')} />

        </View>
    )
}

