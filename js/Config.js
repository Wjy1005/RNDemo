/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import LinearGradient from './Component/LinearGradient'
import Tip from './Component/Tip'
import Button from './Component/Button'
import PicShow from './Component/PicShow'
import PicShow2 from './Component/PicShow2'
import PicShow3 from './Component/PicShow3'
import Android from './Component/Android'
import Video from './Component/Video'
import Redux from './Component/Redux'
import ReduxNav from './Component/ReduxNav'
import ChangeNavColor from './Component/ChangeNavColor'
import Switch from './Component/Switch'
import ViewPager from './Component/ViewPager'
import Flatlist from './Component/Flatlist'
import ILive from './Component/ILive'
import SectionList from './Component/SectionList'

export const components = [
    {title:'渐变色',component:'LinearGradient',route:LinearGradient},
    {title:'弹窗',component:'Tip',route:Tip},
    {title:'按钮',component:'Button',route:Button},
    {title:'图片展示(支持放大)',component:'PicShow',route:PicShow},
    {title:'图片展示(瀑布流)',component:'PicShow2',route:PicShow2},
    {title:'图片展示(带缓存)',component:'PicShow3',route:PicShow3},
    {title:'从Android原生获取值',component:'Android',route:Android},
    {title:'视频播放(IOS)',component:'Video',route:Video},
    {title:'react-redux',component:'Redux',route:Redux},
    {title:'react-redux-nav',component:'ReduxNav',route:ReduxNav},
    {title:'修改导航颜色',component:'ChangeNavColor',route:ChangeNavColor},
    {title:'Switch',component:'Switch',route:Switch},
    {title:'滑动页',component:'ViewPager',route:ViewPager},
    {title:'Flatlist',component:'Flatlist',route:Flatlist},
    {title:'ILive',component:'ILive',route:ILive},
    {title:'SectionList',component:'SectionList',route:SectionList},
]

