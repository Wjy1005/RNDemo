/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import App from './App'
import AppIndex from './AppIndex'
import AppNavigation from './AppNavigation'

export default  function setup():React.Component {
    class Root extends React.Component
    {
        constructor(props, context)
        {
            super(props, context);
        }

        render()
        {
            return (
                <AppIndex/>
            )
            //return (
            //    <AppNavigation/>
            //);
        }
    }
    return Root
}

