import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
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
  const router = useRouter();
  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = () => setFavorito(!favorito);

  const receita = receitas.find(r => r.id === id);

  const [checked, setChecked] = useState<boolean[]>(() =>
  new Array(receita?.ingredients?.length || 0).fill(false)
);

const toggleChecked = (index: number) => {
  const newChecked = [...checked];
  newChecked[index] = !newChecked[index];
  setChecked(newChecked);
};



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
  <View style={styles.topBar}>
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>
    <TouchableOpacity onPress={toggleFavorito}>
  <Ionicons
    name={favorito ? 'star' : 'star-outline'}
    size={28}
    color={favorito ? '#D62626' : '#000'}
  />
</TouchableOpacity>
  </View>
    


    <Image source={receita.image} style={styles.image} />

    <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>

      <Text style={styles.title}>{receita.title}</Text>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
{receita.ingredients.map((ing, i) => (
  <TouchableOpacity key={i} style={styles.ingredientItem} onPress={() => toggleChecked(i)}>
    <Ionicons
      name={checked[i] ? 'checkbox' : 'square-outline'}
      size={20}
      color={checked[i] ? '#D62626' : '#999'}
      style={{ marginRight: 8 }}
    />
    <Text style={{ flex: 1 }}>{ing}</Text>
  </TouchableOpacity>
))}

      <Text style={styles.sectionTitle}>Modo de preparo</Text>
      {receita.preparo.split(/\n/).map((step, i) => (
        <Text key={i} style={styles.preparo}>
          <Text style={{ fontWeight: 'bold' }}>{i + 1}.</Text> {step.trim()}
        </Text>
))}


      <View style={styles.actions}>
        <FontAwesome name="thumbs-up" size={28} color="#000" />
        <FontAwesome name="thumbs-down" size={28} color="#000" />
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
  paddingHorizontal: 16,
  paddingBottom: 32,
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
  color: '#333',
  fontSize: 26,
  fontWeight: '700',
  marginBottom: 20,
  marginTop: 20,
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
  fontWeight: '600',
  color: 'black',
  fontSize: 23,
  marginTop: 20,
  marginBottom: 8,
},
ingredient: {
  color: '#fff',
  fontSize: 16,
  marginLeft: 10,
  marginTop: 2,
},
preparo: {
  color: '#444',
  fontSize: 18,
  lineHeight: 26,
  marginTop: 8,
},
actions: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 34,
  gap: 32,
},
emptyText: {
  textAlign: 'center',
  color: '#555',
  fontSize: 16,
  fontWeight: '500',
  marginTop: 40,
},
topBar: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
},
ingredientItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F6F6F6',
  padding: 12,
  borderRadius: 8,
  marginBottom: 8,
},

});