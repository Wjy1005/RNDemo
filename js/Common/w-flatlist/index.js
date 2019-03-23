/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

function MergeRecursive(obj1, obj2) {
    for (let p in obj2) {
        try {
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch(e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

class index extends React.Component {

    static propTypes = {
    }

    static defaultProps = {
        customStyles: {},
        initialListSize: 10,
        firstLoader: true,
        pagination: true,
        refreshable: true,
        refreshableColors: undefined,
        refreshableProgressBackgroundColor: undefined,
        refreshableSize: undefined,
        refreshableTitle: undefined,
        refreshableTintColor: undefined,
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) { callback([]); },

        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
    };

    constructor(props, context) {
        super(props, context);
        this.page = 1;
        this.dataSource = [];
        this.state = {
            isRefreshing: false,
            paginationStatus: 'firstLoad'
        }
        this.defaultStyles = {
            separator: {
                height: 1,
                backgroundColor: '#CCC'
            },
            actionsLabel: {
                fontSize: 20,
                color: '#ccc'
            },
            paginationView: {
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
            },
            defaultView: {
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            },
            defaultViewTitle: {
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 15,
            },
        }
    }

    render() {
        let {...otherProps} = this.props;
        return (
            <FlatList style = {{flex: 1}}
                      key = 'flatList'
                      ref = {ref => this.flatList = ref}
                      data = {this.dataSource}
                      keyExtractor = {this._keyExtractor}
                      ItemSeparatorComponent = {this._ItemSeparatorComponent}
                      onRefresh = {() => this._onFetch(this.page = 1)}
                      refreshing = {this.state.isRefreshing}
                      onEndReached = {this.fetchMoreData}
                      onEndReachedThreshold = {0.01}
                      ListFooterComponent = {this._listFooterComponent}
                      extraData = {this.state}
                      onViewableItemsChanged = {this._onViewableItemsChanged}
                // onScroll={this._onScroll}
                      onContentSizeChange = {this.onContentSizeChange}
                      {...otherProps}
            />
        );
    }

    onContentSizeChange = () => {
        this.isCanLoadMore = true // flatview内部组件布局完成以后会调用这个方法
    }
    componentDidMount() {
        this._mounted = true;
        this._onFetch();
    }

    // _onScroll = (event)=>{
    //     console.log(event.nativeEvent.contentOffset.y)
    // }

    _getPage = () => {return this.page;};
    _setPage = page => { this.page = page; };
    _setRows = rows => { this.rows = rows; };
    _getRows = () => { return this.rows; };
    getDataSource = () => { return this.dataSource}
    _onFetch = async () => {
        try {
            await this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: this._getPage() === 1});
        }catch (e) {
            console.log(e);
        }
    };

    _onViewableItemsChanged = ({viewableItems, changed}) => {
        //console.log('onViewableItemsChanged')
        //console.log(viewableItems)
        //console.log(changed)
    };

    _postRefresh = (rows = [], options = {}) => {
        if (this._mounted) {
            this._updateRows(rows, options);
        }
    };

    _updateRows = (rows = [], options = {}) => {
        if (rows !== null) {
            this._setRows(rows);
            if (this._getPage() === 1){
                this.dataSource = [];
            }
            this.dataSource = this.dataSource.concat(rows);
            this.setState({
                isRefreshing: false,
                paginationStatus: options.allLoaded === true ? 'allLoaded' : 'waiting',
            });
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: options.allLoaded === true ? 'allLoaded' : 'waiting',
            });
        }
    };

    fetchMoreData = () => {
        if (this.isCanLoadMore) {
            if (this.state.paginationStatus !== 'allLoaded') {
                this.page = this.page + 1;
                this._onFetch()
                this.isCanLoadMore = false
            }
        }
    };

    _keyExtractor = (item, index) => index.toString();

    _ItemSeparatorComponent = () => {
        let view =
            this.props.ItemSeparatorComponent ? this.props.ItemSeparatorComponent() :
                <View style = {{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>
        ;
        return (
            <View>
                {view}
            </View>
        )
    };

    emptyView =refreshCallback => {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style = {[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
                <Text style = {[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    Sorry, there is no content to display
                </Text>

                <TouchableHighlight
                    underlayColor = '#c8c7cc'
                    onPress = {refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    };

    //刷新
    _onRefresh = (options = {firstLoad: true}) => {
        if (this._mounted) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            this.props.onRefresh && this.props.onRefresh();
            this.props.onFetch(this._getPage(), this._postRefresh, options);
        }
    }

    paginationFetchingView(firstLoaderHide) {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView(firstLoaderHide);
        }

        if(firstLoaderHide){
            return null;
        }
        return (
            <View style = {[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <ActivityIndicator />
            </View>
        );
    }
    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style = {[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style = {[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    我是有底线的
                </Text>
            </View>
        );
    }
    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor = '#c8c7cc'
                onPress = {paginateCallback}
                style = {[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
            >
                <ActivityIndicator />
                {/*<Text style = {[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>*/}
                {/*Load More*/}
                {/*</Text>*/}
            </TouchableHighlight>
        );
    }
    _listFooterComponent =() => {
        if (this.state.paginationStatus === 'fetching' && this.props.pagination === true || this.state.paginationStatus === 'firstLoad') {
            return this.paginationFetchingView(this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === false);
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            return this.paginationWaitingView(this._onPaginate);
        } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
            return this.paginationAllLoadedView();
        } else if (this._getRows().length === 0) {
            return this.emptyView(this._onRefresh);
        } else {
            return null;
        }
        // return (this.state.isLoadMore &&
        //     <ActivityIndicator/>
        // )
    }

    _onPaginate = () => {
        if(this.state.paginationStatus === 'allLoaded'){
            return null
        }else {
            if (this.state.paginationStatus !== 'fetching'){
                this.setState({
                    paginationStatus: 'fetching',
                });

                this._setPage(this._getPage() + 1);
                this.props.onFetch(this._getPage(), this._postPaginate, {});
            }
        }
    }

    _postPaginate = (rows = [], options = {}) => {
        let mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }
        this._updateRows(mergedRows, {firstLoad: this._getPage() === 1});
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});

export default index;