'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

class Page1 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'yellow'
    },
});

export default Page1;