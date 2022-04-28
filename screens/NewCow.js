import React, {useState, useEffect} from 'react';
import {Text,View,StyleSheet,Button,TouchableOpacity, TextInput, Alert, ScrollView, TouchableWithoutFeedback,Keyboard} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { ref, set } from "firebase/database";
import styles from '../style'
import MicFAB from '../components/MicFAB';
import Voice from '@react-native-community/voice';

export default function NewCow({navigation, route}) {
  const [cowNumber, setCowNumber] = useState('');
  const [cowName, setCowName] = useState('');
  const [temperature, setTemperature] = useState('');

  // const [isActive, setIsActive] = useState('');
  const [voiceText, setVoiceText] = useState('');
  
  const commands = [
    {
      command: "numero",
      // name: "korvanumero",
    },
    {
      command: "nimi",
      // name: "nimi",
    },
    {
      command: "ruumiinlämpö",
      // nimi: "ruumiinlämpö",
    },
    {
      command: "tallenna",
      // nimi: "ruumiinlämpö",
    },
    {
      command: "takaisin",
      // nimi: "ruumiinlämpö",
    },
  ];


  useEffect(() => {
    Voice.destroy().then(Voice.removeAllListeners);
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechPartialResults = onSpeechPartialResultsHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  //  Activates mic when screen is focused
  useEffect(() => {
    const activateMic = navigation.addListener('focus', () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Voice.start('fi-FI')
      console.log('new is active')
    });

    return activateMic;
  }, [navigation]);


  const onSpeechStartHandler = (e) => {
    console.log("start handler new==>>>", e)
  }

  const onSpeechRecognizedHandler = (e) => {
    console.log("Recognizer new==>>>", e)
  }
  
  const onSpeechEndHandler = (e) => {
    console.log("stop handler", e)
    // Voice.start('fi-FI') 
  }

  const onSpeechPartialResultsHandler = (e) => {
    setVoiceText((e.value[0]).toLocaleLowerCase())
    commands.forEach((item) => {
      if ((e.value[0]).includes(item.command)) {
        if (item.command == "numero") {
          setCowNumber((e.value[0]).replace(item.command, " ").trim())
        } if (item.command == "nimi") {
          setCowName((e.value[0]).replace(item.command, " ").trim())
        } if (item.command == "ruumiinlämpö") {
          setTemperature((e.value[0]).replace(item.command, " ").trim())
        } if (item.command == "takaisin") {
          navigation.navigate('Home')
      } if (item.command == "tallenna") {
        addNewCow() /* not working yet */
        console.log('tallenna')
    }
      }
    });
  }

  const onSpeechResultsHandler = (e) => {
    // setVoiceText(e.value[0])
    Voice.start('fi-FI')
    console.log("speech result handler", e)

  }

  const startRecording = async () => {
    try {
      await Voice.start('fi-FI')
    } catch (error) {
      console.log("error", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error", error)
    }
  }


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
    db.ref(ROOT_REF).once('value', querySnapShot => {
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
        } else {
          // Json parse used to prevent sending undefined values to database (undefined is not allowed)
        let saveData = JSON.parse(JSON.stringify({ name: cowName,
            temperature: temperature,
          }))
      /*   if (inProgress) {
            update(ref(db, ROOT_REF + index), saveData);
        } */
        set(ref(db, ROOT_REF + cowNumber), saveData)
        .then(() => {
            navigation.navigate('Home'); // Data saved successfully!
          })
          .catch((error) => {
            alert (error)   // The write failed...
          });
        }
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

        <Text>{voiceText}</Text>
        <TouchableOpacity style={styles.customButton} onPress={stopRecording}>
                <Text style={styles.buttonText}>lopeta</Text>
            </TouchableOpacity>
    
      {/* no global functionality to toggling microphone yet; useState in App.js? */}
    <MicFAB title="microphone-on" onPress={startRecording} />
        </View>
    </TouchableWithoutFeedback>
   
  )
}