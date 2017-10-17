/**
 * Create by hardy on 16/12/21
 * 游戏设置页面
 */
class GameSetting extends Othercontainer
{
    private switchbtn: GameUtil.Menu[];     //开关按钮
    private soundswitch: boolean[] = [];    //是否打开声音
    public constructor()
    {
        super();
    }

    protected show()
    {
        this.soundswitch[1] = GameConfig._i().bgamesound;
        this.soundswitch[0] = GameConfig._i().bgamemusic;   

        this.switchbtn = [];

        var setttingbg: MyBitmap = new MyBitmap(RES.getRes('settingbg_png'), this.mStageW / 2, this.mStageH/2);
        this.addChild(setttingbg);

        for (var i: number = 0; i < 2; i++) {
            var switchonoff: MyBitmap = new MyBitmap(RES.getRes('settingswitch_png'));
            this.addChild(switchonoff);
            var onposx: number = 342;
            var offposx: number = 448;
            var posx: number = this.soundswitch[i] ? onposx : offposx;
            GameUtil.relativepos(switchonoff, setttingbg, posx, 75 + i * 114);
            var tex: string = this.soundswitch[i] ? 'settingswitchon_png' : 'settingswitchoff_png';
            this.switchbtn[i] = new GameUtil.Menu(this, tex, tex, this.settingswitch, [i, switchonoff, (onposx - offposx)]);
            this.addChild(this.switchbtn[i]);
            this.swapChildren(switchonoff, this.switchbtn[i]);
            GameUtil.relativepos(this.switchbtn[i], setttingbg, 394, 75 + i * 114);
        }

        var close: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
        this.addChild(close);
        GameUtil.relativepos(close, setttingbg, 530, 17);
    }

    /**设置开关 */
    private settingswitch(type: number, swilog: any, swidis: number) {
        this.soundswitch[type] = !this.soundswitch[type];
        swilog.x += (this.soundswitch[type] ? swidis : -swidis);
        var tex: string = this.soundswitch[type] ? 'settingswitchon_png' : 'settingswitchoff_png';
        this.switchbtn[type].setButtonTexture(tex, tex);

        GameConfig._i().bgamesound = this.soundswitch[1];
        GameConfig._i().bgamemusic = this.soundswitch[0];
        var smusicv: string = GameConfig._i().bgamemusic ? '1' : '0';
        var ssoundv: string = GameConfig._i().bgamesound ? '1' : '0';
        GameUtil.saveLocalData(GameConfig.GAMEMUSIC, smusicv);
        GameUtil.saveLocalData(GameConfig.GAMESOUND, ssoundv);

        var volume = GameConfig._i().bgamemusic ? 1 : 0;
        // if (GameConfig._i().bgamemusic) {
        //     window['playaudio']();
        // } else {
        //     window['stopaudio']();
        // }
        //GameData._i().gamesound[SoundName.startgamebgm].setvolume(volume);
        BGMPlayer._i().setVolme(volume);

    }
}