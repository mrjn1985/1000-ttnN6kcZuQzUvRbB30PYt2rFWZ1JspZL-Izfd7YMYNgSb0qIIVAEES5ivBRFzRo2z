import React, { PropTypes, Component } from "react";
import { Platform, View, ListView, RefreshControl } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "./actions/movies.actions";
import ListViewItem from "./components/ListViewItem";
import ProgressBar from "../_global/ProgressBar";
import styles from "./styles/Genres";
import { iconsMap } from "../../utils/AppIcons";

class Genres extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			genres: {
				genres: []
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
		this.props.actions.retrieveGenres().then(() => {
			const ds = new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			});
			const dataSource = ds.cloneWithRows(this.props.genres.genres);
			this.setState({
				genres: this.props.genres,
				dataSource,
				isLoading: false
			});
		});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_viewMovieByGenre(genresId) {
		let rightButtons = [];
		if (Platform.OS === "ios") {
			rightButtons = [
				{
					id: "close",
					title: "Close",
					icon: iconsMap["ios-close"]
				}
			];
		}
		this.props.navigator.showModal({
			screen: "movieapp.MoviesByGenres",
			passProps: {
				genresId
			},
			backButtonHidden: true,
			navigatorButtons: {
				rightButtons
			}
		});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveGenresList("isRefreshed");
	}

	_onNavigatorEvent(event) {
		if (event.type === "NavBarButtonPress") {
			if (event.id === "close") {
				this.props.navigator.dismissModal();
			}
		}
	}

	_renderProgressBar() {
		return (
			<View style={styles.progressBar}>
				<ProgressBar />
			</View>
		);
	}

	_renderRow(rowData) {
		return (
			<ListViewItem info={rowData} viewMovieGenres={this._viewMovieByGenre} />
		);
	}

	_renderFooter() {
		return (
			<View style={{ height: 50 }}>
				<ProgressBar />
			</View>
		);
	}

	render() {
		return this.state.isLoading ? (
			this._renderProgressBar()
		) : (
			<ListView
				style={styles.container}
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={rowData => this._renderRow(rowData)}
				renderFooter={() => this._renderFooter()}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={["#EA0000"]}
						tintColor="white"
						title="Đang tải..."
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

if (Platform.OS === "ios") {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: "#0a0a0a"
	};
}

Genres.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: "black",
	statusBarTextColorScheme: "light",
	navBarTextColor: "white",
	navBarButtonColor: "white"
};

function mapStateToProps(state, ownProps) {
	return {
		genres: state.movies.genres
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
