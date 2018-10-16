'use strict';

// ActionTypes里面存放着App中可能发生的情况
import * as types from './ActionTypes';
// 初始化值
const initialState = {
    backgroundColor:'red'
};


export default function NavOptionReducer(state = initialState, action){
    console.log(action);

    // 通过switch来判断types的值，在action中实现功能
    switch (action.type) {
        case types.backgroundColor:
            return Object.assign({}, state, {
                ...state,
                backgroundColor:action.status
            })
        default:
            return state;
    }
}