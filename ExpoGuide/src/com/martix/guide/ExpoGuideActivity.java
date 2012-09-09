package com.martix.guide;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class ExpoGuideActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        //super.loadUrl("file:///android_asset/www/jquery.mobile-1.1.0/demos/index.html");
    }
}