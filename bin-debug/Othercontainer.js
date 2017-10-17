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
 * Create by hardy on  16/12/21
 */
var Othercontainer = (function (_super) {
    __extends(Othercontainer, _super);
    function Othercontainer() {
        return _super.call(this) || this;
    }
    Othercontainer.prototype.init = function () {
        this.touchEnabled = true;
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        this.addChild(shap);
        this.show();
    };
    Othercontainer.prototype.show = function () {
    };
    Othercontainer.prototype.close = function () {
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.parent.removeChild(this);
    };
    return Othercontainer;
}(GameUtil.BassPanel));
__reflect(Othercontainer.prototype, "Othercontainer");
