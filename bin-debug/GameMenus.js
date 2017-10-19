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
var DisType;
(function (DisType) {
    DisType[DisType["NULL"] = 0] = "NULL";
    DisType[DisType["TopTDown"] = 1] = "TopTDown";
    DisType[DisType["DownTTop"] = 2] = "DownTTop";
    DisType[DisType["LeftTRight"] = 3] = "LeftTRight";
    DisType[DisType["RightTLeft"] = 4] = "RightTLeft";
    DisType[DisType["Alpha"] = 5] = "Alpha";
    DisType[DisType["End"] = 6] = "End";
})(DisType || (DisType = {}));
;
var GameMenus = (function (_super) {
    __extends(GameMenus, _super);
    function GameMenus(showtype) {
        return _super.call(this, [showtype]) || this;
    }
    GameMenus.prototype.init = function (showtype) {
        this.showtype = showtype;
        this.show();
    };
    GameMenus.prototype.show = function () {
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        //菜单背景色
        var shap = GameUtil.createRect(posx, posy + 30, 400, 450, 0.8, 0x69c898);
        shap.$setAnchorOffsetX(shap.width / 2);
        shap.$setAnchorOffsetY(shap.height / 2);
        this.addChild(shap);
        //菜单背景图
        var menubgimg = new MyBitmap(RES.getRes(''), posx, posy);
        this.addChild(menubgimg);
        var btnfun = [this.startgame, this.howtoplay, this.setting, this.about];
        var btnName = ['开      始', '玩      法', '设      置', '关      于'];
        for (var i = 0; i < 4; i++) {
            var btnname = btnName[i];
            var fun = btnfun[i];
            var btn = new GameUtil.Menu(this, '', '', fun);
            btn.setScaleMode();
            btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
            btn.addButtonText(btnname, 30);
            this.addChild(btn);
            btn.x = posx;
            btn.y = 80 + posy + (i - 2) * 100;
        }
        GameUtil.doAction(this, DisType.TopTDown);
    };
    GameMenus.prototype.startgame = function () {
        GameUtil.GameScene.runscene(new GameScene());
    };
    GameMenus.prototype.howtoplay = function () {
        this.createMask();
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
        text.setText('玩法介绍:');
        text.textColor = 0xcbeaa0;
        text.width = this.mStageW - 100;
        this.maskscene.addChild(text);
    };
    GameMenus.prototype.setting = function () {
        this.createMask();
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
        text.setText('游戏设置:');
        text.textColor = 0xcbeaa0;
        text.width = this.mStageW - 100;
        this.maskscene.addChild(text);
    };
    GameMenus.prototype.about = function () {
        this.createMask();
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
        text.setText('关于游戏:');
        text.textColor = 0xcbeaa0;
        text.width = this.mStageW - 100;
        this.maskscene.addChild(text);
    };
    GameMenus.prototype.createMask = function () {
        var _this = this;
        this.maskscene = new egret.DisplayObjectContainer();
        this.addChild(this.maskscene);
        this.maskscene.$setTouchEnabled(true);
        var shap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x000000);
        this.maskscene.addChild(shap);
        var posx = this.mStageW / 2;
        var posy = this.mStageH / 2;
        var btnname = '返        回';
        var fun = function () {
            _this.removeChild(_this.maskscene);
        };
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        btn.addButtonText(btnname, 30);
        this.maskscene.addChild(btn);
        btn.x = posx;
        btn.y = this.mStageH - 100;
    };
    return GameMenus;
}(GameUtil.BassPanel));
__reflect(GameMenus.prototype, "GameMenus");
//# sourceMappingURL=GameMenus.js.map