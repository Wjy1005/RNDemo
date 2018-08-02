'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import PageView from '../../Common/viewPager'

import Header from './Header'
import Page1 from './Page1'
import Page2 from './Page2'

const height = Dimensions.get('window').height;

class ResourcesView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentPage: 0, //页码
            views: [Page1, Page2, Page1, Page2, Page1, Page2],
            titles: ['页面1', '页面2', '页面1', '页面2', '页面1', '页面2'],
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '滑动列表'
    });

    render() {
        let {views, titles, currentPage} = this.state;
        let {navigation} = this.props;

        let view = views.map((Component, index) => {
            return (i) => {
                return (
                    <Component key={index} style={{flex: 1}} navigation={navigation}/>
                )
            }
        });

        let renderHeader = Header.renderHeader(views, titles, currentPage);

        return (
            <View style={styles.container}>
                <PageView pages={view}
                          ref='pageView'
                          renderHeader={renderHeader}
                          Height={height}
                          preload={false}
                          onPress={this._onPress}
                          onPageSelected={this._onPageSelected}
                />
            </View>
        );
    }

    _onPress = (index) => {
        this.setState({currentPage: index});
    }

    _onPageSelected = (index) => {
        this.setState({currentPage: index});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ResourcesView;