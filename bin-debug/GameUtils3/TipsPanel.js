/**
 * 提示框
 * Created by pior on 15/10/28.
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
    var TipsPanel = (function (_super) {
        __extends(TipsPanel, _super);
        /**
         * 创建一个提示框
         * @param tipimg 提示框图片名
         * @param tipText 提示文字
         * @param disp 是否自己消失
         * @param sec 自己消失时间
         */
        function TipsPanel(tipimg, tipText, disp, sec) {
            if (disp === void 0) { disp = false; }
            if (sec === void 0) { sec = 1200; }
            var _this = _super.call(this) || this;
            _this.textsize = 30;
            _this.tipText = tipText;
            _this.tipImg = tipimg;
            _this.bDisappear = disp;
            _this.disSecond = sec;
            _this.init();
            return _this;
        }
        TipsPanel.prototype.init = function () {
            this.showtip();
            if (!this.bDisappear) {
                var coverbg = GameUtil.createRect(0, 0, GameConfig.getSW(), GameConfig.getSH(), 0.4);
                this.addChild(coverbg);
                this.touchEnabled = true;
            }
            if (this.tipImg == null) {
                var tipbgcover = GameUtil.createRect(GameConfig.getSW() / 2, GameConfig.getSH() / 2, this.text.width * 2, this.text.height * 1.5, 1, 0x8c8b88);
                tipbgcover.anchorOffsetX = tipbgcover.width / 2;
                tipbgcover.anchorOffsetY = tipbgcover.height / 2;
                this.addChild(tipbgcover);
            }
            else {
                this.tipbg = new MyBitmap(RES.getRes(this.tipImg), GameConfig.getSW() / 2, GameConfig.getSH() / 2);
                this.addChild(this.tipbg);
            }
            if (!this.bDisappear) {
                this.showbutton();
            }
            else {
                var tw = egret.Tween.get(this);
                tw.to({ alpha: 1 }, 300).to({ alpha: 0 }, this.disSecond).call(this.close, this);
            }
            this.addChild(this.text);
        };
        /**
         * 显示提示文字
         */
        TipsPanel.prototype.showtip = function () {
            this.text = new GameUtil.MyTextField(GameConfig.getSW() / 2, GameConfig.getSH() / 2, this.textsize);
            this.text.setText(this.tipText);
            this.text.textColor = 0x000000;
            //this.addChild(this.text);
        };
        /**
         * 提示文字的长度
         * @param width 长度
         */
        TipsPanel.prototype.setTextwidth = function (width) {
            this.text.width = width;
        };
        /**
         * 提示文字字体大小
         * @param size 尺寸
         */
        TipsPanel.prototype.setTextSize = function (size) {
            this.text.setSize(size);
        };
        TipsPanel.prototype.setTextHor = function (anchorX, anchorY, align, offx) {
            this.text.textAlign = align;
            this.text.x = GameConfig.getSW() / 2 - this.tipbg.width / 2 + offx;
        };
        TipsPanel.prototype.setTextlineSpacing = function (spacing) {
            this.text.lineSpacing = spacing;
        };
        /**
         * 显示确认按钮
         */
        TipsPanel.prototype.showbutton = function () {
            var surebtn = new GameUtil.Menu(this, "acceptBtn_png", "acceptBtn_png", this.close);
            surebtn.x = GameConfig.getSW() / 2;
            surebtn.y = GameConfig.getSH() / 2 + this.tipbg.texture.textureHeight / 2;
            this.addChild(surebtn);
            surebtn.setScaleMode();
        };
        TipsPanel.prototype.close = function () {
            this.parent.removeChild(this);
        };
        return TipsPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.TipsPanel = TipsPanel;
    __reflect(TipsPanel.prototype, "GameUtil.TipsPanel");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=TipsPanel.js.map