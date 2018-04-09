/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Heading1 from './Text';

class GroupContainer extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Heading1>
                    {this.props.groupTitle}
                </Heading1>
                <View style={styles.spacer} />
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
    },
    spacer: {
        marginBottom: 5,
    },
});

export default GroupContainer;