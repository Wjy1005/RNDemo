/**
 * Created by tangzhibin on 16/3/23.
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ViewPropTypes from '../../ViewPropTypes'

import {StyleSheet, View} from 'react-native';
import ViewPager from './ViewPager';

const VIEWPAGER_REF = 'viewPager';
const INDICATOR_REF = 'indicator';
export default class IndicatorViewPager extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        indicator: PropTypes.node,
        pagerStyle: ViewPropTypes.style
    };
    static defaultProps = {
        indicator: null,
        initialPage: 0
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <ViewPager
                    {...this.props}
                    ref={VIEWPAGER_REF}
                    style={[styles.pager, this.props.pagerStyle]}
                    onPageScroll={this._onPageScroll.bind(this)}
                    onPageSelected={this._onPageSelected.bind(this)}
                />
                {this._renderIndicator()}
            </View>
        );
    }
    _flag = 1
    _onPageScroll(params) {
        let indicator = this.refs[INDICATOR_REF];
        indicator && indicator.onPageScroll && indicator.onPageScroll(params);
        this.props.onPageScroll && this.props.onPageScroll(params);
    }

    _onPageSelected(params) {
        let indicator = this.refs[INDICATOR_REF];
        indicator && indicator.onPageSelected && indicator.onPageSelected(params);
        if(this._flag === 1){
            this.props.onPageSelected && this.props.onPageSelected(params);
        }
        this._flag = 1
    }

    _renderIndicator() {
        let {indicator, initialPage}=this.props;
        if (!indicator)return null;
        return React.cloneElement(indicator, {
            ref: INDICATOR_REF,
            pager: this,
            initialPage: initialPage
        });
    }

    setPage(selectedPage) {
        this.refs[VIEWPAGER_REF].setPage(selectedPage);
    }

    setPageWithoutAnimation(selectedPage) {
        this._flag = 0
        this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
    }
}
const styles = StyleSheet.create({
    container: {},
    pager: {
        flex: 1
    }
});
