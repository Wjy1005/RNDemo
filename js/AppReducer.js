/**
 * Created by git on 17/9/11.
 * @flow
 */

'use strict';

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {StackNavigator,TabNavigator,TabBarBottom, DrawerNavigator, addNavigationHelpers}from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import Home from './Home'
import Mine from './Mine'
import Components from './Component'
import setStackNavigator from './Navigator'
import { connect } from 'react-redux';

class TabBarItem extends React.Component {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ { tintColor:this.props.tintColor,width:25,height:25 } }
            />
        )
    }
};

let items = [
    {component:'Home',text:'首页',screen:Home, normalImage:require('./img/main.png'),selectedImage:require('./img/main_select.png')},
    {component:'Mine',text:'我的',screen:Mine, normalImage:require('./img/project.png'),selectedImage:require('./img/project_select.png')},
    {component:'Components',text:'组件',screen:Components, normalImage:require('./img/project.png'),selectedImage:require('./img/project_select.png')},
];

let tabView = {};

items.map((item,index)=>{
    tabView[item.component] = {
        screen:item.screen,
        navigationOptions:({navigation}) => ({
            title:item.text,
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={item.normalImage}
                    selectedImage={item.selectedImage}
                />
            )
        }),
    }
});

//底部tab
let Tab = TabNavigator(
    tabView,
    {
        //设置tab样式
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:true,
        animationEnabled:false,
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#06c1ae',
            inactiveTintColor:'#979797',
            style:{backgroundColor:'#ffffff',},
            labelStyle: {
                fontSize: 14, // 文字大小
            },
        }
    }
);

let route = setStackNavigator.set();

let routes = {Tab:{
    screen:Tab,
    //设置tab页面的导航
    navigationOptions:({ navigation,screenProps }) => ({
        headerBackTitle:null,
        headerStyle:{backgroundColor:'#ddd'},
        headerLeft:null,
        headerTintColor: '#000'
        //header:null,
    })
},...route};

// react-navigationV2版本缺陷
Tab.navigationOptions = ({ navigation }) => {
    const component = Tab.router.getComponentForState(navigation.state);
    if (typeof component.navigationOptions === 'function') {
        return component.navigationOptions({ navigation });
    }
    return component.navigationOptions;
};

const Navigator = StackNavigator(
    routes,
    {
        //设置导航全局样式
        navigationOptions:({ navigation,screenProps }) => ({
            //返回键文字
            headerBackTitle:null,
            //是否显示图标，默认关闭
            showIcon:true,
            //是否允许在标签之间进行滑动
            swipeEnabled:false,
            //是否在更改标签时显示动画
            animationEnabled:false,
            headerStyle:{backgroundColor:'#D24A4A'},
            //后退键
            headerLeft:(
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:10}}>
                    <Image source={require('./img/icon_return_white.png')}/>
                </TouchableOpacity>
            ),
            //文字样式
            //Android中headerTitleStyle默认为alignSelf:'flex-start'
            headerTitleStyle:{ alignSelf:'center', flex: 1 },
            headerTintColor: '#fff',
            //Android需要加上一個headerRight讓title居中
            //headerRight: <View style={{ width: 24 }}/>
        }),
        //定义跳转风格
        //card：使用iOS和安卓默认的风格
        //modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
        mode:'card',
        //控制安卓切换页面动作,跟IOS保持一致
        transitionConfig:()=>({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
        //导航切换事件
        //onNavigationStateChange: (event)=>{
        //    console.log(event)
        //},
    }
);

//export default Navigator;
const mapStateToProps = (state)=>{
    console.log(state);
    return {
        MainReducer:state.MainReducer
    };
};

export default connect(
    mapStateToProps
)(Navigator);