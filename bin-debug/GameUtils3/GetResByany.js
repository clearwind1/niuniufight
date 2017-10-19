/**
 * Created by pior on 15/12/22.
 */
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
var GameUtil;
(function (GameUtil) {
    var GetResByany = (function (_super) {
        __extends(GetResByany, _super);
        function GetResByany(url, imgwidth, imgheight) {
            if (imgwidth === void 0) { imgwidth = 0; }
            if (imgheight === void 0) { imgheight = 0; }
            var _this = _super.call(this) || this;
            _this.imgUrl = url;
            _this.imgwidth = imgwidth;
            _this.imgheight = imgheight;
            _this.init();
            return _this;
        }
        GetResByany.prototype.init = function () {
            RES.getResAsync(this.imgUrl, this.comp, this);
        };
        GetResByany.prototype.comp = function (data) {
            this.imag = new egret.Bitmap();
            this.imag.texture = data;
            this.addChild(this.imag);
            if (this.imgwidth != 0) {
                this.imag.width = this.imgwidth;
            }
            if (this.imgheight != 0) {
                this.imag.height = this.imgheight;
            }
            this.imag.anchorOffsetX = this.imgwidth / 2;
            this.imag.anchorOffsetY = this.imgheight / 2;
        };
        return GetResByany;
    }(egret.DisplayObjectContainer));
    GameUtil.GetResByany = GetResByany;
    __reflect(GetResByany.prototype, "GameUtil.GetResByany");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=GetResByany.js.map