import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../styles/addRecipe.styles';
import api from '../../services/api';

//Need to change the var's name to english in RecipeService recipe.py!!!
export default function CadastroReceita() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [prepare, setPrepare] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [typeOpen, setTypeOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);

  const [typeItems, setTypeItems] = useState([
    { label: 'Doce', value: 'Doce' },
    { label: 'Salgada', value: 'Salgada' },
  ]);

  const [difficultyItems, setDifficultyItems] = useState([
    { label: 'Fácil', value: 'Fácil' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Difícil', value: 'Difícil' },
  ]);

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

  const handleCadastro = async () => {
    if (!name || !type || !difficulty || !prepare || ingredients.some(i => i.trim() === '')) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaReceita = {
      name: name,
      type: type,
      difficulty: difficulty,
      ingredients: ingredients.map((i) => ({
      ingrediente: i,
      quantidade: "",
      })),
      prepare: prepare,
    };

    try {
      await api.post('/recipe/createRecipes/', novaReceita);
      Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
      router.replace('/initialPage');
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message;
      Alert.alert("Erro ao cadastrar receita", msg);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Receitas</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          <Text style={styles.imagePickerText}>+ Adicionar foto</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
        )}

        <TextInput style={styles.input} placeholder="Título da Receita" placeholderTextColor="#fff" value={name} onChangeText={setName} />

        <Text style={styles.subTitle}>Tipo</Text>
        <DropDownPicker
          open={typeOpen}
          value={type}
          items={typeItems}
          setOpen={setTypeOpen}
          setValue={setType}
          setItems={setTypeItems}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholder="Selecione o tipo"
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.dropdownLabel}
          listItemLabelStyle={styles.dropdownLabel}

        />

        <Text style={styles.subTitle}>Dificuldade</Text>
        <DropDownPicker
          open={difficultyOpen}
          value={difficulty}
          items={difficultyItems}
          setOpen={setDifficultyOpen}
          setValue={setDifficulty}
          setItems={setDifficultyItems}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholder="Selecione a dificuldade"
          dropDownContainerStyle={styles.dropdownContainer}
          labelStyle={styles.dropdownLabel}
          listItemLabelStyle={styles.dropdownLabel}

        />

        <Text style={styles.subTitle}>Ingredientes</Text>
        {ingredients.map((ing, idx) => (
          <TextInput
            key={idx}
            style={styles.input}
            placeholder={`Ingrediente ${idx + 1}`}
            placeholderTextColor="#fff"
            value={ing}
            onChangeText={(text) => handleIngredientChange(idx, text)}
          />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>+ Adicionar Ingrediente</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Modo de Preparo</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
          placeholder="Descreva o modo de preparo"
          placeholderTextColor="#fff"
          value={prepare}
          onChangeText={setPrepare}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}