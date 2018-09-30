'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import ImagePicker from "react-native-image-picker";
const width = Dimensions.get('window').width;

class index extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            images:[],
        }
    }

    render() {
        let {images} = this.state;
        let imageW = (width - 50) / 4;
        let imagePickerView = images.map((image,index)=>{
            return (
                <TouchableOpacity key={index + 'image'} style={{width:imageW,height:imageW,marginLeft:10,marginTop:10}} onPress={(index)=>this._onCheckPic(index)}>
                    <Image source={{uri:image.uri}} style={{width:imageW,height:imageW}}/>
                    <TouchableOpacity style={{width:15,height:15,position:'absolute',top:-7.5,right:-7.5}} onPress={(index)=>{this._onDelete(index)}}>
                        <Image source={require('./img/icon_delete.png')} style={{width:15,height:15}} resizeMode="stretch"/>
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        });
        let addPic = images.length < 5 ? (
            <TouchableOpacity key={index + 'image'} style={{width:imageW,height:imageW,marginLeft:10,marginTop:10}} onPress={this._onAddPic}>
                <Image source={require('./img/icon_addPic.png')} style={{width:imageW,height:imageW}} resizeMode="stretch"/>
            </TouchableOpacity>
        ):null;

        return (
            <View style={[styles.container,this.props.style]}>
                {imagePickerView}
                {addPic}
            </View>
        );
    }

    _onAddPic = ()=>{
        let options = {
            title: '请选择照片',
            customButtons: [
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从相册选取',
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let images = this.state.images;
                images.push(response);
                this.setState({
                    images
                })
            }
        });
    };

    getImages = () => {
        return this.state.images;
    }

    _onCheckPic = ()=>{

    }

    _onDelete = (index)=>{
        let images = this.state.images;
        images.splice(index,1);
        this.setState({
            images
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
});

export default index;