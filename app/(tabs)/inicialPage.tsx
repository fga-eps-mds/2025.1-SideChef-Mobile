import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const router = useRouter();

type Receita = {
  id: string;
  title: string;
  ingredients: string[];
  image: any;
};

  //cards page
const recipes = [
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
  const [filteredData, setFilteredData] = useState(recipes);

  //to get ip
  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];


  //state to store the image uri (may be useful in the future)
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = recipes.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCameraPress = () => {
    alert('Abrir câmera (simulado)');
  };

  const handlerecipesPress = () => {
    alert('Ir para recipes');
  };

  const handlePerfilPress = () => {
    alert('Ir para Perfil');
  };

  const handleFlutuntePress = () => {
    alert ('Adicionar Receita');
  }

  //cam
//camera permission
async function getCameraPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Permita o acesso a câmera para poder usufruir dessa funcionalidade.');
  }
}



//funtion to open the camera
async function openCam() {
  let result = await ImagePicker.launchCameraAsync({
    aspect: [4, 3],      //Image aspect ratio setting (optional)
    quality: 1,          //Maximum image quality
  });
  //if that checks if the user closed the camera
  if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log(uri);

       await uploadImage(uri);
    }
}

//camEnd


//uploadImage
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
//uploadImage END


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

    {/* Recipe list */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ainda não há recipes registradas :(</Text>
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
                  pathname: '/details',
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
        <TouchableOpacity onPress={handlerecipesPress}>
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
  bottom: 100, //Adjust to be above the footer
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