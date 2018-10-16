/**
 * Created by git on 17/6/4.
 * @flow
 * tab、导航设置
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, BackHandler, ToastAndroid} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom, DrawerNavigator, addNavigationHelpers} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import {connect} from 'react-redux';
import Home from './Home'
import Mine from './Mine'
import Components from './Component'
import setStackNavigator from './Navigator'

class TabBarItem extends React.Component {
    render() {
        return (
            <Image source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
                   style={{tintColor: this.props.tintColor, width: 25, height: 25}}
            />
        )
    }
}

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        let items = [
            {
                component: 'Home',
                text: '首页',
                screen: Home,
                normalImage: require('./img/main.png'),
                selectedImage: require('./img/main_select.png')
            },
            {
                component: 'Mine',
                text: '我的',
                screen: Mine,
                normalImage: require('./img/project.png'),
                selectedImage: require('./img/project_select.png')
            },
            {
                component: 'Components',
                text: '组件',
                screen: Components,
                normalImage: require('./img/project.png'),
                selectedImage: require('./img/project_select.png')
            },
        ];
        let tabView = {};
        items.map((item, index) => {
            tabView[item.component] = {
                screen: item.screen,
                navigationOptions: ({navigation}) => ({
                    title: item.text,
                    tabBarIcon: ({focused, tintColor}) => (
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
                tabBarComponent: TabBarBottom,
                tabBarPosition: 'bottom',
                swipeEnabled: true,
                animationEnabled: false,
                lazy: true,
                tabBarOptions: {
                    activeTintColor: '#06c1ae',
                    inactiveTintColor: '#979797',
                    style: {backgroundColor: '#ffffff',},
                    labelStyle: {
                        fontSize: 14, // 文字大小
                    },
                }
            }
        );
        //路由申明
        let route = setStackNavigator.set();
        let routes = {
            Tab: {
                screen: Tab,
                //设置tab页面的导航
                navigationOptions: ({navigation, screenProps}) => ({
                    headerBackTitle: null,
                    headerStyle: {backgroundColor: '#ddd'},
                    headerLeft: null,
                    headerTintColor: '#000'
                    //header:null,
                })
            }, ...route
        };
        const Navigator = StackNavigator(
            routes,
            {
                //设置导航全局样式
                navigationOptions: ({navigation, screenProps}) => ({
                    //返回键文字
                    headerBackTitle: null,
                    //是否显示图标，默认关闭
                    showIcon: true,
                    //是否允许在标签之间进行滑动
                    swipeEnabled: false,
                    //是否在更改标签时显示动画
                    animationEnabled: false,
                    headerStyle: {backgroundColor: this.props.NavOptionReducer.backgroundColor},
                    // headerStyle:{backgroundColor:'red'},
                    //后退键
                    headerLeft: (
                        <TouchableOpacity onPress={() => {
                            navigation.goBack()
                        }} style={{marginLeft: 10}}>
                            <Image source={require('./img/icon_return_white.png')}/>
                        </TouchableOpacity>
                    ),
                    //文字样式
                    //Android中headerTitleStyle默认为alignSelf:'flex-start'
                    headerTitleStyle: {alignSelf: 'center'},
                    headerTintColor: '#fff',
                    //Android需要加上一個headerRight讓title居中
                    //headerRight: <View style={{ width: 24 }}/>
                }),
                //定义跳转风格
                //card：使用iOS和安卓默认的风格
                //modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
                mode: 'card',
                //控制安卓切换页面动作,跟IOS保持一致
                transitionConfig: () => ({
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                }),
                //导航切换事件
                //onNavigationStateChange: (event)=>{
                //    console.log(event)
                //},
                drawerLockMode: false
            }
        );

        const {dispatch, nav} = this.props;
        return (
            <Navigator ref={'nav'}
                //navigation={addNavigationHelpers({
                //dispatch: dispatch,
                //state: nav
                //})}
            />
        );
    }

    onBackAndroid = () => {
        //let navigator = this.refs.nav;
        ////let defaultStateAction = navigator.router.getStateForAction;
        //console.log(navigator)
        //let  {navigate} = this.props.navigation;
        //console.log(navigate)

        let now = new Date().getTime();
        if (this.lastBackPressed && now - this.lastBackPressed < 2500) {
            return false;
        }
        this.lastBackPressed = now;
        ToastAndroid.show('再点击一次退出应用', ToastAndroid.SHORT);
        return true;
    };

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('backPress', this.onBackAndroid)
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('backPress', this.onBackAndroid)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// export default App
const mapStateToProps = (state) => {
    console.log(state);
    return {
        NavOptionReducer: state.NavOptionReducer
    };
}

export default connect(
    mapStateToProps
)(App);