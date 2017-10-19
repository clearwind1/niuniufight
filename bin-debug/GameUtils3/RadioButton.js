/**
 * 单选按钮
 * Created by pior on 15/11/10.
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
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(normalt, selectt) {
            var _this = _super.call(this) || this;
            _this.item = [];
            _this.curseltTag = 0;
            _this.itemCount = -1;
            _this.normalTexture = normalt;
            _this.selectTexture = selectt;
            _this.init();
            return _this;
        }
        RadioButton.prototype.init = function () {
        };
        RadioButton.prototype.addItem = function (item, pox, poy) {
            this.itemCount++;
            var itemcon = new egret.DisplayObjectContainer();
            var itembtn = new GameUtil.Menu(this, this.normalTexture, this.normalTexture, this.chooseButton, [this.itemCount]);
            itembtn.x = pox;
            itembtn.y = poy;
            itemcon.addChild(itembtn);
            item.x = pox + itembtn.width / 2 + item.width / 2;
            item.y = poy;
            itemcon.addChild(item);
            this.item.push(itembtn);
            this.addChild(itemcon);
            if (this.itemCount == 0) {
                itembtn.setButtonTexture(this.selectTexture, this.selectTexture);
            }
        };
        RadioButton.prototype.chooseButton = function (tag) {
            if (tag != this.curseltTag) {
                var itembtn = this.item[tag];
                itembtn.setButtonTexture(this.selectTexture, this.selectTexture);
                var lastbtn = this.item[this.curseltTag];
                lastbtn.setButtonTexture(this.normalTexture, this.normalTexture);
                this.curseltTag = tag;
            }
        };
        RadioButton.prototype.getCurSelectTag = function () {
            return this.curseltTag;
        };
        return RadioButton;
    }(egret.DisplayObjectContainer));
    GameUtil.RadioButton = RadioButton;
    __reflect(RadioButton.prototype, "GameUtil.RadioButton");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=RadioButton.js.map