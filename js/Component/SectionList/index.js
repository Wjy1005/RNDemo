'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, SectionList} from 'react-native';
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state={
            dataSource:  {
                //'sectionID_1': ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10',],
                //'sectionID_2': ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10',],
                //'sectionID_3': ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10',],
                //'sectionID_4': ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10',],
                'sectionID_1': [],
                'sectionID_2': [],
                'sectionID_3': [],
                'sectionID_4': [],
            },
            allLoaded:false,
            key:'',
            lastKey:''
        }
        this._page = 1
    }

    render()
    {
        return (
            <View style={[styles.container,this.props.style]} >
                <SectionList
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={[ // 不同section渲染相同类型的子组件
                        {data: ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10'], key: 'sectionID_1'},
                        {data: ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10'], key: 'sectionID_2'},
                        {data: ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10'], key: 'sectionID_3'},
                        {data: ['row1','row2','row3','row4','row5','row6','row7','row8','row9','row10'], key: 'sectionID_4'},

                    ]}
                    stickySectionHeadersEnabled={true}
                />

            </View>
        );
    }
    _renderItem = (data,sid,rid)=>{
        return (
            <View key={sid}>
                <Text>11111</Text>
            </View>
        )
    }
    _renderSectionHeader = (data,sid,rid)=>{
        return (
            <TouchableOpacity style={{height:30}} onPress={()=>{this._onHeaderPress(sectionID)}} key={rid}>
                <Text>{2222}</Text>
            </TouchableOpacity>
        )
    }
    _renderRow = (data,sid,rid)=>{
        return (
            <View style={{height:30}} key={'renderRow' + sid}>
                <Text>{data}</Text>
            </View>
        )
    }

    _onFetch = (page = 1,callback,option,key)=>{
        //option={...option,allLoaded:true}
        if(option.firstLoad){
            this._callback = callback
        }
        let dataSource = this.state.dataSource
        console.log(this._page)
        if(key && !this.state.allLoaded){
            dataSource[key].push('row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10','row1','row2','row3','row4','row5','row6','row7','row8','row9','row10')
        }
        this.setState({dataSource})
        if(this._page === 3){
            this.setState({allLoaded:true})
        }
        option = {...option,allLoaded:true}
        callback(dataSource,option)
    }
    _onChangeVisibleRows = (visibleRows, changedRows)=>{
        console.log(visibleRows)
        //console.log(visibleRows)
        //console.log(this.state.allLoaded)
        //let keys = Object.keys(visibleRows)
        //if(keys.length > 1){
        //    if(this.state.allLoaded){
        //        if(this._keys != keys){
        //            this.setState({allLoaded:false})
        //            this._keys = keys
        //        }else{
        //            this.setState({allLoaded:true})
        //        }
        //    }else{
        //        if(!this._keys || this._keys[keys.length -2] !== keys[keys.length -2]){
        //            this._getMoreRows(keys[keys.length -2])
        //        }
        //    }
        //}else{
        //
        //}
        if(!this.state.allLoaded){
            this._getMoreRows(this.state.key)
        }
    }

    _getMoreRows = (key)=>{
        console.log('_getMoreRows')
        this._onFetch(this._page++ ,this._callback,{},key)
    }
    _onHeaderPress = (sectionID)=>{
        console.log(sectionID)
        let {lastKey} = this.state
        if(lastKey === sectionID){

        }else{
            if(lastKey === ''){
            }else{
                let dataSource = this.state.dataSource
                dataSource[lastKey] = []
                this.setState({dataSource})
            }
            this.setState({lastKey:sectionID})
            this._page = 0
            this.setState({key:sectionID,allLoaded:false},()=>{
                this._getMoreRows(sectionID)
            })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;