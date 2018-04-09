/**
 * Created by git on 17/9/14.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import * as types from '../../redux/reducers/ActionTypes'
import {showClick, dismissClick, toDoClick} from '../../redux/Action/mainAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Page extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    static navigationOptions = ({ navigation,screenProps }) => ({
        headerTitle: 'Page',
    })
    render()
    {
        return (
            <View style={styles.container}>
                <Text style={[styles.text,{color:'blue'}]}>{this.props.MainReducer.currentArray.currentItem}</Text>
                <View style={styles.view}>
                     <TextInput style={{height:30,width:300,borderWidth:StyleSheet.hairlineWidth}} onChangeText={(text)=>{this._text = text}}/>
                </View>
                <Text style={styles.text} onPress={()=>{
                            this.props.toDoClick(types.TODO,{currentItem:this._text});
                }}>Change</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    view:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'red',
        fontSize:14,
        margin:10
    }
});


const mapStateToProps = (state)=>{
    console.log(state);
    return {
        MainReducer:state.MainReducer
    };
}

const mapActionToProps = (dispatch)=>{
    return {
        toDoClick:bindActionCreators(toDoClick,dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapActionToProps
)(Page);