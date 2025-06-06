import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#D62626',
    flexGrow: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#D62626',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    marginLeft: 8,
    color: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  ingredient: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 2,
  },
  preparo: {
    color: '#fff',
    marginTop: 6,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 40,
  },
});
