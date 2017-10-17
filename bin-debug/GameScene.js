var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Create by hardy on 16/12/21
 * 主游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.player = [];
        _this.btouch = false;
        return _this;
    }
    GameScene.prototype.init = function () {
        BGMPlayer._i().play(SoundName.gamebgm); //背景音乐
        this.intervalarr = [];
        this.cardarr = [];
        this.initdata();
        this.addtouch();
        this.showbg();
        this.bindkeyboard();
        this.gameinterval();
    };
    /**
     * 初始化数据
     */
    GameScene.prototype.initdata = function () {
        GameData._i().GameOver = false;
        GameData._i().GameScore = 0;
        GameData._i().GameLevel = 1;
        for (var i = 0; i < 54; i++) {
            this.cardarr[i] = i + 1;
        }
    };
    /**
     * 显示背景
     */
    GameScene.prototype.showbg = function () {
        // var gamebg: MyBitmap = new MyBitmap(RES.getRes('gamebg_png'), 0, 0);
        // gamebg.setanchorOff(0, 0);
        // gamebg.width = this.mStageW;
        // gamebg.height = this.mStageH;
        // this.addChild(gamebg);
        var gamebg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x91a390);
        this.addChild(gamebg);
        this.showplayer();
        this.showCardstack();
        this.showsendcardbtn();
        // this.addChild(GameScore._i());
    };
    GameScene.prototype.showplayer = function () {
        var pos = [{ x: this.mStageW / 2, y: this.mStageH - 80 }, { x: this.mStageW - 80, y: this.mStageH / 2 }, { x: this.mStageW / 2, y: 80 }, { x: 80, y: this.mStageH / 2 }];
        for (var i = 0; i < 4; i++) {
            this.player[i] = new Player();
            this.player[i].x = pos[i].x;
            this.player[i].y = pos[i].y;
            this.addChild(this.player[i]);
        }
    };
    GameScene.prototype.showCardstack = function () {
        for (var i = 0; i < 10; i++) {
            var card = new CardSprite(1, CardType.Black);
            card.x = this.mStageW / 2 + i;
            card.y = this.mStageH / 2;
            this.addChild(card);
        }
    };
    GameScene.prototype.showsendcardbtn = function () {
        var fun = this.sendcard;
        var btn = new GameUtil.Menu(this, '', '', fun, [0]);
        btn.setScaleMode();
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('发   牌', 30);
        this.addChild(btn);
        btn.x = this.mStageW / 2;
        btn.y = this.mStageH / 2 + 150;
    };
    GameScene.prototype.sendcard = function (id) {
        var _this = this;
        console.log('id===', id);
        if (id >= 4) {
            return;
        }
        var card = this.getrandcard();
        console.log('card====', card);
        var newcard = new CardSprite(card.cardnumber, card.cardtype);
        newcard.x = this.mStageW / 2;
        newcard.y = this.mStageH / 2;
        this.addChild(newcard);
        this.player[id].handcardarr.push(newcard);
        var pos = [{ x: this.player[0].x, y: this.player[0].y - 100 }, { x: this.player[1].x - 80, y: this.player[1].y }, { x: this.player[2].x, y: this.player[2].y + 80 }, { x: this.player[3].x + 80, y: this.player[3].y }];
        egret.Tween.get(newcard).to({ x: pos[id].x, y: pos[id].y }, 500).call(function () {
            newcard.showfront();
            id = id + 1;
            _this.sendcard(id);
        }, this);
    };
    GameScene.prototype.getrandcard = function () {
        var cardtype = RandomUtils.limitInteger(CardType.Black, CardType.King);
        var cardnumber = (cardtype == CardType.King) ? RandomUtils.limitInteger(1, 2) : RandomUtils.limitInteger(1, 13);
        var card = { cardtype: cardtype, cardnumber: cardnumber };
        return card;
    };
    /**
     * 游戏定时器
     */
    GameScene.prototype.gameinterval = function () {
        GameUtil.trace('interval');
    };
    /**
     * 绑定键盘事件
     */
    GameScene.prototype.bindkeyboard = function () {
        if (!GameConfig.IsBindKeyboard) {
            return;
        }
        KeyBoard._i().bindfun(this, this.keyup, KEYCODE.UP);
        KeyBoard._i().bindfun(this, this.keydown, KEYCODE.DOWN);
        KeyBoard._i().bindfun(this, this.keyleft, KEYCODE.LEFT);
        KeyBoard._i().bindfun(this, this.keyright, KEYCODE.RIGHT);
        KeyBoard._i().bindfun(this, this.keyspace, KEYCODE.SPACE);
    };
    /**
     * 检查游戏是否结束
     */
    GameScene.prototype.checkgameover = function () {
        var bgameover = false;
        if (bgameover) {
            this.gameover();
        }
    };
    /**
     * 触摸层
     */
    GameScene.prototype.addtouch = function () {
        var touchshap = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0);
        this.addChild(touchshap);
        touchshap.$setTouchEnabled(true);
        touchshap.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            //console.log('touchx===', e.stageX, '----touchy===', e.stageY);
            if (GameData._i().GameOver) {
                return;
            }
        }, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmove, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
        // touchshap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchout, this);
    };
    GameScene.prototype.touchbegin = function (e) {
        if (GameData._i().GameOver) {
            return;
        }
        this.btouch = true;
    };
    GameScene.prototype.touchmove = function (e) {
        if (this.btouch) {
        }
    };
    GameScene.prototype.touchend = function (e) {
        if (this.btouch) {
            this.btouch = false;
        }
    };
    GameScene.prototype.touchout = function (e) {
        if (this.btouch) {
            this.btouch = false;
        }
    };
    /**
     * 游戏结束
     */
    GameScene.prototype.gameover = function () {
        console.log("GameOver");
        this.clearinter();
        GameData._i().GameOver = true;
        this.addChild(new GameOverPageShow());
    };
    /**
     *下一关
     */
    GameScene.prototype.nextlevelgame = function () {
    };
    /**
     * 重置游戏数据
     */
    GameScene.prototype.reset = function () {
        this.gameinterval();
        this.restart();
    };
    /**
     * 清除定时器
     */
    GameScene.prototype.clearinter = function () {
        GameUtil.clearinterval(this.intervalarr);
    };
    /**
     * 退出游戏，回到开始界面
     */
    GameScene.prototype.exitgame = function () {
        GameUtil.GameScene.runscene(new StartGameScene());
    };
    /**
     * 重新开始游戏
     */
    GameScene.prototype.restart = function () {
    };
    /**
     * 需要绑定的键盘事件
     */
    GameScene.prototype.keydown = function () {
    };
    GameScene.prototype.keyleft = function () {
    };
    GameScene.prototype.keyright = function () {
    };
    GameScene.prototype.keyup = function () {
    };
    GameScene.prototype.keyspace = function () {
        //GameData._i().GamePause = !GameData._i().GamePause;
    };
    return GameScene;
}(GameUtil.BassPanel));
__reflect(GameScene.prototype, "GameScene");
