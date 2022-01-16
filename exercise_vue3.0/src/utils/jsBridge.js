/**********************
 * js与原生的交互
 **********************/


const jsBridge = {
    setupWebViewJavascriptBridge: (callback) => {
        let sysPlatform;
        const ua = navigator.userAgent.toLowerCase();//判断浏览器类型
        if (/iphone|ipad|ipod/.test(ua)) {//调用设备对象的test方法判断设备类型
            sysPlatform = "IOS";
        } else if (/android/.test(ua)) {
            sysPlatform = "ANDROID";
        }
 
        if(sysPlatform == "IOS"){
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        }else if(sysPlatform == "ANDROID"){
            if (window.WebViewJavascriptBridge) {
                console.group("window.WebViewJavascriptBridge had init")
                callback(WebViewJavascriptBridge);
            } else {
                console.group("window.WebViewJavascriptBridge init");
                document.addEventListener(
                    'WebViewJavascriptBridgeReady', function() {
                        WebViewJavascriptBridge.init(function(message, responseCallback) {
                            console.log('JS got a message', message);
                            const data = {
                                'Javascript Responds': 'Wee!'
                            };
                            // console.log('JS responding with', data);
                            responseCallback(data);
                        });
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }
    },
    WebViewJavascriptBridge: function(fuc,json) {  
 
        return new Promise(function (resolve, reject) {
            utils.setupWebViewJavascriptBridge(function (bridge) {
                let sysPlatform;
                const ua = navigator.userAgent.toLowerCase();//判断浏览器类型
                if (/iphone|ipad|ipod/.test(ua)) {//调用设备对象的test方法判断设备类型
                    sysPlatform = "IOS";
                } else if (/android/.test(ua)) {
                    sysPlatform = "ANDROID";
                }
                if(sysPlatform == "IOS"){
                    bridge.registerHandler(fuc, function (data, responseCallback) { 
                        responseCallback('123');
                        resolve(data)
                    })
                    bridge.callHandler(fuc, json, function (response) {   //h5调用原生 能够获取原生的值
                        resolve(response);
                    })
                }else if(sysPlatform == "ANDROID"){
                    bridge.registerHandler(fuc, function (data, responseCallback) {
                        responseCallback('123');
                        resolve(data)
                    })
                    bridge.callHandler(fuc, json, function (response) {
                        resolve(JSON.parse(response))
                    })
                }
            })
        });
    }
} 
 
export default jsBridge;