/**
 * Created by git on 16/10/8.
 */

import {Dimensions, Platform, PixelRatio} from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function Poxth(data) {
    return data
        /// PixelRatio.get()
}
export const ScreenRadio = ScreenWidth/375;
export const mainColor='#df3030';
export const blackColor='#000';
export const blueColor= '#0076fb';

export const TabBarHeight = 49

export const iOS = Platform.OS==='ios'
export const android = Platform.OS==='android'

export const PhoneRegular = /^1[3|4|5|6|7|8|9]\d{9}$/;      //手机号码
export const ZhongwenRegular = /.*[\u4e00-\u9fa5]+.*$/;     //中文
export const TitleCheckRegular = /[\[\]\\<>'";&]+/;
export const PaperIdRegular = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;  //身份证
export const FFZZ = /^(0|[1-9]\d*)$/;　　//非负整数
export const ZFDS = /^\d+(\.{0,1}\d+){0,1}$/;  //正浮点数
export const PointNumberRegular = /^[0-9]+(.[0-9]{1,2})?$/;   //带两位小数
export const OnePointNumberRegular = /^[0-9]+(.[0-9]{1})?$/;   //带一位小数
export const EmailRegular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  //邮件地址
export const NumberRegular = /^[0-9]*$/;        //整数
export const CardNumberRegular = /^[0-9xX]*$/;        //证件号码
export const ZipCodeRegular = /[1-9]{1}(\d+){5}/;       //邮编
export const TelephoneRegular = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;     //电话号码
export const NormalRegular = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;    //不含特殊字符
export const cropCodeRegular = /^([0-9_\-]*)$/
export const PasswordRegular = /^[0-9a-zA-Z\d_]{6,20}$/        //密码

export const isIphoneX = Platform.OS === 'ios' &&  ((ScreenHeight === X_HEIGHT && ScreenWidth === X_WIDTH) ||
    (ScreenHeight === X_WIDTH && ScreenWidth === X_HEIGHT))

export const EVENT_UpLoad_HomeWord = 'EVENT_UpLoad_HomeWord'
