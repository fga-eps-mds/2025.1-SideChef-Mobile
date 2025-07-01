import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
       <Ionicons name="arrow-back" size={24} color="#D62626" />
     </TouchableOpacity>

      <Text style={styles.text}>Tela de Perfil</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 7,
    padding: 8,
    zIndex: 1,
  },
});