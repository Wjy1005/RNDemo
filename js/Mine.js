'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, DeviceInfo, FlatList, ActivityIndicator} from 'react-native';

class Mine extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(DeviceInfo.Dimensions);
        this.page = 1;
        this.dataSource = []
        this.state = {
            isLoadMore: false, //是否为下拉刷新
            isRefresh: false,
            allLoad: false
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTintColor: 'yellow',
    });

    render() {
        return (
            <View style={styles.container}>

                <Text style={{display: 'none'}}>123456</Text>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('DrawerOpen')
                }}>
                    <Text>点击打开抽屉</Text>
                </TouchableOpacity>

                <FlatList style={{height: 300, backgroundColor: 'green'}}
                    // key='flatList'
                          ref={(ref) => this.flatList = ref}
                          data={this.dataSource}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._ItemSeparatorComponent}
                          ListHeaderComponent={this._ListHeaderComponent}
                          renderItem={this._renderItem}
                          onRefresh={() => this._onFetch(this.page = 1)}
                          refreshing={false}
                          onEndReached={this.fetchMoreData}
                          onEndReachedThreshold={0.1}
                          ListFooterComponent={() => {
                              return (this.state.isLoadMore &&
                                  <ActivityIndicator/>
                              )
                          }}
                    //numColumns={1}
                    //columnWrapperStyle={{height:30,alignItems:'center'}}
                          extraData={this.state}
                          onViewableItemsChanged={this._onViewableItemsChanged}
                          onScroll={this._onScroll}
                />
                <Text>123456</Text>
            </View>
        );
    }

    componentWillMount() {
        this._onFetch(this.page)
    }

    _onScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y)
    }
    _onFetch = async (page) => {
        console.log(page);
        // console.log(this.flatList._getItemCount(this.dataSource));
        try {
            if (page === 1) {
                this.dataSource = [];
                this.setState({isRefresh: true, allLoad: false})
            } else {
                this.setState({isLoadMore: true})
            }
            for (let i = 0; i < 10; i++) {
                this.dataSource = this.dataSource.concat({title: i})
            }
            if (page === 1) {
                this.setState({isRefresh: false})
            } else {
                this.setState({isLoadMore: false})
            }
            if (page === 4) {
                this.setState({allLoad: true})
            }
        } catch (e) {
            console.log(e)
        }

    }
    _onViewableItemsChanged = ({viewableItems, changed}) => {
        //console.log('onViewableItemsChanged')
        //console.log(viewableItems)
        //console.log(changed)
    }
    fetchMoreData = () => {
        if (!this.state.allLoad) {
            this.page = this.page + 1
            this._onFetch(this.page)
        }
    }
    _keyExtractor = (item, index) => {
        // console.log(item);
        // console.log(index);
        return 'cell' + index;
    };

    _renderItem = ({item, index}) => {
        return (
            <View key={index + 'row'}
                  style={{flex: 1, margin: 'auto', marginHorizontal: 10, backgroundColor: 'yellow'}}>
                <Text>{item.title}</Text>
            </View>
        )
    }
    _ItemSeparatorComponent = (sid, rid) => {
        return (
            <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}} key={sid}/>
        )
    }
    _ListHeaderComponent = () => {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <Text>头部,点击修改值</Text>
            </TouchableOpacity>
        )
    }
    _onPress = () => {
        let items = this.flatList._getItem(this.dataSource, 10);
        console.log(items);

        this.dataSource = this.dataSource.map((item, index) => {
            item = {...item};
            if (item.title === 1) {
                item.title = -1
            }
            return item
        })
        this.forceUpdate()
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: 20
    }
});


export default Mine;