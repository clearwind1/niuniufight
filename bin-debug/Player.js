/**
 * 玩家类
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        //设为庄家
        _this.bankcont = null;
        //叫牌按钮
        _this.callbtncont = null;
        _this.initdata();
        _this.showhead();
        _this.showgold();
        _this.addcallbtn();
        return _this;
    }
    Player.prototype.initdata = function () {
        this.handcardarr = [];
        this.isBanker = false;
        this.isAI = false;
        this.gold = 10000;
        this.betgold = 0;
        this.handcardnumber = 0;
    };
    Player.prototype.showhead = function () {
        this.headimg = new MyBitmap(RES.getRes('head1_png'), 0, 0);
        this.addChild(this.headimg);
    };
    Player.prototype.setBanker = function (b) {
        this.isBanker = b;
        if (b) {
            this.showbanker();
        }
        else {
            if (this.bankcont != null) {
                this.removeChild(this.bankcont);
                this.bankcont = null;
            }
        }
    };
    Player.prototype.getBanker = function () {
        return this.isBanker;
    };
    Player.prototype.showbanker = function () {
        this.bankcont = new egret.Sprite();
        this.bankcont.graphics.beginFill(0x38aecc, 1);
        this.bankcont.graphics.drawCircle(0, 0, 30);
        this.bankcont.graphics.endFill();
        this.addChild(this.bankcont);
        var t = new GameUtil.MyTextField(0, 0, 25, 0.5, 0.5);
        t.setText('庄');
        this.bankcont.addChild(t);
        this.bankcont.x = 54;
        this.bankcont.y = -45;
    };
    Player.prototype.showgold = function () {
        this.totalgoldt = new GameUtil.MyTextField(-140, -20, 20, 0, 0);
        this.totalgoldt.setText('总:' + this.gold);
        this.addChild(this.totalgoldt);
        this.betgoldt = new GameUtil.MyTextField(-140, 20, 20, 0, 0);
        this.betgoldt.setText('押:' + this.betgold);
        this.addChild(this.betgoldt);
    };
    //更新金币 
    Player.prototype.updatagold = function () {
        this.totalgoldt.setText('总:' + this.gold);
        this.betgoldt.setText('押:' + this.betgold);
    };
    Player.prototype.addcallbtn = function () {
        this.callbtncont = new egret.Sprite();
        this.addChild(this.callbtncont);
        this.callbtncont.visible = false;
        var fun = this.wantcard;
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('要   牌', 30);
        this.callbtncont.addChild(btn);
        btn.x = 200;
        btn.y = -140;
        var fun = this.passcard;
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('不   要', 30);
        this.callbtncont.addChild(btn);
        btn.x = 500;
        btn.y = -140;
    };
    Player.prototype.wantcard = function () {
        var gamescene = this.parent;
        gamescene.sendcard(false);
    };
    Player.prototype.passcard = function () {
        var gamescene = this.parent;
        gamescene.nextplayercall();
    };
    Player.prototype.showcallbtn = function (bshow) {
        this.callbtncont.visible = bshow;
    };
    Player.prototype.updatahandcardnumber = function () {
        this.handcardnumber = 0;
        for (var i = 0; i < this.handcardarr.length; i++) {
            var card = this.handcardarr[i];
            var cardnumber = 0;
            if (card.cardnumber >= 10) {
                cardnumber = 10;
            }
            else {
                cardnumber = card.cardnumber;
            }
            this.handcardnumber += cardnumber;
        }
        this.handcardnumber = (this.handcardnumber > 21) ? 0 : this.handcardnumber;
    };
    Player.prototype.getHandcardnumber = function () {
        return this.handcardnumber;
    };
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map