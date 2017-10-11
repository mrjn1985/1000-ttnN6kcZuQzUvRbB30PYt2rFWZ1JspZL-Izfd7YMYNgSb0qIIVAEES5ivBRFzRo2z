import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToMovies = this._goToMovies.bind(this);
		this._openSearch = this._openSearch.bind(this);
		this._goToGenres = this._goToGenres.bind(this);
	}

	_openSearch() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Search',
			title: 'Tìm kiếm'
		});
	}

	_goToMovies() {
		this._toggleDrawer();
		this.props.navigator.popToRoot({
			screen: 'movieapp.Movies',
			title: 'Movies'
		});
	}

	_goToGenres() {
		this._toggleDrawer();
		/* this.props.navigator.popToRoot({
			screen: 'movieapp.Genres',
		});*/
		this.props.navigator.push({
			screen: 'movieapp.Genres',
			title: 'Thể loại'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	render() {
		const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconGenres = (<Icon name="md-list" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openSearch}>
							<View style={styles.drawerListItem}>
								{iconSearch}
								<Text style={styles.drawerListItemText}>
									Tìm Kiếm
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToGenres}>
							<View style={styles.drawerListItem}>
								{iconGenres}
								<Text style={styles.drawerListItemText}>
									Thể Loại
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToMovies}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									Movies
								</Text>
							</View>
						</TouchableOpacity>
						{/* <View style={styles.drawerListItem}>
							{iconTV}
							<Text style={styles.drawerListItemText} onPress={() => ToastAndroid.show('Đang thực hiện!', ToastAndroid.SHORT)}>
								Truyền Hình
							</Text>
						</View> */}
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;
