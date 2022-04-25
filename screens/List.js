import React, {useState, useEffect} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Alert, ScrollView, Image, TouchableWithoutFeedback,Keyboard,ActivityIndicator} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { CowRow } from '../components/CowRow';
import styles from '../style';
import MicFAB from '../components/MicFAB';
import CameraFAB from '../components/CameraFAB';

export default function List({route, navigation}) {
    // receive currentTab parameter from home, value depending on if user presses yhteensä or sairaita
    const [allCows, setAllCows] = useState(route.params?.cowList);    
    const [sickCows, setSickCows] = useState({});
    const all = 'all';
    const sick = 'sick';

    const [currentTab, setCurrentTab] = useState(route.params?.currentTab);

    let cowKeys = Object.keys(allCows).sort();

    useEffect(() => {
        let sick = [];
        let copy = {...allCows};
      //  alert(JSON.stringify(copy));
        for (let i = 0; i < cowKeys.length; i++) {
            // cowKeys[i] each key
            if (allCows[cowKeys[i]].temperature != null) {
                if (allCows[cowKeys[i]].temperature != "") {
               /*  if ((Number(allCows[cowKeys[i]].temperature) < 38.5) || (Number(allCows[cowKeys[i]].temperature) > 39.5))  {
                   // sick.push(allCows[cowKeys[i]]);

                   JSON.parse(JSON.stringify(sick.push(cowKeys[i],allCows[cowKeys[i]]))) ;

                 //   alert(allCows[cowKeys[i]]);
               //  arr.push({title:title, link:link});

                } */

                let current = copy[cowKeys[i]].temperature.toString().replace(/,/g, '.');
                let currentNumber = Number(current);
                if ((currentNumber >= 38.5) && (currentNumber <= 39.5)) {
                // if ((Number(copy[cowKeys[i]].temperature) >= 38.5) && (Number(copy[cowKeys[i]].temperature) <= 39.5)) {
                    // if temp is normal, deleting from sick array
                    delete copy[cowKeys[i]]; 
                   // alert(cowKeys[i])
                }
            }
        }
        }
        setSickCows(copy);
        //setSickCows(sick);
    }, []);

    let sickKeys = Object.keys(sickCows).sort();

    function toggleTab(pressed) {
       // alert(pressed); return;
        if (currentTab == pressed) {
            return; 
        } else {
            if (currentTab == 'all') {
            setCurrentTab('sick');
        } else if (currentTab == 'sick') {
            setCurrentTab('all');
        }
        }
    }

    return (
        <View style={{flex: 1}}>
            <View style={style.tabheader}>
                <TouchableOpacity onPress={() => toggleTab(all)}>
                    {/* TOGGLE häiritsee tyyliehtoa ^^^ */}
                    <View  
                    //  style={ currentTab=='all' ? style.activeTab : style.inactiveTab}
                    >
                    {/* <View style={style.tabItem}> */}
                        <Text style={style.tabText}>Kaikki</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTab(sick)}>
                    <View
                    // style={ currentTab=='all' ? style.inactiveTab : style.activeTab}
                    >
                        <Text style={style.tabText}>Sairaat</Text>
                    </View>
                </TouchableOpacity>
            </View>  
            
            <View style={style.listBg}>
            { currentTab == "all" ? 

  
            // All cows-list
            <>
            <Text>Kaikki</Text>
            {/* <Text>{JSON.stringify(allCows)}</Text> */}
            <ScrollView style={styles.listContainer}>
                {cowKeys.map(key => ( 
                    <View key={key} style={{ borderBottomWidth: 1, borderColor: '#86a68e'}}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Individual', {cow: allCows[key], key: [key]})}>
                        <CowRow 
                            cowNumber={key}
                            cowName={allCows[key].name}
                            temperature={allCows[key].temperature}
                            // trembling={cowList[key].trembling}
                        />
                        
                    </TouchableOpacity>
                    </View>
                    ))
                }
            </ScrollView>
            </>
            
            : 

            // Sick cows-list
            <>
                <Text>Sairaat</Text>
                {/* <Text>{JSON.stringify(sickCows)}</Text> */}
                <ScrollView style={styles.listContainer}>
                {sickKeys.map(key => ( 
                    <View key={key} style={{ borderBottomWidth: 1, borderColor: '#86a68e'}}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Individual', {cow: sickCows[key], key: [key]})}>
                        <CowRow 
                            cowNumber={key}
                            cowName={sickCows[key].name}
                            temperature={sickCows[key].temperature}
                            // trembling={cowList[key].trembling}
                        />
                        
                    </TouchableOpacity>
                    </View>
                    ))
                }
            </ScrollView>
            </>
            }            
            </View>

        </View>
    )
}
const style= StyleSheet.create({
    tabheader: {
       // backgroundColor: 'lightgreen',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tabText: {
        fontSize: 20
    },
    tabItem: {
        marginHorizontal: 15,
        flex: 1
    },
    listBg: {
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    activeTab: {
        backgroundColor: 'lightgreen'
    },
    inactiveTab: {
        backgroundColor: 'lightred'
    },
    listContainer: {
        marginBottom: 85,
        padding: 10,
        backgroundColor: '#e8ede9',
        borderRadius: 10,
        shadowColor: 'black',
          elevation: 10,
    }
})