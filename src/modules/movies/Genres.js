import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	RefreshControl
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as genresActions from './genres.actions';
import ListViewItem from './components/ListViewItem';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Genres';
import { iconsMap } from '../../utils/AppIcons';

class Genres extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			genres: {
				results: []
			}
		};

		this._viewMovieByGenre = this._viewMovieByGenre.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveGenresList();
	}

	_retrieveGenresList(isRefreshed) {
		this.props.actions.retrieveGenres()
			.then(() => {
				const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
				const dataSource = ds.cloneWithRows(this.props.genres.results);
				this.setState({
					genres: this.props.genres,
					dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_viewMovieByGenre(genreId) {
		this.props.navigator.showModal({
			screen: 'movieapp.Movies',
			passProps: {
				genreId
			},
			backButtonHidden: true,
			navigatorButtons: {
				rightButtons: [
					{
						id: 'close',
						icon: iconsMap['ios-arrow-round-down']
					}
				]
			}
		});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveGenresList('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		console.log(this.state.dataSource);
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ListView
				style={styles.container}
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={rowData => <ListViewItem info={rowData} viewMovieGenres={this._viewMovieByGenre} />}
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}
			/>
		);
	}
}

Genres.propTypes = {
	actions: PropTypes.object.isRequired,
	genres: PropTypes.object.isRequired,
	navigator: PropTypes.object
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

Genres.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		genres: state.movies.genres
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(genresActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
