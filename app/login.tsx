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
        <TouchableOpacity onPress={openModal} style={styles.otherButton}>
          <Text style={styles.otherText}>Entar</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}></View>
        <TouchableOpacity onPress={() => router.push('/addUser')} style={styles.otherButton}>
          <Text style={styles.otherText}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}></View>

        <TouchableOpacity
          onPress={() => console.log('Continuar com Google')}
          style={styles.googleButton}
        >
          <View style={styles.googleIconContainer}>
            <Image
              style={styles.googleIcon}
              source={require('../assets/images/Google.png')}
            />
          </View>
          <Text style={styles.googleText}>Continuar com o Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate('/(tabs)/inicialPage')}>
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
            ]}
          >
            <Text style={styles.modalTitle}>Como deseja continuar?</Text>

            <TouchableOpacity
              onPress={() => console.log('Facebook')}
              style={styles.facebookButton}
            >
              <View style={styles.facebookIconContainer}>
                <Image
                  style={styles.facebookIcon}
                  source={require('../assets/images/Facebook.png')}
                />
              </View>
              <Text style={styles.facebookText}>Continuar com o Facebook</Text>
            </TouchableOpacity>

            <View style={styles.rowButtons}>
              <TouchableOpacity
                onPress={() => console.log('Celular')}
                style={styles.smallButton}
              >
                <Text style={styles.smallButtonText}>Celular</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log('Email')}
                style={styles.smallButton}
              >
                <Text style={styles.smallButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
