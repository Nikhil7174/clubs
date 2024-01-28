import React, {useContext, useState} from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Switch, Image, Dimensions} from 'react-native'
import { auth } from '../Backend/firebase'
import {signOut} from 'firebase/auth'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Linking } from 'react-native';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { Alert } from 'react-native';
import EditProfile from './editProfile';

const SCREEEN_WIDTH = Dimensions.get('window').width
export default function Settings({route, navigation}) {
    const setLoading = useStoreActions((actions) => actions.setLoading)
    const setUserData = useStoreActions((actions) => actions.setUserData)
    const userData = useStoreState((state) => state.userData)
    const adminMode = useStoreState((state) => state.adminMode)
    const setAdminMode = useStoreActions((actions) => actions.setAdminMode)
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn)
    const isAnonymous = useStoreState((state) => state.isAnonymous)
    const setIsAnonymous = useStoreActions((actions) => actions.setIsAnonymous)
    const [profilePicUri, setProfilePicUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleAdminMode = () => {
        setAdminMode(!adminMode)
      }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            // setUserChecked(false)
            // setIsLoggedIn(false)
            setIsLoggedIn(false);
            setUserData(null)
            setLoading(true)
            setIsAnonymous(false)
        })
    }

    return (
        <View style={styles.container}>
            {/* <Text>Email: {auth.currentUser?.email}</Text>
            <Text>Id: {auth.currentUser?.uid}</Text> */}

            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Developers </Text>
                        <Text onPress={()=>{Linking.openURL('https://mayukhpankaj.github.io/')}} style={{paddingBottom:25, fontSize:20, color: '#1d667a'}}> Mayukh Pankaj </Text>
                        <Text onPress={()=>{Linking.openURL('https://hrit-ik.github.io/')}}   style={{paddingBottom:30,fontSize:20, color: '#1d667a'}}> Hrithik Choudhary</Text>
                       

                        <Text style={styles.modalText}> How it works ? </Text>
                        <Text onPress={()=>{Linking.openURL('https://github.com/mayukhpankaj/BIT-Clubs')}}    style={{paddingBottom:10,fontSize:17, color: '#1d667a'}}> BIT Clubs v1.0</Text>
                        <Text></Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}> Got it !</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>


            <View style={styles.profileContainer}>
                <View style={styles.profilePicContainer}>
                    <Image
                        style={styles.profilePic}
                        source={profilePicUri ? {uri: profilePicUri} : require('./../assets/images/user_default.png')}
                    />
                </View>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.profileName}>{userData?.name}</Text>
                    <Text style={styles.profileEmail}>{userData?.email}</Text>
                </View>
            </View>
            
            <View style={{marginTop: 50}}>
                <View style={styles.switchContainer}>
                    {userData && userData.isAdmin && <View>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={adminMode ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleAdminMode}
                            value={adminMode}
                        />
                    </View>}
                    {userData && userData.isAdmin && <Text style={styles.adminSwitchText}>Add Event</Text>}

                    <TouchableOpacity style={styles.signOutButton} onPress={() => {navigation.navigate('EditProfileScreen')}}>
                          <Text style={styles.ButtonText} > Edit profile </Text>
                     </TouchableOpacity>
                </View>
                <View style={{width: SCREEEN_WIDTH*0.8}}>
                    {userData && userData.isAdmin && <TouchableOpacity style={styles.editEvents} onPress={() => {navigation.navigate('EditEventsScreen')}}>
                        <Text>Edit Events</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.ButtonText} >Sign Out</Text>
            </TouchableOpacity>
            <View>
            <TouchableOpacity style={styles.abutton} onPress={()=>{setModalVisible(true)}}>
                <Text style={styles.abuttonText}> &nbsp; About  app &nbsp; </Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    ButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    signOutButton: {
        backgroundColor: '#0782f9',
        color: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 50,
    },
    editEvents: {
        backgroundColor: 'rgba(7,130,249, 0.4)',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        // position: 'absolute',
        // top: 0,
    },
    profilePicContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        // marginRight: 20,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileInfoContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 15,
        // fontWeight: 'bold',
        color: '#8a8a8a',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        margin: 10,
        width: SCREEEN_WIDTH*0.8,
        // position: 'absolute',
        // top: 0,
    },
    adminSwitchText: {
        fontSize: 15,
        color: '#8a8a8a',
    },
    profileUpdateArea: {
        width: SCREEEN_WIDTH*0.8,
        alignItems: 'flex-start',
        margin: 10,
        justifyContent: 'flex-start',
    },
    settingItem: {
        backgroundColor: 'rgba(7,130,249, 0.4)',
        padding: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 10,
        // width: '60%',
        alignItems: 'center',
        // marginTop: 'auto',
        marginBottom: 10,
    },
    abutton: {
        // width: SCREE_WIDTH - 40,
        // paddingHorizontal: 30,
        // width:  SCREEEN_WIDTH*0.4,
        alignSelf: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1c313a',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,

    },
    abuttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
       fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold'
      }
})