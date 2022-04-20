import React, {useState, useEffect} from 'react';
import {Text,View,TouchableOpacity,Alert, ScrollView, Image, TouchableWithoutFeedback,Keyboard,ActivityIndicator} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { CowRow } from '../components/CowRow';
import styles from '../style'
import MicFAB from '../components/MicFAB';
import CameraFAB from '../components/CameraFAB';
import calfHead from '../icons/calfHead.png';

export default function Home({navigation}) {
  const [cowList, setCowList] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(true); 
  const [microphoneOn, setMicrophoneOn] = useState(true);

  useEffect(() => {
    if (loadingStatus) {
      db.ref(ROOT_REF).orderByChild('number').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val(): {};
      let cows = {...data};
      setCowList(cows);
      setLoadingStatus(false);
    });
    }
  }, []);

  let cowKeys = Object.keys(cowList);
  

  // user clicked 'remove all'; asking for confirmation first
  const confirmDeleteAll = () => Alert.alert(
        "Varoitus: tietokannan tyhjentäminen", "Tätä ei voi perua. Oletko varma, että haluat poistaa kaikki vasikat tietokannasta?", 
        [
          {
            text: "Ei, mene takaisin.",
            onPress: () => console.log('Cancel pressed'),
          },
          {
            text: "Kyllä, poista.", onPress: () => removeConfirmed()
          }
      ],
      {cancelable: false}
      );
    
  // remove all cows
  function removeConfirmed() {
      db.ref(ROOT_REF).remove();
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.main}>
      <Text style={styles.subHeader}>Tilanne</Text>
    
    {loadingStatus ? <>
    <Text>Ladataan tietokantaa ...
    <ActivityIndicator style={{alignSelf:'center'}} size="small" color="#6ad49f" /></Text> 
    </> 
    : 
      <>
      {/* CALF LIST */}
    <View style={styles.overview}>
          <Image source={calfHead} style={styles.overviewImage}/>    
          <Text style={styles.overviewText}>Tietokannassa on {cowKeys.length} vasikkaa.</Text>
    </View>
    
    {/* <TouchableOpacity style={styles.grayButton} onPress={() => confirmDeleteAll()}>
        <Text style={styles.buttonText}>Tyhjennä tietokanta</Text>
    </TouchableOpacity> */}

    <Text style={{marginTop: 10, marginBottom: 5, marginLeft: 15, fontSize: 15}}>Kaikki vasikat</Text>



    <ScrollView style={styles.contentContainer}>
      {cowList ? (
        cowKeys.map(key => (
        <TouchableOpacity key={key}
        onPress={() => navigation.navigate('Individual', {cow: cowList[key], key: [key]})}>
          <CowRow 
            cowNumber={key}
            cowName={cowList[key].name}
            temperature={cowList[key].temperature}
            // trembling={cowList[key].trembling}
          />
        </TouchableOpacity>
        ))
      ) : (
        <Text>Tietokanta on tyhjä.</Text>
      )}
    </ScrollView>
      </>
    }

    {/* <TouchableOpacity style={styles.grayButton} onPress={() => navigation.navigate('Camera', {keys: cowKeys, cowList: cowList})}>
        <Text style={styles.buttonText}>Camera</Text>
    </TouchableOpacity> */}

    
      <CameraFAB title="Camera" onPress={() => navigation.navigate('Camera')} />
      <MicFAB title={microphoneOn ? "microphone-on" : "microphone-off"} 
        onPress={() => setMicrophoneOn(!microphoneOn)} />
    </View>
    </TouchableWithoutFeedback>
  )
}
