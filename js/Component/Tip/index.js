/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import RootModal from './RootModal'
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity   style={{borderRadius:10,height:20,width:100,borderWidth:StyleSheet.hairlineWidth,marginTop:10,borderColor:'red',justifyContent:'center',alignItems:'center'}}
                                    onPress={this._onPress}
                >
                    <Text>点击弹窗</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _onPress = ()=>{
        let json = {  defaultTitle:'123231312312'  }

        RootModal.alert(json)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;