import React, { useState } from 'react';
import { Alert, ImageBackground, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/addRecipe.styles';
import api from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G } from 'react-native-svg';

//Need to change the var's name to english in RecipeService recipe.py!!!
export default function CadastroReceita() {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [ingredientsQtd, setIngredientsQtd] = useState<string[]>(['']);
  const [prepare, setPrepare] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);


  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const router = useRouter();

  

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleIngredientQtdChange = (index: number, value: string) => {
    const newIngredientsQtd = [...ingredientsQtd];
    newIngredientsQtd[index] = value;
    setIngredientsQtd(newIngredientsQtd);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };


  const handleCadastro = async () => {
    const validIngredients = ingredients
      .map((name, idx) => ({ name: name.trim(), quantity: ingredientsQtd[idx]?.trim() }))
      .filter(ing => ing.name !== '' && ing.quantity !== '');

    console.log("Função handleCadastro foi chamada");
    if (!name || !difficulty || !prepare ||  validIngredients.length === 0 || !imageUri) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

   const newRecipe = {
    name,
    difficulty,
    ingredients: validIngredients,
    prepare,
    image_url: imageUri
  };

    try {
  console.log("Enviando receita para o backend:", newRecipe);
  await api.post('/recipe/createRecipes/', newRecipe);
  Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
  router.replace('/initialPage');
} catch (error: any) {
  console.error("Erro ao cadastrar receita:", error);
  const msg = error.response?.data?.detail || error.message;
  Alert.alert("Erro ao cadastrar receita", msg);
}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/menu')}>
          <Text style={styles.cancelButtonText}>{'\u00D7'}</Text>

        </TouchableOpacity>
        <Text style={styles.headerText}>Criar Receita</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>

        <TouchableOpacity style={styles.imagePreview} onPress={handleImagePick}>
            {imageUri ? (
              <ImageBackground
                source={{ uri: imageUri }}
                style={styles.imagePreview}
                imageStyle={{ borderRadius: 10 }}
                resizeMode="cover"
              >
                <View style={styles.overlay}>
                  <Text style={styles.imagePickerText}>+ Alterar foto</Text>
                </View>
              </ImageBackground>
            ) : (
              <View style={[styles.imagePreview, styles.imagePickerPlaceholder]}>
                <Text style={styles.imagePickerText}>+ Adicionar foto</Text>
              </View>
            )}
          </TouchableOpacity>



        <Text style={styles.subTitle}>Título da Receita</Text>
        <TextInput style={styles.input} placeholder="e.x.: Bolo Simples" placeholderTextColor="#974E52" value={name} onChangeText={setName} />

        <Text style={styles.subTitle}>Ingredientes</Text>
        {ingredients.map((ing, idx) => (
          <View key={idx} style={styles.ingredientRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder={`Ingrediente ${idx + 1}`}
              placeholderTextColor="#974E52"
              value={ing}
              onChangeText={(text) => handleIngredientChange(idx, text)}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder={`Qtd (e.x.: 200g)`}
              placeholderTextColor="#974E52"
              value={ingredientsQtd[idx]}
              onChangeText={(text) => handleIngredientQtdChange(idx, text)}
            />
            {ingredients.length > 1 && idx !== ingredients.length - 1 &&  (
             <TouchableOpacity onPress={() => handleRemoveIngredient(idx)} style={styles.removeButton}>
              <Svg style={styles.svgRemoveIcon} width={24} height={24} viewBox="0 0 24 24" fill="none">
                <G>
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"
                    fill={'#974E52'}
                  />
                </G>
              </Svg>
              
             </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>+ Adicionar Ingrediente</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Modo de Preparo</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
          placeholder="Descreva o modo de preparo..."
          placeholderTextColor="#974E52"
          value={prepare}
          onChangeText={setPrepare}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.difficultyButton, selectedDifficulty === 'Iniciante' && styles.selectedButton]} 
            onPress={() => {setSelectedDifficulty('Iniciante'); setDifficulty('Iniciante');}}
          >
            <Text style={[styles.buttonText, selectedDifficulty === 'Iniciante' && styles.selectedButtonText]}>Iniciante</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.difficultyButton, selectedDifficulty === 'Intermediário' && styles.selectedButton]} 
            onPress={() => {setSelectedDifficulty('Intermediário'); setDifficulty('Intermediário');}}
          >
            <Text style={[styles.buttonText, selectedDifficulty === 'Intermediário' && styles.selectedButtonText]}>Intermediário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.difficultyButton, selectedDifficulty === 'Avançado' && styles.selectedButton]} 
            onPress={() => {setSelectedDifficulty('Avançado'); setDifficulty('Avançado');}}
          >
            <Text style={[styles.buttonText, selectedDifficulty === 'Avançado' && styles.selectedButtonText]}>Avançado</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleCadastro}>
          <Text style={styles.saveButtonText}>Salvar Receita</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}