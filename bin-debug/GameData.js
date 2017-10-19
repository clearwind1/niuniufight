/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        this.gamesound = []; //游戏声音
        this.init();
    }
    GameData.prototype.init = function () {
        this.GamePause = false;
        this.GameOver = false;
        this.isLoadingend = false;
        this.GameScore = 0;
        this.GameLevel = 1;
        this.HeightScore = 0;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData._inst = null;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map