import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../services/api';
import { styles } from '../styles/addRecipe.styles';

export default function CadastroReceita() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');

  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !tipo || !dificuldade || !ingredientes || !preparo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaReceita = {
      Nome: nome,
      Tipo: tipo,
      Dificuldade: dificuldade,
      Ingredientes: ingredientes.split(',').map(i => i.trim()),
      Preparo: preparo,
    };

    try {
      await api.post('/recipe/createRecipes/', novaReceita);
      Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
      router.push('/initialPage');
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message;
      Alert.alert('Erro ao cadastrar receita', msg);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nome da receita" value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholder="Tipo (ex: doce, salgado...)" value={tipo} onChangeText={setTipo} />
          <TextInput style={styles.input} placeholder="Dificuldade (ex: fácil, média...)" value={dificuldade} onChangeText={setDificuldade} />
          <TextInput
            style={styles.input}
            placeholder="Ingredientes (separados por vírgula)"
            value={ingredientes}
            onChangeText={setIngredientes}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Modo de preparo"
            value={preparo}
            onChangeText={setPreparo}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar Receita</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/initialPage')}>
            <Text style={styles.footerText}>
              <Text style={styles.link}>Voltar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
