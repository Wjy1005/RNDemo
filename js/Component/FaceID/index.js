/**
 * Created by git-wangjianying on 2017/11/20.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import FaceId from 'react-native-git-face'
import ImgPicker from 'react-native-image-picker'
import User from '../../User/user'
class index extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.uuid = this.UUID32();
        this.state={
            photos:[],

            param : {
                api_key:'MIuMPX0TIo11F8yu3_lb-4HTenWhaOmP',
                api_secret:'5mmO2j49fPV3RpG64ieTAyWKjISMbk0G',
                comparison_type:'0',
                face_image_type:'meglive',
                uuid:"53f1166262181649be68f496849933de"
            }
        }
    }

    render()
    {
        let imageViews = this.state.photos.length>0?(
            this.state.photos.map((item,index)=>{
                return (
                    <Image key={"image"+index} style={styles.image} source={{uri:item}}/>
                )
            })
        ):null;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onChoosePic}>
                    <Text>选择照片</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onPress}>
                    <Text>人脸识别</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {imageViews}
                </View>
            </View>
        );
    }

    _onPress = async()=>
    {
        console.log(this.state.param);
        try{
            FaceId.startFace()
                .then((data)=>{
                    console.log(data);
                    User.faceId({...this.state.param,delta:data[0].delta,
                        image_best:data[0].bastImage
                        //files:[...this.state.param.files, {uri:data[0].bastImage,name:'image_best'}]
                })
                        .then((json)=>{
                            console.log(json);
                        }).catch((error)=>{
                        console.log(error);
                    })
                }).catch((error)=>{
                console.log(error);
            })
        }catch (e){
            console.log(e);
        }

    }

    _onChoosePic =()=>
    {
        let options = {
            //底部弹出框选项
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'RNDF'
            },
            //maxWidth:100,
            //maxHeight:100
        }
        ImgPicker.showImagePicker(options, (response) => {
            console.log('Response = ');
            console.log(response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('image-picker Error: ');
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ');
            }
            else {
                if(response.uri){
                    let items = this.state.photos
                    items.push(response.uri)
                    this.setState({
                                    photos:items,
                                    param:{...this.state.param,files:[{uri:response.uri,name:'image_ref1'}]}
                    })
                }
            }
        });
        //FaceId.startFace()
        //    .then((data)=>{
        //        console.log(data);
        //        this.setState({
        //                                        param:{...this.state.param,image_ref1:data[0].bastImage}
        //                        })
        //    }).catch((error)=>{
        //    console.log(error);
        //})
    }

    UUID32(){
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] ;

        return s.join("");
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer:{
        flex:1,
        flexWrap:'wrap'
    },
    image:{
        width:200,
        height:200,
        marginRight:10,
        marginBottom:10
    }
});

export default index;