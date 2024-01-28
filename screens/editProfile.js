import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView , TouchableOpacity} from 'react-native'
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Ionicons} from '@expo/vector-icons';
import EventDeleteModal from '../components/eventDeleteModal';
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import {db} from '../Backend/firestore';
import {auth} from '../Backend/firebase';

const EditProfile = ({route,navigation}) => {
    

    const navigateBack = () => {
        navigation.goBack();
    }


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>

                <View style={styles.backButton}>
                         <Ionicons name="ios-arrow-back" size={40} color="#244f8f" style={styles.icon} onPress={()=>{navigateBack()}} />
                    </View>  
            <View style={styles.container}>
                
                <Text> Edit your profile. </Text>
                
                </View>
        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // midText: {
    //     width: 200,
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    // }
    listItemText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    mssg:{
        fontSize: 10,
        color: '#0782f9',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 2,
        // backgroundColor: '#fff',
        // borderRadius: 20,
        // width: 80,
        // shadowColor: 'black',
        // shadowOpacity: 0.7,
        // shadowRadius: 10,
        // elevation: 5,
    }
})
