import { View, Text, TouchableOpacity , TextInput , StyleSheet } from 'react-native'
import React , {useState} from 'react';

import { useNavigation } from '@react-navigation/native';
import {firebase} from '../config';

const Login = () => {

    const navigation = useNavigation();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    loginUser = async (email,password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(error) {
            alert(error.message);
        }
    }

    //forger Password

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password Reset Email Sent.")
        }).catch((error) => {
            alert(error)
        })
    }

    return(
        <View style={style.container}>
            <Text style={{fontWeight:'bold',fontSize:23}}>
                 Login Here
            </Text>
            <View style={{marginTop:35}}>
                <TextInput 
                style={style.textInput}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
                />

                <TextInput 
                style={style.textInput}
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
            onPress={() => loginUser(email, password)}
            style={style.button}
            >
                <Text style={{fontWeight:'bold',fontSize:22}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold',fontSize:16}}>Don't have an Account? Register Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {forgetPassword()}}
            style={{marginTop:20}}
            >
                <Text style={{fontWeight:'bold',fontSize:16}}>Forget Password !</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;

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
