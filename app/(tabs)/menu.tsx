import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
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
  quantidade: string;
  ingrediente: string;
}

interface Recipe {
  _id: string;
  Nome: string;
  Dificuldade: string;
  Tipo: string;
  Ingredientes: Ingredients[]; //
  Preparo: string;
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
      <ScrollView contentContainerStyle={detailStyles.scroll}>

        <TouchableOpacity style={detailStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#D62626" />
          <Text style={detailStyles.backText}>{recipe.Nome}</Text>
        </TouchableOpacity>

        <View style={detailStyles.card}>
          <Image source={{uri: recipe.image_url}} style={detailStyles.image} />

          <Text style={detailStyles.title}>{recipe.Nome}</Text>

          {/* <View style={detailStyles.timeRow}>
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={detailStyles.timeText}>{recipe.time}</Text>
          </View> */}

          <Text style={detailStyles.sectionTitle}>Ingredientes:</Text>
          {recipe.Ingredientes.map((ing, i) => (
            <Text key={i} style={detailStyles.ingredient}>- {ing}</Text>
          ))}

          <Text style={detailStyles.sectionTitle}>Modo de Preparo:</Text>
          <Text style={detailStyles.preparo}>{recipe.Preparo}</Text>
        
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
              style={styles.recipeCard}
              onPress={() =>
                onSelect(item)
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.recipeLevel}>INICIANTE</Text>
                <Text style={styles.recipeTitle}>{item.Nome}</Text>
                <Text numberOfLines={1} style={styles.recipeIngredients}>
                  {item.Ingredientes.join(', ')}
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
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);  // Currently shown recipes
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


  //state to store the image uri (may be useful in the future)
  const [imageUri, setImageUri] = useState<string | null>(null);

  const fetchData = async () => {
    // Pode ser guardada em um hook
    try {
        const response = await axios.get(`${apiUrl}/recipe/getRecipes/`);
        console.log("/recipe/getRecipes/ JSON data: ", JSON.stringify(response.data, null, 2));

        setAllRecipes(response.data);
        setDisplayedRecipes(response.data);  // Initially, same as allRecipes
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(query);
  }, [filterMode]);

  // Shows desired list of recipes on screen
  const showCustomRecipeList = (customList: Recipe[]) => {
    setDisplayedRecipes(customList);
    setSelectedRecipe(null);
    console.log(`Showing custom list of ${customList.length} recipes.`);
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    const lowered = text.toLocaleLowerCase();

    const filtered = receitas.filter(item => {

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
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

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
    router.push('/addRecipe');
  }

const receitas: Recipe[] = allRecipes || [];


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
    let fileName = '';
    let fileType = '';
    let mimeType = '';
    
    console.log('Original URI:', uri);
    
    const formData = new FormData();
    if (uri.startsWith('data:')) {  // data URI file (usually when testing via web)
      try {
        const mimeTypeMatch = uri.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
        const base64 = uri.split("base64,")[1];

        if (!base64 || !mimeTypeMatch) {
          console.log("Failed to format data URI: ", uri);
          return;
        }

        mimeType = mimeTypeMatch[0];  // image/jpeg
        fileType = mimeType.split('/')[1]  // jpeg
        fileName = `temp_img_${Date.now()}.${fileType}`;
        
        if (Platform.OS === 'web') {
          const byteChar = atob(base64);
          const byteNum = new Array(byteChar.length);
          for (let i = 0; i < byteChar.length; i++) {
            byteNum[i] = byteChar.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNum);
          const blob = new Blob([byteArray], {type: mimeType});

          formData.append('file', blob, fileName);
          console.log('Web blob created as formData: ', fileName, blob.type)
        } else {
          console.error('data URI while platform !== web');
          return;
        }

      } catch (err) {
        console.error("Error at processing data URI: ", err);
        return;
      }

    } else {  // Regular uri file (file://...)
      
      const extractedFileName = uri.split('/').pop();
      if (extractedFileName) {
        fileName = extractedFileName;
        const extractedFileType = fileName.split('.').pop()?.toLowerCase();
        if (extractedFileType) {
          fileType = extractedFileType;
          mimeType = `image/${fileType}`;
        } else {
          console.error('URI invalid file type: ', extractedFileType);
          return;
        }
      } else {
        console.error('URI invalid file name: ', extractedFileName);
        return;
      }

      console.log('FileName:', fileName, 'FileType:', fileType);
  
      if (!fileType || !fileName) {
        console.error('Could not determine file type/name: ', {processedUri: uri, fileName, fileType});
        return;
      }

      formData.append('file', {
        uri: uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      const response = await fetch(`${apiUrl}/ocr/run-ocr/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const fetchError = await response.text();
        console.error('OCR API error: ', response.status, fetchError);
        return;
      }

      const result = await response.json();
      console.log('OCR result: ', result);

      if (result && result.recipes) {
        const ocrRecipes: Recipe[] = result.recipes.map((recipe: any) => ({
          _id: recipe.id,
          Nome: recipe.Nome,
          Dificuldade: recipe.Dificuldade,
          Ingredientes: recipe.Ingredientes.map((ingredient: any) => ({
            quantidade: ingredient.quantidade || '',
            ingrediente: ingredient.ingrediente || ''
          })),
          Preparo: recipe.Preparo,
        }));
        
        showCustomRecipeList(ocrRecipes);  // Shows recipes compatible to OCR output

      } else {
        console.error('OCR result is not a valid recipe list and/or is empty.');
      }

    } catch (error) {
      console.error('Error sending image: ', error);
    }
  };
//uploadImage END


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

        <Footer func={openCam}/>

        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
};
