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

        // this.addChild(GameScore._i());
    }
    private player: Player[] = [];
    private showplayer() {
        let pos = [{ x: this.mStageW / 2, y: this.mStageH - 80 }, { x: this.mStageW - 80, y: this.mStageH / 2 }, { x: this.mStageW / 2, y: 80 }, { x: 80, y: this.mStageH / 2 }];
        for (let i: number = 0; i < 4; i++) {
            this.player[i] = new Player();
            this.player[i].x = pos[i].x;
            this.player[i].y = pos[i].y;
            this.addChild(this.player[i]);
        }
    }
    private showCardstack() {
        for (let i: number = 0; i < 10; i++) {
            let card = new CardSprite(1, CardType.Black);
            card.x = this.mStageW / 2 + i;
            card.y = this.mStageH / 2;
            this.addChild(card);
        }
    }
    private showsendcardbtn() {
        var fun = this.sendcard;
        var btn = new GameUtil.Menu(this, '', '', fun, [0]);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('发   牌', 30);
        this.addChild(btn);
        btn.x = this.mStageW / 2;
        btn.y = this.mStageH / 2 + 150;
    }
    private sendcard(id: number) {
        console.log('id===', id);
        if (id >= 4) {
            return;
        }
        let card = this.getrandcard();
        console.log('card====', card);
        let newcard: CardSprite = new CardSprite(card.cardnumber, card.cardtype);
        newcard.x = this.mStageW / 2;
        newcard.y = this.mStageH / 2;
        this.addChild(newcard);

        this.player[id].handcardarr.push(newcard);

        let pos = [{ x: this.player[0].x, y: this.player[0].y - 100 }, { x: this.player[1].x - 80, y: this.player[1].y }, { x: this.player[2].x, y: this.player[2].y + 80 }, { x: this.player[3].x + 80, y: this.player[3].y }];
        egret.Tween.get(newcard).to({ x: pos[id].x, y: pos[id].y }, 500).call(() => {
            newcard.showfront();
            id = id + 1;
            this.sendcard(id);
        }, this);
    }

    private getrandcard(): any {
        let cardtype = RandomUtils.limitInteger(CardType.Black, CardType.King);
        let cardnumber = (cardtype == CardType.King) ? RandomUtils.limitInteger(1, 2) : RandomUtils.limitInteger(1, 13);

        let card = { cardtype: cardtype, cardnumber: cardnumber };

        return card;
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