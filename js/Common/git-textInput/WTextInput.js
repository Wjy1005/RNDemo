/**
 * Created by git on 16/9/6.
 * @flow
 */

'use strict';

import React from 'react';

import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform, TextInput} from 'react-native';
import {mainColor} from '../util/Constant'
import ViewPropTypes from '../util/ViewPropTypes'

class WTextInput extends React.Component {

    static PropType = {
        onChangeText: PropTypes.func,       //输入变化的值    (text)=>{...}
        placeholder: PropTypes.string,      //输入内容为空时显示,默认为 请输入+title
        defaultValue: PropTypes.string,     //反显的内容
        keyboardType: PropTypes.string,     //键盘类型
        maxLength: PropTypes.number,        //输入最大长度
        editable: PropTypes.bool,           //是否可以编辑
        textInputStyle: TextInput.prototype.style,   //输入框样式
        textInputViewStyle: ViewPropTypes.style,    //输入框外层View样式
        viewStyle: ViewPropTypes.style,         //整体view样式

    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            onClick: false
        }
        this._text = this.props.defaultValue || ''
    }

    componentWillReceiveProps(next) {
        if (next.shouldClear){
            this._textInput.clear();
            this._textChange('');
        }
    }


    render() {
        let {title, defaultValue, titleViewStyle, textInputViewStyle, textInputStyle, placeholder, viewStyle, mandatory, deleteBtnStyle} = this.props;

        let Icon = require('./img/icon_delete.png');
        //安卓环境下  当输入框有值且处于点击状态时 显示删除按钮
        let deleteBtn = Platform.OS === 'android' ? this._text && this.state.onClick ? (
            <TouchableOpacity onPress={this._deleteDepartment} ref={(ref) => this._deleteBtn = ref}
                              style={[styles.deleteBtn, deleteBtnStyle]}>
                <Image source={Icon} style={{width: 15, height: 15}}/>
            </TouchableOpacity>
        ) : null : null;

        let {onChangeText, onBlur, onFocus, ...props} = this.props;

        return (
            <View style={[styles.container, viewStyle]}>
                {title ? (
                    <View style={[styles.titleView, titleViewStyle]}>
                        {mandatory ? <Text style={{color: mainColor, fontSize: 16}}>*</Text> :
                            <View style={{width: 7}}/>}
                        <Text style={[styles.title, this.props.titleStyle]}>{title + ' :'}</Text>
                    </View>
                ) : null}
                <View style={[styles.textInputView, textInputViewStyle]}>
                    <TextInput ref={(ref) => this._textInput = ref}
                               placeholder={placeholder || this.props.editable === false ? '' : '请输入' + title}
                               placeholderTextColor="#999999"
                               underlineColorAndroid="transparent"
                               clearButtonMode='while-editing'
                               style={[styles.textInput, textInputStyle]}
                               defaultValue={defaultValue}
                               keyboardType={this.props.keyboardType}
                               onChangeText={(text) => this._textChange(text)}
                               maxLength={this.props.maxLength}
                               onFocus={this._onFocus}
                               onBlur={this._onBlur}
                               editable={this.props.editable}
                               {...props}
                    />
                    {deleteBtn}
                </View>
            </View>
        );
    }

    _deleteDepartment = () => {
        this._textInput.clear();
        this._textChange('');
    }

    _textChange = (text) => {
        this._text = text;
        this.forceUpdate();
        this.props.onChangeText && this.props.onChangeText(text)
    }

    _onFocus = (event) => {
        this.setState({onClick: true});
        this.props.onFocus && this.props.onFocus(event);
    }

    _onBlur = (event) => {
        this.setState({onClick: false});
        this.props.onBlur && this.props.onBlur(event);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: '#ddd',
        // width:300
    },

    title: {
        fontSize: 16,
        color: '#000'
    },
    titleView: {
        alignItems: 'center',
        marginRight: 15,
        flexDirection: 'row'
    },
    textInput: {
        height: 38,
        flex: 1,
        color: '#000'
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    deleteBtn: {
        marginRight: 10,
    }
});

export default WTextInput;