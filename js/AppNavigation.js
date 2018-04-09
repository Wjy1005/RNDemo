/**
 * Created by git on 17/7/13.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, BackHandler, ToastAndroid, Platform} from 'react-native';
import {StackNavigator,TabNavigator,TabBarBottom, DrawerNavigator}from 'react-navigation'
import App from './App'
import Page2 from './Page2'
class AppNavigation extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        let  DrawerNav = DrawerNavigator({
            Page2: { screen: Page2 },
            App: { screen: App },
        }, {
            drawerWidth: 200, // 抽屉宽
            drawerPosition: 'left', // 抽屉在左边还是右边
            // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
            contentOptions: {
                initialRouteName: Page2, // 默认页面组件
                activeTintColor: 'white',    // 选中文字颜色
                activeBackgroundColor: '#ff8500', // 选中背景颜色
                inactiveTintColor: '#666',  // 未选中文字颜色
                inactiveBackgroundColor: '#fff', // 未选中背景颜色
                style: {  // 样式

                },
                isModal:false,
            }
        });
        return (
            <DrawerNav ref="dra"/>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppNavigation;