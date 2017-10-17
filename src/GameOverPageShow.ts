/**
 * Create by hardy on 16/12/21
 * 游戏结束页面
 */
class GameOverPageShow extends Othercontainer {
    public constructor() {
        super();
    }
    protected show() {
        this.showscene();
    }
    /**显示 */
    private showscene() {

        let cont: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        this.addChild(cont);

        var posx = this.mStageW / 2;
        var posy = 450;
        var text = new GameUtil.MyTextField(posx, 100, 80, 0.5, 0.5);
        text.textColor = 0x75bfea;
        text.setText('游戏结束');
        this.addChild(text);

        var text = new GameUtil.MyTextField(posx, 250, 40, 0.5, 0.5);
        text.setText('当前分数:' + GameData._i().GameScore);
        text.textColor = 0x75bfea;
        cont.addChild(text);

        var text = new GameUtil.MyTextField(posx, 300, 40, 0.5, 0.5);
        text.setText('当前关卡:' + GameData._i().GameLevel);
        text.textColor = 0x75bfea;
        cont.addChild(text);

        GameUtil.doAction(cont, DisType.Alpha, 500);

        var fun = this.turnback;
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        btn.addButtonText('返      回', 30);
        this.addChild(btn);
        btn.x = posx - 200;
        btn.y = posy;
        GameUtil.doAction(btn, DisType.LeftTRight, 1500, btn.x);

        var fun = this.relife;
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        btn.addButtonText('复      活', 30);
        this.addChild(btn);
        btn.x = posx + 200;
        btn.y = posy;
        GameUtil.doAction(btn, DisType.RightTLeft, 1500, btn.x);

    }
    /**返回开始界面 */
    private turnback() {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        GameScore._i().updatascore();
        GameScore._i().updatalevel();
        this.close();
        GameUtil.GameScene.runscene(new StartGameScene());
    }
    /**复活 */
    private relife() {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        GameScore._i().updatascore();
        GameScore._i().updatalevel();
        (<GameScene>this.parent).reset();
        this.close();
    }
}