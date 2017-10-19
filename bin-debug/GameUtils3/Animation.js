var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 帧动画
 * Created by pior on 15/9/28.
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    /**
     * 创建一个帧动画。
     * @param textureName {string} 帧动画文件名的前缀。
     * @param totalNumber {number} 总帧数。
     * @param frameRate {number} 帧率。
     */
    function Animation(textureName, totalNumber, frameRate, posx, posy) {
        var _this = _super.call(this, RES.getRes(textureName + '1' + '_png'), posx, posy) || this;
        _this.currentNumber = 0;
        _this.countNumber = 0;
        _this.bLoopCount = 0;
        _this.endcallfun = null;
        _this.thisObj = null;
        _this.params = [];
        _this.bremove = true;
        _this.bpause = false;
        _this.textureName = textureName;
        _this.totalNumber = totalNumber;
        _this.frameRate = frameRate;
        return _this;
    }
    /**
     * 设置动画循环次数，参数小于0为无限循环
     * @param bloopcount {number}
     */
    Animation.prototype.setLoop = function (bloopcount) {
        if (bloopcount == 0)
            bloopcount = 1;
        this.bLoopCount = bloopcount - 1;
    };
    Animation.prototype.setRemove = function (bremove) {
        this.bremove = bremove;
    };
    /**播放 */
    Animation.prototype.play = function () {
        this.intervaltag = egret.setInterval(this.run, this, this.frameRate);
    };
    Animation.prototype.run = function () {
        this.nextFrame();
    };
    Animation.prototype.pause = function () {
        this.bpause = true;
    };
    Animation.prototype.resume = function () {
        this.bpause = false;
    };
    Animation.prototype.stop = function () {
        egret.clearInterval(this.intervaltag);
    };
    Animation.prototype.nextFrame = function () {
        if (this.bpause) {
            return;
        }
        this.currentNumber++;
        if (this.currentNumber >= this.totalNumber) {
            this.currentNumber = 1;
            if (this.bLoopCount == 0) {
                this.stop();
                if (this.endcallfun != null)
                    this.endcallfun.apply(this.thisObj, this.params);
                if (this.bremove)
                    this.parent.removeChild(this);
                return;
            }
            else if (this.bLoopCount > 0) {
                this.bLoopCount--;
            }
        }
        this.setNewTexture(RES.getRes(this.textureName + this.currentNumber + '_png'));
    };
    /**切换动画 */
    Animation.prototype.switchani = function (textureName, totalNumber, loopcount, bremove, frameRate) {
        if (loopcount === void 0) { loopcount = -1; }
        if (bremove === void 0) { bremove = true; }
        if (frameRate === void 0) { frameRate = this.frameRate; }
        this.stop();
        this.textureName = textureName;
        this.totalNumber = totalNumber;
        this.currentNumber = 0;
        this.bLoopCount = loopcount;
        this.bremove = bremove;
        this.frameRate = frameRate;
        this.play();
    };
    /**
     * 动画播放完毕后要执行的函数
     * @param func {Function} 所要执行的函数
     * @param thisobj {any} 执行函数的stage
     */
    Animation.prototype.setendcall = function (func, thisobj, params) {
        this.thisObj = thisobj;
        this.endcallfun = func;
        this.params = params;
    };
    return Animation;
}(MyBitmap));
__reflect(Animation.prototype, "Animation");
//# sourceMappingURL=Animation.js.map