

/**
 * Created by wangjianying1@git.com.cn on 17/2/8.
 * @flow
 * 提示框模板
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
class TitleDialog extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    static defaultProps = {
        cancel: true
    }

    static propTypes = {
        cancel: PropTypes.bool   //是否显示取消按钮,默认显示
    }

    render() {

        let {title, cancel} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>{ this.props.onDismiss&&this.props.onDismiss();}}>
                <View style={styles.container}>
                    <View style={[styles.dialog]}>
                        <View style={{justifyContent:'center',alignItems:'center',paddingVertical:50}}>
                            <Text>{title}</Text>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                {cancel ?
                                    <TouchableOpacity onPress={this._onCancel} style={styles.btn}>
                                        <Text>取消</Text>
                                    </TouchableOpacity> : null}
                                <TouchableOpacity onPress={this._onSure} style={styles.btn}>
                                    <Text>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _onCancel = ()=> {
        this.props.onDismiss && this.props.onDismiss();
        this.props.onCancel && this.props.onCancel();
    }

    _onSure = ()=> {
        this.props.onDismiss && this.props.onDismiss();
        this.props.onSure && this.props.onSure();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 55
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    dialog: {
        width: width / 1.5,
        backgroundColor: 'white',
        borderRadius: 9,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    btn: {
        borderRadius: 22,
        marginTop: 30,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        marginHorizontal: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TitleDialog;