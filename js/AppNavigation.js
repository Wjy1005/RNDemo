/**
 * Created by git on 17/7/13.
 * @flow
 * 抽屉导航
 */

'use strict';

import React from 'react';
import {StackNavigator,TabNavigator,TabBarBottom, DrawerNavigator}from 'react-navigation'
import App from './App'
import Mine from './Mine'
class AppNavigation extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        let  DrawerNav = DrawerNavigator({
            Mine: { screen: Mine },
            App: { screen: App },
        }, {
            drawerWidth: 200, // 抽屉宽
            drawerPosition: 'left', // 抽屉在左边还是右边
            // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
            contentOptions: {
                initialRouteName: App, // 默认页面组件
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
export default AppNavigation;