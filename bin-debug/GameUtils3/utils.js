/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    function createRect(x, y, width, height, alpha, color, ellipseWidth, ellipseHeight) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        if (ellipseWidth === void 0) { ellipseWidth = 0; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        //shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createRect = createRect;
    /**
     * 创建一个实心的圆
     * @param x     x轴坐标
     * @param y     y轴坐标
     * @param r     半径
     * @param alpha 透明度
     * @param color 颜色
     */
    function createCircle(x, y, r, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createCircle = createCircle;
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    function objectToString(postData) {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    GameUtil.objectToString = objectToString;
    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    function isChineseName(name) {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }
    GameUtil.isChineseName = isChineseName;
    function removeimag(name) {
        name = name.replace(/^/, '');
        return name;
    }
    GameUtil.removeimag = removeimag;
    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    function isPhoneNum(num) {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }
    GameUtil.isPhoneNum = isPhoneNum;
    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    function saveLocalData(key, data) {
        egret.localStorage.setItem(key, data);
    }
    GameUtil.saveLocalData = saveLocalData;
    function readLocalData(key) {
        return egret.localStorage.getItem(key);
    }
    GameUtil.readLocalData = readLocalData;
    function clearLocalData(key) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    GameUtil.clearLocalData = clearLocalData;
    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    GameUtil.getQueryString = getQueryString;
    /**
     * 向服务器发起微信红包请求
     * @param money     金额
     * @param openid    玩家openid
     * @param nickname  玩家昵称
     * @param backfun   完成回调函数
     * @param cont      函数域
     */
    function getredPack(money, openid, nickNm, backfun, cont, url) {
        if (url === void 0) { url = GameConfig.IP; }
        var ipstr = window['getIP'];
        //console.log('ipstr======',ipstr);
        //alert('ipstr====='+ipstr);
        var ipstrspl;
        for (var i = 0; i < ipstr.split('|').length; i++) {
            if (ipstr.split('|')[i].length > 6) {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }
        //alert('ipstrspl======'+ipstrspl);
        //console.log('ipstrspl====',ipstrspl);
        //console.log("money======", money);
        var param = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        };
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont, url);
    }
    GameUtil.getredPack = getredPack;
    /**判断当前浏览器类型: (取值)GameConfig.UATYPE */
    function isSomeType(uatype) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf(uatype) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    GameUtil.isSomeType = isSomeType;
    /**
     * 定位相对位置
     * @param objtarget     要改变位置的对象
     * @param objfixed      相对位置的对象
     * @param posx          x轴位置
     * @param posy          y轴位置
     * @param anx
     */
    function relativepos(objtarget, objfixed, posx, posy, anx) {
        if (anx === void 0) { anx = false; }
        if (!anx) {
            objtarget.x = objfixed.x - objfixed.width / 2 + posx;
            objtarget.y = objfixed.y - objfixed.height / 2 + posy;
        }
    }
    GameUtil.relativepos = relativepos;
    /**
     * 绝对位置x
     * @param dis 与右边距的距离
     */
    function absposx(dis) {
        return (GameConfig.getSW() - dis);
    }
    GameUtil.absposx = absposx;
    /**
     * 绝对位置y
     * @param dis 与底部边距的距离
     */
    function absposy(dis) {
        return (GameConfig.getSH() - dis);
    }
    GameUtil.absposy = absposy;
    function trace() {
        var optionalParams = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            optionalParams[_a] = arguments[_a];
        }
        optionalParams[0] = "[DebugLog]" + optionalParams[0];
        console.log.apply(console, optionalParams);
    }
    GameUtil.trace = trace;
    /**
     * 清除定时器
     */
    function clearinterval(intervalarr) {
        for (var i = 0; i < intervalarr.length; i++) {
            var interval = intervalarr[i];
            egret.clearInterval(interval);
        }
        intervalarr = [];
    }
    GameUtil.clearinterval = clearinterval;
    /**
     * 拔电话
     */
    function Telnumber(num) {
        window.location.href = "tel://" + num;
    }
    GameUtil.Telnumber = Telnumber;
    /**
     * 检查数组里是否有该元素
     */
    function checkChild(element, arr) {
        if (arr.indexOf(element) != -1) {
            return true;
        }
        return false;
    }
    GameUtil.checkChild = checkChild;
    /**
     * 获得该物体位置上的包围盒
     */
    function getrect(obj, offx, offy) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width / 2 + offx;
        rect.y = obj.y - obj.height / 2 + offy;
        return rect;
    }
    GameUtil.getrect = getrect;
    /**
     * 使对象变灰
     */
    function gray(sp) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        sp.filters = [colorFlilter];
    }
    GameUtil.gray = gray;
    /**
     * 使对象发光
     */
    function light(sp, color) {
        //var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        sp.filters = [glowFilter];
    }
    GameUtil.light = light;
    /**
     * 做缓动动画
     * @param objtarget     动作对象
     * @param showtype      动作类型
     * @param delay         动作时间
     * @param pot           动作位置
     */
    function doAction(objtarget, showtype, delay, pot) {
        if (delay === void 0) { delay = 1500; }
        if (pot === void 0) { pot = 0; }
        do {
            if (showtype == DisType.NULL) {
                objtarget.y = 0;
                break;
            }
            else if (showtype == DisType.TopTDown) {
                objtarget.y = -GameConfig.getSH();
                egret.Tween.get(objtarget).to({ y: pot }, delay, egret.Ease.bounceOut);
                break;
            }
            else if (showtype == DisType.DownTTop) {
                objtarget.y = GameConfig.getSH();
                egret.Tween.get(objtarget).to({ y: pot }, delay, egret.Ease.bounceOut);
                break;
            }
            else if (showtype == DisType.LeftTRight) {
                objtarget.x = -GameConfig.getSW();
                egret.Tween.get(objtarget).to({ x: pot }, delay, egret.Ease.bounceOut);
                break;
            }
            else if (showtype == DisType.RightTLeft) {
                objtarget.x = GameConfig.getSW();
                egret.Tween.get(objtarget).to({ x: pot }, delay, egret.Ease.bounceOut);
                break;
            }
            else if (showtype == DisType.Alpha) {
                objtarget.alpha = 0;
                egret.Tween.get(objtarget).to({ alpha: 1 }, delay);
                break;
            }
        } while (false);
    }
    GameUtil.doAction = doAction;
    /**
     * 定时器
     */
    function setInterval(fun, objtarget, delay) {
        return egret.setInterval(function () {
            if (GameData._i().GamePause) {
                return;
            }
            fun.apply(objtarget);
        }, objtarget, delay);
    }
    GameUtil.setInterval = setInterval;
})(GameUtil || (GameUtil = {}));
