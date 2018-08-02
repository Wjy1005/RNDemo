/**
 * Http请求封装
 * Created by mawei on 2017/4/28.
 */

// import * as Keychain from 'react-native-keychain';
import {Platform} from 'react-native'
import formData from '../common/util/post-as-form'
import GitProgresshud from '../common/LyProgressHud'
import Toast from 'react-native-toast'

const TIMEOUT = 120000;

export default class HttpUtil {

    static accessToken = '';

    static progresshud = false;

    static get(url, paramters) {
        if (url.indexOf('http') === -1) {
            url = host + url;
        }
        if (!HttpUtil.progresshud) {
            GitProgresshud.showHud();
            HttpUtil.progresshud = true;
        }

        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                // throw new Error("连接超时");
                HttpUtil.progresshud = false;
                GitProgresshud.hideHud();
                Toast.showShortCenter("连接超时");
                reject(new Error("连接超时"));
            }, TIMEOUT);
            url = HttpUtil.urlAppendQeury(url, paramters);

            let headers = {
                'Accept': 'application/json'
            };
            fetch(url, {
                // credentials: "include",
                method: 'GET',
                headers: headers,
            }).then((response) => {
                if (response.status === 401) {
                    //未授权跳转到登录界面 TODO
                    console.warn(response.status);
                }
                return response.json();
            }).then((json) => {
                clearTimeout(timeoutId);
                HttpUtil.progresshud = false;
                GitProgresshud.hideHud();
                if (!json.result && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                    json.result = '200';
                }
                if (json.result === '200') {
                    resolve(json.object);
                } else {
                    Toast.showShortCenter(json.message || '请求错误');
                    reject(new Error(json.message || '请求错误'));
                }
            }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    HttpUtil.progresshud = false;
                    GitProgresshud.hideHud();
                    Toast.showShortCenter(error.message || '请求错误');
                    reject(error);
                }
            );
        })
    }

    static async apiGet(url, params) {
        params = {
            ...params,
            //这里放一些通用的参数
        };
        return this.get(url, params);
    }

    static post(url, params) {

        if (!HttpUtil.progresshud) {
            GitProgresshud.showHud();
            HttpUtil.progresshud = true;
        }
        if (url.indexOf('http') === -1) {
            url = host + url;
        }
        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                // throw new Error("连接超时");
                HttpUtil.progresshud = false;
                GitProgresshud.hideHud();
                Toast.showShortCenter("连接超时");
                reject(new Error("连接超时"));
            }, TIMEOUT);
            let headers = {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                // 'Accept': 'text/html',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                // 'Content-Type': 'text/html;charset=UTF-8',
                // 'charset':'utf-8'
            };

            fetch(url, {
                // credentials: "include",
                method: 'POST',
                headers: headers,
                body: formData(params)
            })
                .then((response) => {
                    if (response.status === 401) {
                        //未授权跳转到登录界面 TODO
                        console.warn(response.status);
                    }

                    return response.json();
                })
                .then((json) => {
                    clearTimeout(timeoutId);
                    HttpUtil.progresshud = false;
                    GitProgresshud.hideHud();

                    if (!json.result && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                        json.result = 200;
                    }
                    if (json.result === 200) {
                        if (json.object) {
                            resolve(json.object);
                        } else {
                            resolve(json);
                        }
                    } else {
                        Toast.showShortCenter(json.message || '请求错误');
                        reject(new Error(json.message || '请求错误'));
                    }
                }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    HttpUtil.progresshud = false;
                    GitProgresshud.hideHud();
                    Toast.showShortCenter(error.message || '请求错误');
                    reject(error);
                }
            );
        })
    }

    static async apiPost(url, params) {
        params = {
            ...params,
            //这里放一些通用的参数
        };
        return this.post(url, params);
    }

    static urlAppendQeury(url, query) {
        if (query) {
            let queryString = Object.keys(query).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
            }).join("&");
            if (url.indexOf('?') === -1) {
                queryString = '?' + queryString;
            } else {
                queryString = '&' + queryString;
            }
            return url + queryString;
        }
        return url;
    }


    static async FormPost(url: string, params: Object) {

        let accessToken = await this.getAccessToken();
        url = host + url;
        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                throw new Error("连接超时");
            }, TIMEOUT);

            fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: formData(params),
            }).then((response) => response.json())
                .then((json) => {
                    clearTimeout(timeoutId);
                    if (!json.errcode && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                        json.errcode = '0';
                    }
                    if (json.errcode === '0') {
                        resolve(json);
                    } else {
                        reject(new Error(json.errmsg || json.error || '请求错误'));
                    }
                }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    reject(error);
                }
            );
        })
    }


    static async MultipartPost(url: string, paramters: Object) {

        if (!HttpUtil.progresshud) {
            GitProgresshud.showHud();
            HttpUtil.progresshud = true;
        }
        if (url.indexOf('http') === -1) {
            url = host + url;
        }
        // let accessToken = await this.getAccessToken();
        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                HttpUtil.progresshud = false;
                GitProgresshud.hideHud();
                Toast.showShortCenter("连接超时");
                reject(new Error("连接超时"));
            }, TIMEOUT);

            let formData = new FormData();
            for (let key in paramters) {
                let value = paramters[key];
                if (key === 'files') {
                    value.forEach((file, index) => {
                        let uri = file.uri;
                        let name = file.name;
                        let type = file.type;

                        if (!name) {
                            let index = uri.lastIndexOf('/');
                            name = uri.slice(index + 1);
                        }
                        if (!name) {
                            name = 'file' + index;
                        }

                        if (!type) {
                            let index = name.lastIndexOf('.');
                            if (index !== -1) {
                                type = name.slice(index + 1).toLowerCase();
                            }

                            if (type === 'jpg' || type === 'jpeg') {
                                type = 'image/jpeg'
                            } else if (type === 'png') {
                                type = 'image/png'
                            }
                        }
                        if (!type) {
                            type = 'text/plain';
                        }
                        formData.append('file', {uri, name, type});
                    });
                } else {
                    formData.append(key, value);
                }
            }

            let options = {};
            options.method = 'POST';
            options.headers = {
                'Content-Type': 'multipart/form-data;charset=utf-8',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + accessToken
            };

            options.body = formData;

            fetch(url, options).then((response) => { return response.json()})
                .then((json) => {
                    console.warn(json);
                    clearTimeout(timeoutId);
                    HttpUtil.progresshud = false;
                    GitProgresshud.hideHud();

                    if (!json.result && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                        json.result = 200;
                    }
                    if (json.result === 200) {
                        if (json.object) {
                            resolve(json.object);
                        } else {
                            resolve(json);
                        }
                    } else {
                        Toast.showShortCenter(json.message || '请求错误');
                        reject(new Error(json.message || '请求错误'));
                    }

                }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    HttpUtil.progresshud = false;
                    GitProgresshud.hideHud();
                    console.warn('1111111');
                    console.warn(error);
                    Toast.showShortCenter(error.errmsg || error.message || '请求错误');
                    reject(error);
                }
            );
        })
    }
}
