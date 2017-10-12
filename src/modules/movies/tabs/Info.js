import React, { PropTypes } from 'react';
import {
	Text,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/Info';

const Info = ({ info }) => {
	const director = _.filter(info.casts.crew, { department: 'Directing', job: 'Director' });
	const releaseDate = moment(info.release_date).format('LL');
	const budget = (info.budget === 0 ? 'n/a' : numeral(info.budget).format('$ 0,0'));

	return (
		<View style={styles.container}>
			<View style={styles.overview}>
				<Text style={styles.label}>
					Tổng quan
				</Text>
				<Text style={styles.overviewText}>
					{info.overview}
				</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Ngày phát hành</Text>
				<Text style={styles.value}>{releaseDate}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Đạo diễn</Text>
				<Text style={styles.value}>{director[0].name}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Doanh thu</Text>
				<Text style={styles.value}>{budget}</Text>
			</View>
		</View>
	);
};

Info.propTypes = {
	info: PropTypes.object.isRequired
};

export default Info;
