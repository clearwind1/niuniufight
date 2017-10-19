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
 * 游戏分数，等级及其他的元素类
 */
var GameScore = (function (_super) {
    __extends(GameScore, _super);
    function GameScore() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameScore.prototype.init = function () {
        this.gamescoreT = new GameUtil.MyTextField(10, 60, 40, 0, 0);
        this.gamescoreT.setText('当前分数:' + GameData._i().GameScore);
        this.gamescoreT.textColor = 0x1169e0;
        this.addChild(this.gamescoreT);
        this.heightscoreT = new GameUtil.MyTextField(10, 20, 40, 0, 0);
        this.heightscoreT.setText('最高分数:' + GameData._i().HeightScore);
        this.heightscoreT.textColor = 0x1169e0;
        this.addChild(this.heightscoreT);
        this.gamelevelT = new GameUtil.MyTextField(GameConfig.getSW() / 2, 20, 40, 0, 0);
        this.gamelevelT.setText('关卡:' + GameData._i().GameLevel);
        this.gamelevelT.textColor = 0x1169e0;
        this.addChild(this.gamelevelT);
    };
    GameScore.prototype.updatascore = function () {
        this.gamescoreT.setText('当前分数:' + GameData._i().GameScore);
        if (GameData._i().GameScore > GameData._i().HeightScore) {
            GameData._i().HeightScore = GameData._i().GameScore;
            this.updatahscore();
        }
    };
    GameScore.prototype.updatahscore = function () {
        this.heightscoreT.setText('最高分数:' + GameData._i().HeightScore);
    };
    GameScore.prototype.updatalevel = function () {
        this.gamelevelT.setText('关卡:' + GameData._i().GameLevel);
    };
    GameScore._i = function () {
        return (this._inst = (this._inst == null ? new GameScore() : this._inst));
    };
    GameScore._inst = null;
    return GameScore;
}(egret.DisplayObjectContainer));
__reflect(GameScore.prototype, "GameScore");
//# sourceMappingURL=GameScore.js.map