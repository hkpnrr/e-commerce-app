import { FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Index({route}) {

    const [loading, setLoading] = useState(true);
    const [products,setProducts] = useState(null);
    const [bucket,setBucket] = useState([]);


    const fetchData = async ()=>{
        try {
            console.log(loading)
            const response = await axios.get("https://b674-78-190-140-69.ngrok-free.app/Product/allProducts",{
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}` // Authorization başlığı altında tokeni gönderme
                }});
    
            if(response.status ===200){
                setProducts(response.data)

            }
            else{
                console.log("Error")
            }


        } catch (error) {
            console.log(error.message)
        }
        setLoading(false);

        

    };

    const fetchBucketFromAsyncStorage = async (key) =>{
        
        try {
            var initialBucket = await AsyncStorage.getItem(`cart${key}`);
            initialBucket != null ? setBucket(JSON.parse(initialBucket)) : null;

        } catch (error) {
            console.log("error while fetching from async storage")
        }
    }

    useEffect(()=>{

        fetchData();
        fetchBucketFromAsyncStorage(route.params.email);

    },[]);


    const addProductToBucket=(id)=>{

        if(bucket.filter((item)=>{ return item.id===id}).length>0){
            setBucket(bucket.map((product)=>{

                return product.id===id?{...product,bucketAmount:product.bucketAmount+1}:product;
            }));
        }
        else{
            setBucket([...bucket,{id:id,bucketAmount:1}])
        }

    };

    const removeProductFromBucket = (id) =>{

        setBucket(bucket.map((product)=>{
            if(product.id===id){
                return {...product,bucketAmount:product.bucketAmount-1};
            }
            else{
                return product;
            }
        }));
    }

    const setAsyncStorage = async (key) =>{

        await AsyncStorage.setItem(key,JSON.stringify(bucket));
    }

    useEffect(() => {
        
        setAsyncStorage(`cart${route.params.email}`);
      }, [bucket]);


  return (
    <>
        {loading ? <Loading/>:
      <FlatList
        data={products}
        renderItem={({item})=>{
            return <View style={styles.mainContainer}>
                
                <Image resizeMode='contain' source={{uri:`${item.imageUrl}`}} style={styles.image} />
                <View style={styles.contentContainer}>

                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price} TL</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={()=>addProductToBucket(item.id)}>
                        <AntDesign name="pluscircleo" size={32} color="black" />
                    </TouchableOpacity>
                    {( bucket.filter((product)=>{ return item.id===product.id}).length>0 && bucket.find((product)=>item.id===product.id).bucketAmount>0 )?
                    (<TouchableOpacity style={styles.removeButton} onPress={()=>removeProductFromBucket(item.id)}>
                        <AntDesign name="minuscircleo" size={32} color="black" />
                    </TouchableOpacity>):null}
                    
                </View>
                <Text style={(bucket.filter((product)=>{ return item.id===product.id}).length>0 
                    && bucket.find((product)=>item.id===product.id).bucketAmount>0)?styles.bucketAmountText:{display:'none'}}>
                    {(bucket.filter((product)=>{ return item.id===product.id}).length>0 
                    && bucket.find((product)=>item.id===product.id).bucketAmount>0)?
                    (bucket.find((product)=>item.id===product.id).bucketAmount):""}
                </Text>

            </View>
        }}
      />}
    </>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        marginHorizontal:20,
        marginVertical:10,
        alignItems:'center',
        borderWidth:2,
        borderColor:'gray',
        padding:10,
        width:'90%',
        alignSelf:'center',
        borderRadius:20,
        backgroundColor:'orange',
        flexDirection:'row',
        justifyContent:'space-between'
        
        
    },
    image:{
        width:50,
        height:50,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'black'
    },
    contentContainer:{
        alignItems:'center'
        
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'

    },
    price:{
        fontSize:18,
        marginTop:5,
        color:'mintcream'
    },
    buttonContainer:{
        
    },
    addButton:{
        marginBottom:5
    },
    bucketAmountText:{
        fontSize:30,
        color:'blue'
    }
})