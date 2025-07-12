import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { styles as stylesDetails } from '../styles/details.styles';
import { styles, detailStyles } from '../styles/menu.styles';
import { Image } from 'react-native';

import Constants from 'expo-constants';

import axios from "axios";

const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;


const router = useRouter();

interface ChildStateProps {
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ChildFuncProps {
  func: ()=>void;
}

interface TopBarProps extends ChildStateProps {
  setFuncSec: React.Dispatch<React.SetStateAction<boolean>>;
  funcSearch: (text:string) => void
  query: string;
  isSearch: boolean;
}

interface Ingredients {
  quantity: string;
  ingredient: string;
}

interface Recipe {
  _id: string;
  Name: string;
  Difficulty: string;
  Type: string;
  Ingredients: Ingredients[]; //
  Preparation: string;
  image_url: string;
};

interface RecipeListViewProp{
    recipes: Recipe[],
    onSelect: (recipe: Recipe) => void

}

const TopBar = ({setFunc, setFuncSec, funcSearch, query, isSearch} : TopBarProps) => {
    return(
        <View style={styles.topBar}>
          {!isSearch ? (
            <>
               {/*menu icon*/}
              <TouchableOpacity onPress={() => setFunc(true)}
                style={styles.openMenuButton}
                >
                <Feather name="menu" size={24} color="#000" />
              </TouchableOpacity>

              {/*logo*/}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/SideChef-05.png')}
                  style={styles.logoImage}
                />
              </View>
              {/*search icon*/}
              <TouchableOpacity onPress={() => setFuncSec(true)}>
                <Ionicons name="search" size={24} color="#000" />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.searchTopContainer}>
              <TextInput
                autoFocus
                placeholder="Pesquisar..."
                value={query}
                onChangeText={funcSearch}
                style={styles.searchInputTop}
              />
              <TouchableOpacity onPress={() => setFuncSec(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View>
    )
}

const SideBar = ({setFunc}: ChildStateProps) => {
  return(
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={() => setFunc(false)} // fecha quando clica fora
    >
      <View style={styles.sidebar}>
        {/*bottons*/}
        {/*logo*/}
        <Image
            source={require('../../assets/images/SideChef-05.png')}
            style={styles.sideBarlogoImage}
        />
        <TouchableOpacity onPress={() => setFunc(false)}
          style={styles.closeMenuButton}
          >
          <Feather name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.sidebarItem}>
          <Feather name="book" size={20} color="#333" style={styles.sidebarIcon} />
          <Text style={styles.sidebarText}>Minhas Receitas</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.sidebarItem}>
          <Feather name="settings" size={20} color="#333" style={styles.sidebarIcon} />
          <Text style={styles.sidebarText}>Configurações</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.sidebarItem}>
          <Feather name="log-out" size={20} color="#333" style={styles.sidebarIcon} />
          <Text style={styles.sidebarText}>Desconectar</Text>
        </View>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );
};

const RecipeView = ({recipe, onBack}: {recipe: Recipe, onBack: () => void}) => {
  let ingredientsDisplay = '';
    if (Array.isArray(recipe.Ingredients)) {
      if (recipe.Ingredients.length > 0) {
        if (typeof recipe.Ingredients[0] === 'string') {
          ingredientsDisplay = recipe.Ingredients.join(', ');

        } else if (typeof recipe.Ingredients[0] === 'object') {
          ingredientsDisplay = recipe.Ingredients.map((ing: Ingredients) => 
            `${ing.quantity || ''} ${ing.ingredient || ''}`.trim()
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
    } else if (recipe.Ingredients) {
      ingredientsDisplay = 'Invalid data'; 
    }
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={detailStyles.scroll}>

        <TouchableOpacity style={detailStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#D62626" />
          <Text style={detailStyles.backText}>{recipe.Name}</Text>
        </TouchableOpacity>

        <View style={detailStyles.card}>
          <Image source={{uri: recipe.image_url}} style={detailStyles.image} />

          <Text style={detailStyles.title}>{recipe.Name}</Text>

          {/* <View style={detailStyles.timeRow}>
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={detailStyles.timeText}>{recipe.time}</Text>
          </View> */}

          <Text style={detailStyles.sectionTitle}>Ingredientes:</Text>
          {recipe.Ingredients.map((ing, i) => (
            <Text key={i} style={detailStyles.ingredient}>
              - {typeof ing === 'string' ? ing : `${ing.quantity || ''} ${ing.ingredient || ''}`.trim()}
            </Text>
          ))}

          <Text style={detailStyles.sectionTitle}>Modo de Preparo:</Text>
          <Text style={detailStyles.preparo}>{recipe.Preparation}</Text>
        
          <View style={detailStyles.actions}>
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
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma receita encontrada :(</Text>
            </View>
          }
      
      renderItem={({ item }) => {

        console.log(`Displaying recipe: ${item.Name}, Ingredients:`, item.Ingredients);

        let ingredientsDisplay = '';
        if (Array.isArray(item.Ingredients)) {
          if (item.Ingredients.length > 0) {
            if (typeof item.Ingredients[0] === 'string') {
              ingredientsDisplay = item.Ingredients.join(', ');

            } else if (typeof item.Ingredients[0] === 'object') {
              ingredientsDisplay = item.Ingredients.map((ing: Ingredients) => 
                `${ing.quantity || ''} ${ing.ingredient || ''}`.trim()
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
        } else if (item.Ingredients) {
          ingredientsDisplay = 'Invalid data'; 
        }

        return (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() =>
                onSelect(item)
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.recipeLevel}>{item.Difficulty}</Text>
                <Text style={styles.recipeTitle}>{item.Name}</Text>
                <Text numberOfLines={1} style={styles.recipeIngredients}>
                  {item.Ingredients.map((ing: Ingredients) => 
                `${ing.quantity || ''} ${ing.ingredient || ''}`.trim()
              ).join(', ')}
                </Text>
              </View>
              <Image source={{uri: item.image_url}} style={styles.recipeImage} />
            </TouchableOpacity>
          )}
      }
    />
  );
}

const Footer = ({func}: ChildFuncProps) => {
    return(
    <View style={styles.footer}>
      <TouchableOpacity>
        <Ionicons name="home" size={24} color="#D62626" />
      </TouchableOpacity>
      <TouchableOpacity onPress={func} style={styles.centerButton}>
        <FontAwesome name="camera" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="account" size={28} color="#D62626" />
      </TouchableOpacity>
    </View>
    )
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

  // searchBar state
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  // search active
  const [searchActive, setSearchActive] = useState(false);

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
        return item.Name.toLocaleLowerCase().includes(lowered);
      }
      else if (filterMode === 'ingredients') {
        return item.Ingredients.toString().toLocaleLowerCase().includes(lowered);
      } 
      else{
        return (
          item.Name.toLocaleLowerCase().includes(lowered) ||
          item.Ingredients.toString().toLocaleLowerCase().includes(lowered)
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={stylesDetails.container2}>
        
        {showSidebar && <SideBar setFunc={setShowSidebar}/>}
        
        <TopBar setFunc={setShowSidebar} setFuncSec={setSearchActive} funcSearch={handleSearch} query={query} isSearch={searchActive}/>
        
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
    </KeyboardAvoidingView>
  );
};
