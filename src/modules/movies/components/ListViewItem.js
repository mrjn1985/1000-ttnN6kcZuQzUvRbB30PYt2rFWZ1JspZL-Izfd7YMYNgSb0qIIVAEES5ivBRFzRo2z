/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles/ListViewItem';

class ListViewItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { info, viewMovieGenres } = this.props;
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewMovieGenres.bind(this, info.id)}>
					<View style={styles.card}>
            <View style={styles.cardGenre}>
              <Text style={styles.cardGenreItem}>{info.name}</Text>
            </View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

ListViewItem.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovieGenres: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	console.log(state.movies.genres);
	return {
		genres: state.movies.genres
	};
}

export default connect(mapStateToProps, null)(ListViewItem);
