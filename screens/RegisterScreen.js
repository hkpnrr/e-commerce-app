import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';

export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    const handleRegister = async() =>{
        
        try {
            const response = axios.post('https://b674-78-190-140-69.ngrok-free.app/Auth/register',{
            name,
            surname,
            email,
            password
        });

        navigation.pop();
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.textInput} placeholder='Enter Name' value={name} onChangeText={(text)=>setName(text)}></TextInput>
            <Text style={styles.label}>Surname</Text>
            <TextInput style={styles.textInput} placeholder='Enter Surname' value={surname} onChangeText={(text)=>setSurname(text)}></TextInput>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.textInput} placeholder='Enter Email' value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.textInput} placeholder='Enter Password' value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        </View>
        
        <TouchableOpacity onPress={handleRegister} style={styles.buttonLogin}>
                <Text style={styles.buttonLoginText}>Register</Text>
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