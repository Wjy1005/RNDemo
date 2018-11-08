/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React from 'react';
import ReduxPage from './Component/Redux/Page'
import Home from './Home'
import Mine from './Mine'
import NavPage1 from './Component/ReduxNav/Page1'
import NavPage2 from './Component/ReduxNav/Page2'
import NavPage3 from './Component/ReduxNav/Page3'
import {components} from './Config'
import RNKeyboard from './keyBoards/RNKeyboard'
import AddPage from './AddPage'

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
            Page1: {screen: Home},
            Page2: {screen: Mine},
            NavPage1: {screen: NavPage1},
            NavPage2: {screen: NavPage2},
            NavPage3: {screen: NavPage3},
            ReduxPage: {screen: ReduxPage},
            RNKeyboard: {screen: RNKeyboard},
            AddPage: {screen: AddPage}
        }

        this.data = this.addData(this.data, components)

        return this.data
    }
}

export default setStackNavigator