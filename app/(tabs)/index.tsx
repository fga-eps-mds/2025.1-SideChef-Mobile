  import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from "react-native";
import { styles } from '../styles/index.styles';

  export default function Index() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const springAnim = useRef(new Animated.Value(0)).current;
    const router = useRouter();

    useEffect(() => {
      //spring effect
      Animated.spring(springAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
      }).start();

      //fade in effect
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

    // next screen navigation in three seconds
    const timeout = setTimeout(() => {
      router.push('/inicialPage');
    }, 3000);

      return () => clearTimeout(timeout);
    }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/logoInteiro.png')}
        testID="splash-logo"
        style={{
          transform: [{ scale: springAnim }],
          opacity: fadeAnim,
          ...styles.logo,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
