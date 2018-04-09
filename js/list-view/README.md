# react-native-git-list
## 加载
```
npm install react-native-git-list --save
```
## 说明
简单的列表，在[react-native-gifted-listview](https://github.com/FaridSafi/react-native-gifted-listview)基础上进一步封装，
增加scrollTo、getRows、reloadRows、_setPage等接口以供使用
## 效果图
<img src='./../../../raw/master/components/ListView/List.gif' width="250"/>
## 示例代码
```
'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import PangingListView from 'react-native-git-list'

class index extends React.Component {
    constructor(props, context) {
        super(props, context);

        this._renderRowView = this._renderRowView.bind(this);
        this._onFetch = this._onFetch.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    render() {
        return (
            <PangingListView style={[styles.container, this.props.style]}
                             rowView={this._renderRowView}
                             onFetch={this._onFetch}
                             >
            </PangingListView>
        );
    }

    _renderRowView(rowData) {
        return (
            <TouchableHighlight
                style={styles.row}
                underlayColor='#c8c7cc'
                onPress={() => this._onPress(rowData)}
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>
        );
    }

    _onPress(rowData) {
        console.warn(rowData + ' pressed');
    }

    _onFetch(page = 1, callback, options) {
        var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
        callback(rows);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default index;
```