import React, {useState, useEffect} from 'react';
import {Text,View,StyleSheet,Button,TouchableOpacity, TextInput, Alert, ScrollView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { ref, set } from "firebase/database";
import styles from '../style'
import MicFAB from '../components/MicFAB';

export default function Home({navigation, route}) {
  const [cowNumber, setCowNumber] = useState('');
  const [cowName, setCowName] = useState('');
  const [temperature, setTemperature] = useState('');
//   const [trembling, setTrembling] = useState(null);
//   const tremblingOptions = [
//     {label: 'Yes', value: true},
//     {label: 'No', value: false}
//   ];

  const [cowList, setCowList] = useState({});

  useEffect(() => { // get cowkeys from home.js instead of fetching database again here...
    if (route.params?.cowNumber) { 
      // parameter exists if user arrives from camera screen after scanning code
      // otherwise value is empty by default
      setCowNumber(route.params?.cowNumber);
    }
    db.ref(ROOT_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let cows = {...data};
      setCowList(cows);
    })
  }, []);

  /* useEffect(() => {
    if (route.params?.cowNumber) {
      setCowNumber(route.params?.cowNumber);
    }
  }, [route.params?.cowNumber]);
 */
  let cowKeys = Object.keys(cowList);

  function checkCorrectFormat(number) {
    let cowNumber = (number.trim());
    if (cowNumber.length === 4) {
     if (!isNaN(Number(cowNumber))) {
        //alert('This is a 4-digit number');
        return true; // number format is correct (four numbers)
      } else {
        //alert('This field can only contain numbers.');
        return false;
      }
    } else {
      //alert('The cow number must have 4 digits.');
      return false;
    }
  }

  function checkIfExists(number) {
    for (let i = 0; i < cowKeys.length; i++) {
        if (cowKeys[i] == number) {
            return true;
        }
    }
    return false;
  }

  function addNewCow() {
    // first checking that cowNumber is not empty (trim takes out empty spaces)
    if (cowNumber.trim() !== '') {
    // then if number format is incorrect, program is halted
      if (checkCorrectFormat(cowNumber) === false) {
        alert('Tarkista korvanumero. Korvanumeron pituus on 4 ja se saa sisältää ainoastaan numeroita.');
        return;
      }
    // proceeding (cow number format is correct)
    // checking if this cow already exists (to prevent overwriting)
      if (checkIfExists(cowNumber) === true) {
          alert('Tämä vasikka on jo tietokannassa. Jos haluat muokata olemassa olevan vasikan tietoja, etsi ko. vasikka listasta, tai vaihtoehtoisesti skannaa tai sanele korvanumero.');
          return;
      }


    // format is correct, cow number does not exist yet
    // -> will proceed with adding new cow
      set(ref(db, ROOT_REF + cowNumber), { // CowNumber is the index
        number: Number(cowNumber),
        // adding cow number also as a child value because
        // 1. cannot add empty node, so something needs to be included always
        // 2. Not implemented yet: in the node, cow number is stored as a string. because of JSON settings codes
        //    with zeros in front (like 0001) are shown at the end of the list. so this same string is changed to 
        // number and saved as child value to help order values in an ascending order. 
        name: cowName,
        temperature: temperature,
        // trembling: trembling
      })

      // New cow has been added, navigating back to home screen
      navigation.navigate("Home")

    }  else {
      // alert when number field is empty and user tries to add new cow
      alert('Korvanumero on pakollinen tieto.');
    }
  }

 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.main}>
            <Text style={styles.header}>Lisää uusi vasikka tietokantaan</Text>

            <View style={styles.formArea}>
            <Text style={styles.textInputLabel}>Korvanumero *</Text>
            <TextInput style={styles.textInput} maxLength={4} autoFocus={true} 
                placeholder="Nelinumeroinen korvanumero, muotoa '1234'" value={cowNumber}
                placeholderTextColor='#a3a3a3' onChangeText={setCowNumber} keyboardType='numeric' />

            <Text style={styles.textInputLabel}>Nimi</Text>
            <TextInput style={styles.textInput} placeholder='Vasikan nimi (valinnainen)' value={cowName}
               placeholderTextColor='#a3a3a3' onChangeText={setCowName}/>

            <Text style={styles.textInputLabel}>Ruumiinlämpö °C</Text>
            <TextInput style={styles.textInput} placeholder='Vasikan ruumiinlämpö (valinnainen)' 
                value={temperature} placeholderTextColor='#a3a3a3' onChangeText={setTemperature} 
                keyboardType='numeric' />

                
            {/*  <Text>Trembling?</Text>
            <Radiobutton options={tremblingOptions} 
                onPress={(value) => {setTrembling(value)}} /> */}
            <TouchableOpacity style={styles.customButton} onPress={() => addNewCow()}>
                <Text style={styles.buttonText}>Lisää vasikka</Text>
            </TouchableOpacity>
        </View>
    
      {/* no global functionality to toggling microphone yet; useState in App.js? */}
    <MicFAB title="microphone-on" onPress={() => alert('Pressed Microphone')} />
        </View>
    </TouchableWithoutFeedback>
   
  )
}

