import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { db, ROOT_REF } from '../firebase/Config';
import { ref, update } from "firebase/database";
import Radiobutton from '../components/Radiobutton';
import styles from '../style';
import MicFAB from '../components/MicFAB';
import trashRed from '../icons/trash-red.png';
import Voice from '@react-native-community/voice'


export default function Individual({ navigation, route }) {
    const [currentCow, setCurrentCow] = useState([]);
    const [index, setIndex] = useState(null);
    const [cowName, setCowName] = useState('');
    const [temperature, setTemperature] = useState('');

    const [voiceText, setVoiceText] = useState('');

    const commands = [
        {
            command: "nimi",
        },
        {
            command: "ruumiinlämpö",
        },
        {
            command: "tallenna",
        },
        {
            command: "poista",
        },
        {
            command: "takaisin",
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
            console.log('Individual is active')
        });

        return activateMic;
    }, [navigation]);


    const onSpeechStartHandler = (e) => {
        console.log("start handler individual==>>>", e)
    }

    const onSpeechRecognizedHandler = (e) => {
        console.log("Recognizer individual==>>>", e)
    }

    const onSpeechEndHandler = (e) => {
        console.log("stop handler", e)
        Voice.start('fi-FI')
    }

    const onSpeechPartialResultsHandler = (e) => {
        setVoiceText((e.value[0]).toLocaleLowerCase())
        commands.forEach((item) => {
            if ((e.value[0]).includes(item.command)) {
                if (item.command == "nimi") {
                    setCowName((e.value[0]).replace(item.command, " ").trim())
                } if (item.command == "ruumiinlämpö") {
                    setTemperature((e.value[0]).replace(item.command, " ").trim())
                } if (item.command == "tallenna") {
                    saveChanges() /* not working yet */
                } if (item.command == "poista") {
                    removeThisCow() /* not working yet */
                    console.log('poista')
                } if (item.command == "takaisin") {
                    navigation.navigate('Home')
                    console.log('takaisin')
                }
            }
            console.log(voiceText)
        });
    }

    const onSpeechResultsHandler = (e) => {
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

    const [inProgress, setInProgress] = useState(true);

    // const [trembling, setTrembling] = useState(null);
    // const tremblingOptions = [
    //     {label: 'Yes', value: true},
    //     {label: 'No', value: false}
    //   ]; //Need to find a way to not have to repeat the options on every screen

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

    function saveChanges() {
        // Json parse used to prevent sending undefined values to database (undefined is not allowed)
        let saveData = JSON.parse(JSON.stringify({
            name: cowName,
            temperature: temperature,
        }))

        update(ref(db, ROOT_REF + index), saveData)
            .then(() => {
                navigation.navigate('Home'); // Data saved successfully!
            })
            .catch((error) => {
                alert(error)   // The write failed...
            });

    }

    useEffect(() => {
        if (!inProgress) {
            navigation.navigate('Home');
        }
    }, [inProgress])

    // asking for confirmation first before removing calf
    const confirmBeforeRemove = () => Alert.alert(
        "Tietojen poistaminen", "Oletko varma, että haluat poistaa vasikan #" + index + " tietokannasta?",
        [
            {
                text: "Ei, älä poista.",
                onPress: () => console.log('Cancel pressed'),
            },
            {
                text: "Kyllä, poista.", onPress: () => removeThisCow()
            }
        ],
        { cancelable: false }
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
                <TouchableOpacity onPress={() => confirmBeforeRemove()} style={{ flexDirection: 'row', justifyContent: 'flex-end', position: "absolute", right: 20, }}>
                    <Image source={trashRed} style={{ height: 20, width: 20 }} />
                    <Text style={{ marginLeft: 5, fontSize: 15, color: '#8c0010' }} >Poista vasikka</Text>
                </TouchableOpacity>


            </View>

            <ScrollView style={styles.formArea}>
                <Text style={styles.textInputLabel}>Nimi</Text>
                <TextInput style={styles.textInput} placeholderTextColor='#a3a3a3'
                    placeholder='Vasikan nimi (valinnainen)'
                    value={cowName} onChangeText={setCowName} />

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
            <MicFAB title="microphone-on" onPress={startRecording} />

        </View>
    )
}

