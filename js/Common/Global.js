'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import { Dimensions} from 'react-native';

global.width = Dimensions.get('window').width;
global.height = Dimensions.get('window').height;
global.maincolor = "#D24A4A";

//记录当前页面路由，默认为登陆页
global.currentRouteName = 'Login';

global.oldPsw = ""
global.user = {
    uploadUrl: "",
    currentNo: "",
    uploadUrlone: "",
    token: "",
    findFile: "",
    show: "",
    downloadUrl: "",
    currentType: "",
   info:{
       id: 0,
       jobNo: "",
       loginName: "",
       name: "",
       phone: "",
       headImg:'',
       email:'',
       userType: ""
   }
};
//课程班级
global.currentClass = {
    // "jobNo": "352300",
    // "className": "app测试临时班",
    // "experName": "app测试专业",
    // "courseName": "app测试课程",
    // "classCode": "CLS1530091071569",
    // "experCode": "EXP1530090985313",
    // "courseCode": "COU1530091298382",
    // "courseCover": "/img/1530091204459/5.jpg"
};

// global.host = 'http://192.168.1.52:8080';
// global.host = 'http://192.168.1.34:8080';
global.host = 'http://116.62.222.216:6005';