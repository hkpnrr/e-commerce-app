import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Index from './screens/Index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Index" component={Index} options={({navigation,route})=>(
            {
              headerRight:()=>(<View style={{flexDirection:'row',}}>
                <TouchableOpacity onPress={()=>{
                navigation.navigate('CartScreen',{email:route.params.email})
              }}>
                <AntDesign name="shoppingcart" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('ProfileScreen',{email:route.params.email})
              }}>
                <AntDesign name="user" size={24} color="black" />
              </TouchableOpacity>
              </View>)
            }
          )}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
