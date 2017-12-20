# Demo_JSMpeg

> * ****多种视频播放方式，拿来就用，避免重复造轮子****


###使用ts文件播放视频方法###

>  * 使用 `ffmpeg` 将视频转换成ts文件  
>      
		ffmpeg -i video.mp4 -f mpegts -codec:v mpeg1video -s 640x1036 -b:v 2000k -r 30 -bf 0 -codec:a mp2 -ar 44100 -ac 1 -b:a 128k video.ts

>  * 创建canvas标签：
		<canvas id="canvas2"></canvas>

>  * 获取canvas：
		var mycanvas=document.getElementById("canvas2");

>  * 创建播放用的jsmpeg对象：
		var myplayer = new window['JSMpeg'].Player("video.ts",{ canvas: mycanvas,onPlayEnd: stopvideo2, autoplay: false, loop: false, audio: true, chunkSize: 0.5 * 1024 * 1024, disableGl: true });  

>  * 播放：
		myplayer.play();

>  * 暂停：
		myplayer.pause()

>  * 播放结束：
		在创建对象时，在配置中添加一个 ”onPlayEnd:playendFunc“，其中`playendFunc`就是播放结束时执行的方法 

>  * 参考：
	1、[ffmpeg安装]("https://zh.wikihow.com/%E5%9C%A8Windows%E4%B8%8A%E5%AE%89%E8%A3%85FFmpeg%E7%A8%8B%E5%BA%8F")
	2、[FFmpeg的使用]("http://jsmpeg.com/")
	3、[jsmpeg官方]("http://jsmpeg.com/")
	4、[GitHub jsmpeg开源项目地址]("https://github.com/phoboslab/jsmpeg")

> #####注：
>   
>   * 使用白鹭进行编译时，需要对 `tsconfig.json` 进行改写，将含有不需要编译的ts文件的文件或文件夹路径添加到 `exclude` 中。
>   
>   * 例：  
>		
		"exclude": [
        "node_modules",
        "bin-release/*",
        "resource/*"
    	]
	
###使用video全屏播放视频###

>  * 设置样式：
>
		<style>
	    	#video3{object-fit: fill;}
			#video3 {
				position: absolute;
				width: 100%;
				height:100%;
				top: 0px;
				/*motion-rotation: -90;*/
				/*z-index: 99999991111;*/
				left: 0;
				display: none;
			}
		</style>

>  * 添加标签：
>
    	<video id="video3" src="./resource/assets/zhuoyu.mp4" preload="none" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5"></video>

>  * 对标签进行操作：
>  
	    <script>
	        let video3 = document.getElementById("video3"), flag3;
	        // 开始播放
	        function playvideo3() {
	            video3.style.display = 'block';
	            video3.currentTime = 0;
	            video3.play();
	            flag3 = 0;
	        }
	        // 暂停播放
	        function stopvideo3() {
	            if (!flag3) {
	                video3.style.display = "none";
	                video3.pause();
	                flag3 = 1;
	                // 可在此抛事件
	            }
	        }
	        // 播放结束监听事件
	        video3.onended = function () {
	            if (!flag) {
	                video3.style.display = "none";
	                video3.pause();
	                flag3 = 1;
	                // 可在此抛事件
	            }
	        }
	        // 点击视频时结束视频的播放
	        video3.onclick = function () {
	            video3.style.display = "none";
	            video3.pause();
	            flag3 = 1;
	            // 可在此抛事件
	        }
	    </script>

###使用video适应屏幕播放视频###

>  * 设置样式：
>  
		<style>
		    #video4{
		        position: fixed;
		        left:0;
		        top: 0;
		        width: 100%;
		        height: 100%;
		        z-index:1;
		        }
			#video4{
		        width: 100%;
		        height: auto;
		        -webkit-user-select: none;
		        object-fit: fill;
		        -moz-user-select: none;
		        -ms-user-select: none;
			    z-index: 1;
		        user-select: none;
		        outline: none;
		        }
		    #video4::-webkit-media-controls {
		        display: none !important;
		    }
		    #video4::-x5-media-controls {
		        display: none !important;
		    }
		    #video4::-webkit-media-controls-enclosure {
		        display: none !important;
		    }
	</style>

>  * 添加标签：
>  
		 <video src="./resource/assets/taikang.mp4" id="video4" class="video" preload="none" class="img" x5-playsinline="true" playsinline="true"
        webkit-playsinline="true" autoplay="none"></video>


>  * 对标签进行操作：
>  
		<script>
	        let video4 = document.getElementById("video4"), flag4;
	        video4.style.display = "none";
	        //   
	        if (!video4.onpause) {
	            video4.pause();
	        }
	        // 开始播放 
	        function playvideo4() {
	            video4.style.display = 'block';
	            video4.currentTime = 0;
	            video4.play();
	            flag = 0;
	        }
	        // 暂停播放
	        function stopvideo4() {
	            if (!flag) {
	                video4.pause();
	                video4.style.display = "none";
	                flag = 1;
	                // 可在此抛事件
	            }
	        }
	        // 播放结束监听事件
	        video4.onended = function () {
	            video4.pause();
	            video4.style.display = "none";
	        }
	        video4.onclick = function () {
	            if (!flag) {
	                video4.pause();
	                video4.style.display = "none";
	                flag = 1;
	                // 可在此抛事件
	            }
	        }
	    </script>

###在video标签中播放canvas视频###

>  * 设置样式：
>  
		<style>
	        #canvas5{
	            position: fixed;
	            box-sizing: border-box;
	            left: 0;
	            top: 50%;
	            width: 100%;
	            /*height: 100%;*/
	            /*border: 3px solid red;*/
	        }
	        #video5{
	            display: none;
	            width:100%;
	        }
		</style>

>  * 添加标签：
		<video id="video5" src="./resource/assets/canvas_test.mp4" poster="./resource/assets/bg.jpg" webkit-playsinline playsinline
        preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint"></video>
>
    	<canvas id="canvas5"></canvas>

>  * 操作使用
>
		<script>
	        let video5 = document.getElementById("video5");
	        let canvas5 = document.getElementById("canvas5");
	        let ctx = canvas5.getContext('2d');
	        function playvideo5() {
	            canvas5.style.display = "block";
	            //  根据视频的实际宽高设置
	            canvas5.width = 960;
	            canvas5.height = 540;
	            function videoplay() {
	                function render() {
	                    ctx.drawImage(video5, 0, 0);
	                    if (!video5.paused) {
	                        window.requestAnimationFrame(render);
	                    }
	                }
	                video5.play();
	                render();
	            }
	            videoplay();
	        }
	        canvas5.onclick = function () {
	            video5.pause();
	            canvas5.style.display = "none";
	            // 视频播放结束时将时间恢复到0的位置，在重复播放时第一帧不会出现上一视频的小尾巴
	            video5.currentTime = 0;
	        }
	    </script>

###其他###
>  * 测试链接：http://test.i-h5.cn/lka_game/Test/JSMpeg/
>  
>  * 项目托管地址：https://gitee.com/LairLiu/Demo_JSMpeg

