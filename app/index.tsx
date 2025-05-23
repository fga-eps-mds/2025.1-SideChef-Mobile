import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from "react-native";



export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const springAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();



  useEffect(() => {
    //spring effect
    Animated.spring(springAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3, //how strong the spring effect "bounces"

    }).start();

    //fade effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    //transition to the next screen after delay
    const timeout = setTimeout(() => {
      router.push('/login'); 
    }, 3000); //delay in seconds until next screen
  
    return () => clearTimeout(timeout);
  }, []);
  

  
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#D62626',
        paddingTop: 100,
      }}
>
      <Animated.Image source={require('../assets/images/logoInteiro.png')} 
      style={{transform: [{ scale: springAnim }], opacity: fadeAnim, width: 300, height: 300 }}
      resizeMode='contain'

/>
      

    </View>
  
);
}
