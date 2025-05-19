import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

const router = useRouter();

type Receita = {
  id: string;
  title: string;
  ingredients: string[];
  image: any;
};

  //cards pagina
const receitas = [
  {
    id: 'card1',
    title: 'STROGONOFF DE TROLLFACE', 
    ingredients: ['Trollface', 'Creme de Leite', 'Ketchup', 'Mostarda'],
    image: require('../../assets/images/trollface.png'),
  },
  {
    id: 'card2',
    title: 'LASANHA DE TROLLFACE',
    ingredients: ['Trollface', 'Massa', 'Molho de tomate', 'Queijo'],
    image: require('../../assets/images/trollface2.png'),
  },
  {
    id: 'card3',
    title: 'TROLLFACE EMPANADO',
    ingredients: ['Trollface', 'Farinha Panko', 'Ovos'],
    image: require('../../assets/images/trollface3.png'),
  },
];



export default function inicialPage() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(receitas);

  //state pra guardar o uri da imagem
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = receitas.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCameraPress = () => {
    alert('Abrir câmera (simulado)');
  };

  const handleReceitasPress = () => {
    alert('Ir para Receitas');
  };

  const handlePerfilPress = () => {
    alert('Ir para Perfil');
  };

  const handleFlutuntePress = () => {
    alert ('Adicionar Receita');
  }

  //cam
//permissao da cam
async function getCameraPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Permita o acesso a câmera para poder usufruir dessa funcionalidade.');
  }
}



//função pra abrir a camera
async function openCam() {
  let result = await ImagePicker.launchCameraAsync({
    aspect: [4, 3],      // Configuração da proporção da imagem (opcional)
    quality: 1,          // Qualidade máxima da imagem
  });
  //if que verifica se o usuário fechou a camera
  if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log(uri);
      setImageUri(uri);
    }
}

//camEnd

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

    {/* Lista de receitas */}
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
          
          onPress={() => router.push({
                  pathname: '/detalhes',
                  params: { id: item.id },
                  })}

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
  sideText: {
    fontSize: 16,
    color: '#333',
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
  bottom: 100, // Ajuste para ficar acima do footer
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

  cameraIcon: {
    fontSize: 28,
  },
});