/**
 * Created by git on 16/10/10.
 */

import Http from './Http';
import * as AppUrl from './AppUrl';
const Util = require('../common/util/Util');

//启动广告
export function getLoadingAd(param): Promise{
    return Http.Get(AppUrl.URL_LOADING_AD, param);
}

//首页数据
export function getMainInfo(param): Promise{
    return Http.Post(AppUrl.URL_MAIN_INFO, param);
}

//上传照片
export function uploadImage(param): Promise{
    return Http.MultipartPost(AppUrl.URL_IMAGE_UPLOAD, param);
}

export function uploadImages(param): Promise{
    return Http.MultipartPost(AppUrl.URL_IMAGE_UPLOAD_MUTLI, param);
}


///发布模块
export function getPublicQuertyType(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_RUERY_TYPE, param);
}

export function getPublicTypeAttribute(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_TYPE_ATTRIBUTES, param);
}

export function commitPublicAbility(param): Promise{
    return Http.FormPost(AppUrl.URL_PUBLISH_COMMIT_ABILITY, param);
}

export function commitPublicDemand(param): Promise{
    return Http.FormPost(AppUrl.URL_PUBLISH_COMMIT_DEMAND, param);
}

export function getPublicListMyAbility(param, query): Promise{
    let url = Util.urlAppendQeury(AppUrl.URL_PUBLISH_LIST_MY_ABILITY, query);
    return Http.Post(url, param, query);
}

export function getPublicListMyDemand(param, query): Promise{
    let url = Util.urlAppendQeury(AppUrl.URL_PUBLISH_LIST_MY_DEMAND, query);
    return Http.Post(url, param);
}

export function getPublicDetail(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_LIST_DETAIL, param);
}

export function deletePublic(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_ITEM_DELETE, param);
}

export function getPublicBusinessType(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_BUSINESS_TYPE, param);
}

export function commitPublicBusiness(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_COMMIT_BUSINESS, param);
}

export function deletePublicBusiness(param): Promise{
    return Http.Post(AppUrl.URL_PUBLISH_DELETE_BUSINESS, param);
}

export function getPublicListMyBusiness(param, query): Promise{
    let url = Util.urlAppendQeury(AppUrl.URL_BUSINESS_LIST, query);
    return Http.Post(url, param);
}



