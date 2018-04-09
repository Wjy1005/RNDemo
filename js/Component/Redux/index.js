/**
 * Created by git on 17/9/6.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import * as types from '../../redux/reducers/ActionTypes'
import {showClick, dismissClick, toDoClick} from '../../redux/Action/mainAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class index extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <Text style={styles.text} onPress={()=>{this.props.showClick('SHOW')}}>SHOW</Text>
                    <Text style={styles.text} onPress={()=>{this.props.dismissClick('DISMISS')}}>DISMISS</Text>
                </View>
                <Text style={[styles.text,{color:'blue'}]}>currentState: {this.props.MainReducer.currentState}</Text>
                <Text style={styles.text} onPress={()=>{this.props.navigation.navigate('ReduxPage')}}>点击跳转到下一页</Text>
                <Text style={[styles.text,{color:'blue'}]}>currentItem: {this.props.MainReducer.currentArray.currentItem}</Text>
            </View>
        );
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    view:{
        flexDirection:'row',
    },
    text:{
        color:'red',
        fontSize:14,
        margin:10
    }
});

const mapStateToProps = (state)=>{
    return {
        MainReducer:state.MainReducer
    };
}

const mapActionToProps = (dispatch)=>{
    return {
        showClick:bindActionCreators(showClick,dispatch),
        dismissClick:bindActionCreators(dismissClick,dispatch),
        toDoClick:bindActionCreators(toDoClick,dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapActionToProps
)(index);