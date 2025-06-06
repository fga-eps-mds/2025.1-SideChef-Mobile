import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../styles/menu.styles';
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
      <ScrollView contentContainerStyle={styles.scrollDetails}>
    
        <TouchableOpacity style={styles.backButtonDetails} onPress={() => onBack()}>
          <Ionicons name="arrow-back" size={24} color="#D62626" />
          <Text style={styles.backTextDetails}>{recipe.Nome}</Text>
        </TouchableOpacity>

        <View style={styles.cardDetails}>
            {/* Ainda não há imagem */}
            <Text style={styles.titleDetails}>{recipe.Nome}</Text>
            {/* <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.timeText}>{receita.time}</Text>
            </View> */}
            <Text style={styles.sectionTitleDetails}>Ingredientes:</Text>
            {
              <Text style={styles.ingredientDetails}>{recipe.Ingredientes}</Text>
            }
            <Text style={styles.sectionTitleDetails}>Modo de Preparo:</Text>
            <Text style={styles.preparoDetails}>{recipe.Preparo}</Text>
            
          <View style={styles.actionsDetails}>
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

  //to get ip
  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];


  //state to store the image uri (may be useful in the future)
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

  const handleCameraPress = () => {
    alert('Abrir câmera (simulado)');
  };

  const handlerecipesPress = () => {
    alert('Ir para recipes');
  };

  const handlePerfilPress = () => {
    router.push('/addUser');
  };

  const handleFloatPress = () => {
    alert('Ir para perfil');
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

      <SafeAreaView style={styles.footer}>
        <TouchableOpacity onPress={handlerecipesPress} style={styles.iconWrapper}>
          <Ionicons name="receipt" size={30} color="#FFF" />
        </TouchableOpacity>

        <View style= {styles.cameraPadding}>
        <TouchableOpacity onPress={openCam} style={styles.cameraButton}>
          <FontAwesome name="camera" size={25} color="#D62626" />
        </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePerfilPress} style={styles.iconWrapper}>
          <FontAwesome5 name="user-alt" size={24} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>

        <TouchableOpacity onPress={handleFloatPress} style={styles.floatButton}>
        <FontAwesome5 name="plus" size={24} color="#FFF" />
        </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};