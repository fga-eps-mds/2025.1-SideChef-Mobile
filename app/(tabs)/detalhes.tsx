import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const router = useRouter();

const { id } = useLocalSearchParams();

const receitas = [
  {
    id: 'card1',
    title: 'STROGONOFF DE FRANGO',
    time: '50-60 minutos',
    ingredients: [
      'Frango cortado em cubos',
      'cebola picada',
      'colher de manteiga',
      'mostarda',
      'creme de leite',
      'ketchup',
    ],
    preparo: `Em uma panela, misture o frango, o alho, a maionese.
Em uma frigideira grande, derreta a manteiga e doure a cebola.
Junte o frango temperado até que esteja dourado.
Adicione o ketchup e a mostarda.
Incorpore o creme de leite e retire do fogo antes de ferver.`,
    image: require('../../assets/images/strogonoff.png'),
  },
  {
    id: 'card2',
    title: 'LASANHA A BOLONHESA',
    time: '40 minutos',
    ingredients: ['massa de lasanha', 'molho de tomate', 'queijo', 'presunto', 'CARNE moída'],
    preparo: 'Monte as camadas da lasanha e asse por 40 minutos.',
    image: require('../../assets/images/lasanha.jpg'),
  },
  {
    id: 'card3',
    title: 'COXINHA DE FRANGO',
    time: '30 minutos',
    ingredients: ['massa de coxinha', 'frango desfiado'],
    preparo: 'Recheie, modele e frite.',
    image: require('../../assets/images/coxinha.jpeg'),
  },
];

export default function DetalhesPage() {
  const { id } = useLocalSearchParams();

  const receita = receitas.find(r => r.id === id);

  if (!receita) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <Text style={styles.emptyText}>
            Sem Registro :(
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


  return (
 <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
  <ScrollView contentContainerStyle={styles.scroll}>
    
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color="#D62626" />
      <Text style={styles.backText}>{receita.title}</Text>
    </TouchableOpacity>

    <View style={styles.card}>
      <Image source={receita.image} style={styles.image} />

      <Text style={styles.title}>{receita.title}</Text>

      <View style={styles.timeRow}>
        <Ionicons name="time-outline" size={20} color="#fff" />
        <Text style={styles.timeText}>{receita.time}</Text>
      </View>

      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      {receita.ingredients.map((ing, i) => (
        <Text key={i} style={styles.ingredient}>- {ing}</Text>
      ))}

      <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
      <Text style={styles.preparo}>{receita.preparo}</Text>

      <View style={styles.actions}>
        <FontAwesome name="thumbs-up" size={28} color="#fff" />
        <FontAwesome name="thumbs-down" size={28} color="#fff" />
        <Ionicons name="bookmark-outline" size={28} color="#fff" />
      </View>
    </View>
  </ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#D62626',
    flexGrow: 1,
  },
scroll: {
  flexGrow: 1,
  paddingVertical: 24,
  paddingHorizontal: 16,
  backgroundColor: '#fff',
},
card: {
  backgroundColor: '#D62626',
  borderRadius: 16,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 6,
},
backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
backText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
  marginLeft: 8,
},
image: {
  width: '100%',
  height: 180,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  marginBottom: 16,
},
title: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 12,
},
timeRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
},
timeText: {
  marginLeft: 8,
  color: '#fff',
},
sectionTitle: {
  fontWeight: 'bold',
  color: '#fff',
  fontSize: 16,
  marginTop: 12,
  marginBottom: 4,
},
ingredient: {
  color: '#fff',
  fontSize: 14,
  marginLeft: 10,
  marginTop: 2,
},
preparo: {
  color: '#fff',
  marginTop: 6,
  lineHeight: 20,
},
actions: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 24,
},
emptyText: {
  textAlign: 'center',
  color: '#555',
  fontSize: 16,
  fontWeight: '500',
  marginTop: 40,
},
});
