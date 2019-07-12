/**
 * Created by git on 16/10/10.
 */

import Http from './Http';
import * as AppUrl from './AppUrl';

export default class User {
    //启动广告
    static Url_name(param): Promise{
        return Http.apiGet(AppUrl.URL, param);
    }
}