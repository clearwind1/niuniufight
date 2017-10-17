/**
 * Create by hardy on 16/12/21
 * 游戏分享提示页面
 */
class SharePageShow extends Othercontainer {
    public constructor() {
        super();
    }

    protected show() {
        var self: any = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.close();
        }, this);

        var sharetip: MyBitmap = new MyBitmap(RES.getRes('sharetip_png'), this.mStageW, 0);
        sharetip.setanchorOff(1, 0);
        this.addChild(sharetip);
    }

}