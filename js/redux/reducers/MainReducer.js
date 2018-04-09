/**
 * Created by git on 17/8/31.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
// ActionTypes里面存放着App中可能发生的情况
import * as types from './ActionTypes';
// 初始化值
const initialState = {
    currentState:'NULL',
    currentArray:{
        currentItem:''
    },
    backgroundColor:'red'
};


export default function MainReducer(state = initialState, action){
     console.log(action);

    // 通过switch来判断types的值，在action中实现功能
    switch (action.type) {

        case types.SHOW:
             console.log(action);
            return Object.assign({}, state, {
                ...state,
                currentState: action.status
            });
        case types.DISMISS:
            console.log(action);
            return Object.assign({}, state, {
                ...state,
                currentState: action.status
            })
        case types.TODO:
            return Object.assign({}, state, {
                ...state,
                currentArray:{
                    ...action.status
                }
            })
        case types.backgroundColor:
            return Object.assign({}, state, {
                ...state,
                backgroundColor:action.status
            })
        default:
            return state;
    }
}