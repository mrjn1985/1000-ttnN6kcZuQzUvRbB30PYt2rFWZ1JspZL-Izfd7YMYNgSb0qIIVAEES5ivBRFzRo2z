import React, { PropTypes, Component } from "react";
import { Platform, View, ListView, RefreshControl } from "react-native";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { TMDB_URL, TMDB_API_KEY } from "../../constants/api";
import * as moviesActions from "./actions/movies.actions";
import CardThree from "./components/CardThree";
import ProgressBar from "../_global/ProgressBar";
import styles from "./styles/MoviesList";
import { iconsMap } from "../../utils/AppIcons";

class MoviesByGenres extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			currentPage: 1,
			list: {
				results: []
			}
		};

		this._viewMovie = this._viewMovie.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveMoviesByGenres();
	}

	_retrieveMoviesByGenres(isRefreshed) {
		this.props.actions
			.retrieveMoviesGenres(this.props.genresId, this.state.currentPage)
			.then(() => {
				const ds = new ListView.DataSource({
					rowHasChanged: (row1, row2) => row1 !== row2
				});
				const dataSource = ds.cloneWithRows(this.props.list.results);
				this.setState({
					list: this.props.list,
					dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrieveNextPage(genresId) {
		if (this.state.currentPage !== this.props.list.total_pages) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});

			let page;
			if (this.state.currentPage === 1) {
				page = 2;
				this.setState({ currentPage: 2 });
			} else {
				page = this.state.currentPage + 1;
			}

			axios
				.get(
					`${TMDB_URL}/genre/${genresId}/movies?api_key=${TMDB_API_KEY}&page=${page}&language=vi-VN&include_adult=true&sort_by=created_at.desc`
				)
				.then(res => {
					const data = this.state.list.results;
					const newData = res.data.results;

					newData.map((item, index) => data.push(item));

					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(
							this.state.list.results
						)
					});
				})
				.catch(err => {
					console.log("next page", err); // eslint-disable-line
				});
		}
	}

	_viewMovie(movieId) {
		this.props.navigator.showModal({
			screen: "movieapp.Movie",
			passProps: {
				movieId
			},
			backButtonHidden: true,
			navigatorButtons: {
				rightButtons: [
					{
						id: "close",
						icon: iconsMap["ios-arrow-round-down"]
					}
				]
			}
		});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this.retrieveMoviesGenres("isRefreshed");
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
		return <CardThree info={rowData} viewMovie={this._viewMovie} />;
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
				onEndReached={type => this._retrieveNextPage(this.props.genresId)}
				onEndReachedThreshold={1200}
				dataSource={this.state.dataSource}
				renderRow={rowData => this._renderRow(rowData)}
				renderSeparator={(sectionId, rowId) => (
					<View key={rowId} style={styles.seperator} />
				)}
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

MoviesByGenres.propTypes = {
	actions: PropTypes.object.isRequired,
	list: PropTypes.object.isRequired,
	genresId: PropTypes.number.isRequired,
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

MoviesByGenres.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: "black",
	statusBarTextColorScheme: "light",
	navBarTextColor: "white",
	navBarButtonColor: "white"
};

function mapStateToProps(state, ownProps) {
	return {
		list: state.movies.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesByGenres);
