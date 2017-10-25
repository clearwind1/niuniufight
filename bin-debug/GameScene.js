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
        /**
         * 开始倒计时
         * */
        _this.downtime = 3;
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
        this.startdown();
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
        this.currPlayerID = 0;
        this.bsendcard = false;
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
        this.addbetframe();
        // this.addChild(GameScore._i());
    };
    /**
     * 显示玩家
     */
    GameScene.prototype.showplayer = function () {
        var dis = 250;
        var pos = [{ x: this.mStageW / 2 - dis, y: this.mStageH - 80 }, { x: this.mStageW - 80, y: this.mStageH / 2 + dis }, { x: this.mStageW / 2 + dis, y: 80 }, { x: 80, y: this.mStageH / 2 - dis }];
        for (var i = 0; i < 4; i++) {
            GameData._i().player[i] = new Player();
            GameData._i().player[i].x = pos[i].x;
            GameData._i().player[i].y = pos[i].y;
            GameData._i().player[i].rotation = i * -90;
            if (i != 0) {
                GameData._i().player[i].isAI = true; //设置为AI
            }
            this.addChild(GameData._i().player[i]);
        }
        this.bankerID = RandomUtils.limitInteger(0, 3);
        GameData._i().bankerID = this.bankerID;
        GameData._i().player[this.bankerID].setBanker(true);
        this.currPlayerID = (this.bankerID + 1) % 4;
    };
    /**
     * 显示中间的牌库
     */
    GameScene.prototype.showCardstack = function () {
        for (var i = 0; i < 10; i++) {
            var card = new CardSprite(1, CardType.Black);
            card.x = this.mStageW / 2 + i;
            card.y = this.mStageH / 2;
            this.addChild(card);
        }
    };
    GameScene.prototype.addbetframe = function () {
        var _this = this;
        this.betframecont = new egret.Sprite();
        this.addChild(this.betframecont);
        this.betframecont.visible = false;
        var betnumber = 10;
        var totalnumber = GameData._i().player[0].gold - betnumber;
        var curbetnumber = 10;
        //背景框
        var bgframe = GameUtil.createRect(this.mStageW / 2 - 300, this.mStageH / 2 - 200, 600, 400, 1, 0x423255);
        this.betframecont.addChild(bgframe);
        var posx = this.mStageW / 2;
        var posy = bgframe.y + 30;
        var text = new GameUtil.MyTextField(posx, posy, 40, 0.5, 0.5);
        text.setText('下注');
        text.textColor = 0xabead9;
        this.betframecont.addChild(text);
        //画框
        var spos = [{ x: 0, y: 60 }, { x: 0, y: 180 }, { x: 200, y: 60 }, { x: 400, y: 60 }, { x: 400, y: 60 }, { x: 500, y: 60 }, { x: 500, y: 180 }, { x: 400, y: 140 }, { x: 400, y: 220 }, { x: 0, y: 300 }];
        var epos = [{ x: 600, y: 60 }, { x: 400, y: 180 }, { x: 200, y: 300 }, { x: 400, y: 300 }, { x: 400, y: 300 }, { x: 500, y: 300 }, { x: 600, y: 180 }, { x: 500, y: 140 }, { x: 500, y: 220 }, { x: 600, y: 300 }];
        for (var i = 0; i < spos.length; i++) {
            var line = GameUtil.createLine(2, 0xf1f0a5, bgframe.x + spos[i].x, bgframe.y + spos[i].y, bgframe.x + epos[i].x, bgframe.y + epos[i].y);
            this.betframecont.addChild(line);
        }
        //按钮
        var btnpos = [{ x: 451, y: 101 }, { x: 451, y: 181 }, { x: 451, y: 261 }, { x: 551, y: 120 }, { x: 551, y: 240 }];
        var fun = function (btnid) {
            if (btnid < 3) {
                shap.y = bgframe.y + btnpos[btnid].y - 37;
                var betnumbers = [10, 50, 100];
                curbetnumber = betnumbers[btnid];
            }
            else if (btnid == 3) {
                betnumber = Math.min(betnumber += curbetnumber, GameData._i().player[0].gold);
                totalnumber = GameData._i().player[0].gold - betnumber;
                _this.betframecont.getChildByName('text3').setText('' + betnumber);
                _this.betframecont.getChildByName('text2').setText('' + totalnumber);
            }
            else {
                betnumber = Math.max(betnumber -= curbetnumber, 10);
                totalnumber = GameData._i().player[0].gold - betnumber;
                _this.betframecont.getChildByName('text3').setText('' + betnumber);
                _this.betframecont.getChildByName('text2').setText('' + totalnumber);
            }
        };
        for (var i = 0; i < 5; i++) {
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
        var btn = new GameUtil.Menu(this, '', '', function () {
            GameData._i().player[0].gold = totalnumber;
            GameData._i().player[0].betgold = betnumber;
            GameData._i().player[0].updatagold();
            _this.betframecont.visible = false;
            _this.showWaiting(400);
        });
        btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        btn.addButtonText('确   定', 30);
        btn.setScaleMode();
        this.betframecont.addChild(btn);
        btn.x = bgframe.x + 300;
        btn.y = bgframe.y + 350;
        //字
        var pos = [{ x: 100, y: 120 }, { x: 300, y: 120 }, { x: 100, y: 240 }, { x: 300, y: 240 }, { x: 451, y: 101 }, { x: 451, y: 181 }, { x: 451, y: 261 }, { x: 551, y: 120 }, { x: 551, y: 240 }];
        var texts = ['总金币', '下注金币', '', '', '10', '50', '100', '+', '-'];
        texts[2] += totalnumber;
        texts[3] += betnumber;
        for (var i = 0; i < pos.length; i++) {
            var text = new GameUtil.MyTextField(bgframe.x + pos[i].x, bgframe.y + pos[i].y, 30, 0.5, 0.5);
            text.setText(texts[i]);
            text.name = "text" + i;
            text.textColor = 0xabead9;
            this.betframecont.addChild(text);
        }
    };
    /**
     * 显示下注框
     */
    GameScene.prototype.showbetframe = function () {
        if (this.bankerID == 0) {
            this.betframecont.visible = false;
            this.showWaiting(1000);
            return;
        }
        else {
            var betnumber = Number(this.betframecont.getChildByName('text3').text);
            this.betframecont.getChildByName('text2').setText('' + (GameData._i().player[0].gold - betnumber));
            this.betframecont.visible = true;
        }
    };
    /**
     * 等待界面
     */
    GameScene.prototype.showWaiting = function (delay) {
        var _this = this;
        this.addChild(GameUtil.WaitServerPanel.getInstace());
        GameUtil.WaitServerPanel.getInstace().wainttext.size = 50;
        GameUtil.WaitServerPanel.getInstace().wainttext.setText('请等待其他玩家下注');
        egret.setTimeout(function () {
            _this.removeChild(GameUtil.WaitServerPanel.getInstace());
            //为AI设置下注
            _this.AIbet();
            _this.sendcard(true);
        }, this, delay);
    };
    /**
     * AI下注
     */
    GameScene.prototype.AIbet = function () {
        for (var i = 0; i < 4; i++) {
            if (GameData._i().player[i].isAI && !GameData._i().player[i].getBanker()) {
                GameData._i().player[i].betgold = RandomUtils.limitInteger(1, 20) * 10;
                GameData._i().player[i].gold -= GameData._i().player[i].betgold;
                GameData._i().player[i].updatagold();
            }
        }
    };
    GameScene.prototype.startdown = function () {
        var txte = '' + this.downtime;
        if (this.downtime == 0) {
            txte = "READY GO";
        }
        else if (this.downtime < 0) {
            this.removeChild(GameUtil.WaitServerPanel.getInstace());
            this.showbetframe();
            return;
        }
        this.addChild(GameUtil.WaitServerPanel.getInstace());
        GameUtil.WaitServerPanel.getInstace().wainttext.size = 100;
        GameUtil.WaitServerPanel.getInstace().wainttext.setText('' + txte);
        this.downtime--;
        egret.setTimeout(this.startdown, this, 1000);
    };
    GameScene.prototype.showsendcardbtn = function () {
        var fun = this.sendcard;
        this.sendcardbtn = new GameUtil.Menu(this, '', '', fun, [true]);
        this.sendcardbtn.setScaleMode();
        this.sendcardbtn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
        this.sendcardbtn.addButtonText('发   牌', 30);
        this.addChild(this.sendcardbtn);
        this.sendcardbtn.x = this.mStageW / 2;
        this.sendcardbtn.y = this.mStageH / 2 + 150;
        this.sendcardbtn.visible = false;
    };
    /**
     * 发牌 bsendall: 是否发全部人
     */
    GameScene.prototype.sendcard = function (bsendall) {
        var _this = this;
        //console.log('id===', id);
        this.sendcardbtn.visible = false;
        if (bsendall && GameData._i().player[this.bankerID].handcardarr.length == 2) {
            this.currPlayerID = (this.bankerID + 1) % 4;
            this.playercall();
            return;
        }
        if (this.bsendcard) {
            return;
        }
        this.bsendcard = true;
        var id = this.currPlayerID;
        var card = this.getrandcard();
        //生成一张新牌
        var newcard = new CardSprite(card.cardnumber, card.cardtype);
        newcard.x = this.mStageW / 2;
        newcard.y = this.mStageH / 2;
        this.addChild(newcard);
        //放入玩家手中
        GameData._i().player[id].handcardarr.push(newcard);
        GameData._i().player[id].updatahandcardnumber();
        //牌的位置         
        var posx = GameData._i().player[id].x;
        var posy = GameData._i().player[id].y;
        var dis = 110;
        if (GameData._i().player[id].rotation == 0) {
            posx = GameData._i().player[id].x + 40 + dis * (GameData._i().player[id].handcardarr.length);
        }
        else if (GameData._i().player[id].rotation == -90) {
            posy = GameData._i().player[id].y - 40 - dis * (GameData._i().player[id].handcardarr.length);
        }
        else if (GameData._i().player[id].rotation == -180) {
            posx = GameData._i().player[id].x - 40 - dis * (GameData._i().player[id].handcardarr.length);
        }
        else {
            posy = GameData._i().player[id].y + 40 + dis * (GameData._i().player[id].handcardarr.length);
        }
        egret.Tween.get(newcard).to({ x: posx, y: posy, rotation: GameData._i().player[id].rotation }, 500).call(function () {
            if (id == 0) {
                newcard.showfront();
            }
            _this.bsendcard = false;
            if (GameData._i().player[id].handcardarr.length >= 5) {
                _this.nextplayercall();
            }
            else {
                if (!bsendall) {
                    _this.playercall();
                }
            }
            if (bsendall) {
                _this.currPlayerID = (_this.currPlayerID + 1) % 4;
                _this.sendcard(true);
            }
        }, this);
    };
    /**
     * 获取牌库里任意一张牌
     */
    GameScene.prototype.getrandcard = function () {
        var cardselet = this.cardarr[RandomUtils.limitInteger(0, this.cardarr.length - 3)];
        var cardtype = Math.floor((cardselet - 1) / 13);
        var cardnumber = (cardselet - 1) % 13 + 1;
        var card = { cardtype: cardtype, cardnumber: cardnumber };
        var index = this.cardarr.indexOf(cardselet);
        this.cardarr.splice(index, 1);
        return card;
    };
    /**
     * 第一次玩家叫牌
     */
    GameScene.prototype.playercall = function () {
        var _this = this;
        if (this.currPlayerID == 0) {
            GameData._i().player[this.currPlayerID].showcallbtn(true);
        }
        else {
            //AI 叫牌
            if (GameData._i().player[this.currPlayerID].getHandcardnumber() >= RandomUtils.limitInteger(17, 21) || GameData._i().player[this.currPlayerID].getHandcardnumber() == 0) {
                egret.setTimeout(this.nextplayercall, this, 500);
            }
            else {
                egret.setTimeout(function () {
                    _this.sendcard(false);
                }, this, 500);
            }
        }
    };
    /**
     * 下一个玩家叫牌
     */
    GameScene.prototype.nextplayercall = function () {
        var _this = this;
        GameData._i().player[this.currPlayerID].showcallbtn(false);
        if (this.currPlayerID == this.bankerID) {
            //清算
            egret.setTimeout(this.caculateGame, this, 1000);
            //this.caculateGame();
        }
        else {
            this.currPlayerID = (this.currPlayerID + 1) % 4;
            if (this.currPlayerID == 0) {
                GameData._i().player[this.currPlayerID].showcallbtn(true);
            }
            else {
                //AI 叫牌
                if (GameData._i().player[this.currPlayerID].getHandcardnumber() >= RandomUtils.limitInteger(17, 21) || GameData._i().player[this.currPlayerID].getHandcardnumber() == 0) {
                    egret.setTimeout(this.nextplayercall, this, 500);
                }
                else {
                    egret.setTimeout(function () {
                        _this.sendcard(false);
                    }, this, 500);
                }
            }
        }
    };
    //清算
    GameScene.prototype.caculateGame = function () {
        //计算庄家手牌点数
        var bankercardnumber = GameData._i().player[this.bankerID].getHandcardnumber();
        var banker = GameData._i().player[this.bankerID];
        for (var i = 0; i < 4; i++) {
            var player = GameData._i().player[i];
            if (!player.getBanker()) {
                var playercardnumber = player.getHandcardnumber();
                if (playercardnumber > bankercardnumber) {
                    var betnumber = player.betgold;
                    banker.gold -= betnumber;
                    banker.updatagold();
                    player.gold += (betnumber * 2);
                    //player.betgold = 0;
                    player.updatagold();
                    player.isWin = JUDEWIN.WIN;
                    GameData._i().bankerwinCount -= betnumber;
                }
                else if (playercardnumber == bankercardnumber) {
                    player.gold += player.betgold;
                    //player.betgold = 0;
                    player.updatagold();
                    player.isWin = JUDEWIN.DRAW;
                }
                else {
                    var betnumber = player.betgold;
                    banker.gold += betnumber;
                    banker.updatagold();
                    //player.betgold = 0;
                    player.updatagold();
                    player.isWin = JUDEWIN.LOST;
                    GameData._i().bankerwinCount += betnumber;
                }
            }
        }
        if (GameData._i().bankerwinCount < 0) {
            GameData._i().player[this.bankerID].isWin = JUDEWIN.LOST;
        }
        else if (GameData._i().bankerwinCount == 0) {
            GameData._i().player[this.bankerID].isWin = JUDEWIN.DRAW;
        }
        else {
            GameData._i().player[this.bankerID].isWin = JUDEWIN.WIN;
        }
        // this.restart();
        // this.gameover();
        this.showallcard();
    };
    GameScene.prototype.showallcard = function () {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < GameData._i().player[i].handcardarr.length; j++) {
                var card = GameData._i().player[i].handcardarr[j];
                card.showfront();
            }
        }
        egret.setTimeout(this.gameover, this, 2500);
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
        var _this = this;
        console.log("GameOver");
        for (var i = 0; i < 4; i++) {
            var _loop_1 = function (j) {
                var card = GameData._i().player[i].handcardarr[j];
                egret.Tween.get(card).to({ x: this_1.mStageW / 2, y: this_1.mStageH / 2 }, 300).call(function () {
                    _this.removeChild(card);
                }, this_1);
            };
            var this_1 = this;
            for (var j = 0; j < GameData._i().player[i].handcardarr.length; j++) {
                _loop_1(j);
            }
            GameData._i().player[i].handcardarr = [];
            GameData._i().player[i].setBanker(false);
        }
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
        GameData._i().bankerwinCount = 0;
        for (var i = 0; i < 54; i++) {
            this.cardarr[i] = i + 1;
        }
        for (var i = 0; i < 4; i++) {
            GameData._i().player[i].betgold = 0;
            GameData._i().player[i].updatagold();
        }
        this.bankerID = RandomUtils.limitInteger(0, 3);
        GameData._i().bankerID = this.bankerID;
        GameData._i().player[this.bankerID].setBanker(true);
        this.currPlayerID = (this.bankerID + 1) % 4;
        this.downtime = 3;
        this.startdown();
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
//# sourceMappingURL=GameScene.js.map