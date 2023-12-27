import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () =>{

        try {
            
            const response = await axios.post('https://b674-78-190-140-69.ngrok-free.app/Auth/login',{
                email:email,
                password:password
            });

            if(response.status===200){
                await AsyncStorage.setItem('token',response.data);
                navigation.navigate("Index",{email})
            }
            else{
                console.log("başarısız")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    
  return (
    <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput} placeholder='Enter Email' value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.textInput} placeholder='Enter Password' value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        
        <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
                <Text style={styles.buttonLoginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('RegisterScreen')} style={styles.buttonRegister}>
                <Text style={styles.buttonRegisterText}>Register</Text>
        </TouchableOpacity>
      
      

    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'center',
        marginTop:'30%',
        borderWidth:1,
        width:'80%',
        alignSelf:'center',
        paddingVertical:20,
        backgroundColor:'ghostwhite',
        borderRadius:40
    },
    textContainer:{
        alignItems:'center',
        width:'100%',
        alignSelf:'center',
        paddingVertical:20,
    },
    buttonContainer:{
        width:'100%',
        alignItems:'center',
        alignSelf:'center',

    },
    label:{
        fontWeight:'bold',
        fontSize:20,
        marginTop:20

    },
    textInput:{
        borderWidth:1,
        padding:10,
        borderRadius:10,
        borderColor:'gray',
        width:'60%',
        marginTop:10,
        backgroundColor:'white'
        
    },
    buttonLogin:{
        borderWidth:2,
        marginTop:20,
        width:'40%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'lightgreen',
        borderColor:'lightgreen',
        height:'10%'
    },
    buttonLoginText:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        alignSelf:'center'
    },
    buttonRegister:{
        borderWidth:2,
        alignSelf:'flex-end',
        marginEnd:'30%',
        marginTop:10,
        backgroundColor:'lightsalmon',
        borderColor:'lightsalmon',
        borderRadius:10,
        padding:5,
        justifyContent:'center',

    },
    buttonRegisterText:{
        color:'white',
        alignSelf:'center'
    }
})