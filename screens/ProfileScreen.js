import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({route}) {
    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    const getUser = async () =>{

        try {
            const requestParam = route.params.email;
            const response = await axios.get(`https://b674-78-190-140-69.ngrok-free.app/Auth/getUser?email=${requestParam}`,{
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}` // Authorization başlığı altında tokeni gönderme
                }});

            if(response.status===200){
                setName(response.data.name)
                setSurname(response.data.surname)
                setEmail(response.data.email);
            }
            else{
                console.log("hata")
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }


    useEffect(()=>{
        getUser();
    },[])

    
  return (
    <>
    {loading?(<Loading/>):(
    <View><Text>{name}</Text>
            <Text>{surname}</Text>
            <Text>{email}</Text></View>)}</>
  )
}

const styles = StyleSheet.create({})