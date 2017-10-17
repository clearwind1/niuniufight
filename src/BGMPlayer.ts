/**
 * Create by hardy on 16/12/21
 * 背景音乐管理
 */
class BGMPlayer {
    private volume: number;         //音量
    private curbgmtag: number;      //当前bgm标志
    public constructor() {
        this.init();
    }

    private init() {
        this.curbgmtag = -1;
        this.volume = GameConfig._i().bgamemusic ? 1 : 0;
    }
    /**设置音量 */
    public setVolme(value: number) {
        this.volume = value;
        if (this.curbgmtag == -1) {
            return;
        }
        GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
    }
    /**播放背景音乐 */
    public play(bgmName: number) {
        if (this.curbgmtag != -1 && GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].stop();
        }
        this.curbgmtag = bgmName;
        if (GameData._i().gamesound[this.curbgmtag]) {
            GameData._i().gamesound[this.curbgmtag].play(0, -1);
            GameData._i().gamesound[this.curbgmtag].setvolume(this.volume);
        }
    }

    private static _instance: BGMPlayer = null;
    public static _i(): BGMPlayer {
        if (this._instance == null) {
            this._instance = new BGMPlayer();
        }

        return this._instance;
    }

}