import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../styles/addUser.styles';
import api from '../../services/api';

export default function CadastroUsuario() {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const router = useRouter();

  function cpfVerify(cpf: string): boolean {
    const digitsOnly = cpf?.trim().replace(/\D/g, '');
    return digitsOnly.length === 11;
  }

  function emailVerify(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleCadastro = async () => {
    if (!cpf || !email || !password || !emailCheck || !passwordCheck || !name) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      alert('Erro: Preencha todos os campos.');
      return;
    }
    if (!cpfVerify(cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      alert('Erro: CPF inválido');
      return;
    }
    if (!emailVerify(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      alert('Erro: E-mail inválido');
      return;
    }
    if (email !== emailCheck) {
      Alert.alert('Erro', 'E-mails não coincidem.');
      alert('Erro: E-mails não coincidem.');
      return;
    }
    if (password !== passwordCheck) {
      Alert.alert('Erro', 'Senhas não coincidem.');
      alert('Erro: Senhas não coincidem.');
      
      return;
    }

    try {
      const novoUsuario = {
        name,
        email,
        password,
        cpf,
      };

      const response = await api.post("/users/", novoUsuario);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      alert('Sucesso: Usuário cadastrado com sucesso!');
      
      router.push('/(tabs)/loginUser');
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.message;
      console.error(error.response?.data || error.message);
      Alert.alert("Erro", "Erro ao cadastrar usuário.");
      console.error("Erro detalhado:", error.response?.data || error.message);
      alert("Erro ao cadastrar usuário.");
      if (error.response?.status === 409) {
      alert("Erro: E-mail ou CPF já cadastrado.");
        } else {
          alert("Erro ao cadastrar: " + msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/LogoVermelha.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          keyboardType="numeric"
          maxLength={11}
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar e-mail"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          keyboardType="email-address"
          value={emailCheck}
          onChangeText={setEmailCheck}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          secureTextEntry
          value={passwordCheck}
          onChangeText={setPasswordCheck}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/loginUser')}>
          <Text style={styles.footerText}>
            Já possui uma conta?
            <Text style={styles.link}> Entre!</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/inicialPage')}>
          <Text style={styles.footerText}>
            <Text style={styles.link}>Voltar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
