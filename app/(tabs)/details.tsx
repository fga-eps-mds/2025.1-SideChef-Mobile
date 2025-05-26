import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './details.styles';



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

export default function detailsPage() {
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
