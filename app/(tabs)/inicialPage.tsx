import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Constants from 'expo-constants';

import axios from 'axios';

// (!)Colocar em arquivo separado
const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;

interface Recipe {
    _id: string
    name: string
    type: string
    difficulty: string
    ingredients: string[]
    preparation: string
}

interface RecipeViewProp{
    recipe: Recipe
}

interface RecipeListViewProp{
    recipes: Recipe[],
    onSelect: (recipe: Recipe) => void
}

// Para teste
const DATA = [
  { id: '1', name: 'Banana' },
  { id: '2', name: 'Maçã' },
  { id: '3', name: 'Laranja' },
  { id: '4', name: 'Abacaxi' },
];

//// Componentes de lista de receita

const RecipePreview = ({recipe}: RecipeViewProp) => {

    return(
        <View style={styles.recipePreviewBox} >
            <Text style={styles.RecipePreviewTitle}>{recipe.name}</Text>
            <Text style={styles.RecipePreviewText}>{recipe.type}</Text>
            <Text style={styles.RecipePreviewText}>{recipe.difficulty}</Text>
            
            <FlatList
                data={recipe.ingredients}
                renderItem={({item}) => <Text style={styles.RecipePreviewText}>{item}</Text>}
                keyExtractor={item => `${item}`}
              />
  
        </View>
    )
}

// Ainda não implementado
const RecipeView = ({recipe, onBack}: {recipe: Recipe, onBack: ()=> void}) => {
    return(
        <View style={styles.RecipeViewBox}>
            <TouchableOpacity style={styles.RecipeViewGoBack}onPress={onBack}>
              <Ionicons name='arrow-back-outline'/>
              <Text style={styles.RecipeViewText}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.RecipeViewTitle}>{recipe.name}</Text>
            <Text style={styles.RecipeViewText}>{recipe.type}</Text>
            <Text style={styles.RecipeViewText}>{recipe.difficulty}</Text>
            <FlatList
              data={recipe.ingredients}
              renderItem={({item}) => <Text style={styles.RecipeViewText}>{item}</Text>}
              keyExtractor={item => `${item}`}
            />
            <Text style={styles.RecipeViewText}>{recipe.preparation}</Text>
        </View>
    )
}

const RecipeList = ({recipes, onSelect }: RecipeListViewProp) =>{
    return(
        <View style={styles.recipeListBox}>
            {recipes.length == 0 ? null :
                <FlatList
                    data={recipes}
                    renderItem={({item}) => 
                      <TouchableOpacity onPress={() => onSelect(item)}>
                        <RecipePreview recipe={item}/>
                      </TouchableOpacity>}
                    keyExtractor={item => item._id}
                />
            }
        </View>
    )
}

////

export default function inicialPage() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  // state de receitas recuperadas
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipes] = useState<Recipe | null>(null) 

  //state pra guardar o uri da imagem
  const [imageUri, setImageUri] = useState<string | null>(null);

  // fetch receitas
  // (?)Colocar função para uma pasta de hooks
  // (!)URL HARDCODED
  // (!)Melhorar tratamento de erro
    const fetchData = async () => {
      try {
          const response = await axios.get(`${apiUrl}/recipes`);
          setRecipes(response.data)
      } catch (error) {
          console.log(error)
      }
    }

      useEffect(() =>{          
        fetchData()
      }, [])

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = DATA.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
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

      
      {recipes.length == 0 ?
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Ainda não há receitas registradas :(</Text>
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
//// Estilos de lista de receita
  recipeListBox: {
    display: 'flex',
    margin: 20
  },

  recipePreviewBox: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  RecipePreviewTitle: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Coolvetica-Rg'
  },

  RecipePreviewText: {
    color: 'white',

  },

  RecipeViewBox: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },

  RecipeViewTitle: {

  },

  RecipeViewGoBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    color: 'black'
  },
   
  RecipeViewText: {
    fontSize: 15,
  }
});
