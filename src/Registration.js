import { View, Text , TouchableOpacity , TextInput , StyleSheet } from 'react-native'
import React, {useState} from 'react';
import { firebase } from '../config';
import { ScrollView } from 'react-native-gesture-handler';

const Registration = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const trimmedEmail = email.trim();

    registerUser = async (trimmedEmail , password , firstName , lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            if (!email) {
                alert("Please provide a valid email address");
                return;
            }
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://firsttest-b8e49.firebaseapp.com',
            })
            .then(() => {
                alert("Email Verificaion Sent To Your Mail")
            }).catch((error) => {
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return(
        <ScrollView>
        <View style={style.container}>
            <Text style={{fontWeight:'bold',fontSize:23}}>
                Register Here!
            </Text>
            <View style={{marginTop:40}}>
                <TextInput
                style={style.textInput}
                placeholder='First Name'
                onChangeText={(firstName) => setFirstName(firstName)}
                autoCorrect={false}

                 />

                <TextInput
                style={style.textInput}
                placeholder='Last Name'
                onChangeText={(lastName) => setLastName(lastName)}
                autoCorrect={false}
                
                 />

                <TextInput
                style={style.textInput}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType='email-address'
                
                 />

                <TextInput
                style={style.textInput}
                placeholder='Password'
                onChangeText={(password) => setPassword(password)}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
            onPress={() => registerUser(firstName,lastName,email,password)}
            style={style.button}
            >
                <Text style={{fontWeight:'bold',fontSize:23}}>Register</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

export default Registration;

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:100
    },
    textInput:{
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center'
    },
    button:{
        marginTop:50,
        height:40,
        width:250,
        backgroundColor:"#026edf",
        alignItems:'center',
        borderWidth:2,
        borderColor:'orange',
        borderRadius:12
    }
});