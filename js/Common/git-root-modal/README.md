/**
 * Created by git-wangjianying on 2018/1/2.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {GitModalDialog} from 'app-design'

class Page extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this._onClick}>点击模态</Text>
            </View>
        );
    }
    
    _onClick = ()=> {
        let json = {
            title :'XXX客户信息已保存！是否维护经营实体信息？',
            onCancel: ()=> {
                console.log('onCancel')
            },
            onSure: ()=> {
            }
        }
        GitModalDialog.alert({
            onBackHandler: ()=> {
                console.warn('onBackHandler');
                GitModalDialog.onDismiss();
            },
            //BackAndroid:false,

            //若不传递组件,则默认使用TitleDialog
            ...json
            //需要显示的组件属性会默认增加关闭事件的方法onDismiss，组件需要关闭模态窗口执行   this.props.onDismiss && this.props.onDismiss();  即可
            //component: <TitleModal {...json}/>
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Page;


