/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
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
            paginationStatus:'firstLoad'
        }

        this.defaultStyles = {
            separator: {
                height: 1,
                    backgroundColor: '#CCC'
            },
            actionsLabel: {
                fontSize: 20,
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
        let {onEndReached, ...otherProps} = this.props;
        return (
            <View style={styles.container}>
                <FlatList style={{flex: 1}}
                          key='flatList'
                          ref={(ref) => this.flatList = ref}
                          data={this.dataSource}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._ItemSeparatorComponent}
                          onRefresh={() => this._onFetch(this.page = 1)}
                          refreshing={this.state.isRefreshing}
                          onEndReached={this.fetchMoreData}
                          onEndReachedThreshold={0.1}
                          ListFooterComponent={this._listFooterComponent}
                          extraData={this.state}
                          onViewableItemsChanged={this._onViewableItemsChanged}
                    // onScroll={this._onScroll}
                          {...otherProps}
                />
            </View>
        );
    };

    componentDidMount() {
        this._mounted = true;
        this._onFetch();
    };

    // _onScroll = (event)=>{
    //     console.log(event.nativeEvent.contentOffset.y)
    // }

    _getPage = () => {return this.page;};
    _setPage = (page)=> { this.page = page; };
    _setRows = (rows)=> { this.rows = rows; };
    _getRows = ()=> { return this.rows; };

    _onFetch = async () => {
        try {
            await this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
        }catch (e) {

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
            console.warn(options);
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    };

    fetchMoreData = () => {
        if (this.state.paginationStatus !== 'allLoaded' ) {
            this.page = this.page + 1;
            this._onFetch()
        }
    };

    _keyExtractor = (item, index) => index;

    _ItemSeparatorComponent = () => {
        let view = (
            this.props.ItemSeparatorComponent ? this.props.ItemSeparatorComponent() :
                (
                    <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>
                )
        );
        return (
            <View>
                {view}
            </View>
        )
    };

    emptyView =(refreshCallback)=> {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }

        return (
            <View style={[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
                <Text style={[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
                    Sorry, there is no content to display
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    };

    //刷新
    _onRefresh = (options = {}) => {
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
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <ActivityIndicator />
            </View>
        );
    };
    paginationAllLoadedView() {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    ~
                </Text>
            </View>
        );
    };
    paginationWaitingView(paginateCallback) {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
            >
                <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    Load More
                </Text>
            </TouchableHighlight>
        );
    };
    _listFooterComponent =()=> {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad')) {
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;