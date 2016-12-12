import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Styles } from './HomeScreenStyles';
import { createRouter }  from '@exponent/ex-navigation';
import { Router } from '../Router';

import About from '../About/About';

export default class HomeScreen extends React.Component {

	static route = {
		navigationBar: {
			about: () => About
		}
	}

	goToAbout = () => {
		this.props.navigator.push(Router.getRoute('about'));
	}

	render() {
		return (
			<View style={Styles.container}>
				<Text>Waddup tho</Text>
				<Text onPress={this.goToAbout}>
					Push about route
				</Text>
			</View>
			);
	}
}