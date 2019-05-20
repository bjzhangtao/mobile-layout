class Utils {
    static getTimeYMD(stamp) {
        let date = new Date(parseInt(stamp));
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() + '';
        return Y + M + D
    }

    static toLogin(returnurl) { // 登录判断
        returnurl = returnurl || location.href;
        returnurl = encodeURIComponent((returnurl));
        location.href = 'https://plogin.m.jd.com/user/login.action?appid=928&returnurl=' + returnurl
    }

    static getQueryString(name) {
        const getURLParameters = u => u.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {})
        var result = getURLParameters(window.location.href);
        if (result[name]) {
            return result[name]
        }
        var reg = new RegExp("(?![?&]+)" + name + "=(.*)?[&]?", "i");
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
