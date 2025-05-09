import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const DATA = [
  { id: '1', name: 'Banana' },
  { id: '2', name: 'Maçã' },
  { id: '3', name: 'Laranja' },
  { id: '4', name: 'Abacaxi' },
];

export default function inicialPage() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DATA);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = DATA.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleCameraPress = () => {
    alert('Abrir câmera (simulado)');
  };

  const handleReceitasPress = () => {
    alert('Ir para Receitas');
  };

  const handleEstoquePress = () => {
    alert('Ir para Estoque');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Pesquisar..."
          value={query}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Ainda não há receitas registradas :(</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleReceitasPress}>
          <Text style={styles.sideText}>Receitas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCameraPress} style={styles.cameraButton}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEstoquePress}>
          <Text style={styles.sideText}>Estoque</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
  sideText: {
    fontSize: 16,
    color: '#333',
  },
  cameraButton: {
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cameraIcon: {
    fontSize: 28,
  },
});
