import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Constants from 'expo-constants';

import axios from "axios";

const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;

const router = useRouter();

interface Recipe {
  _id: string;
  Nome: string;
  Ingredientes: string[];
  Dificuldade: string;
  Preparo: string;
};

interface RecipeListViewProp{
    recipes: Recipe[],
    onSelect: (recipe: Recipe) => void
}

interface RecipeListViewProp{
    recipes: Recipe[],
    onSelect: (recipe: Recipe) => void
}

const RecipeView = ({recipe, onBack}: {recipe: Recipe, onBack: () => void}) => {
  return(
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={stylesDetails.scroll}>
    
        <TouchableOpacity style={stylesDetails.backButton} onPress={() => onBack()}>
          <Ionicons name="arrow-back" size={24} color="#D62626" />
          <Text style={stylesDetails.backText}>{recipe.Nome}</Text>
        </TouchableOpacity>

        <View style={stylesDetails.card}>
            {/* Ainda não há imagem */}
            <Text style={stylesDetails.title}>{recipe.Nome}</Text>
            {/* <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.timeText}>{receita.time}</Text>
            </View> */}
            <Text style={stylesDetails.sectionTitle}>Ingredientes:</Text>
            {
              <Text style={stylesDetails.ingredient}>{recipe.Ingredientes}</Text>
            }
            <Text style={stylesDetails.sectionTitle}>Modo de Preparo:</Text>
            <Text style={stylesDetails.preparo}>{recipe.Preparo}</Text>
            
          <View style={stylesDetails.actions}>
            <FontAwesome name="thumbs-up" size={28} color="#fff" />
            <FontAwesome name="thumbs-down" size={28} color="#fff" />
            <Ionicons name="bookmark-outline" size={28} color="#fff" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const RecipeList = ({recipes, onSelect }: RecipeListViewProp) =>{
  return(
    <FlatList
      data={recipes}
      keyExtractor={(item) => item._id}
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
        
        onPress={() => onSelect(item)}
        >
          {/* <Image source={item.image} style={{ width: '100%', height: 150, borderRadius: 8 }} /> */}
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 8 }}>
            {item.Nome}
          </Text>
          <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
            Ingredientes: {item.Ingredientes}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default function inicialPage() {
  // state receitas
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipes] = useState<Recipe | null>(null)
  const [query, onChangeText] = useState('');

  //para pegar ip 
  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];


  //state pra guardar o uri da imagem (pode ser útil no futuro )
  const [imageUri, setImageUri] = useState<string | null>(null);

  const fetchData = async () => {
    // Pode ser guardada em um hook
    try {
        const response = await axios.get(`${apiUrl}/recipe/getRecipes`);
        setRecipes(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() =>{          
    fetchData()
    }, [])


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
      const response = await fetch(`${apiUrl}/ocr/run-ocr/`, {
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


// (!) Barra de pesquisa altera por função dependente de mock haardcoded, corrigir
  return (
    <View style={styles.container}>
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          placeholder="Pesquisar..."
          value={query}
          onChangeText={() => {
            onChangeText;
            console.log("Mudei o texto de pesquisa")}}
          style={[styles.searchInput, { flex: 1 }]}
        />
        <Ionicons name="search" size={24} color="#D62626" style={{ marginLeft: 10 }} />
      </View>


      {recipes.length == 0 ?
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ainda não há receitas registradas :{recipes}(</Text>
        </View> : (selectedRecipe ? (
          <View style={styles.emptyContainer}>
            <RecipeView recipe={selectedRecipe} onBack={() => setSelectedRecipes(null)}/>
          </View>) :
        <View style={styles.emptyContainer}>
          <RecipeList recipes={recipes} onSelect={setSelectedRecipes}/>
        </View>)
      }

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

const stylesDetails = StyleSheet.create({
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