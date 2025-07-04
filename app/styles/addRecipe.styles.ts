// addRecipe.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D62626',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    alignSelf: 'center',
  },
  imagePicker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#D62626',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  subTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#D62626',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 14,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 14,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#D62626',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 12,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdownPlaceholder: {
    color: '#000',
    fontWeight: 'normal',
  },
  dropdownLabel: {
    color: '#000',
    fontSize: 16,
}

});
