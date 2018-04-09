package com.rndemo.TestDemo;

/**
 * Created by git on 17/8/31.
 */

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.rndemo.MainActivity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import com.rndemo.MainApplication;

public class TestDemoModule extends ReactContextBaseJavaModule {

    public TestDemoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TestDemoModule";
    }

    @ReactMethod
    public void show(String message, Callback json) {   //两个参数，message：从JS传值，可不用，json回调函数
        //从MainApplication获取值
        String msg = MainApplication.getInstance().getName();
        //提供了invoke方法来回调
        json.invoke(msg);
    }
}