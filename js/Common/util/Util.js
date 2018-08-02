/**
 * Created by git on 16/8/3.
 * @flow
 */

'use strict';

var React = require('react');

var Util = {

    //拼接url
    urlAppendQeury(url: string, query: Object): string {
        if (query) {
            var queryString = Object.keys(query).map(function (key) {
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
    },

    queryToJson: function (query) {
        var result = {};
        if (query.lastIndexOf("?") === 0) {
            query = query.substr(1);
        }
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    },

    jsonToQuery: function (json) {
        return "?" +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + "=" +
                    encodeURIComponent(json[key]);
            }).join("&");
    },

    /**
     * ��ʽ��money
     * sΪҪ��ʽ����money
     * nΪС��λ��
     */
    fmoney(s, n) {
        if (s === '')
            return;
        n = n > 0 && n <= 20 ? n : 0;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (n === 0) {
            return t.split("").reverse();
        }
        return t.split("").reverse().join("") + "." + r;
    },

    //格式化金额
    convertData(num, formate, flagDisplay = true) {
        if (num == null) {
            num = 0
        }
        let flag = "";
        if (flagDisplay) {
            flag = num > 0 ? '+' : '';
        }
        let strNum = flag + (num / formate).toFixed(2);
        return strNum;
    },

    //判断对象是否为空
    isEmptyObject(obj) {

        for (var key in obj) {
            return false
        }
        ;
        return true
    },

    //筛选条件-用于初始化选择的数据
    initFilterSelectData(value, dataMap) {
        let selectData = []

        if (value && value.length > 0) {
            selectData.push({title: '不限', selected: false})
        } else {
            selectData.push({title: '不限', selected: true})
        }
        for (let key in dataMap) {
            if (key != 0) {
                let newItem = {title: dataMap[key], value: key}

                if (value && value == key) {
                    newItem.selected = true;
                } else {
                    newItem.selected = false;
                }
                selectData.push(newItem);
            }
        }
        return selectData
    },

    //生成UUID
    UUID32() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23];

        return s.join("");
    }

};

module.exports = Util;