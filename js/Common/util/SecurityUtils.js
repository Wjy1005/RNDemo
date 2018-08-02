/**
 * 安全加密工具类
 * Created by jianghaobin on 2017/12/28.
 * @flow
 */


'use strict';

import NodeRSA from 'node-rsa'
import bcrypt from 'bcryptjs'

export default class SecurityUtils{

    //慢hash加密
    static hashSync(password, salt){
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    //rsa加密
    static rsaEncrypt(publicKey,content){
        let key = new NodeRSA(publicKey);

        key.setOptions({encryptionScheme: "pkcs1"});
        let encrypted = key.encrypt(content, 'base64');
        return encrypted;
    }


}
