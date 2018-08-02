/**
 * 兼容42以及50
 * Created by jianghaobin on 2017/12/16.
 * @flow
 */

import { View, ViewPropTypes as RNViewPropTypes } from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

export default ViewPropTypes;