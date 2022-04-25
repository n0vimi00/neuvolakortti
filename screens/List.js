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
    const [sickCows, setSickCows] = useState([]);
    const all = 'all';
    const sick = 'sick';

    const [currentTab, setCurrentTab] = useState(route.params?.currentTab);

    let cowKeys = Object.keys(allCows).sort();

    useEffect(() => {
        let sick = [];
        for (let i = 0; i < cowKeys.length; i++) {
            // cowKeys[i] each key
            if (allCows[cowKeys[i]].temperature != null) {
                if (allCows[cowKeys[i]].temperature != "") {
                if ((Number(allCows[cowKeys[i]].temperature) < 38.5) || (Number(allCows[cowKeys[i]].temperature) > 39.5))  {
                    sick.push(allCows[cowKeys[i]]);
                }
            }
        }
        }
        setSickCows(sick);
    }, []);

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
                    <View 
                    // style={currentTab == 'all' ? {backgroundColor: 'blue'} : null}
                    >
                    {/* <View style={style.tabItem}> */}
                        <Text style={style.tabText}>Kaikki</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTab(sick)}>
                    <View style={style.tabItem}>
                        <Text style={style.tabText}>Sairaat</Text>
                    </View>
                </TouchableOpacity>
            </View>  
            
            <View style={style.listBg}>
            { currentTab == "all" ? 

  
            // All cows-list
            <>
            <Text>all cows</Text>
            <Text>{JSON.stringify(allCows)}</Text>
            </>
            
            : 

            // Sick cows-list
            <>
                <Text>sick cows</Text>
                <Text>{JSON.stringify(sickCows)}</Text>
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
    }
})