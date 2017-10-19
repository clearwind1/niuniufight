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
 * Created by pior on 16/1/19.
 */
var GameUtil;
(function (GameUtil) {
    var MyTextField = (function (_super) {
        __extends(MyTextField, _super);
        function MyTextField(x, y, size, anchorX, anchorY, target) {
            if (anchorX === void 0) { anchorX = 0.5; }
            if (anchorY === void 0) { anchorY = 0.5; }
            if (target === void 0) { target = null; }
            var _this = _super.call(this) || this;
            _this.init(x, y, size, anchorX, anchorY, target);
            return _this;
        }
        MyTextField.prototype.init = function (x, y, size, anchorX, anchorY, target) {
            this.textColor = 0x000000;
            this.fontFamily = '楷体';
            this.$setX(x);
            this.$setY(y);
            this.$setSize(size);
            this.anchorX = anchorX;
            this.anchorY = anchorY;
            if (target != null) {
                GameUtil.relativepos(this, target, x, y);
            }
        };
        MyTextField.prototype.setText = function (text) {
            this.text = text;
            this.setanchorOff(this.anchorX, this.anchorY);
        };
        MyTextField.prototype.setSize = function (size) {
            //console.log("size====",size,"this.$getHeight()======",this.$getHeight(),"any====",this.anchorY);
            this.size = size;
            this.setanchorOff(this.anchorX, this.anchorY);
        };
        MyTextField.prototype.setanchorOff = function (anchorx, anchory) {
            this.anchorOffsetX = this.$getWidth() * anchorx;
            this.anchorOffsetY = this.$getHeight() * anchory;
        };
        return MyTextField;
    }(egret.TextField));
    GameUtil.MyTextField = MyTextField;
    __reflect(MyTextField.prototype, "GameUtil.MyTextField");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=MyTextField.js.map