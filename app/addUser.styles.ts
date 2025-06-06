import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24 
  },
  form: {
    gap: 12,
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
      footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  link: {
    fontWeight: 'bold',
    color: '#000',
  },
})