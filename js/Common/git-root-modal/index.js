/**
 * Created by wangjianying1@git.com.cn on 17/2/8.
 * @flow
 * 提示框
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, Platform, BackHandler} from 'react-native';
import {Manager} from './Modal'
import ModalContainer from './ModalContainer'
import TitleDialog from './TitleDialog'

class Dialog extends React.Component {

    static propTypes = {
        backAndroid: PropTypes.bool,     //是否支持安卓物理后退键,默认支持
        onBackHandler: PropTypes.func,   //触发安卓物理后退键,若使用这个方法,最后要调用GitModalDialog.onDismiss()来关闭模态窗口
    }

    static defaultProps = {
        backAndroid: true,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        let {Component} = this.props;
        return (
            <View style={{flex: 1}}>
                {Component}
            </View>
        );
    }

    componentDidMount() {
        if (Platform.OS === 'android' && this.props.backAndroid === true) {
            BackHandler.addEventListener('dialogAlert', this._handleBack);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android' && this.props.backAndroid === true) {
            BackHandler.removeEventListener('dialogAlert', this._handleBack);
        }
    }

    _handleBack = () => {
        this.props.onBackHandler ? this.props.onBackHandler() : this.props.onDismiss && this.props.onDismiss();
        return true;
    }

}

let modal = null;

class Alert {
    /**
     * 需要显示的组件属性会默认增加关闭事件的方法onDismiss，组件需要关闭模态窗口执行   this.props.onDismiss && this.props.onDismiss();  即可
     */
    static alert(json) {
        let baseComponent = json.component || <TitleDialog {...json}/>;     //组件
        let Component = React.cloneElement(baseComponent, {
            onDismiss: () => {
                this.onDismiss()
            }
        });
        let {component, modalTop, ...other} = json;
        let props = {
            visible: true,
            style: {top: modalTop || 0, right: 0, bottom: 0, left: 0},
            children: <Dialog Component={Component} {...other}
                              onDismiss={this.onDismiss}/>
        }
        if (modal) {
            modal.destroy();
        }
        modal = new Manager(<ModalContainer
            {...props}
        />);
    }

    static onDismiss() {
        if (modal) {
            modal.destroy();
            modal = null;
        }

    }

}

export default Alert;