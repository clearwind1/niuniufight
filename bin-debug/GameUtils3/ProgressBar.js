/**
 * 进度条类
 * Created by pior on 15/10/8.
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
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
         * 创建一个进度条
         * @param imagename {string} 进度条图片文件名
         * @param x {number} 进度条X轴坐标
         * @param y {number} 进度条Y轴坐标
         * @param rect {egret.Rectangle} 进度条的九宫格矩形
         * @param anchorX {number} X轴锚点
         * @param anchorY {number} Y轴锚点
         */
        function ProgressBar(imagename, x, y, rect, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0; }
            if (anchorY === void 0) { anchorY = 0.5; }
            var _this = _super.call(this) || this;
            _this.mPercent = 100;
            _this.init(imagename, x, y, rect, anchorX, anchorY);
            return _this;
        }
        ProgressBar.prototype.init = function (imagename, x, y, rect, anchorX, anchorY) {
            this.progressbar = new MyBitmap(RES.getRes(imagename), x, y);
            this.addChild(this.progressbar);
            this.progressbar.scale9Grid = rect;
            this.progressbar.setanchorOff(anchorX, anchorY);
        };
        /**
         * 设置进度条X轴坐标
         * @param x
         */
        ProgressBar.prototype.setbarX = function (x) {
            this.progressbar.x = x;
        };
        /**
         * 设置进度条Y轴坐标
         * @param y
         */
        ProgressBar.prototype.setbarY = function (y) {
            this.progressbar.y = y;
        };
        /**
         * 设置进度条百分比
         * @param percent {number} 进度条百分比
         */
        ProgressBar.prototype.setPercent = function (percent) {
            if (percent < 0)
                return;
            this.mPercent = percent;
            this.updateWidth();
        };
        ProgressBar.prototype.getPercent = function () {
            return this.mPercent;
        };
        /**
         * 更新显示进度条
         */
        ProgressBar.prototype.updateWidth = function () {
            this.progressbar.width = this.progressbar.texture.textureWidth * this.mPercent;
        };
        return ProgressBar;
    }(egret.DisplayObjectContainer));
    GameUtil.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "GameUtil.ProgressBar");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=ProgressBar.js.map