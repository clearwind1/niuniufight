/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */

class GameData {

    public GamePause: boolean;              //游戏暂停标志    
    public GameOver: boolean;               //游戏结束标志
    public isLoadingend: boolean;           //游戏加载进度结束标志
    public gamesound: MySound[] = [];       //游戏声音
    public GameLevel: number;               //游戏等级
    public GameScore: number;               //游戏分数
    public HeightScore: number;             //最高分数

    public constructor() {
        this.init();
    }

    private init()
    {
        this.GamePause = false;
        this.GameOver = false;
        this.isLoadingend = false;
        this.GameScore = 0;
        this.GameLevel = 1;
        this.HeightScore = 0;
    }

    private static _inst:GameData = null;

    public static _i():GameData
    {
        return (this._inst = (this._inst==null ? new GameData():this._inst));
    }
}