package com.rndemo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.git.imagepicker.GITImagePickerPackage;
import cn.com.git.face.GitFacePackage;
import com.horcrux.svg.SvgPackage;
import cn.reactnative.customkeyboard.RNCustomKeyboardPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rndemo.TestDemo.TestDemoPackage;

import java.util.Arrays;
import java.util.List;
import com.rndemo.MainActivity;
public class MainApplication extends Application implements ReactApplication {

  protected static MainApplication sInstance; //自己类实例

  private String name;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImagePickerPackage(),
            new GITImagePickerPackage(),
            new GitFacePackage(),
            new SvgPackage(),
            new RNCustomKeyboardPackage(),
            new RNSpinkitPackage(),
            new LinearGradientPackage(),
            new ReactVideoPackage(),
            new RNFetchBlobPackage()
              ,new TestDemoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  //获取MainApplication类
  public static MainApplication getInstance() {
    return sInstance;
  }
  //让其他类调用获取数据
  public String getData(){
    return name;
  }

  @Override
  public void onCreate() {
    //赋值
    sInstance = this;
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
