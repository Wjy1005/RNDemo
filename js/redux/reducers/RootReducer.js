/**
 * Created by git on 17/8/31.
 * @flow
 */

'use strict';

// Reducer是纯函数，里面不应该有过多的逻辑。
import { combineReducers } from 'redux';

import MainReducer from './MainReducer';
import NavReducer from './NavReducer';

// 取决于这里你加入了多少 reducer
const RootReducer = combineReducers({
    MainReducer,
    NavReducer
});
export default RootReducer;
