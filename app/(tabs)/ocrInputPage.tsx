import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  image_url?: string;
};

export default function ocrInputPage() {
    const initialPagePush = () => {
        router.push('/menu');
}
  const [imageUris, setImageUris] = useState<string[]>([]);
    
  const handleUpload = async () => {
    if (imageUris.length > 0) {
      await uploadImages(imageUris);
    } else {
      alert("Por favor envie pelo menos uma imagem.");
    }
  }

    //cam
    //camera permission
    async function getCameraPermission() {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permita o acesso a câmera para poder usufruir dessa funcionalidade.');
      }
    }
    
    
    //function to open the camera
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
      const uploadImages = async (uris: string[]) => {
        const formData = new FormData();

        for (const uri of uris) {
          
          let fileName = '';
          let fileType = '';
          let mimeType = '';
          
          console.log('Original URI:', uri);
          
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
      
                formData.append('files', blob, fileName);
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
      
            formData.append('files', {
              uri: uri,
              name: fileName,
              type: `image/${fileType}`,
            } as any);
          }
          
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
    
          if (result && result.recipes && result.recipes.length > 0) {

            const ocrRecipes: Recipe[] = result.recipes.map((recipe: any, index: number) => ({
              _id: recipe.id || recipe._id || `${recipe.Nome}-${index}`,
              Nome: recipe.Nome,
              Dificuldade: recipe.Dificuldade,
              Ingredientes: recipe.Ingredientes.map((ingredient: any) => ({
                quantidade: ingredient.quantidade || '',
                ingrediente: ingredient.ingrediente || ''
              })),
              Preparo: recipe.Preparo,
              image_url: recipe.image_url,
            }));

            router.push({  // Send recipes as a parameter back to menu
              pathname: "/menu",
              params: { 'recipes': JSON.stringify(ocrRecipes) }
            });

          } else {
            alert("Nenhuma receita foi encontrada com todos os ingredientes nas imagens");
            console.error('OCR result is not a valid recipe list and/or is empty.');
          }
        } catch (error) {
          console.error('Error sending image: ', error);
        }
      
    
      };
    //uploadImage END

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.bigContainer}>
    <View style={styles.container1}>
        <Text style={styles.text}>
          Ingredientes adicionados:    
          </Text>
      <ScrollView style={{ margin: 50, marginTop: 20, marginBottom: 30, }}>
        {imageUris.map((uri, index) => (
        <View key={uri} style={styles.card}>
          <Image
            source={{ uri }}
            style={{
              width: '100%',
              height: 300,
              marginBottom: 10,
              borderRadius: 8,
            }}
          />
          <View style={styles.cardFooter}>
            <Text style={{ color: '#888', fontSize: 16, textAlign: 'center' }}>
              Ingrediente {index + 1}
            </Text>
          </View>
        </View>
        ))}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 16, textAlign: 'center' }}>
            Para adicionar um ingrediente, tire uma foto.
          </Text>
        </View>
      </ScrollView>

    
    
    </View>
    <View style={styles.footer}>
         <View style={styles.footerColor}></View>

      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={openCam} style={styles.button}>
          <FontAwesome name="camera" size={24} color="#D62626" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpload} style={styles.button}>
          <FontAwesome name="check" size={24} color="#D62626" />
      </TouchableOpacity>
    </View>
    </View>
    </View>
    </SafeAreaView>
  );
}

//styles
const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
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
    bigContainer: {
        flex: 1,
        margin: 0,      
    },
    container1: {
        flex: 1,
        margin: 20,      
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 2,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20,
        paddingTop: 8,
        
    },
    text: {
        fontSize: 24, 
        alignSelf: 'center',
        fontWeight: 'bold', 
        color: '#D62626', 
        marginBottom: 60,   
        top: 40, 
    },
    footer: {
        height: 90,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        
    },footerColor: {
        height: '100%',
        width: '100%',
        backgroundColor: '#D62626',
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        alignItems: 'center',
    },
    cardFooter: {
        paddingBottom: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#fff',
        width: '100%',
    },
});
