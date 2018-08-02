/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ReduxPage from './Component/Redux/Page'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import AppSetting from './AppSetting'
import {components} from './Config'
import RNKeyboard from './keyBoards/RNKeyboard'

class setStackNavigator {

    static addData = (data, components) => {
        let Item = {...data}
        for (let i = 0; i < components.length; i++) {
            let key = components[i].component;
            let title = components[i].title;
            let route = components[i].route;
            Item[key] = {
                screen: route,
                navigationOptions: {
                    title: title
                }
            }
        }
        return Item;
    }

    static set() {
        this.data = {
            Page1: {
                screen: Page1,
                //navigationOptions:null
            },
            Page2: {
                screen: Page2,
                //navigationOptions:null
            },
            Page3: {
                screen: Page3, path: 'app/js/Page3',
                //navigationOptions:null
            },
            Page4: {
                screen: Page4,
                navigationOptions: null
            },
            Page5: {
                screen: Page5,
                navigationOptions: null
            },
            Page6: {
                screen: Page6,
                navigationOptions: null
            },
            ReduxPage: {
                screen: ReduxPage,
            },
            RNKeyboard: {
                screen: RNKeyboard,
            }
        }

        this.data = this.addData(this.data, components)

        return this.data
    }
}

export default setStackNavigator