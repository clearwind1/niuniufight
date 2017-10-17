/**
 * Created by yang on 15/9/20.
 */
module GameUtil {
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
    export function createRect(x: number, y: number, width: number, height: number, alpha: number = 1, color: number = 0x000000, ellipseWidth: number = 0, ellipseHeight?: number): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        //shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    /**
     * 创建一个实心的圆
     * @param x     x轴坐标
     * @param y     y轴坐标
     * @param r     半径
     * @param alpha 透明度
     * @param color 颜色
     */
    export function createCircle(x: number, y: number, r: number, alpha: number = 1, color: number = 0x000000): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    }
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    export function objectToString(postData): string {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    export function isChineseName(name: string): boolean {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }

    export function removeimag(name: string): string {
        name = name.replace(/^/, '');
        return name;
    }

    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    export function isPhoneNum(num: string): boolean {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }
    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    export function saveLocalData(key: string, data: string) {
        egret.localStorage.setItem(key, data);
    }
    export function readLocalData(key: string): string {
        return egret.localStorage.getItem(key);
    }
    export function clearLocalData(key: string) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    export function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    /**
     * 向服务器发起微信红包请求
     * @param money     金额
     * @param openid    玩家openid
     * @param nickname  玩家昵称
     * @param backfun   完成回调函数
     * @param cont      函数域
     */
    export function getredPack(money: number, openid: any, nickNm: string, backfun: Function, cont: any, url: string = GameConfig.IP) {
        var ipstr: string = window['getIP'];
        //console.log('ipstr======',ipstr);
        //alert('ipstr====='+ipstr);
        var ipstrspl: string;
        for (var i: number = 0; i < ipstr.split('|').length; i++) {
            if (ipstr.split('|')[i].length > 6) {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }
        //alert('ipstrspl======'+ipstrspl);
        //console.log('ipstrspl====',ipstrspl);
        //console.log("money======", money);
        var param: Object = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        }
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont, url);
    }
    /**判断当前浏览器类型: (取值)GameConfig.UATYPE */
    export function isSomeType(uatype: string) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf(uatype) != -1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 定位相对位置
     * @param objtarget     要改变位置的对象
     * @param objfixed      相对位置的对象
     * @param posx          x轴位置
     * @param posy          y轴位置
     * @param anx
     */
    export function relativepos(objtarget: any, objfixed: any, posx: number, posy: number, anx: boolean = false) {
        if (!anx) {
            objtarget.x = objfixed.x - objfixed.width / 2 + posx;
            objtarget.y = objfixed.y - objfixed.height / 2 + posy;
        }
    }
    /**
     * 绝对位置x
     * @param dis 与右边距的距离
     */
    export function absposx(dis: number): number {
        return (GameConfig.getSW() - dis);
    }
    /**
     * 绝对位置y
     * @param dis 与底部边距的距离
     */
    export function absposy(dis: number): number {
        return (GameConfig.getSH() - dis);
    }

    export function trace(...optionalParams: any[]): void {
        optionalParams[0] = "[DebugLog]" + optionalParams[0];
        console.log.apply(console, optionalParams);
    }
    /**
     * 清除定时器
     */
    export function clearinterval(intervalarr: any) {
        for (var i: number = 0; i < intervalarr.length; i++) {
            var interval: number = intervalarr[i];
            egret.clearInterval(interval);
        }
        intervalarr = [];
    }
    /**
     * 拔电话
     */
    export function Telnumber(num: string) {
        window.location.href = "tel://" + num;
    }
    /**
     * 检查数组里是否有该元素
     */
    export function checkChild(element: any, arr: any[]) {
        if (arr.indexOf(element) != -1) {
            return true;
        }
        return false;
    }
    /**
     * 获得该物体位置上的包围盒
     */
    export function getrect(obj: any, offx = 0, offy = 0): egret.Rectangle {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width / 2 + offx;
        rect.y = obj.y - obj.height / 2 + offy;

        return rect;
    }
    /**
     * 使对象变灰
     */
    export function gray(sp: any) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        sp.filters = [colorFlilter];
    }
    /**
     * 使对象发光
     */
    export function light(sp: any,color) {
        //var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
        var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        sp.filters = [glowFilter];
    }
    /**
     * 做缓动动画
     * @param objtarget     动作对象
     * @param showtype      动作类型
     * @param delay         动作时间
     * @param pot           动作位置
     */
    export function doAction(objtarget, showtype, delay = 1500, pot = 0) {
        do {
            if (showtype == DisType.NULL) {
                objtarget.y = 0;
                break;
            } else if (showtype == DisType.TopTDown) {
                objtarget.y = -GameConfig.getSH();
                egret.Tween.get(objtarget).to({ y: pot }, delay, egret.Ease.bounceOut);
                break;
            } else if (showtype == DisType.DownTTop) {
                objtarget.y = GameConfig.getSH();
                egret.Tween.get(objtarget).to({ y: pot }, delay, egret.Ease.bounceOut);
                break;
            } else if (showtype == DisType.LeftTRight) {
                objtarget.x = -GameConfig.getSW();
                egret.Tween.get(objtarget).to({ x: pot }, delay, egret.Ease.bounceOut);
                break;
            } else if (showtype == DisType.RightTLeft) {
                objtarget.x = GameConfig.getSW();
                egret.Tween.get(objtarget).to({ x: pot }, delay, egret.Ease.bounceOut);
                break;
            } else if (showtype == DisType.Alpha) {
                objtarget.alpha = 0;
                egret.Tween.get(objtarget).to({ alpha: 1 }, delay);
                break;
            }
        } while (false);
    }
    /**
     * 定时器
     */
    export function setInterval(fun:Function,objtarget,delay) {
        return egret.setInterval(() => {
            if (GameData._i().GamePause) {
                return;
            }
            fun.apply(objtarget);
        }, objtarget, delay);
    }

}