import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: 'white'
  },
  card: {
		backgroundColor: 'white',
		borderRadius: 3,
		minHeight: 148,
		flexDirection: 'row',
		paddingRight: 16,
		overflow: 'hidden'
	},
  cardGenre: {
		flexDirection: 'row'
	},
	cardGenreItem: {
		fontSize: 11,
		marginRight: 5
	}
});