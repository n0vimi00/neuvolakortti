import React, {useState, useEffect} from 'react';
import {Text,View,TouchableOpacity,Alert, ScrollView, Image, TouchableWithoutFeedback,Keyboard,ActivityIndicator} from 'react-native';
import {db, ROOT_REF} from '../firebase/Config';
import { CowRow } from '../components/CowRow';
import styles from '../style'
import MicFAB from '../components/MicFAB';
import CameraFAB from '../components/CameraFAB';

export default function List() {
    return (
        <View>
            <Text>List</Text>
        </View>
    )
}