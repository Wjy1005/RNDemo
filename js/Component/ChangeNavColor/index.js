/**
 * Created by git on 2017/9/18.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import * as types from '../../redux/reducers/ActionTypes'
import {changeColor} from '../../redux/Action/mainAction'
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
                <Text onPress={this._onPress}>改变导航颜色</Text>
            </View>
        );
    }

    _onPress = ()=> {
        this.props.changeColor(types.backgroundColor,'green');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//export default index;
const mapStateToProps = (state)=>{
    console.log(state)
    return {
        MainReducer:state.MainReducer
    };
}
const mapActionToProps = (dispatch)=>{
    console.log(dispatch)
    return {
        changeColor:bindActionCreators(changeColor,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(index);