'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import {iOS} from "../util/Constant";

class WMoreTextInput extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    _text = "";

    render() {
        let Icon = require('./img/icon_delete.png');
        let deleteBtn = this._text && !iOS ? (
            <TouchableOpacity onPress={this._deleteBtn} style={styles.deleteBtn}>
                <Image source={Icon} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
        ) : null;
        return (
            <ScrollView style={styles.container}>
                <TextInput style={styles.textInput}
                           maxLength={100}
                           multiline={true}
                           underlineColorAndroid="transparent"
                           ref='textInput'
                           placeholder='请输入话题内容'
                           placeholderTextColor="#999999"
                           onChangeText={(text) => this ._onChangeText(text)}
                >
                </TextInput>
            </ScrollView>
        );
    }

    _deleteBtn = () => {
        this.refs['textInput'].clear();
        this._text = '';
        this.forceUpdate();
        this.props.onChangeText && this.props.onChangeText(this._text);
    }

    _onChangeText =(text)=> {
        this._text = text;
        this.forceUpdate();
        this.props.onChangeText && this.props.onChangeText(this._text);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 210,
        backgroundColor: '#fff',
        fontSize: 14,
        paddingHorizontal: 13,
        borderColor: '#cccccc',
        // borderBottomWidth:StyleSheet.hairlineWidth,
        textAlignVertical: 'top',
        // borderTopWidth:StyleSheet.hairlineWidth
    },
    deleteBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 20,
        height: 20
    }
});

export default WMoreTextInput;