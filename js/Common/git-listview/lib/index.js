'use strict'


import React from 'react';
import PropTypes from 'prop-types';
import {
    ListView,
    Platform,
    TouchableHighlight,
    View,
    Text,
    RefreshControl,
} from 'react-native';
var createReactClass = require('create-react-class');

// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
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

var GiftedSpinner = require('./GiftedSpinner');

var GiftedListExView = createReactClass({

    getDefaultProps() {
        return {
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
    },

    propTypes: {
        rowView: PropTypes.func.isRequired,
        headerView: PropTypes.func,
        withSections: PropTypes.bool,
        sectionHeaderView: PropTypes.func,

        firstLoader: PropTypes.bool,
        pagination: PropTypes.bool,
        refreshable: PropTypes.bool,
        onFetch: PropTypes.func,

        paginationFetchingView: PropTypes.func,  // (firstLoaderHide)=>void
        paginationAllLoadedView: PropTypes.func, // (void)=>void
        paginationWaitingView: PropTypes.func,  // (this._onPaginate)=>void
        emptyView: PropTypes.func,   // (this._onRefresh)=>void
        renderSeparator: PropTypes.func,


        renderRefreshControl: PropTypes.func,
        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.string,
        refreshableTitle: PropTypes.string,
        refreshableTintColor: PropTypes.string,

        customStyles: PropTypes.object,
        initialListSize: PropTypes.number,
        scrollEnabled: PropTypes.bool,
    },

    _setPage(page) { this._page = page; },
    _getPage() { return this._page; },
    _setRows(rows) { this._rows = rows; },
    _getRows() { return this._rows; },

    getRows(){
        return this._getRows();
    },

    reloadRows(rows){
        if (rows) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rows),
                });
            }
        }
    },


    paginationFetchingView(firstLoaderHide) {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView(firstLoaderHide);
        }

        if(firstLoaderHide){
            return null;
        }
        return (
            <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
              <GiftedSpinner />
            </View>
        );
    },
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
    },
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
    },
    headerView() {
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView){
            return null;
        }
        return this.props.headerView();
    },
    emptyView(refreshCallback) {
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
    },
    renderSeparator(sectionID, rowID) {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View key={sectionID+'-'+rowID} style={[this.defaultStyles.separator, this.props.customStyles.separator]} />
        );
    },

    getInitialState() {
        this._setPage(1);
        this._setRows([]);

        var ds = null;
        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            return {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
            };
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            });
            return {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
            };
        }
    },

    componentDidMount() {
        this._mounted = true;
        this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
    },
    componentWillUnmount() {
        this._mounted = false;
    },
    setNativeProps(props) {
        this.refs.listview.setNativeProps(props);
    },

    _onRefresh(options = {}) {
        if (this._mounted) {
            this.setState({
                isRefreshing: true,
            });
            this._setPage(1);
            this.props.onRefresh && this.props.onRefresh();
            this.props.onFetch(this._getPage(), this._postRefresh, options);
        }
    },

    _postRefresh(rows = [], options = {}) {
        if (this._mounted) {
            this._updateRows(rows, options);
        }
    },

    _onPaginate() {
        if(this.state.paginationStatus==='allLoaded'){
            return null
        }else {
            if(this.state.paginationStatus!=='fetching'){
                this.setState({
                    paginationStatus: 'fetching',
                });

                this._setPage(this._getPage() + 1);

                this.props.onFetch(this._getPage(), this._postPaginate, {});
            }
        }
    },

    _postPaginate(rows = [], options = {}) {

        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }
        this._updateRows(mergedRows, options);
    },

    _updateRows(rows = [], options = {}) {
        if (rows !== null) {
            this._setRows(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(rows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    },

    _renderPaginationView() {
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
    },

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({ onRefresh: this._onRefresh });
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor}
                title={this.props.refreshableTitle}
            />
        );
    },
    _onScrollTo(index){
        this.refs.listview.scrollTo(index)
    },
    scrollTo(size){
        this.refs.listview.scrollTo(size)
    },
    render() {
        let {onEndReached, ...restProps} = this.props;
        return (
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.props.rowView}
                renderSectionHeader={this.props.sectionHeaderView}
                renderHeader={this.headerView}
                renderFooter={this._renderPaginationView}
                renderSeparator={this.renderSeparator}

                automaticallyAdjustContentInsets={false}
                scrollEnabled={this.props.scrollEnabled}
                canCancelContentTouches={true}
                refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}
                onEndReached={()=>{
                    if(this._getRows().length > 0){
                        onEndReached&&onEndReached()
                    }}}
                {...restProps}

                style={this.props.style}
                enableEmptySections={true}
            />
        );
    },

    defaultStyles: {
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
    },
});


module.exports = GiftedListExView;

