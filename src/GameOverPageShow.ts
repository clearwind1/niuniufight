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

        let bgframe: egret.Shape = GameUtil.createRect(this.mStageW / 2 - 300, this.mStageH / 2 - 400, 600, 700, 1, 0x423255);
        cont.addChild(bgframe);
        for (let i: number = 0; i < 2; i++) {
            var line = GameUtil.createLine(2, 0xf1f0a5, bgframe.x + 200 * (i + 1), bgframe.y + 60, bgframe.x + 200 * (i + 1), bgframe.y + 540);
            cont.addChild(line);
        }
        for (let i: number = 0; i < 5; i++) {
            var line = GameUtil.createLine(2, 0xf1f0a5, bgframe.x, bgframe.y + 60 + i * 120, bgframe.x + 600, bgframe.y + 60 + i * 120);
            cont.addChild(line);
        }

        var text = new GameUtil.MyTextField(this.mStageW / 2, bgframe.y + 30, 40, 0.5, 0.5);
        text.setText('结算');
        text.textColor = 0xabead9;
        cont.addChild(text);

        let bankerid = GameData._i().bankerID;
        let wintext = ['输', '赢', '平'];
        var texts = [{ name: '庄家', iswin: '', winbet: '0' }, { name: '玩家', iswin: '赢', winbet: '0' }, { name: '玩家', iswin: '赢', winbet: '0' }, { name: '玩家', iswin: '赢', winbet: '0' }];
        for (let i: number = 0; i < 4; i++) {
            let id = (bankerid + i) % 4;
            let player: Player = GameData._i().player[id];
            texts[i].name = '玩家' + id;
            texts[0].name = '庄家';
            if (id == 0) {
                texts[i].name = '玩家(你)';
            }
            texts[i].iswin = wintext[player.isWin];
            texts[i].winbet = player.betgold + '';
            if (player.isWin == JUDEWIN.DRAW) {
                texts[i].winbet = '0';
            }
            if (i == 0) {
                texts[i].winbet = GameData._i().bankerwinCount + '';
            }
        }
        if (GameData._i().bankerID == 0) {
            texts[0].name = '庄家(你)';
        }

        for (let i: number = 0; i < 12; i++) {
            var text = new GameUtil.MyTextField(bgframe.x + 100 + 200 * (i % 3), bgframe.y + 120 + Math.floor(i / 3) * 120, 30, 0.5, 0.5);
            if (i % 3 == 0) {
                text.setText(texts[Math.floor(i / 3)].name);
            } else if (i % 3 == 1) {
                text.setText(texts[Math.floor(i / 3)].iswin);
            } else {
                text.setText(texts[Math.floor(i / 3)].winbet);
            }

            text.textColor = 0xabead9;
            cont.addChild(text);
        }

        GameUtil.doAction(cont, DisType.Alpha, 500);

        // var fun = this.turnback;
        // var btn = new GameUtil.Menu(this, '', '', fun);
        // btn.setScaleMode();
        // btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        // btn.addButtonText('返      回', 30);
        // this.addChild(btn);
        // btn.x = posx - 200;
        // btn.y = posy;
        // GameUtil.doAction(btn, DisType.LeftTRight, 1500, btn.x);

        var fun = this.relife;
        var btn = new GameUtil.Menu(this, '', '', fun);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
        btn.addButtonText('再来一局', 30);
        this.addChild(btn);
        btn.x = this.mStageW / 2;
        btn.y = bgframe.y + 600;
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