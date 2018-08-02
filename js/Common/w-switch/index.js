/** * @author YASIN * @version [React Native PABank V01,17/2/23] * @date 17/2/23 * @description PASwitch2 */
import React from 'react';
import {View, StyleSheet, Animated, TouchableWithoutFeedback, PanResponder, TouchableOpacity} from 'react-native';

class ThumbView extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                <View style={[{
                    width: 14 * 2,
                    height: 14 * 2,
                    borderRadius: 14,
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    backgroundColor: 'white',
                }]}/>
            </View>);
    }
}

const Thumb = Animated.createAnimatedComponent(ThumbView);
export default class PASwitch2 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        let self = this; // 初始状态
        this.state = {
            check: props.check || false,
            translateX: 0
        };
        this._animatedThumbLeft = new Animated.Value(this.state.check ? 17 : 0);
        this._animatedThumbLeft.addListener(() => {
            self.container && self.container.setNativeProps({style: [self.props.style, {backgroundColor: self._getBgColor()}]});
        })
        this._panResponder = PanResponder.create({ // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => { // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // gestureState.{x,y}0 现在会被设置为0
                console.log('onPanResponderGrant');
            },
            onPanResponderMove: (evt, gestureState) => { // 最近一次的移动距离为gestureState.move{X,Y}
                let x = (self._animatedThumbLeft._value + gestureState.dx);
                if (x > 17) {
                    x = 17
                }
                if (x < 0) {
                    x = 0
                }
                self._animatedThumbLeft.setValue(x);
            },
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y} },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                console.log('onPanResponderRelease');
                if (gestureState.dx == 0) {
                    self._onPress();
                } else {
                    if (self._animatedThumbLeft._value < 8.5) {
                        this.state.check = true;
                    } else {
                        this.state.check = false;
                    }
                    self._onPress();
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    };

    componentWillReceiveProps(next) {
        if (this.state.check !== next.check) {
            this.setState({check: next.check})
        }
        if (next.check) {
            this._animatedThumbLeft.setValue(17);
        }else{
            this._animatedThumbLeft.setValue(0);
        }
    };

    render() {
        return (
            <View  {...this._panResponder.panHandlers} >
                <TouchableOpacity
                    onPress={this._onPress.bind(this)}>
                    <View ref={(ref) => {
                        this.container = ref;
                    }}
                          onCheckChangeListener
                          style={[styles.container, {backgroundColor: this._getBgColor()}]}>
                        <Thumb
                            style={[{
                                width: 14 * 2,
                                height: 14 * 2,
                                left: this._animatedThumbLeft,
                                top: 0,
                                alignItems: 'center'
                            }]}/>
                    </View>
                </TouchableOpacity>
            </View>);
    }

    _onPress() {
        this.state.check = !this.state.check;
        this.props.onCheckChangeListener && this.props.onCheckChangeListener(this.state.check);
        this._transplateX()
    }

    _getBgColor() {
        if (this.state.check) {
            return 'rgba(76,231,99,1)';
        } else {
            return 'transparent';
        }
    }

    _transplateX() {
        Animated.timing(this._animatedThumbLeft, {
            toValue: this.state.check ? 45 - 28 : 0,
            duration: 200
        }).start(() => {
        });
    }
}
// PASwitch2.defaultProps = {checkedColor: 'rgba(76,231,99,1)', unCheckColor: 'transparent'}

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#cccccc',
        justifyContent: 'center',
    }
});
