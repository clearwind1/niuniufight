/**
 * Create by hardy on 16/12/21
 * 游戏帮助页面
 */
class GameHelpPageShow extends Othercontainer {

    private config: any;
    public constructor() {
        super();
    }

    protected show() {

        this.config = {
            totalpage: 0,
            curpage: 0,
            bg: '',
            posx: this.mStageW / 2,
            posy: this.mStageH / 2
        }        

        var self: any = this;
        /**总页数 */
        var helpPage: number = this.config['totalpage'];
        /**当前页 */
        var helpcurtag = this.config['curpage'];
        /**帮助背景 */
        var helpbg = new MyBitmap(RES.getRes(this.config['bg']), this.config['posx'], this.config['posy']);
        this.addChild(helpbg);
        helpbg.touchEnabled = true;

        var helptext: MyBitmap = new MyBitmap(RES.getRes('helptext_png'), 0, 0);
        this.addChild(helptext);
        GameUtil.relativepos(helptext, helpbg, 130, 67);
        /**帮助文字 */
        var hptext: GameUtil.MyTextField = new GameUtil.MyTextField(44, 113, 40, 0, 0);
        hptext.textColor = 0xb06d4d;
        hptext.width = 508;
        hptext.setText('1.点击两个相同水果即可完成一次消除。\n2.让相同的水果连在一起，越多越好。\n3.若最后剩余的水果少于10个，将得到额外加分，剩余越少，加分越多。');
        this.addChild(hptext);
        hptext.fontFamily = '华文行楷';
        hptext.lineSpacing = 5;
        GameUtil.relativepos(hptext, helpbg, 44, 113);

        // /**帮助内容 */
        // var helpcontain: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        // this.addChild(helpcontain);
        // /**帮助页标志(圆点) */
        // var pointpos: egret.Point = egret.Point.create(280, 290);
        // var pointdis: number = 85;
        // for (var i: number = 0; i < helpPage + 1; i++) {
        //     var helppagepoint: MyBitmap = new MyBitmap(RES.getRes('helppagepoint_png'));
        //     this.addChild(helppagepoint);
        //     GameUtil.relativepos(helppagepoint, helpbg, pointpos.x + pointdis * i, pointpos.y);
        // }
        // /**帮助当前页标志 */
        // var helpselect = new MyBitmap(RES.getRes('helpselect_png'));
        // this.addChild(helpselect);
        // GameUtil.relativepos(helpselect, helpbg, pointpos.x, pointpos.y)

        /**关闭按钮 */
        var close: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
        this.addChild(close);
        GameUtil.relativepos(close, helpbg, 579, 40);

        // /**切换逻辑 */
        // var startx: number = 0;
        // helpbg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt: egret.TouchEvent) {
        //     startx = evt.stageX;
        // }, this);
        // helpbg.addEventListener(egret.TouchEvent.TOUCH_END, function (evt: egret.TouchEvent) {
        //     var endx: number = evt.stageX;
        //     if (endx - startx >= 100) {
        //         helpcurtag = (++helpcurtag > helpPage) ? 0 : helpcurtag;
        //     }
        //     else if (startx - endx > 100) {
        //         helpcurtag = (--helpcurtag < 0) ? helpPage : helpcurtag;
        //     }
        //     self.helpcurcontain(helpcontain, helpbg, helpcurtag);
        //     GameUtil.relativepos(helpselect, helpbg, pointpos.x + pointdis * helpcurtag, pointpos.y);
        // }, this);

        // this.helpcurcontain(helpcontain, helpbg, 0);
    }
    /**
     * 帮助内容页面
     * @helpcontain 帮助容器
     * @helpbg      帮助背景图，主要用来定位
     * @curtag      帮助当前页数
     */
    private helpcurcontain(helpcontain: egret.DisplayObjectContainer, helpbg: MyBitmap, curtag: number) {
        helpcontain.removeChildren();

        var helptext: GameUtil.MyTextField = new GameUtil.MyTextField(0, 0, 40, 0, 0);
        helptext.setText('');
        helptext.setSize(50);
        helptext.width = 290;
        helpcontain.addChild(helptext);
        helptext.textColor = 0x906128;
        GameUtil.relativepos(helptext, helpbg, 280, 87);
        if (curtag == 0) {
            var hlepimg: MyBitmap = new MyBitmap(RES.getRes('help_controlimg_png'), 0, 0);
            helpcontain.addChild(hlepimg);
            GameUtil.relativepos(hlepimg, helpbg, 135, 140);
            helptext.text = '使用摇杆控制角色移动';
        }
        else if (curtag == 1) {
            var hlepimg: MyBitmap = new MyBitmap(RES.getRes('spear_png'), 0, 0);
            helpcontain.addChild(hlepimg);
            GameUtil.relativepos(hlepimg, helpbg, 110, 102);
            var bow: MyBitmap = new MyBitmap(RES.getRes('bow_png'), 0, 0);
            helpcontain.addChild(bow);
            GameUtil.relativepos(bow, helpbg, 110, 214);
            helptext.setSize(45);
            helptext.width = 340;
            helptext.text = '点击枪图标为近身攻击，弓箭为远程攻击。';
            GameUtil.relativepos(helptext, helpbg, 230, 87);
        }
        else if (curtag == 2) {
            helptext.setSize(40);
            helptext.width = 460;
            helptext.text = '小赵是无敌的，只需保护小朋友阿斗不被敌军攻击，直到撑到最后一秒。';
            GameUtil.relativepos(helptext, helpbg, 110, 87);
        }
    }

}    
