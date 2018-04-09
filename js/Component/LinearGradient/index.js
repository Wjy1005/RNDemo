/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <LinearGradient
                                colors={['#4DC7A4', '#66D37A']}
                                style={styles.linearGradient}
                                start={{ x: 0.5, y: 1 }}
                                end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
                <LinearGradient
                                colors={['#4DC7A4', '#fe6060']}
                                style={styles.linearGradient}
                                start={{ x: 0.5, y: 1 }}
                                end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
                <LinearGradient
                                colors={['#ff4949', '#fe6060']}
                                style={styles.linearGradient}
                                start={{ x: 0.5, y: 1 }}
                                 end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        height:50,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        backgroundColor:'transparent',
        marginTop:10
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default index;