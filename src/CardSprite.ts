
/**
 * 牌类
 */
enum CardType { Black, Red, Club, Diamond, King, End };

class CardSprite extends egret.DisplayObjectContainer {
	private cardnumber: number;
	private cardtype: number;
	public constructor(cardnumber, cardtype) {
		super();
		this.cardnumber = cardnumber;
		this.cardtype = cardtype;
		this.showback();
	}
	private cardfront: MyBitmap;
	private cardback: MyBitmap;
	private showback() {
		var resname = this.gettypename(this.cardtype) + '-' + this.cardnumber + '_jpg';
		//console.log('resname===', resname);
		this.cardfront = new MyBitmap(RES.getRes(resname), 0, 0);
		this.cardfront.scaleX = 0;
		this.addChild(this.cardfront);

		this.cardback = new MyBitmap(RES.getRes('cardback_png'), 0, 0);
		this.addChild(this.cardback);
	}

	public showfront() {
		egret.Tween.get(this.cardback).to({ scaleX: 0 }, 250).call(() => {
			egret.Tween.get(this.cardfront).to({ scaleX: 1 }, 250);
		},this);
	}

	private gettypename(type): string {
		var typename = '';
		switch (type) {
			case CardType.Black:
				typename = 'B';
				break;
			case CardType.Red:
				typename = 'R';
				break;
			case CardType.Club:
				typename = 'C';
				break;
			case CardType.Diamond:
				typename = 'D';
				break;
			case CardType.King:
				typename = 'K';
				break;
			default:
				typename = 'B';
				break;
		}
		return typename;
	}
}