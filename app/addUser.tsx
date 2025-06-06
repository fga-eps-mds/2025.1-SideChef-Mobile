import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './addUser.styles';


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


  const handleCadastro = () => {
    if (!cpf || !email || !password || !emailCheck || !passwordCheck || !name) {
      console.log('Erro: campos faltando');
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (!cpfVerify(cpf)) {
      console.log('Erro: CPF inválido');
      Alert.alert('Erro', 'CPF invalido.');
      return;
    }
    if (!emailVerify(email)) {
      console.log('Erro: email inválido');
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }
    if (email !== emailCheck) {
      console.log('Erro: emails não coincidem');
      Alert.alert('Erro', 'E-mails não coincidem.');
      return;
    }
    if (password !== passwordCheck) {
      console.log('Erro: senhas não coincidem');
      Alert.alert('Erro', 'Senhas não coincidem.');
      return;
    }

      console.log('Todos os dados são válidos');
      (Alert. alert('Sucesso', 'Usuario cadastrado com sucesso'));
      router.push('/(tabs)/inicialPage');

  };

  return (
<View style={styles.container}>
  <Text style={styles.title}>Cadastro de Usuário</Text>

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

    <TouchableOpacity onPress={() => router.push('/login')}>
      <Text style={styles.footerText}>
        Já possui uma conta?
      <Text style={styles.link}> Entre!</Text>
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.footerText}>
              <Text style={styles.link}>Voltar</Text>
            </Text>
    </TouchableOpacity>
  </View>
</View>
  );
}
