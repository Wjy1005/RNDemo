/**
 * Created by git-wangjy on 2018/1/29.
 * viewPager头部
 * @flow
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static renderHeader = (views, titles, currentPage, style)=> {
        let number = views.length > 4 ? 4 : views.length;
        return views.map((tab, index)=> {
            let titleStyle = currentPage === index ? {color: '#D24A4A'} : {color: '#000'};
            let ViewStyle = currentPage === index ? {backgroundColor: '#D24A4A'} : {backgroundColor: '#fff'};
            return (
                <TouchableOpacity style={[{backgroundColor:'transparent',width:width / number},style]} key={index + 'topView'}>
                    <View  style={[{height:37,alignItems:'center',justifyContent:'center',marginHorizontal:15}]}>
                        <Text style={[{fontSize:12},titleStyle]}>{titles[index]}</Text>
                    </View>
                    <View style={[{height:3,marginHorizontal:15},ViewStyle]}/>
                </TouchableOpacity>
            )
        });
    }

    render() {
        return null;
    }
}

export default Header;
