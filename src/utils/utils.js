import JSSDK from '../../static/js/jssdk.min.js'
import ShareH5 from '../../static/js/shareH5.min.js'
import ShareGuide from './shareGuide'

class Utils {
    static setTitle(str) { //设置页面title，标题可以是固定文案，也可以灵活在ajax回调里面依赖内容拼凑字符串
        document.title = str
        if (str) {
            if (JSSDK.Client.isJDApp()) {
                JSSDK.WebView.setTitleText(str)
            } else {
                var h5Header = document.querySelector(".jd-header-new-title")
                if (h5Header) {
                    h5Header.innerHTML = str
                }
            }
        }
    }
    static isIphoneX() {
        if (JSSDK.Client.isIOS() && window.screen.height == 812) {
            return true
        } else {
            return false
        }
    }
    static toLogin(returnurl) { // 登录判断
        returnurl = returnurl || location.href
        returnurl = encodeURIComponent((returnurl))
        location.href = 'https://plogin.m.jd.com/user/login.action?appid=928&returnurl=' + returnurl
    }
    static share(obj, callPanel) { // callPanel：是否立即唤起分享面板
        // console.log(obj)
        if (JSSDK.Client.isJDApp()) {
            if (typeof callPanel !== 'undefined' && callPanel) { // APP分享
                JSSDK.WebView.callSharePanel({
                    title: obj.title,
                    content: obj.content,
                    shareUrl: obj.shareUrl,
                    iconUrl: obj.iconUrl
                })
            } else {
                JSSDK.WebView.callHeaderSharePanel({
                    title: obj.title,
                    content: obj.content,
                    shareUrl: obj.shareUrl,
                    iconUrl: obj.iconUrl
                })
            }
        } else {
            if (callPanel) {
                ShareGuide.init()
            }
            try {
                ShareH5.shareInit({ // 微信分享提示
                    title: obj.title,
                    desc: obj.content,
                    url: obj.shareUrl,
                    iconUrl: obj.iconUrl
                })
            } catch (e) {
                // alert('异常')
            }
        }
    }
    static hideShareWx() { // 隐藏微信分享按钮
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu')
      })
    }
    static imgSize(url, sizes, qs) { // 图片降质操作
        // 第一个参数是路径必传，
        // 第二个参数是尺寸非必传，默认'800x800',屏幕1/2宽度可以400x400'，1/3可以是'300x300'
        // 第三个参数是将质程度非必传默认70
        var size = sizes || '800x800'
        var q = qs || 80
        var ext = 'jpg'
        // if ( webpCanUse ) {
        //   ext = 'webp'
        // }
        if (/\/jfs\/.*\.(jpg|jpeg|png)$/.test(url)) { // 全路径的时候
            return 'https://img11.360buyimg.com/da/s' + size + '_jfs/' + url.split('/jfs/')[1] + '!q' + q + '.' + ext
        } else if (/^jfs\/.*\.(jpg|jpeg|png)$/.test(url)) { // jfs开头的路径的时候
            return 'https://img11.360buyimg.com/da/s' + size + '_' + url + '!q' + q + '.' + ext
        } else { // 不做处理
            return url
        }
    }
    static getTimeYMD(stamp) {
        let date = new Date(parseInt(stamp))
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1) + '-'
        let D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() + ''
        return Y + M + D
    }
    //   static getQueryString (name) { // 获取路径某个参数
    //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    //     if (typeof window.location.href.split('?')[1] !== 'undefined') {
    //       var r = window.location.href.split('?')[1].match(reg)
    //       if (r !== null) {
    //         return decodeURIComponent(r[2])
    //       }
    //     }
    //     return null
    //   }
    static getQueryString(name) {
        const getURLParameters = u => u.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {})
        var result = getURLParameters(window.location.href)
        if (result[name]) {
            return result[name]
        }
        var reg = new RegExp("(?![?&]+)" + name + "=(.*)?[&]?", "i")
        for (var i in result) {
            var r = result[i].match(reg)
            if (r !== null) {
                return r[1]
            }
        }
        return null
    }
    // 监听图片是否加载完成，支持http/https
    static onloadImgs(imgsArr, callback) {
        let img = [],
            flag = 0,
            mulitImg = imgsArr;
        let imgTotal = mulitImg.length
        for (let i = 0; i < imgTotal; i++) {
            img[i] = new Image()
            // 当图片过小会转变为base64
            if (mulitImg[i].substr(0, 1) !== '/') {
              flag++;
            }

            img[i].src = mulitImg[i]

            // 线上
            img[i].onload = function () {
                //第i张图片加载完成
                flag++
                if (flag === imgTotal) {
                  if (callback) callback();
                }
            }

        }
    }
}
export default Utils
