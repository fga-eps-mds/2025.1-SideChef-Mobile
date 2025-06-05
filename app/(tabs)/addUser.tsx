import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';


export default function CadastroUsuario() {
  const [cpf, setCpf] = useState('');
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
    if (!cpf || !email || !password || !emailCheck || !passwordCheck) {
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
     
      <View>
        <Text>CPF</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={11}
        value={cpf}
        onChangeText={setCpf}
      />

      <View>
        <Text>E-mail</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View>
        <Text>Confirmacao de E-mail</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="E-mail Check"
        keyboardType="email-address"
        value={emailCheck}
        onChangeText={setEmailCheck}
      />

      <View>
        <Text>Senha</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <View>
        <Text>Confirmacao de Senha</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="SenhaCheck"
        secureTextEntry
        value={passwordCheck}
        onChangeText={setPasswordCheck}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(tabs)/inicialPage')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 24, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#D62626' },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D62626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  backButton: { marginTop: 16, 
    alignItems: 'center'
  },
  backButtonText: { 
    color: '#666',
    textDecorationLine: 'underline' 
    },
})
