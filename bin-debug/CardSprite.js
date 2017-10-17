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
 * 牌类
 */
var CardType;
(function (CardType) {
    CardType[CardType["Black"] = 0] = "Black";
    CardType[CardType["Red"] = 1] = "Red";
    CardType[CardType["Club"] = 2] = "Club";
    CardType[CardType["Diamond"] = 3] = "Diamond";
    CardType[CardType["King"] = 4] = "King";
    CardType[CardType["End"] = 5] = "End";
})(CardType || (CardType = {}));
;
var CardSprite = (function (_super) {
    __extends(CardSprite, _super);
    function CardSprite(cardnumber, cardtype) {
        var _this = _super.call(this) || this;
        _this.cardnumber = cardnumber;
        _this.cardtype = cardtype;
        _this.showback();
        return _this;
    }
    CardSprite.prototype.showback = function () {
        var resname = this.gettypename(this.cardtype) + '-' + this.cardnumber + '_jpg';
        console.log('resname===', resname);
        this.cardfront = new MyBitmap(RES.getRes(resname), 0, 0);
        this.cardfront.scaleX = 0;
        this.addChild(this.cardfront);
        this.cardback = new MyBitmap(RES.getRes('cardback_png'), 0, 0);
        this.addChild(this.cardback);
    };
    CardSprite.prototype.showfront = function () {
        var _this = this;
        egret.Tween.get(this.cardback).to({ scaleX: 0 }, 250).call(function () {
            egret.Tween.get(_this.cardfront).to({ scaleX: 1 }, 250);
        }, this);
    };
    CardSprite.prototype.gettypename = function (type) {
        var typename = '';
        switch (type) {
            case CardType.Black:
                typename = 'B';
                break;
            case CardType.Red:
                typename = 'R';
                break;
            case CardType.Club:
                typename = 'C';
                break;
            case CardType.Diamond:
                typename = 'D';
                break;
            case CardType.King:
                typename = 'K';
                break;
            default:
                typename = 'B';
                break;
        }
        return typename;
    };
    return CardSprite;
}(egret.DisplayObjectContainer));
__reflect(CardSprite.prototype, "CardSprite");
