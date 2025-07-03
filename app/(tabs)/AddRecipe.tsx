import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { styles } from '../styles/addRecipe.styles';

export default function AddRecipe() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [preparo, setPreparo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredientes, setIngredientes] = useState([{ nome: '', quantidade: '' }]);

  const router = useRouter();

  const handleAddIngredient = () => {
    setIngredientes([...ingredientes, { nome: '', quantidade: '' }]);
  };

  const handleChangeIngredient = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredientes];
    newIngredients[index][field] = value;
    setIngredientes(newIngredients);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/recipes', {
        Nome: nome,
        Tipo: tipo,
        Dificuldade: dificuldade,
        Preparo: preparo,
        image_url: imageUrl,
        Ingredientes: ingredientes
      });

      Alert.alert('Receita adicionada com sucesso!');
      router.push('/'); // ou vá para onde desejar
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao salvar receita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova Receita</Text>

      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Tipo" style={styles.input} value={tipo} onChangeText={setTipo} />
      <TextInput placeholder="Dificuldade" style={styles.input} value={dificuldade} onChangeText={setDificuldade} />
      <TextInput placeholder="Modo de Preparo" style={styles.input} multiline value={preparo} onChangeText={setPreparo} />
      <TextInput placeholder="URL da Imagem" style={styles.input} value={imageUrl} onChangeText={setImageUrl} />

      <Text style={styles.subtitle}>Ingredientes</Text>
      {ingredientes.map((ing, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            placeholder="Nome"
            style={styles.inputSmall}
            value={ing.nome}
            onChangeText={(value) => handleChangeIngredient(index, 'nome', value)}
          />
          <TextInput
            placeholder="Quantidade"
            style={styles.inputSmall}
            value={ing.quantidade}
            onChangeText={(value) => handleChangeIngredient(index, 'quantidade', value)}
          />
        </View>
      ))}

      <TouchableOpacity onPress={handleAddIngredient} style={styles.buttonSecondary}>
        <Text style={styles.buttonText}>+ Ingrediente</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
