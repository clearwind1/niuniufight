
/**
 * 玩家类
 */

class Player extends egret.DisplayObjectContainer {
	private headimg: MyBitmap;
	public handcardarr: CardSprite[];
	public constructor() {
		super();
		this.initdata();
		this.showhead();
	}
	private initdata() {
		this.handcardarr = [];
	}
	private showhead() {
		this.headimg = new MyBitmap(RES.getRes('head1_png'), 0, 0);
		this.addChild(this.headimg);
	}
}