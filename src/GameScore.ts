
/**
 * 游戏分数，等级及其他的元素类
 */
class GameScore extends egret.DisplayObjectContainer {
	private gamescoreT: GameUtil.MyTextField;		//当前分数文本
	private gamelevelT: GameUtil.MyTextField;		//当前等级文本
	private heightscoreT: GameUtil.MyTextField;		//最高分数文本
	public constructor() {
		super();
		this.init();
	}
	private init() {
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
	}

	public updatascore() {
		this.gamescoreT.setText('当前分数:' + GameData._i().GameScore);
		if (GameData._i().GameScore > GameData._i().HeightScore) {
			GameData._i().HeightScore = GameData._i().GameScore;
			this.updatahscore();
		}
	}
	public updatahscore() {
		this.heightscoreT.setText('最高分数:' + GameData._i().HeightScore);
	}
	public updatalevel() {
		this.gamelevelT.setText('关卡:' + GameData._i().GameLevel);
	}

	private static _inst:GameScore = null;
    public static _i():GameScore
    {
        return (this._inst = (this._inst==null ? new GameScore():this._inst));
    }

}