import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.API_BASE_URL;

const router = useRouter();


interface Ingredients {
  quantidade: string;
  ingrediente: string;
}

interface Recipe {
  _id: string;
  Nome: string;
  Dificuldade: string;
  Ingredientes: Ingredients[];
  Preparo: string;
};


export default function ocrInputPage() {
    const initialPagePush = () => {
        router.push('/inicialPage');
}
  const [imageUris, setImageUris] = useState<string[]>([]);
    
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
          const newUri = result.assets[0].uri;
          console.log(newUri);
          setImageUris(prevUris => [...prevUris, newUri]);
           //await uploadImage(uri);
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


    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);  // Currently shown recipes
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const showCustomRecipeList = (customList: Recipe[]) => {
    setDisplayedRecipes(customList);
    setSelectedRecipe(null);
    console.log(`Showing custom list of ${customList.length} recipes.`);
  };
  

  return (
    <View>
    <View style={styles.container1}>
        <Text style={{
            fontSize: 24, alignSelf: 'center',
            fontWeight: 'bold', color: '#D62626', marginBottom: 20,}}>
          Ingredientes adicionados:    
          </Text>
      <ScrollView style={{ marginTop: 20 }}>
        {imageUris.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{
              width: 100,
              height: 100,
              marginBottom: 10,
              borderRadius: 8,
            }}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={openCam} style={styles.cameraButton}>
          <FontAwesome name="camera" size={24} color="#D62626" />
      </TouchableOpacity>
      <TouchableOpacity onPress={initialPagePush} style={styles.cameraButton}>
          <FontAwesome name="check" size={24} color="#D62626" />
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>

    </View>
    </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    margin: 3,
  },
  container1: {
    flex: 1,
    margin: 20,      
}, buttonsContainer: {
    flex: 1,   
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
},
    text:{
    fontSize: 24, 
    alignSelf: 'center',
    fontWeight: 'bold', 
    color: '#D62626', 
    marginBottom: 20,    
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
});
