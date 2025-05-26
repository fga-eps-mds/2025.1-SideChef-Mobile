import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const router = useRouter();

type Receita = {
  id: string;
  title: string;
  ingredients: string[];
  image: any;
};

const receitas: Receita[] = [
  {
    id: 'card1',
    title: 'STROGONOFF DE Frango',
    ingredients: ['Frango', 'Creme de Leite', 'Ketchup', 'Mostarda'],
    image: require('../../assets/images/strogonoff.png'),
  },
  {
    id: 'card2',
    title: 'LASANHA Bolonhesa',
    ingredients: ['Carne', 'Massa', 'Molho de tomate', 'Queijo'],
    image: require('../../assets/images/lasanha.jpg'),
  },
  {
    id: 'card3',
    title: 'Coxinha de Frango',
    ingredients: ['Frango', 'Farinha Panko', 'Ovos'],
    image: require('../../assets/images/coxinha.jpeg'),
  },
];

export default function inicialPage() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(receitas);
  const [filterMode, setFilterMode] = useState<'title' | 'ingredients' | 'all'>('all');

  useEffect(() => {
  handleSearch(query);
  }, [filterMode]);

  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];

  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setQuery(text);
    const lowered = text.toLowerCase();

    const filtered = receitas.filter(item => {
      if (filterMode === 'title') {
        return item.title.toLowerCase().includes(lowered);
      }
      if (filterMode === 'ingredients') {
        return item.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(lowered)
        );
      }
      return (
        item.title.toLowerCase().includes(lowered) ||
        item.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(lowered)
        )
      );
    });
    
    setFilteredData(filtered);
  };
  

  const handleReceitasPress = () => alert('Ir para Receitas');
  const handlePerfilPress = () => alert('Ir para Perfil');
  const handleFlutuntePress = () => alert('Adicionar Receita');

  async function getCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permita o acesso a câmera para poder usufruir dessa funcionalidade.');
    }
  }

  async function openCam() {
    let result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log(uri);
      await uploadImage(uri);
    }
  }

  const uploadImage = async (uri: string) => {
    const fileName = uri.split('/').pop() as string;
    const fileType = fileName.split('.').pop();

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: fileName,
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await fetch(`http://${localIp}:8000/run-ocr/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('Resultado do OCR:', result);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          placeholder="Pesquisar..."
          value={query}
          onChangeText={handleSearch}
          style={[styles.searchInput, { flex: 1 }]}
        />
        <Ionicons name="search" size={24} color="#D62626" style={{ marginLeft: 10 }} />
      </View>

      {/* Filtros de Busca */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterMode === 'title' && styles.selected]}
          onPress={() => setFilterMode('title')}
        >
          <Text style={styles.filterText}>Título</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterMode === 'ingredients' && styles.selected]}
          onPress={() => setFilterMode('ingredients')}
        >
          <Text style={styles.filterText}>Ingredientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterMode === 'all' && styles.selected]}
          onPress={() => setFilterMode('all')}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ainda não há receitas registradas :(</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#D62626',
              padding: 16,
              marginBottom: 12,
              borderRadius: 8,
              elevation: 3,
            }}
            onPress={() =>
              router.push({
                pathname: '/detalhes',
                params: { id: item.id },
              })
            }
          >
            <Image source={item.image} style={{ width: '100%', height: 150, borderRadius: 8 }} />
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 8 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: '#000', marginTop: 4 }}>
              Ingredientes: {item.ingredients.join(', ')}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleReceitasPress}>
          <Ionicons name="receipt" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCam} style={styles.cameraButton}>
          <FontAwesome name="camera" size={24} color="#D62626" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePerfilPress}>
          <MaterialCommunityIcons name="account" size={36} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleFlutuntePress} style={styles.flutuanteButton}>
        <FontAwesome5 name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selected: {
    backgroundColor: '#D62626',
  },
  filterText: {
    color: '#000',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#D62626',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  cameraButton: {
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  flutuanteButton: {
    position: 'absolute',
    bottom: 100,
    right: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D62626',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
