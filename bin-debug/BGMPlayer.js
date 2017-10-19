var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Create by hardy on 16/12/21
 * 背景音乐管理
 */
var BGMPlayer = (function () {
    function BGMPlayer() {
        this.init();
    }
    BGMPlayer.prototype.init = function () {
        this.curbgmtag = -1;
        this.volume = GameConfig._i().bgamemusic ? 1 : 0;
    };
    /**设置音量 */
    BGMPlayer.prototype.setVolme = function (value) {
        this.volume = value;
        if (this.curbgmtag == -1) {
            return;
        }
        GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
    };
    /**播放背景音乐 */
    BGMPlayer.prototype.play = function (bgmName) {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].stop();
        }
        this.curbgmtag = bgmName;
        if (GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].play(0, -1);
            GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
        }
    };
    BGMPlayer._i = function () {
        if (this._instance == null) {
            this._instance = new BGMPlayer();
        }
        return this._instance;
    };
    BGMPlayer._instance = null;
    return BGMPlayer;
}());
__reflect(BGMPlayer.prototype, "BGMPlayer");
//# sourceMappingURL=BGMPlayer.js.map