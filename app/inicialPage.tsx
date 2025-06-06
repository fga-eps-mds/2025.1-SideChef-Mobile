import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Easing, Image, Modal, Text, TouchableOpacity, View, } from 'react-native';
import { styles } from './login.styles';


export default function Login() {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  const openModal = () => {
    setShowOptions(true);
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => setShowOptions(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/LogoVermelha.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          Falta pouco para iniciar a sua jornada na cozinha!
        </Text>
        <Text style={styles.subtitleText}>Como deseja continuar?</Text>
      </View>
      
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push('/loginUser')}style={styles.otherButton}>
          <Text style={styles.otherText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}></View>
        <TouchableOpacity onPress={() => router.push('/addUser')} style={styles.otherButton}>
          <Text style={styles.otherText}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}></View>
        <TouchableOpacity onPress={() => router.navigate('/(tabs)/menu')}>
          <Text style={styles.continueText}>
            Continuar sem salvar minhas receitas
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showOptions} transparent={true} onRequestClose={closeModal}>
        <TouchableOpacity
          onPress={closeModal}
          style={styles.modalOverlay}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: opacityAnim,
                transform: [{ translateY: translateYAnim }],
              },
            ]}>
            <Text style={styles.modalTitle}>Logue com sua conta!</Text>  
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
