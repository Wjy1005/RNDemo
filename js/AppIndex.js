/**
 * Created by git on 17/9/6.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import { Provider,connect } from 'react-redux';
import configureStore from './redux/store/ConfigureStore'
const store = configureStore();
//tab导航
import AppNavigation from './App'
//抽屉导航
// import AppNavigation from './AppNavigation'
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
                <AppNavigation/>
            </Provider>
        );
    }
}

export default AppIndex;