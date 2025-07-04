import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/addRecipe.styles';
import api from '../../services/api';

export default function CadastroReceita() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [ingredientes, setIngredientes] = useState<string[]>(['']);
  const [preparo, setPreparo] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

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
    setIngredientes([...ingredientes, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredientes];
    newIngredients[index] = value;
    setIngredientes(newIngredients);
  };

  const handleCadastro = async () => {
    if (!nome || !tipo || !dificuldade || !preparo || ingredientes.some(i => i.trim() === '')) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaReceita = {
      Nome: nome,
      Tipo: tipo,
      Dificuldade: dificuldade,
      Ingredientes: ingredientes,
      Preparo: preparo,
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

        <TextInput style={styles.input} placeholder="Título da Receita" placeholderTextColor="#fff" value={nome} onChangeText={setNome} />

        <TextInput style={styles.input} placeholder="Tipo" placeholderTextColor="#fff" value={tipo} onChangeText={setTipo} />

        <TextInput style={styles.input} placeholder="Dificuldade" placeholderTextColor="#fff" value={dificuldade} onChangeText={setDificuldade} />

        <Text style={styles.subTitle}>Ingredientes</Text>
        {ingredientes.map((ing, idx) => (
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
          value={preparo}
          onChangeText={setPreparo}
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