/**
 * Created by zhangjianlin@git.com.cn on 2017/1/18.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {IndicatorViewPager, PagerDotIndicator} from '../git-viewpager'

class InnerPage extends React.Component {
    constructor(props) {
        super(props);


        let {index, position, preload} = props;
        let placeholder = true;
        if(preload!==false){
            if((index>=position-1)&&(index<=position+1)){
                placeholder=false;
            }
        }else{
            if(index === position){
                placeholder=false;
            }
        }
        this.state = {placeholder}
    }

    componentWillReceiveProps(props) {
        if(props.position !== this.props.position){
            let placeholder = true;
            let {index, position, preload} = props;
            //if((index>=position-1)&&(index<=position+1)){
            //    placeholder=false;
            //}

            if(preload!==false){
                if((index>=position-1)&&(index<=position+1)){
                    placeholder=false;
                }
            }else{
                if(index === position){
                    placeholder=false;
                }
            }
            //this.state = {placeholder}

            if(placeholder!==this.state.placeholder){
                this.setState({placeholder})
            }
        }
    }

    render() {
        let {placeholder} = this.state;
        let {page, index, position}  = this.props;
        
        if(!this._pageView){
            if(placeholder){
                return <View />
            }
        }

        let pageView;
        if(this._pageView){
            pageView = this._pageView;
        }else{
            pageView = page({index, position});
            this._pageView = pageView;
        }

        return (
            <View style={[{flex: 1}]}>
                {pageView}
            </View>
        );
    }
}



class PagesView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {position: props.position||0}
    }

    render() {
        let {pages, showIndicator, style, preload}  = this.props;
        let {position} = this.state;
        pages = pages.map((page, index)=>{
            return (
                <View key={index} style={{flex:1}}><InnerPage
                    page={page}
                    index={index}
                    preload={preload}
                    position={position}/></View>)
        })

        return (
            <IndicatorViewPager ref="pager" style={[{flex: 1}, style]} scrollEnabled={this.props.scrollEnabled}
                                onPageSelected={this._onPageSelected}
                                indicator={showIndicator?this._renderIndicator():null}>
                {pages}
            </IndicatorViewPager>
        );
    }

    componentDidMount() {
        this.refs.pager.setPage(this.props.currentIndex || 0)
    }

    _onPageSelected = ({position})=>{
        if(position !== this.state.position){
            this.setState({position});
            this.props.onPageSelected&&this.props.onPageSelected({position})
        }
    }

    setPage = (selectedPage)=>{
        this.refs.pager.setPage(selectedPage);
    }

    _renderIndicator = ()=>{
        let {pages, dotStyle, selectedDotStyle, dotContainerStyle} = this.props;
        return <PagerDotIndicator pageCount={pages.length} dotStyle={dotStyle} selectedDotStyle={selectedDotStyle}
                                  style={dotContainerStyle}/>;
    }
}

export default PagesView