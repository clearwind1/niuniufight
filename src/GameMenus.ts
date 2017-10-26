
enum DisType { NULL, TopTDown, DownTTop, LeftTRight, RightTLeft, Alpha, End };
class GameMenus extends GameUtil.BassPanel {
	private showtype: DisType;
	public constructor(showtype: DisType) {
		super([showtype]);
	}
	public init(showtype) {
		this.showtype = showtype;
		this.show();
	}
	private show() {
		var posx = this.mStageW / 2;
		var posy = this.mStageH / 2;
		//菜单背景色
		var shap: egret.Shape = GameUtil.createRect(posx, posy+30, 400, 450, 0.8, 0x69c898);
		shap.$setAnchorOffsetX(shap.width / 2);
		shap.$setAnchorOffsetY(shap.height / 2);
		this.addChild(shap);
		//菜单背景图
		var menubgimg = new MyBitmap(RES.getRes(''), posx, posy);
		this.addChild(menubgimg);

		let btnfun: Function[] = [this.startgame, this.howtoplay, this.setting, this.about];
		let btnName: string[] = ['开      始', '玩      法', '设      置', '关      于'];
		for (let i: number = 0; i < 4; i++) {
			var btnname = btnName[i];
			var fun = btnfun[i];
			var btn = new GameUtil.Menu(this, '', '', fun);
			btn.setScaleMode();
			btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
			btn.addButtonText(btnname, 30);
			this.addChild(btn);
			btn.x = posx;
			btn.y = 80 + posy + (i - 2) * 100;
		}

		GameUtil.doAction(this, this.showtype);

	}
	private startgame() {
		GameUtil.GameScene.runscene(new GameScene());
	}
	private howtoplay() {
		this.createMask();
		var posx = this.mStageW / 2;
		var posy = this.mStageH / 2;
		var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
		text.setText('\n玩法介绍:\n每个玩家起手两张牌，可以随意补牌（最多补到五张）\n手牌加起来最大是21点，超过则爆掉为0点');
		text.textColor = 0xcbeaa0;
		text.width = this.mStageW - 100;
		this.maskscene.addChild(text);
	}
	private setting() {
		this.createMask();
		var posx = this.mStageW / 2;
		var posy = this.mStageH / 2;
		var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
		text.setText('\n游戏设置:\n');
		text.textColor = 0xcbeaa0;
		text.width = this.mStageW - 100;
		this.maskscene.addChild(text);
	}
	private about() {
		this.createMask();
		var posx = this.mStageW / 2;
		var posy = this.mStageH / 2;
		var text = new GameUtil.MyTextField(50, 50, 30, 0, 0.5);
		text.setText('关于游戏:');
		text.textColor = 0xcbeaa0;
		text.width = this.mStageW - 100;
		this.maskscene.addChild(text);
	}
	private maskscene: egret.DisplayObjectContainer;
	private createMask() {
		this.maskscene = new egret.DisplayObjectContainer();
		this.addChild(this.maskscene);
		this.maskscene.$setTouchEnabled(true);

		var shap: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0x000000);
		this.maskscene.addChild(shap);

		var posx = this.mStageW / 2;
		var posy = this.mStageH / 2;
		var btnname = '返        回';
		var fun = () => {
			this.removeChild(this.maskscene);
		};
		var btn = new GameUtil.Menu(this, '', '', fun);
		btn.setScaleMode();
		btn.addButtonShap(GameUtil.createRect(0, 0, 300, 60, 1, 0x3399fe, 40, 50), -150, -30);
		btn.addButtonText(btnname, 30);
		this.maskscene.addChild(btn);
		btn.x = posx;
		btn.y = this.mStageH - 100;
	}
}