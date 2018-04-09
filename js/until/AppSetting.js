/**
 * Created by git on 16/8/30.
 */

'use strict';

import React from 'react';
import {AsyncStorage, EventEmitter} from 'react-native';
const SKIP_INTRODUCE = 'SKIP_INTRODUCE';
const LOADING_AD = 'LOADING_AD';

class AppSetting {
    getIntroduceSkiped(): Promise{
        return AsyncStorage.getItem(SKIP_INTRODUCE)
            .then((skip)=>{
                return skip === 'true';
            });
    }
    setIntroduceSkiped(){
        AsyncStorage.setItem(SKIP_INTRODUCE, 'true');
    }
}

var appSetting = new AppSetting();

module.exports = appSetting;
