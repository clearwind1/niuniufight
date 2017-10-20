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
        function WaitServerPanel() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        WaitServerPanel.prototype.init = function () {
            this.coverBg = GameUtil.createRect(0, 0, GameConfig.getSW(), GameConfig.getSH(), 0.3, 0x000000);
            this.addChild(this.coverBg);
            this.touchEnabled = true;
            this.wainttext = new GameUtil.MyTextField(GameConfig.getSW() / 2, GameConfig.getSH() / 2, 30, 0.5, 0.5);
            this.wainttext.setText('请等待其他玩家下注');
            this.wainttext.textColor = 0x3399fe;
            this.addChild(this.wainttext);
        };
        WaitServerPanel.prototype.setAlpha = function (aplha) {
            this.coverBg.alpha = aplha;
        };
        WaitServerPanel.getInstace = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel();
            }
            return this._instance;
        };
        return WaitServerPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.WaitServerPanel = WaitServerPanel;
    __reflect(WaitServerPanel.prototype, "GameUtil.WaitServerPanel");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=WaitServerPanel.js.map