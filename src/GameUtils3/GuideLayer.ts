/**
 * Created by pior on 16/12/19.
 */

/**
 * 新手引导页面
 */
class GuideLayer extends GameUtil.BassPanel {
    /** 步数 */
    public guidestep: number;

    public constructor() {
        super();
    }

    public init() {
        this.guidestep = 0;
        GameConfig._i().bguidedone = false;

        this.touchEnabled = true;

        var coversp: egret.Shape = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 0.6);
        coversp.name = 'coversp';
        this.addChild(coversp);

        this.creatstepthing();

        this.tipframe = new MyBitmap(RES.getRes('guidetipframe_png'), 0, 0);
        this.addChild(this.tipframe);
        this.hand = new MyBitmap(RES.getRes('guidehand_png'), 0, 0);
        this.addChild(this.hand);
        this.tiptext = new GameUtil.MyTextField(0, 0, 30, 0, 0);
        this.tiptext.setText('');
        this.tiptext.textColor = 0x007aa6;
        this.tiptext.width = 346;
        this.addChild(this.tiptext);


        this.Guidestep();
    }
    /**创建引导物（高亮） */
    private creatstepthing() {

    }
    /**引导手指图 */
    private hand: MyBitmap;
    /**引导提示框 */
    private tipframe: MyBitmap;
    /**提示框文字 */
    private tiptext: GameUtil.MyTextField;
    /**引导步骤 */
    private Guidestep() {
        var step = this.guidestep;

        switch (step) {
            case 0:
                this.tipframe.x = this.mStageW / 2;
                this.tipframe.y = this.mStageH - 550;
                GameUtil.relativepos(this.hand, this.tipframe, 237, 234);
                GameUtil.relativepos(this.tiptext, this.tipframe, 70, 36);
                this.tiptext.text = '在摇杆范围内滑动手指可使角色四向移动，点击中间位置可施放炸弹.';
                break;
            case 1:
                this.tiptext.text = '点击屏幕任意地方继续游戏。';
                var self: any = this;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    self.checkdone();
                }, this);
                break;
        }
    }
    /**检查引导结果 */
    public checkdone() {
        this.guidestep++;
        //console.log('guidestep====',this.guidestep);

        if (this.guidestep != GameConfig.GUIDESTEPNUM) {
            this.Guidestep();
        }
        else {
            GameConfig._i().bguidedone = true;
            //这里有一步做正式开始游戏的函数
            this.removeChildren();
            this.parent.removeChild(this);
            GuideLayer.remove();
        }
    }

    private static remove() {
        this._inst = null;
    }

    private static _inst: GuideLayer = null;

    public static _i(): GuideLayer {
        return (this._inst = (this._inst == null ? new GuideLayer() : this._inst));
    }

}