import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, Image, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { ref, update } from "firebase/database";
import Radiobutton from '../components/Radiobutton';
import styles from '../style';
import MicFAB from '../components/MicFAB';
import trashRed from '../icons/trash-red.png';

export default function Individual({navigation, route}) {
    const [currentCow, setCurrentCow] = useState([]);
    const [index, setIndex] = useState(null);
    const [cowName, setCowName] = useState('');
    const [temperature, setTemperature] = useState('');

    const [inProgress, setInProgress] = useState(true);

    // const [trembling, setTrembling] = useState(null);
    // const tremblingOptions = [
    //     {label: 'Yes', value: true},
    //     {label: 'No', value: false}
    //   ]; //Need to find a way to not have to repeat the options on every screen

    
    /* const [cowList, setCowList] = useState({});
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
        }, []); */
    // When coming from camera screen with scanned code
   /*  useEffect(() => {
        if (route.params?.cowNumber) {
        alert(JSON.stringify(cowList));
        setCowName(cowList[index].cowName);
        setTemperature(cowList[index].temperature);
        }
      }, [route.params?.cowNumber]);
 */
   
    useEffect(() => {
            if (route.params?.cow) {
                setCurrentCow(route.params?.cow);
                setCowName(route.params?.cow.name);
                setTemperature(route.params?.cow.temperature);
                setIndex(route.params?.key);
            } else {
                alert('Virhe. Vasikan tietoja ei voitu noutaa.');
            }
        }, [])
       // }, [route.params?.cow]);
    
    function saveChanges() {
        // Json parse used to prevent sending undefined values to database (undefined is not allowed)
        let saveData = JSON.parse(JSON.stringify({ name: cowName,
            temperature: temperature,
          }))
        if (inProgress) {
            update(ref(db, ROOT_REF + index), saveData);
        }
        
        setInProgress(false);
     /*  update(ref(db, ROOT_REF + index), { // index = cowNumber
            
        name: cowName,
        temperature: temperature,
        // trembling: trembling
      }) */
     // navigation.navigate('Home');
     // return; 
    }
    
    useEffect(() => {
        if (!inProgress) {
            navigation.navigate('Home');
        }
    }, [inProgress])

     // asking for confirmation first before removing calf
  const confirmBeforeRemove = () => Alert.alert(
    "Tietojen poistaminen", "Oletko varma, että haluat poistaa vasikan #"+index+ " tietokannasta?", 
    [
      {
        text: "Ei, älä poista.",
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: "Kyllä, poista.", onPress: () => removeThisCow()
      }
  ],
  {cancelable: false}
  );


      function removeThisCow() {
        db.ref(ROOT_REF + index).remove();
        navigation.navigate('Home');
        return;
      }

    return (
        <View style={styles.main}>
            <View style={styles.titleRow}>            
                <Text style={styles.header}># {index}</Text>
                <TouchableOpacity onPress={() => confirmBeforeRemove()} style={{flexDirection:'row',justifyContent: 'flex-end',position: "absolute", right: 20,}}>
                    <Image source={trashRed} style={{height: 20, width: 20}} />
                    <Text style={{marginLeft: 5,fontSize: 15, color: '#8c0010'}} >Poista vasikka</Text>
                </TouchableOpacity>

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
                placeholder='Vasikan ruumiinlämpö (valinnainen)' value={temperature}
                onChangeText={setTemperature} keyboardType='numeric' />
           
           {/* <Text>Trembling?</Text>
            <Radiobutton options={tremblingOptions} value={trembling}
                onPress={(value) => {setTrembling(value)}} /> */}
            
            
            
            
            {/* <RightFAB title="Camera" onPress={() => navigation.navigate('Camera')} /> */}
        <TouchableOpacity style={styles.customButton} onPress={() => saveChanges()}>
            <Text style={styles.buttonText}>Tallenna muutokset</Text>
        </TouchableOpacity>       
                    
            </ScrollView>     
            
            {/* no global functionality to toggling microphone yet; useState in App.js? */}
            <MicFAB title="microphone-on" onPress={() => alert('Pressed Microphone')} />

        </View>
    )
}

