/**
 * Created by pior on 16/12/15.
 * 游戏配置
 */

/**声音文件枚举 */
enum SoundName { gamebgm, startgamebgm, comble, remove, newcored, clickf, end };
/**场景转换效果，对应：无效果，从左往右，淡入淡出，向两边分开 */
enum SceneEffect { NullAction, CrossLeft, TransAlpha, OpenDoor };

class GameConfig {
    /**基本配置 */
    public static DEBUG: boolean = true;
    public static IP: string = "api.h5.gamexun.com";        //http连接地址
    public static GAMENAME: string = '牛牛大作战';           //游戏在服务器上的名字
    public static SERVERNAME: string = 'children';          //服务器连接名
    public static FIRSTGAME: string = 'firstgame';          //第一次进游戏标示
    public static GAMESOUND: string = 'gamesound';          //游戏音效
    public static GAMEMUSIC: string = 'gamemusic';          //游戏音乐
    public static GAMELEVEL: string = 'gamelevel';          //游戏等级
    public static IsLoadSound: boolean = false;             //是否加载声音
    public static SoundName: string[] =                     //声音文件名
    [
        'startgamebgm.mp3', 'gamebgm.mp3', 'comble.mp3', 'remove.mp3', 'newcored.mp3', 'clickf.mp3'
        // 'die.mp3', 'fail.mp3', 'goal.mp3', 'beatt.mp3', 'click.mp3'
    ];
    public static MoreGameName: string[] =                  //更多游戏名称
    [
        //'czlongzrun','lookcarechild','sanguorun','savequyuan','sjlpicka','sjlrecard','bubblefightv02'
    ];

    public static GUIDESTEPNUM: number = 2;          //新手引导总步数

    public static DesignWidth: number = 755;         //游戏设计尺寸宽
    public static DesignHeight: number = 1334;       //游戏设计尺寸高

    //常用判断类型    
    public static UATYPE = {
        WeiXinstr: 'micromessenger',
        Androidstr: 'android',
        Iphone: 'iPhone'
    }

    public static IsBindKeyboard: boolean = false;  //是否绑定键盘事件

    public bfirstplay: boolean;                     //是否第一次进入游戏
    public bgamesound: boolean;                     //是否开启游戏音效
    public bgamemusic: boolean;                     //是否开启游戏音乐
    public bguidedone: boolean;                     //是否完成新手引导
    /**基本配置结束 */

    /**开发游戏配置 */
    public static DICBW = 74;
    public static DICBH = 81;
    public static BROW = 10;         //列数
    public static BCOL = 10;         //行数
    public static OFFY = 400;
    public static TOTALLIFE = 3;
    /**开发游戏配置结束 */

    public constructor() {
        this.initconfigdata();
    }
    /**初始化游戏配置数据 */
    private initconfigdata() {
        this.bguidedone = true;
        this.bfirstplay = false;
        if (!GameUtil.readLocalData(GameConfig.FIRSTGAME)) {
            GameUtil.saveLocalData(GameConfig.FIRSTGAME, '1');
            GameUtil.saveLocalData(GameConfig.GAMESOUND, '1');
            GameUtil.saveLocalData(GameConfig.GAMEMUSIC, '1');
            GameUtil.saveLocalData(GameConfig.GAMELEVEL, '0');
            this.bfirstplay = true;
        }
        this.bgamemusic = parseInt(GameUtil.readLocalData(GameConfig.GAMEMUSIC)) == 1 ? true : false;
        this.bgamesound = parseInt(GameUtil.readLocalData(GameConfig.GAMESOUND)) == 1 ? true : false;

    }

    public static getSW(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }
    public static getSH(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    private static _instance: GameConfig = null;
    public static _i(): GameConfig {
        if (this._instance == null) {
            this._instance = new GameConfig();
        }

        return this._instance;
    }

}