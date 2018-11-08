'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {ScreenWidth} from "./Common/util/Constant";

class AddPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.optionArray = [''];
        this.answerArray = ['0'];
        this.titleArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    }

    render() {
        let textInputView = this.optionArray.map((item, index) => {
            let icon = this.answerArray[index] === '0' ? require('./img/icon_unselected.png') : require('./img/icon_selected.png')
            return (
                <View key={'textInput' + index} style={styles.view}>
                    <Text>{this.titleArray[index] + '选项'}</Text>
                    <TextInput style={styles.textInput}
                               onChangeText={(text) => {
                                   this.optionArray[index] = text;
                               }}/>
                    <TouchableOpacity onPress={() => {
                        //单选
                        for (let i = 0; i < this.answerArray.length; i++) {
                            this.answerArray[i] = '0';
                        }
                        this.answerArray[index] = '1';
                        //多选
                        // this.answerArray[index] = this.answerArray[index] === '0' ? '1' : '0';
                        this.forceUpdate();
                    }}>
                        <Image source={icon}/>
                    </TouchableOpacity>
                </View>
            )
        });

        return (
            <View style={styles.container}>
                {textInputView}
                <TouchableOpacity style={styles.add}
                                  activeOpacity={1}
                                  onPress={this._onAdd}>
                    <Text style={{color: '#ddd', fontSize: 14}}>添加</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add}
                                  activeOpacity={1}
                                  onPress={this._onDeleted}>
                    <Text style={{color: '#ddd', fontSize: 14}}>减少</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={this._onConfirm}>
                    <Text style={{color: '#ddd', fontSize: 14}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    };

    _onAdd = () => {
        if (this.optionArray.length < 10) {
            this.optionArray.push('');
            this.answerArray.push('0');
            this.forceUpdate();
        } else {
            //最多10个选项
        }
    };
    _onDeleted = () => {
        if (this.optionArray.length > 1) {
            this.optionArray.pop();
            this.answerArray.pop();
            this.forceUpdate();
        } else {
            //最少一个选项
        }
    };


    _onConfirm = () => {
        console.warn(this.optionArray);
        console.warn(this.answerArray);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 44,
        flex: 1,
        marginLeft: 10
    },
    add: {
        height: 44,
        width: ScreenWidth,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        paddingHorizontal: 10
    }
});

export default AddPage;