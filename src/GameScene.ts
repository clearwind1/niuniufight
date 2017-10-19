/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
class GameScene extends GameUtil.BassPanel {

    private intervalarr: number[];      //存储定时器标志
    private touchlayer: egret.Shape;    //触摸层
    private beginpointx: number;
    private beginpointy: number;

    private cardarr: number[];          //牌库

    private currPlayerID: number;       //当前玩家ID
    private bsendcard: boolean;         //是否发牌中
    private bankerID: number;           //庄家ID

    public constructor() {
        super();
    }
    public init() {
        BGMPlayer._i().play(SoundName.gamebgm);     //背景音乐
        this.intervalarr = [];
        this.cardarr = [];
        this.initdata();
        this.addtouch();
        this.showbg();
        this.bindkeyboard();
        this.gameinterval();
    }
    /**
     * 初始化数据
     */
    private initdata() {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        for (let i: number = 0; i < 54; i++) {
            this.cardarr[i] = i + 1;
        }
        this.currPlayerID = 0;
        this.bsendcard = false;
    }
    /**
     * 显示背景
     */
    private showbg() {
        // var gamebg: MyBitmap = new MyBitmap(RES.getRes('gamebg_png'), 0, 0);
        // gamebg.setanchorOff(0, 0);
        // gamebg.width = this.mStageW;
        // gamebg.height = this.mStageH;
        // this.addChild(gamebg);

        let gamebg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x91a390);
        this.addChild(gamebg);

        this.showplayer();
        this.showCardstack();
        this.showsendcardbtn();
        this.addbetframe();

        // this.addChild(GameScore._i());
    }
    //显示玩家
    private player: Player[] = [];
    private showplayer() {
        let dis = 250;
        let pos = [{ x: this.mStageW / 2 - dis, y: this.mStageH - 80 }, { x: this.mStageW - 80, y: this.mStageH / 2 + dis }, { x: this.mStageW / 2 + dis, y: 80 }, { x: 80, y: this.mStageH / 2 - dis }];
        for (let i: number = 0; i < 4; i++) {
            this.player[i] = new Player();
            this.player[i].x = pos[i].x;
            this.player[i].y = pos[i].y;
            this.player[i].rotation = i * -90;
            this.addChild(this.player[i]);
        }
        this.bankerID = RandomUtils.limitInteger(0, 3);
        this.bankerID = 2;
        this.player[this.bankerID].setBanker(true);
        this.currPlayerID = (this.bankerID + 1) % 4;
    }
    //显示中间的牌库
    private showCardstack() {
        for (let i: number = 0; i < 10; i++) {
            let card = new CardSprite(1, CardType.Black);
            card.x = this.mStageW / 2 + i;
            card.y = this.mStageH / 2;
            this.addChild(card);
        }
    }
    //下注界面
    private betframecont: egret.Sprite;
    public addbetframe() {
        this.betframecont = new egret.Sprite();
        this.addChild(this.betframecont);
        this.betframecont.visible = true;

        let betnumber: number = 10;
        let totalnumber: number = this.player[0].gold;
        let curbetnumber: number = 10;

        //背景框
        let bgframe: egret.Shape = GameUtil.createRect(this.mStageW / 2 - 300, this.mStageH / 2 - 200, 600, 400, 1, 0x423255);
        this.betframecont.addChild(bgframe);

        var posx = this.mStageW / 2;
        var posy = bgframe.y + 30;
        var text = new GameUtil.MyTextField(posx, posy, 40, 0.5, 0.5);
        text.setText('下注');
        text.textColor = 0xabead9;
        this.betframecont.addChild(text);
        //画框
        let spos = [{ x: 0, y: 60 }, { x: 0, y: 180 }, { x: 200, y: 60 }, { x: 400, y: 60 }, { x: 400, y: 60 }, { x: 500, y: 60 }, { x: 500, y: 180 }, { x: 400, y: 140 }, { x: 400, y: 220 }, { x: 0, y: 300 }];
        let epos = [{ x: 600, y: 60 }, { x: 400, y: 180 }, { x: 200, y: 300 }, { x: 400, y: 300 }, { x: 400, y: 300 }, { x: 500, y: 300 }, { x: 600, y: 180 }, { x: 500, y: 140 }, { x: 500, y: 220 }, { x: 600, y: 300 }];
        for (let i: number = 0; i < spos.length; i++) {
            var line = GameUtil.createLine(2, 0xf1f0a5, bgframe.x + spos[i].x, bgframe.y + spos[i].y, bgframe.x + epos[i].x, bgframe.y + epos[i].y);
            this.betframecont.addChild(line);
        }
        //按钮
        let btnpos = [{ x: 451, y: 101 }, { x: 451, y: 181 }, { x: 451, y: 261 }, { x: 551, y: 120 }, { x: 551, y: 240 }];
        var fun = (btnid) => {
            if (btnid < 3) {
                shap.y = bgframe.y + btnpos[btnid].y - 37;
                var betnumbers = [10, 50, 100];
                curbetnumber = betnumbers[btnid];
            } else if (btnid == 3) {
                betnumber = Math.min(betnumber += curbetnumber, this.player[0].gold);
                totalnumber = this.player[0].gold - betnumber;
                (<GameUtil.MyTextField>this.betframecont.getChildByName('text3')).setText('' + betnumber);
                (<GameUtil.MyTextField>this.betframecont.getChildByName('text2')).setText('' + totalnumber);
            } else {
                betnumber = Math.max(betnumber -= curbetnumber, 10);
                totalnumber = this.player[0].gold - betnumber;
                (<GameUtil.MyTextField>this.betframecont.getChildByName('text3')).setText('' + betnumber);
                (<GameUtil.MyTextField>this.betframecont.getChildByName('text2')).setText('' + totalnumber);
            }
        }
        for (let i: number = 0; i < 5; i++) {
            var btn = new GameUtil.Menu(this, '', '', fun, [i]);
            btn.addButtonShap(GameUtil.createRect(0, 0, 94, 74, 1, 0x3399fe), -47, -37);
            this.betframecont.addChild(btn);
            btn.x = bgframe.x + btnpos[i].x;
            btn.y = bgframe.y + btnpos[i].y;
        }
        var shap = GameUtil.createRect(0, 0, 94, 74, 1, 0xc29832);
        shap.x = bgframe.x + btnpos[0].x - 47;
        shap.y = bgframe.y + btnpos[0].y - 37;
        this.betframecont.addChild(shap);

        var btn = new GameUtil.Menu(this, '', '', () => {
            this.player[0].gold = totalnumber;
            this.player[0].betgold = betnumber;
            this.player[0].updatagold();
            this.betframecont.visible = false;
        });
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('确   定', 30);
        btn.setScaleMode();
        this.betframecont.addChild(btn);
        btn.x = bgframe.x + 300;
        btn.y = bgframe.y + 350;
        //字
        let pos = [{ x: 100, y: 120 }, { x: 300, y: 120 }, { x: 100, y: 240 }, { x: 300, y: 240 }, { x: 451, y: 101 }, { x: 451, y: 181 }, { x: 451, y: 261 }, { x: 551, y: 120 }, { x: 551, y: 240 }];
        let texts = ['总金币', '下注金币', '', '', '10', '50', '100', '+', '-'];
        texts[2] += totalnumber;
        texts[3] += betnumber;
        for (let i: number = 0; i < pos.length; i++) {
            var text = new GameUtil.MyTextField(bgframe.x + pos[i].x, bgframe.y + pos[i].y, 30, 0.5, 0.5);
            text.setText(texts[i]);
            text.name = "text" + i;
            text.textColor = 0xabead9;
            this.betframecont.addChild(text);
        }

        if (this.bankerID == 0) {
            this.showbetframe(false);
        }

    }
    public showbetframe(bshow: boolean) {
        this.betframecont.visible = bshow;
    }
    //发牌按钮
    private sendcardbtn: GameUtil.Menu;
    private showsendcardbtn() {
        var fun = this.sendcard;
        this.sendcardbtn = new GameUtil.Menu(this, '', '', fun, [true]);
        this.sendcardbtn.setScaleMode();
        this.sendcardbtn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        this.sendcardbtn.addButtonText('发   牌', 30);
        this.addChild(this.sendcardbtn);
        this.sendcardbtn.x = this.mStageW / 2;
        this.sendcardbtn.y = this.mStageH / 2 + 150;
        this.sendcardbtn.visible = false;
    }
    //发牌 bsendall: 是否发全部人
    public sendcard(bsendall: boolean) {
        //console.log('id===', id);
        this.sendcardbtn.visible = false;
        if (bsendall && this.player[this.bankerID].handcardarr.length == 2) {
            this.currPlayerID = (this.bankerID + 1) % 4;
            this.playercall();
            return;
        }
        if (this.bsendcard) {    //发牌中
            return;
        }
        this.bsendcard = true;
        let id = this.currPlayerID;
        let card = this.getrandcard();
        //生成一张新牌
        let newcard: CardSprite = new CardSprite(card.cardnumber, card.cardtype);
        newcard.x = this.mStageW / 2;
        newcard.y = this.mStageH / 2;
        this.addChild(newcard);
        //放入玩家手中
        this.player[id].handcardarr.push(newcard);

        //牌的位置         
        let posx = this.player[id].x;
        let posy = this.player[id].y;
        let dis = 110;
        if (this.player[id].rotation == 0) {
            posx = this.player[id].x + 40 + dis * (this.player[id].handcardarr.length);
        } else if (this.player[id].rotation == -90) {
            posy = this.player[id].y - 40 - dis * (this.player[id].handcardarr.length);
        } else if (this.player[id].rotation == -180) {
            posx = this.player[id].x - 40 - dis * (this.player[id].handcardarr.length);
        } else {
            posy = this.player[id].y + 40 + dis * (this.player[id].handcardarr.length);
        }

        egret.Tween.get(newcard).to({ x: posx, y: posy, rotation: this.player[id].rotation }, 500).call(() => {
            newcard.showfront();
            this.bsendcard = false;

            if (this.player[id].handcardarr.length >= 5) {
                this.nextplayercall();
            }

            if (bsendall) {
                this.currPlayerID = (this.currPlayerID + 1) % 4;
                this.sendcard(true);
            }
        }, this);
    }
    //获取牌库里任意一张牌
    private getrandcard(): any {
        let cardselet = this.cardarr[RandomUtils.limitInteger(0, this.cardarr.length - 3)];
        let cardtype = Math.floor((cardselet - 1) / 13);
        let cardnumber = (cardselet - 1) % 13 + 1;

        let card = { cardtype: cardtype, cardnumber: cardnumber };

        let index = this.cardarr.indexOf(cardselet);
        this.cardarr.splice(index, 1);

        return card;
    }
    //第一次玩家叫牌
    private playercall() {
        this.player[this.currPlayerID].showcallbtn(true);
    }
    //下一个玩家叫牌
    public nextplayercall() {
        this.player[this.currPlayerID].showcallbtn(false);

        if (this.currPlayerID == this.bankerID) {
            //清算

        } else {
            this.currPlayerID = (this.currPlayerID + 1) % 4;
            this.player[this.currPlayerID].showcallbtn(true);
        }
    }

    //清算
    private caculateGame() {

    }

    /**
     * 游戏定时器
     */
    private gameinterval() {
        GameUtil.trace('interval');
    }
    /**
     * 绑定键盘事件
     */
    private bindkeyboard() {
        if (!GameConfig.IsBindKeyboard) {
            return;
        }
        KeyBoard._i().bindfun(this, this.keyup, KEYCODE.UP);
        KeyBoard._i().bindfun(this, this.keydown, KEYCODE.DOWN);
        KeyBoard._i().bindfun(this, this.keyleft, KEYCODE.LEFT);
        KeyBoard._i().bindfun(this, this.keyright, KEYCODE.RIGHT);
        KeyBoard._i().bindfun(this, this.keyspace, KEYCODE.SPACE);
    }
    /**
     * 检查游戏是否结束
     */
    private checkgameover() {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    }
    /**
     * 触摸层
     */
    private addtouch() {
        let touchshap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0);
        this.addChild(touchshap);
        touchshap.$setTouchEnabled(true);
        touchshap.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            //console.log('touchx===', e.stageX, '----touchy===', e.stageY);
            if (GameData._i().GameOver) {

                return;
            }

        }, this);

        // touchshap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchout, this);
    }
    private btouch: boolean = false;
    private touchbegin(e: egret.TouchEvent) {
        if (GameData._i().GameOver) {
            return;
        }
        this.btouch = true;
    }
    private touchmove(e: egret.TouchEvent) {
        if (this.btouch) {
        }
    }
    private touchend(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }
    private touchout(e: egret.TouchEvent) {
        if (this.btouch) {
            this.btouch = false;
        }
    }

    /**
     * 游戏结束
     */
    public gameover() {
        console.log("GameOver");
        this.clearinter();
        GameData._i().GameOver = true;
        this.addChild(new GameOverPageShow());
    }
    /**
     *下一关
     */
    private nextlevelgame() {

    }
    /**
     * 重置游戏数据
     */
    public reset() {
        this.gameinterval();
        this.restart();
    }
    /**
     * 清除定时器
     */
    private clearinter() {
        GameUtil.clearinterval(this.intervalarr);
    }
    /**
     * 退出游戏，回到开始界面
     */
    private exitgame() {
        GameUtil.GameScene.runscene(new StartGameScene());
    }
    /**
     * 重新开始游戏
     */
    private restart() {

    }
    /**
     * 需要绑定的键盘事件
     */
    private keydown() {
    }
    private keyleft() {
    }
    private keyright() {
    }
    private keyup() {
    }
    private keyspace() {
        //GameData._i().GamePause = !GameData._i().GamePause;
    }
}