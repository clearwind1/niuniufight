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
 * Created by pior on 15/12/30.
 */
var GameUtil;
(function (GameUtil) {
    var InputTextFiled = (function (_super) {
        __extends(InputTextFiled, _super);
        function InputTextFiled(x, y, size, width, height, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0.5; }
            if (anchorY === void 0) { anchorY = 0.5; }
            var _this = _super.call(this, x, y, size, anchorX, anchorY) || this;
            _this.width = width;
            _this.height = size;
            _this.type = egret.TextFieldType.INPUT;
            _this.baseText = "";
            _this.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onFocusIn, _this);
            _this.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onFocusOut, _this);
            return _this;
        }
        InputTextFiled.prototype.setBaseText = function (basetext, alpha) {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.setText(this.baseText);
            this.alpha = this.baseTextAlpha;
            //console.log("height=====",this.anchorOffsetY);
        };
        InputTextFiled.prototype.setBaseTextSize = function (size, sourcesize) {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            if (this.text == this.baseText) {
                this.setSize(this.basetextsize);
                this.height = size;
            }
        };
        InputTextFiled.prototype.onFocusIn = function (event) {
            //console.log("focusein");
            if (this.text == this.baseText) {
                this.setText("");
                this.height = this.sourcesize;
                this.setSize(this.sourcesize);
                this.alpha = 1;
            }
        };
        InputTextFiled.prototype.onFocusOut = function (event) {
            //console.log("focuseout");
            if (this.text == "") {
                this.setText(this.baseText);
                this.alpha = this.baseTextAlpha;
                this.height = this.basetextsize;
                this.setSize(this.basetextsize);
            }
            //console.log("outheight=====",this.anchorOffsetY);
        };
        return InputTextFiled;
    }(GameUtil.MyTextField));
    GameUtil.InputTextFiled = InputTextFiled;
    __reflect(InputTextFiled.prototype, "GameUtil.InputTextFiled");
})(GameUtil || (GameUtil = {}));
