import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles as stylesDetails } from '../styles/details.styles';
import { styles } from '../styles/menu.styles';
import { Image } from 'react-native';

import Constants from 'expo-constants';

import axios from "axios";

const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;

interface Ingredients {
  quantidade: string;
  ingrediente: string;
}

interface Recipe {
  _id: string;
  Nome: string;
  Dificuldade: string;
  Tipo: string;
  Ingredientes: string;
  Preparo: string;
  image_url?: string;
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
  let ingredientsDisplay = '';
    if (Array.isArray(recipe.Ingredientes)) {
      if (recipe.Ingredientes.length > 0) {
        if (typeof recipe.Ingredientes[0] === 'string') {
          ingredientsDisplay = recipe.Ingredientes.join(', ');

        } else if (typeof recipe.Ingredientes[0] === 'object') {
          ingredientsDisplay = recipe.Ingredientes.map((ing: Ingredients) => 
            `${ing.quantidade || ''} ${ing.ingrediente || ''}`.trim()
          ).filter(s => s.length > 0).join('; ');
          
          if (!ingredientsDisplay) { 
            ingredientsDisplay = 'Ingredient formating fail';
          }
        } else {
          ingredientsDisplay = 'Unknown ingredient format';
        }
      } else {
        ingredientsDisplay = 'Nenhum ingrediente cadastrado :(';
      }
    } else if (recipe.Ingredientes) {
      ingredientsDisplay = 'Invalid data'; 
    }
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
            <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
            { ingredientsDisplay }
            </Text>
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
      
      renderItem={({ item }) => {
        
        console.log(`Displaying recipe: ${item.Nome}, Ingredients:`, item.Ingredientes);

        let ingredientsDisplay = '';
        if (Array.isArray(item.Ingredientes)) {
          if (item.Ingredientes.length > 0) {
            if (typeof item.Ingredientes[0] === 'string') {
              ingredientsDisplay = item.Ingredientes.join(', ');

            } else if (typeof item.Ingredientes[0] === 'object') {
              ingredientsDisplay = item.Ingredientes.map((ing: Ingredients) => 
                `${ing.quantidade || ''} ${ing.ingrediente || ''}`.trim()
              ).filter(s => s.length > 0).join('; ');
              
              if (!ingredientsDisplay) { 
                ingredientsDisplay = 'Ingredient formating fail';
              }
            } else {
              ingredientsDisplay = 'Unknown ingredient format';
            }
          } else {
            ingredientsDisplay = 'Nenhum ingrediente cadastrado :(';
          }
        } else if (item.Ingredientes) {
          ingredientsDisplay = 'Invalid data'; 
        }

        return (
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
    {item.image_url && (
      <Image
        source={{ uri: item.image_url }}
        style={{ width: '100%', height: 200, borderRadius: 8 }}
        resizeMode="cover"
      />
    )}
    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 8 }}>
      {item.Nome}
    </Text>
    <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
      Ingredientes: {ingredientsDisplay}
    </Text>
  </TouchableOpacity>
);
      }}
    />
  );
}

export default function initialPage() {
  // state receitas
  const router = useRouter();
  const params = useLocalSearchParams<{ recipes?: string}>();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);  // Currently shown recipes
  const [selectedtRecipeList, setSelectedRecipeList] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [query, setQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'title' | 'ingredients' | 'all'>('all');

  //to get ip
  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];

  const fetchData = async () => {
    // Pode ser guardada em um hook
    try {
        const response = await axios.get(`${apiUrl}/recipe/getRecipes/`);
        console.log("/recipe/getRecipes/ JSON data: ", JSON.stringify(response.data, null, 2));

        const recipesFromApi = response.data.recipes || response.data;
        setAllRecipes(recipesFromApi);
        setSelectedRecipeList(recipesFromApi);
        setDisplayedRecipes(recipesFromApi);  // Initially, same as allRecipes
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() =>{    
    if (params.recipes) {  // Show OCR filtered recipes in case they're "carried" as parameters in URL
      try {
        const ocrRecipes = JSON.parse(params.recipes);

        showCustomRecipeList(ocrRecipes);
        
      } catch(err) {
        alert("Não foi possível processar receitas");
        console.error("Error while processing ocr recipes", err);
        fetchData();  // Fallback in case of error
      }
    } else {
      fetchData();
    }
  }, [params.recipes]);

  useEffect(() => {
    handleSearch(query);
  }, [filterMode, selectedtRecipeList]);

  // Shows desired list of recipes on screen
  const showCustomRecipeList = (customList: Recipe[]) => {
    setSelectedRecipeList(customList);
    setDisplayedRecipes(customList);
    setSelectedRecipe(null);
    console.log(`Showing custom list of ${customList.length} recipes: `, customList);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    const lowered = text.toLocaleLowerCase();

    if (!text) {
      setDisplayedRecipes(selectedtRecipeList);
      return;
    }

    const filtered = selectedtRecipeList.filter(item => {

      if (filterMode === 'title') {
        return item.Nome.toLocaleLowerCase().includes(lowered);
      }
      else if (filterMode === 'ingredients') {
        return item.Ingredientes.toString().toLocaleLowerCase().includes(lowered);
      } 
      else{
        return (
          item.Nome.toLocaleLowerCase().includes(lowered) ||
          item.Ingredientes.toString().toLocaleLowerCase().includes(lowered)
        );
      }
    })
    setDisplayedRecipes(filtered);
  }

  const ocrInputPush = () => {
    router.push('/ocrInputPage');
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCameraPress = () => {
    alert('Abrir câmera (simulado)');
  };

  const handleRecipesPress = () => {
    showCustomRecipeList(allRecipes); // Note: needs debugging 
  };

  const handlePerfilPress = () => {
    router.push('/addUser');
  };

  const handleFloatPress = () => {
    router.push('/addRecipe');
  }


// (!) Barra de pesquisa altera por função dependente de mock haardcoded, corrigir
  return (
    <View style={stylesDetails.container2}>
      <View style={[styles.header, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          placeholder="Pesquisar..."
          value={query}
          onChangeText={handleSearch}
          style={[stylesDetails.searchInput, { flex: 1 }]}
        />
        <Ionicons name="search" size={24} color="#D62626" style={{ marginLeft: 10 }}
        testID="search-icon" />
      </View>

      {/* Filtros de busca */}
      <View style={stylesDetails.filterContainer}>
        <TouchableOpacity
          style={[stylesDetails.filterButton, filterMode === 'title' && stylesDetails.selected]}
          onPress={() => setFilterMode("title")}
        >
          <Text style={stylesDetails.filterText} > Tiítulo </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesDetails.filterButton, filterMode === 'ingredients' && stylesDetails.selected]}
          onPress={() => setFilterMode("ingredients")}
        >
          <Text style={stylesDetails.filterText}> Ingredientes </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[stylesDetails.filterButton, filterMode === 'all' && stylesDetails.selected]}
          onPress={() => setFilterMode("all")}
        >
          <Text style={stylesDetails.filterText}> Todos </Text>
        </TouchableOpacity>
      </View>

      {selectedRecipe ? (
        <RecipeView recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
      ) : (
        <RecipeList recipes={displayedRecipes} onSelect={handleSelectRecipe} />
      )}

      <SafeAreaView style={styles.footer}>
        <TouchableOpacity onPress={handleRecipesPress} style={styles.iconWrapper}
          testID="receipt-icon">
          <Ionicons name="receipt" size={30} color="#FFF" />
        </TouchableOpacity>

        <View style= {styles.cameraPadding}>
        <TouchableOpacity onPress={ocrInputPush} style={styles.cameraButton}>
          <FontAwesome name="camera" size={25} color="#D62626"
          testID='camera-icon' />
        </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handlePerfilPress} style={styles.iconWrapper}
          testID="perfil-icon">
          <FontAwesome5 name="user-alt" size={24} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>

        <TouchableOpacity onPress={handleFloatPress} style={styles.floatButton}
        testID="flutunte-icon">
        <FontAwesome5 name="plus" size={24} color="#FFF" />
        </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};
