/**
 * Created by git on 16/8/30.
 */

'use strict';

import {NativeModules} from 'react-native'
const SettingsManager = NativeModules.SettingsManager;

//true 代表本地测试环境，false 代表云测试环境
var testFlag = true;
//var host = 'https://ixtapptest.citic.com/ixtapp';
if(__DEV__){
    if(SettingsManager&&SettingsManager.settings.isTestServer){
        host = SettingsManager.settings.isTestServer;
    }
}


//var host = 'http://10.6.24.32:8080/ixtapp';
//var host = 'http://10.6.186.13:8080/ixtapp';
//var host = 'http://10.6.24.36:8080/ixtapp';
//var host = 'http://10.6.187.6:8080/ixtapp';
//var host = 'http://qyhtest.citic.com/ixtapp';
var host = 'https://qyhtest.citic.com/ixtapp';
//var host = 'http://10.3.241.165:8080/ixtapp';
//

if (!testFlag){
    host = 'https://m.citic.com/ixtapp';
}

class AppUrl {
    static gettestFlag() {
        return testFlag
    }
}
export const URL_MyShare = host;

//分享默认图片
export const URL_SHARE_WX = 'https://citicappupdate.oss-cn-beijing.aliyuncs.com/ixtapp/prod/58X58.png'
//启动广告页
export const URL_LOADING_AD = host + '/m/ad/preNew';

export const URL_THIRD_LOGIN = host + '/m/login/thirdLi';
export const URL_USER_LOGIN = host + '/m/login/li';
export const URL_USER_CHECK_LOGIN = host + '/m/login/checkLogin';
export const URL_USER_LOGOUT = host + '/m/login/lo';
export const URL_USER_CHECK = host + '/m/regist/check';
// 统一用户登录
export const URL_UNITE_USER_LOGIN = host + '/m/login/uniteLogin';

//先锋榜
export const XFB_HOT_INFO = host + '/m/vang/hotInfo';
export const XFB_INFO_PUBLISH = host + '/m/vang/infoPublish';
export const XFB_HOT_CATEGORY = host + '/m/vang/hotCategory';
export const XFB_ACTIVE_OFFICE = host + '/m/vang/activeOffice'

//注册
export const REGIST_CHECK = host + '/m/regist/check';
export const REGIST_CREATE = host + '/m/regist/create';

//登录前修改密码
export const URL_CHANGE_PWD = host + '/m/user/setPwd';
//登录后修改密码
export const URL_CHANGE_PWD2 = host + '/m/user/changePwd';

//获取验证码
export const VALIDCODE_SMS = host + '/m/validcode/sms';
//检测授权
export const URL_LOGIN_CHECK_AUTH = host + '/m/login/checkAuth'

//获取栏目
export const URL_CATEGORY_LIST = host + '/m/category/getCategoryByKeyFun';
//获取栏目下的文章
export const URL_ARTICLE_LIST = host + '/m/article/getArticleByCategory';
//详情
// export const URL_ARTICLE_DETAIL = host + '/wx/cms/article/detail';
export const URL_ARTICLE_DETAIL = host + '/wx/cmsArticle/detail';
export const URL_SHARE_ARTICLE_DETAIL = host + '/wx/cmsArticle/wxdetail';
export const URL_GET_ARTICLE = host + '/m/article/get'
//搜索
export const URL_SEARCH = host + '/m/article/getArticleByCategory';
export const URL_SEARCH_ARTICLE = host + '/m/article/searchArticles';
//搜索地区
export const URL_SEARCH_LOCATION = host + '/m/area/list';

//查看主题（查看当前用户的意见建议/协同合作主题）
export const URL_BBS_LIST = host +'/m/bbs/list';
//创建主题（创建意见建议/协同合作主题）
export const URL_BBS_CREAT = host + '/m/bbs/create';
//回复主题（回复意见建议/协同合作主题）
export const URL_BBS_REPLY = host + '/m/bbs/reply';
//删除主题（回复意见建议/协同合作主题）
export const URL_BBS_DELETE = host + '/m/bbs/delete';
//查询用户信息
export const URL_REGIST_QUERY = host + '/m/regist/query';

//上传图片
export const URL_IMAGE_UPLOAD = host + '/m/document/fileUploadCommon';
//上传多种图片
export const URL_IMAGE_UPLOAD_MUTLI = host + '/m/document/filesUpload';


//首页数据
export const URL_MAIN_INFO = host + '/m/index/getInfos';


//发布模块url

//创建商机
export const URL_BUSINESS_PUBLISH = host + '/m/article/createBusiness';
//删除商机
export const URL_BUSINESS_DELETE = host + '/m/article/deleteArt';
//商机列表
export const URL_BUSINESS_LIST = host + '/m/article/listSelfBusi';


//查询发布类别
export const URL_PUBLISH_RUERY_TYPE = host + '/m/dpCategory/categoryTree';
//查询类别属性
export const URL_PUBLISH_TYPE_ATTRIBUTES = host + '/m/dpCategory/listAttrs';
//发布能力
export const URL_PUBLISH_COMMIT_ABILITY = host + '/m/deploy/ability';
//发布需求
export const URL_PUBLISH_COMMIT_DEMAND = host + '/m/deploy/demand';
//查询能力-我的发布列表
export const URL_PUBLISH_LIST_MY_ABILITY = host + '/m/deploy/listSelfAbility';
//查询需求-我的发布列表
export const URL_PUBLISH_LIST_MY_DEMAND = host + '/m/deploy/listSelfDemand';

//查询发布详情
export const URL_PUBLISH_LIST_DETAIL = host + '/m/deploy/listDetail';
//删除发布
export const URL_PUBLISH_ITEM_DELETE = host + '/m/deploy/delete';

//查询商机下面类别
export const URL_PUBLISH_BUSINESS_TYPE = host + '/m/category/listBusiCategory';
//创建商机
export const URL_PUBLISH_COMMIT_BUSINESS = host + '/m/article/createBusiness';
//删除商机
export const URL_PUBLISH_DELETE_BUSINESS = host + '/m/article/deleteArt';

//需求对接
//能力列表
export  const URL_DEPLOY_LISTALLABILITY = host + '/m/deploy/listAllAbility';
//需求列表
export  const URL_DEPLOY_LISTALLDEMAND = host + '/m/deploy/listAllDemand';
//图片
export  const URL_GETPIC_NEWSBYKEYFUN  = host + '/m/category/getPicNewsByKeyFun'

//收藏文章
export  const URL_ARTICLE_STORE = host + '/m/article/store';
//获取收藏文章列表
export  const URL_ARTICLE_STORELIST = host + '/m/article/storeList'
//删除文章
export  const URL_ARTICLE_REMOVESTORE = host +'/m/article/removeStore'

//检查更新
export  const URL_CHECKUPDATE = host + '/m/ixtAppUpdateManager/checkUpdate'

//极光推送
export  const URL_JPUSH_USER_REL = host +'/m/app/push/appPushUserRelationship/save'

//升级
export  const URL_VERSION_UPDATE = host +'/m/document/downloadFile?documentId='

//消息中心
export const URL_MESSAGES_CENTER  = host + '/m/app/push/appPushHistory/displayMessagesCenter'
//消息分类列表
export const URL_MESSAGES_BY_CATEGORY  = host + '/m/app/push/appPushHistory/findMessagesByCategory'
//获取消息详情
export const URL_MESSAGES_GET  = host + '/m/app/push/appPushMessage/get'
//获取消息详情
export const URL_GET_BBSINFO = host + '/m/bbs/getBbsInfo'
//标记详情页面已读
export const URL_READ_MESSAGE = host + '/m/app/push/appPushMessage/readMessage'

//修改个人资料
export const URL_REGIST_MODIFY = host + '/m/regist/modify'
//获取二维码
export const URL_GET_SHAREQR = host + '/m/userRelationship/getShareQR'
//获取版本信息
export const URL_GET_APP_VERSION_INFO = host + '/m/app/safe/appVersionInfo/get'

// 保存用户登录信息
export const URL_STATISTICS_SAVE = host + '/m/statistics/save'

// 获取中顺易签名
export const URL_SIGNATURE = host + '/m/signature/getSignature'

export default  AppUrl;