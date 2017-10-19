/**
 * 等待响应
 * Created by pior on 15/11/11.
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
    var WaitServerPanel = (function (_super) {
        __extends(WaitServerPanel, _super);
        function WaitServerPanel(alpha) {
            if (alpha === void 0) { alpha = 0; }
            var _this = _super.call(this) || this;
            _this.init(alpha);
            return _this;
        }
        WaitServerPanel.prototype.init = function (alpha) {
            this.coverBg = GameUtil.createRect(0, 0, 640, 1136, 0);
            this.addChild(this.coverBg);
            this.touchEnabled = true;
        };
        WaitServerPanel.prototype.setAlpha = function (aplha) {
            this.coverBg.alpha = aplha;
        };
        WaitServerPanel.getInstace = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel(0);
            }
            return this._instance;
        };
        return WaitServerPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.WaitServerPanel = WaitServerPanel;
    __reflect(WaitServerPanel.prototype, "GameUtil.WaitServerPanel");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=WaitServerPanel.js.map