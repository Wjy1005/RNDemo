/**
 * Created by git-wangjianying on 2017/10/9.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PagesView from './PagesView'

class index extends React.Component {
    static defaultProps = {
        preload: true,         //是否一次性全部加载页面
        scrollEnabled: true,   //是否支持左右滑动
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectIndex: 0
        }
    }

    render() {
        let {pages, renderHeader, renderHeaderStyle, preload, scrollEnabled, Height} = this.props
        let performancelist = (
            <PagesView ref="viewPager" pages={pages} style={[{flex: 1}]} onPageSelected={this._onPageSelected}
                       preload={preload}
                       scrollEnabled={scrollEnabled}
            />
        );
        let header = React.Children.map(renderHeader, (children, index) => {
            return (
                React.cloneElement(children, {
                    ...children.props, onPress: () => {
                        this._onPress(index)
                    }, key: 'view' + index
                })
            )
        });
        return (
            <View style={[styles.container, this.props.style]}>
                <ScrollView horizontal={true} style={[renderHeaderStyle]} showsHorizontalScrollIndicator={false}>
                    {header}
                </ScrollView>
                <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#ddd'}}/>
                <View style={{height: Height - 40}}>
                    {performancelist}
                </View>
            </View>
        );
    }

    _onPress = (index) => {
        if (this.state.selectIndex !== index) {
            this.setState({selectIndex: index});
            this.refs.viewPager.setPage(index);
            this.props.onPress && this.props.onPress(index);
        }
    }

    _onPageSelected = (params) => {
        if (params.position !== this.state.selectIndex) {
            this.setState({selectIndex: params.position});
            this.props.onPageSelected && this.props.onPageSelected(params.position);
        }
    }

    componentWillReceiveProps(next) {
        //if (next.currentPage != this.state.selectIndex) {
        //    this.refs.viewPager.setPage(next.currentPage);
        //    this.setState({selectIndex: next.currentPage});
        //}
    }
}

const styles = StyleSheet.create({
    container: {
        // 外层使用了flex:1则会使得ScrollView高度无效。
        // flex: 1,
        backgroundColor: '#fff'
    },
});

export default index;
