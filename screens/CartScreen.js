import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import axios from 'axios';

export default function CartScreen({route}) {

    const [loading, setLoading] = useState(true);

    const [bucket, setBucket] = useState([]);
    const [productsFromBucket,setProductsFromBucket] = useState([]);

    const getCartFromAsyncStorage = async (key) =>{
       
        try {
            var initialBucket = await AsyncStorage.getItem(`cart${key}`);
            // console.log(initialBucket);
            initialBucket != null ? setBucket(JSON.parse(initialBucket)) : null;

            console.log("girdi")

            let payload = {
                IdList:["1","2"]
            };

            let formdata = new FormData();
            formdata.append("idList",1);
            formdata.append("idList",2);


            //bucket.map((product)=> { bodyFormData.append('idList[]', parseInt(product.id))});
            
            const response = await axios.post('https://b674-78-190-140-69.ngrok-free.app/Product/productsById',{
                request:payload,
                IdList:requ
            }
            // {
            //     headers:{
            //         'Authorization': `Bearer ${await AsyncStorage.getItem('token')}` // Authorization başlığı altında tokeni gönderme
            //     },
                
            // }
            );
    
            if(response.status ===200){
                setProductsFromBucket(response.data)
    
            }
            else{
                console.log("Error")
            }

        } catch (error) {
            console.log(error)
        }

    };

    const fetchProductsFromBucket = async () =>{

        try {
            console.log("girdi")
            const productIdList = bucket.map((product)=> {return parseInt(product.id)});
            console.log(productIdList)
            const response = await axios.post('https://b674-78-190-140-69.ngrok-free.app/Product/productsById',{
                idList:productIdList
            },
            {
                headers:{
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}` // Authorization başlığı altında tokeni gönderme
                }
            }
            );
    
            if(response.status ===200){
                setProductsFromBucket(response.data)
    
            }
            else{
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
       

        setLoading(false)


    }

    useEffect(()=>{
        getCartFromAsyncStorage(route.params.email);
        //fetchProductsFromBucket();
    },[])

    useEffect(()=>{

        //fetchProductsFromBucket();
        //console.log(bucket)
    },[bucket])
    
    
  return (
<>
    {loading?<Loading/>:
    <FlatList
      data={productsFromBucket}
      renderItem={({item})=>{
              return <View style={styles.container}>
                  <Text>{item.name}</Text>
                  <Text>{item.bucketAmount}</Text>
              </View>
          
      }}
    />
  }</>
    
  )
}

const styles = StyleSheet.create({})