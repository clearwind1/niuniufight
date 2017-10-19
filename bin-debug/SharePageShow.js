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
 * Create by hardy on 16/12/21
 * 游戏分享提示页面
 */
var SharePageShow = (function (_super) {
    __extends(SharePageShow, _super);
    function SharePageShow() {
        return _super.call(this) || this;
    }
    SharePageShow.prototype.show = function () {
        var self = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.close();
        }, this);
        var sharetip = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        this.addChild(sharetip);
    };
    return SharePageShow;
}(Othercontainer));
__reflect(SharePageShow.prototype, "SharePageShow");
//# sourceMappingURL=SharePageShow.js.map