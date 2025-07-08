import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const router = useRouter();

const receitas = [
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
  {
    id: 'card4',
    title: 'STROGONOFF DE Frango',
    ingredients: ['Frango', 'Creme de Leite', 'Ketchup', 'Mostarda'],
    image: require('../../assets/images/strogonoff.png'),
  },
  {
    id: 'card5',
    title: 'LASANHA Bolonhesa',
    ingredients: ['Carne', 'Massa', 'Molho de tomate', 'Queijo'],
    image: require('../../assets/images/lasanha.jpg'),
  },
  {
    id: 'card6',
    title: 'Coxinha de Frango',
    ingredients: ['Frango', 'Farinha Panko', 'Ovos'],
    image: require('../../assets/images/coxinha.jpeg'),
  },
  {
    id: 'card7',
    title: 'STROGONOFF DE Frango',
    ingredients: ['Frango', 'Creme de Leite', 'Ketchup', 'Mostarda'],
    image: require('../../assets/images/strogonoff.png'),
  },
  {
    id: 'card8',
    title: 'LASANHA Bolonhesa',
    ingredients: ['Carne', 'Massa', 'Molho de tomate', 'Queijo'],
    image: require('../../assets/images/lasanha.jpg'),
  },
  {
    id: 'card9',
    title: 'Coxinha de Frango',
    ingredients: ['Frango', 'Farinha Panko', 'Ovos'],
    image: require('../../assets/images/coxinha.jpeg'),
  },
  {
    id: 'card10',
    title: 'STROGONOFF DE Frango',
    ingredients: ['Frango', 'Creme de Leite', 'Ketchup', 'Mostarda'],
    image: require('../../assets/images/strogonoff.png'),
  },
  {
    id: 'card11',
    title: 'LASANHA Bolonhesa',
    ingredients: ['Carne', 'Massa', 'Molho de tomate', 'Queijo'],
    image: require('../../assets/images/lasanha.jpg'),
  },
  {
    id: 'card12',
    title: 'Coxinha de Frango',
    ingredients: ['Frango', 'Farinha Panko', 'Ovos'],
    image: require('../../assets/images/coxinha.jpeg'),
  },
];

export default function InicialPage() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(receitas);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const debuggerHost =
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.manifest?.debuggerHost;
  const localIp = debuggerHost?.split(':')[0];

  //state for searching
  const [searchActive, setSearchActive] = useState(false);

  //side bar state
  const [showSidebar, setShowSidebar] = useState(false)

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = receitas.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  async function openCam() {
    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.length > 0) {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>

        {showSidebar && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setShowSidebar(false)} // fecha quando clica fora
          >
            <View style={styles.sidebar}>
              {/*bottons*/}
              {/*logo*/}
              <Image
                  source={require('../../assets/images/SideChef-05.png')}
                  style={styles.sideBarlogoImage}
              />
              <TouchableOpacity onPress={() => setShowSidebar(false)}
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
        )}
        {/* Topo */}
        <View style={styles.topBar}>
          {!searchActive ? (
            <>
               {/*menu icon*/}
              <TouchableOpacity onPress={() => setShowSidebar(true)}
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
              <TouchableOpacity onPress={() => setSearchActive(true)}>
                <Ionicons name="search" size={24} color="#000" />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.searchTopContainer}>
              <TextInput
                autoFocus
                placeholder="Pesquisar..."
                value={query}
                onChangeText={handleSearch}
                style={styles.searchInputTop}
              />
              <TouchableOpacity onPress={() => setSearchActive(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Lista */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma receita encontrada :(</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() =>
                router.push({ pathname: './details', params: { id: item.id } })
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.recipeLevel}>INICIANTE</Text>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.recipeIngredients}>
                  {item.ingredients.join(', ')}
                </Text>
              </View>
              <Image source={item.image} style={styles.recipeImage} />
            </TouchableOpacity>
          )}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Ionicons name="home" size={24} color="#D62626" />
          </TouchableOpacity>

          <TouchableOpacity onPress={openCam} style={styles.centerButton}>
            <FontAwesome name="camera" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="account" size={28} color="#D62626" />
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeLevel: {
    color: '#D62626',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  recipeIngredients: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  centerButton: {
    backgroundColor: '#D62626',
    padding: 14,
    borderRadius: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  topBar: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  searchTopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputTop: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 265,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 10,
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  openMenuButton: {
    top: 10, 
    left: 20,    
    elevation: 10 ,
  },
  closeMenuButton: {
    top: -20, 
    left: 190, 
  },
  sideBarlogoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    left: 0,
    top: 10,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  
  sidebarIcon: {
    marginRight: 10,
  },
  
  sidebarText: {
    fontSize: 18,
    color: '#333',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    opacity: 10,
    marginHorizontal: 0,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1, // necessário para Android
  },
  
});
