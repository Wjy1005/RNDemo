/**
 * Created by git-wangjianying on 2017/11/21.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Http from './network/Http'
class user
{
    static faceId(param){
       return Http.MultipartPost('https://api.megvii.com/faceid/v2/verify',param)
        .then((json)=>{
            return json;
        })
    }

}

export default user;