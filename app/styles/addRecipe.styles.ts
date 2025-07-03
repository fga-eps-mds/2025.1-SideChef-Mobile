import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
  },
  ingredientRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: '#17a2b8',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
