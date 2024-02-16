import { View, Text , SafeAreaView , StyleSheet , TouchableOpacity } from 'react-native'
import React , {useState , useEffect} from 'react'
import { firebase } from '../config';

const  Dashboard = () => {
    const [name,setName] = useState('');

    //change the Password
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
    .then(() =>{
        alert("Password Reset Email Send")
    }).catch((error) => {
        alert(error)
    })
    }


    useState(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else{
                console.log("User Does Not Exists")
            }
        })
    }, [])

    return(
        <SafeAreaView style={style.container}>
            <Text style={{fontSize:23,fontWeight:'bold'}}>
                Hello , {name.firstName}
            </Text>

            <TouchableOpacity
            onPress={() => {
                changePassword();
            }} 
            style={style.button}
            >
                <Text style={{fontSize:23,fontWeight:'bold'}}>
                    Change Password
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {firebase.auth().signOut()}} 
            style={style.button}
            >
                <Text style={{fontSize:23,fontWeight:'bold'}}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard;


const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        marginTop:100
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