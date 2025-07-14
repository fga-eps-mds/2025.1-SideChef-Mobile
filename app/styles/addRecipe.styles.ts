import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF9F9'
  },
  header: {
    backgroundColor: '#FBF9F9',
    flexGrow: 1,
    borderBottomWidth: 1,
    borderColor: '#00000040',
  },
  headerText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'Plus Jakarta Sans',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 24,
  },
  cancelButton: {
    position: 'absolute',
    left: 16,
    paddingLeft: 10,
    paddingTop: 4,
  },
  cancelButtonText: {
    fontSize: 36, 
    fontWeight: 'ultralight',
    color: '#555',
    lineHeight: 36,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FBF9F9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    alignSelf: 'center',
  },
  imagePickerContainer: { 
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A9A9A9', 
    borderRadius: 10,
    backgroundColor: 'transparent', 
    marginBottom: 16,
  },
  imagePickerContent: { 
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#A9A9A9',
    fontWeight: 'regular',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F3E7E8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#974E52',
    marginBottom: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E7D0D1',
  },
  subTitle: {
    color: '#222222',
    fontSize: 18,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#FBF9F9',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E7D0D1',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#E92933',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: 'regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  difficultyButton: {
    backgroundColor: '#FBF9F9',
    flex: 1,
    padding: 5,
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E7D0D1',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#E92933',
    borderColor: '#E92933',
  },
  buttonText: {
    color: '#222222',
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#E92933',
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    padding: 20,
    marginTop: 60,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'semibold',
    fontFamily: 'Plus Jakarta Sans',
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
  },
  dropdownWrapperType: {
    zIndex: 3000, // lower than the other, if needed to change in order to fix overlapping
    elevation: 3,
  },

  dropdownWrapperDifficulty: {
    zIndex: 2000, // lower than the other, if needed to change in order to fix overlapping
    elevation: 2,
  },

  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  removeButton: {
    marginLeft: 2,
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  svgRemoveIcon: {
    backgroundColor: '#FBF9F9',

  },
  removeButtonText: {
    color: '#d00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.2)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
},
imagePickerPlaceholder: {
  borderWidth: 2,
  borderStyle: 'dashed',
  borderColor: '#A9A9A9',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E6E6E6',
},

});
