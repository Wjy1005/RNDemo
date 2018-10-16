'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import PangingList from '../../Common/w-flatlist'

class index extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <View style={styles.container}>
                <PangingList
                    onFetch={this._onFetch}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _onFetch = (page = 1, callback, option) => {
        let items = ["1", "2", "3"];
        if (page === 3)
            option = {...option, allLoaded: true};
        callback(items, option)
    }
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={index + 'row'} style={{height: 44, justifyContent: 'center', paddingHorizontal: 10}}
                              onPress={() => this._onItemPress(item)}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default index;