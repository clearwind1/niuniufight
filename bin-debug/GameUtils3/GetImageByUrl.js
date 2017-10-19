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
 * 获取网络图片
 * Created by pior on 15/11/13.
 */
var GetImageByUrl = (function (_super) {
    __extends(GetImageByUrl, _super);
    function GetImageByUrl(url, imgwidth, imgheight) {
        if (imgwidth === void 0) { imgwidth = 0; }
        if (imgheight === void 0) { imgheight = 0; }
        var _this = _super.call(this) || this;
        _this.imgUrl = url;
        _this.imgwidth = imgwidth;
        _this.imgheight = imgheight;
        _this.init();
        return _this;
    }
    GetImageByUrl.prototype.init = function () {
        RES.getResByUrl(this.imgUrl, this.comp, this, RES.ResourceItem.TYPE_IMAGE);
    };
    GetImageByUrl.prototype.comp = function (data) {
        console.log('data====', data);
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
    GetImageByUrl.prototype.getimg = function () {
        return this.imag;
    };
    return GetImageByUrl;
}(egret.DisplayObjectContainer));
__reflect(GetImageByUrl.prototype, "GetImageByUrl");
//# sourceMappingURL=GetImageByUrl.js.map