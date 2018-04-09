/**
 * Created by git on 17/9/6.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import { Provider,connect } from 'react-redux';
import configureStore from './redux/store/ConfigureStore'
const store = configureStore();
import App from './App'
import AppNavigation from './AppNavigation'
class AppIndex extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default AppIndex;