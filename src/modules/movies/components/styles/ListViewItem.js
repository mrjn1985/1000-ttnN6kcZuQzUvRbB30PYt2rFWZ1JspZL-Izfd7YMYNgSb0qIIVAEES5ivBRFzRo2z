import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	card: {
		borderRadius: 3,
		flexDirection: "row",
		justifyContent: "center",
		overflow: "hidden",
		backgroundColor: "black",
		padding: 10,
		margin: 10
	},

	cardGenre: {
		flexDirection: "row"
	},

	cardGenreItem: {
		fontSize: 20,
		marginRight: 5,
		color: "white",
		fontWeight: "bold"
	}
});

export default styles;
