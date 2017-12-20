//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin

        //     context.onUpdate = () => {
        //         console.log('hello,world')
        //     }
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**标题 */
    private title: egret.TextField;

    /**使用div标签播放数据流形式的ts视频 */
    private btn_ts_div: egret.TextField;
    /**使用canvas标签播放数据流形式的ts视频 */
    private btn_ts_canvas: egret.TextField;

    /**使用video标签全屏播放视频 */
    private btn_video_fullScreen: egret.TextField;
    /**使用video标签适应屏幕播放视频 */
    private btn_video_fitScreen: egret.TextField;
    /**使用视频的方式在canvas上播放视频 */
    private btn_video_canvas: egret.TextField;

    /**要播放的视频名称 */
    private videoName: string = "taikang";

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.createChildren();
        this.addTapEventListener();
    }

    /**
     * 添加点击监听事件
     */
    private addTapEventListener() {
        this.btn_ts_div.touchEnabled = true;
        this.btn_ts_div.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVideoAtDiv, this);

        this.btn_ts_canvas.touchEnabled = true;
        this.btn_ts_canvas.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVideoAtCanvas, this);

        this.btn_video_fullScreen.touchEnabled = true;
        this.btn_video_fullScreen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVideoFullScreen, this);

        this.btn_video_fitScreen.touchEnabled = true;
        this.btn_video_fitScreen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVideoFitScreen, this);

        this.btn_video_canvas.touchEnabled = true;
        this.btn_video_canvas.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVideoAtCanvas2, this);
    }

    /**
     * 1、
     * 通过使用jsmpeg.min.js在div上播放视频流
     */
    private showVideoAtDiv(): void {
        // 进入index查看详细使用
        alert("进入index查看详细使用");

        // window.open("jsmpeg-div.html", "_self");
        // window['playvideo1']();
    }

    /**用于播放文件的canvas */
    private canvas;
    /**
     * 2、
     * 通过使用jsmpeg.min.js在canvas上播放视频流
     */
    private showVideoAtCanvas(): void {

        window["playvideo2"]();
    }

    /**
     * 3、
     * 使用video标签全屏播放视频
     */
    private showVideoFullScreen() {
        // window.open("video-fullScreen.html", "_self");
        window['playvideo3']();
    }

    /**
     * 4、
     * 使用video标签适应全屏播放视频
     */
    private showVideoFitScreen() {
        window['playvideo4']();
    }

    /**
     * 5、
     * 以视频的方式在canvas上播放视频
     */
    private showVideoAtCanvas2() {
        window["playvideo5"]();
    }

    /**
     * 创建控制按钮
     */
    private createChildren() {
        let center = egret.HorizontalAlign.CENTER;
        let MIDDLE = egret.VerticalAlign.MIDDLE;
        let backgroundColor = 0xCFCFCF;

        // 文字默认设置
        egret.TextField.default_fontFamily = "微软雅黑";
        egret.TextField.default_size = 24;
        egret.TextField.default_textColor = 0x000000;
        // egret.TextField.defaultTouchEnabled = true;

        // 背景
        let bg = new egret.Sprite();
        bg.graphics.beginFill(0xBEBEBE, 1);
        bg.graphics.drawRect(0, 0, 640, 1036);
        bg.graphics.endFill();
        this.addChild(bg);

        // 标题
        this.title = new egret.TextField();
        this.title.width = 640;
        this.title.height = 80;
        this.title.background = true;
        this.title.backgroundColor = backgroundColor;
        this.title.textAlign = center;
        this.title.verticalAlign = MIDDLE;
        this.title.bold = true;
        this.addChild(this.title);
        this.title.text = "多种播放视频方式";

        // 当该对象为TF时，设置其文字位置与背景颜色
        function myStyle(obj) {
            if (obj instanceof egret.TextField) {
                obj.textAlign = center;
                obj.verticalAlign = MIDDLE;
                obj.background = true;
                obj.backgroundColor = backgroundColor;
            }
        }

        // 使用div标签播放数据流形式的ts视频
        this.btn_ts_div = new egret.TextField();
        this.addChild(this.btn_ts_div);
        this.btn_ts_div.text = "使用ts格式在div中播放";
        myStyle(this.btn_ts_div);

        // 使用canvas标签播放数据流形式的ts视频
        this.btn_ts_canvas = new egret.TextField();
        this.addChild(this.btn_ts_canvas);
        this.btn_ts_canvas.text = "使用ts格式在canvas中播放"
        myStyle(this.btn_ts_canvas);

        // 使用video标签全屏播放视频
        this.btn_video_fullScreen = new egret.TextField();
        this.addChild(this.btn_video_fullScreen);
        this.btn_video_fullScreen.text = "使用video标签全屏播放视频";
        myStyle(this.btn_video_fullScreen);

        // 使用video标签全屏播放视频
        this.btn_video_fitScreen = new egret.TextField();
        this.addChild(this.btn_video_fitScreen);
        this.btn_video_fitScreen.text = "使用video标签播放视频";
        myStyle(this.btn_video_fitScreen);

        // 用视频的方式在canvas上播放视频
        this.btn_video_canvas = new egret.TextField();
        this.addChild(this.btn_video_canvas);
        this.btn_video_canvas.text = "用视频的方式在canvas中播放";
        myStyle(this.btn_video_canvas);

        // 给所有对象设置位置
        for (var i = 2; i < this.numChildren; i++) {
            this.getChildAt(i).x = 20;
            this.getChildAt(i).y = this.getChildAt(i - 1).y + this.getChildAt(i - 1).height + 10;
            this.getChildAt(i).height = 60;
            this.getChildAt(i).width = 600;
        }

        let tips: egret.TextField = new egret.TextField();
        this.addChild(tips);
        tips.width = 600;
        tips.height = 40;
        tips.y = 1036 - 40;
        tips.size = 18;
        tips.textFlow = new Array<egret.ITextElement>(
            { text: "测试地址：" },
            { text: "http://test.i-h5.cn/lka_game/Test/JSMpeg/", style: { "href": "http://test.i-h5.cn/lka_game/Test/JSMpeg/" } });
        myStyle(tips);
        tips.touchEnabled = true;
    }
}


