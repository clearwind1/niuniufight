
/**
 * 玩家类
 */
enum JUDEWIN { LOST, WIN, DRAW };
class Player extends egret.DisplayObjectContainer {
	private headimg: MyBitmap;				//头像
	public gold: number;					//金币
	public betgold: number;					//赌注
	public handcardarr: CardSprite[];		//手牌
	private isBanker: boolean;				//是否庄家
	public isAI: boolean;
	private handcardnumber: number;
	public isWin: number;				//是否赢过庄家
	public winbet: number;				//赢的赌注
	public constructor() {
		super();
		this.initdata();
		this.showhead();
		this.showgold();
		this.addcallbtn();
	}
	private initdata() {
		this.handcardarr = [];
		this.isBanker = false;
		this.isAI = false;
		this.isWin = JUDEWIN.LOST;
		this.gold = 10000;
		this.betgold = 0;
		this.handcardnumber = 0;
		this.winbet = 0;
	}
	private showhead() {
		this.headimg = new MyBitmap(RES.getRes('head1_png'), 0, 0);
		this.addChild(this.headimg);
	}
	public setBanker(b) {
		this.isBanker = b;
		if (b) {
			this.showbanker();
		}
		else {
			if (this.bankcont != null) {
				this.removeChild(this.bankcont);
				this.bankcont = null;
			}
		}
	}
	public getBanker(): boolean {
		return this.isBanker;
	}
	//设为庄家
	private bankcont: egret.Sprite = null;
	private showbanker() {
		this.bankcont = new egret.Sprite();
		this.bankcont.graphics.beginFill(0x38aecc, 1);
		this.bankcont.graphics.drawCircle(0, 0, 30);
		this.bankcont.graphics.endFill();
		this.addChild(this.bankcont);
		let t: GameUtil.MyTextField = new GameUtil.MyTextField(0, 0, 25, 0.5, 0.5);
		t.setText('庄');
		this.bankcont.addChild(t);
		this.bankcont.x = 54;
		this.bankcont.y = -45;
	}
	//显示金币
	private totalgoldt: GameUtil.MyTextField;
	private betgoldt: GameUtil.MyTextField;
	private showgold() {
		this.totalgoldt = new GameUtil.MyTextField(-140, -20, 20, 0, 0);
		this.totalgoldt.setText('总:' + this.gold);
		this.addChild(this.totalgoldt);
		this.betgoldt = new GameUtil.MyTextField(-140, 20, 20, 0, 0);
		this.betgoldt.setText('押:' + this.betgold);
		this.addChild(this.betgoldt);
	}
	//更新金币 
	public updatagold() {
		this.totalgoldt.setText('总:' + this.gold);
		this.betgoldt.setText('押:' + this.betgold);
	}
	//叫牌按钮
	private callbtncont: egret.Sprite = null;
	private addcallbtn() {
		this.callbtncont = new egret.Sprite();
		this.addChild(this.callbtncont);
		this.callbtncont.visible = false;

		var fun = this.wantcard;
		var btn = new GameUtil.Menu(this, '', '', fun);
		btn.setScaleMode();
		btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
		btn.addButtonText('要   牌', 30);
		this.callbtncont.addChild(btn);
		btn.x = 200;
		btn.y = -140;

		var fun = this.passcard;
		var btn = new GameUtil.Menu(this, '', '', fun);
		btn.setScaleMode();
		btn.addButtonShap(GameUtil.createRect(0, 0, 200, 40, 1, 0x3399fe, 20, 30), -100, -20);
		btn.addButtonText('不   要', 30);
		this.callbtncont.addChild(btn);
		btn.x = 500;
		btn.y = -140;
	}

	private wantcard() {
		let gamescene: GameScene = <GameScene>this.parent;
		gamescene.sendcard(false);
	}
	private passcard() {
		let gamescene: GameScene = <GameScene>this.parent;
		gamescene.nextplayercall();
	}

	public showcallbtn(bshow: boolean) {
		this.callbtncont.visible = bshow;
	}

	public updatahandcardnumber() {
		this.handcardnumber = 0;
		for (let i: number = 0; i < this.handcardarr.length; i++) {
			let card: CardSprite = <CardSprite>this.handcardarr[i];
			let cardnumber = 0;
			if (card.cardnumber >= 10) {
				cardnumber = 10;
			} else {
				cardnumber = card.cardnumber;
			}
			this.handcardnumber += cardnumber;
		}
		this.handcardnumber = (this.handcardnumber > 21) ? 0 : this.handcardnumber;
	}

	public getHandcardnumber(): number {
		return this.handcardnumber;
	}
}