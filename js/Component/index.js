/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native';
import Navigator from '../Navigator'
import {components} from '../Config'
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.page = 1
        this.dataSource = []
        this.state={
            isLoadMore:false, //是否为下拉刷新
            isRefresh:false,
            allLoad:false
        }
        this.dataSource = components;
    }

    render()
    {
        return (
            <View style={styles.container}>
                <FlatList style={{flex:1}}
                          key='flatList'
                          ref={(ref)=>this.flatList = ref}
                          data={this.dataSource}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._ItemSeparatorComponent}
                          ListHeaderComponent={this._ListHeaderComponent}
                          renderItem={this._renderItem}
                          onRefresh={() => this._onFetch(this.page = 1)}
                          refreshing={false}
                          onEndReached={this.fetchMoreData}
                          onEndReachedThreshold={0.1}
                          ListFooterComponent={()=>{
                            return( this.state.isLoadMore &&
                                <ActivityIndicator/>
                            )
                          }}
                        //numColumns={1}
                        //columnWrapperStyle={{height:30,alignItems:'center'}}
                          extraData={this.state}
                          onViewableItemsChanged={this._onViewableItemsChanged}
                          onScroll={this._onScroll}
                />
            </View>
        );
    }
    _onScroll = (event)=>{
        console.log(event.nativeEvent.contentOffset.y)
    }
    _onFetch =async(page)=>{
        this.setState({allLoad:true})
    }
    _onViewableItemsChanged = ({viewableItems,changed})=>{
        //console.log('onViewableItemsChanged')
        //console.log(viewableItems)
        //console.log(changed)
    }
    fetchMoreData = ()=>{
        if(!this.state.allLoad){
            this.page = this.page + 1
            this._onFetch(this.page)
        }
    }
    _keyExtractor = (item, index) => index;

    _renderItem = ({item,index})=>{
        return(
            <TouchableOpacity key={index + 'row'} style={{height:44,justifyContent:'center',paddingHorizontal:10}}
                              onPress={()=>this._onItemPress(item)}>
                <Text>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    _ItemSeparatorComponent = ()=>{
        return (
            <View style={{height:StyleSheet.hairlineWidth,backgroundColor:'#ddd'}}/>
        )
    }
    _ListHeaderComponent = ()=>{
        return (
            <View/>
        )
    }
    _onItemPress = (item)=>{
        this.props.navigation.navigate(item.component);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;