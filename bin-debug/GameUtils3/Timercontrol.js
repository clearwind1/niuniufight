var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Create by hardy on 16/12/28
 * 定时器类
 */
var Timercontrol = (function () {
    function Timercontrol(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        this.timer = new egret.Timer(delay, repeatCount);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    }
    /**
     * 初始化
     * @delay 延迟时间
     * @repeatCount 重复次数，0为无限重复（默认0）
     */
    Timercontrol.prototype.init = function (tagetobj, fun, params) {
        console.log('inittime');
        this.tagetobj = tagetobj;
        this.fun = fun;
        this.params = params;
    };
    Timercontrol.prototype.start = function () {
        this.timer.start();
    };
    Timercontrol.prototype.pause = function () {
        this.timer.stop();
    };
    Timercontrol.prototype.stop = function () {
        this.timer.reset();
    };
    /**
     * 回调函数
     */
    Timercontrol.prototype.timerFunc = function (event) {
        //console.log('run');
        if (this.tagetobj) {
            this.fun.apply(this.tagetobj, this.params);
        }
    };
    return Timercontrol;
}());
__reflect(Timercontrol.prototype, "Timercontrol");
