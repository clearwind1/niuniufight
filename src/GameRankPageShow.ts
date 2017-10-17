/**
 * Create by hardy on 16/12/21
 * 游戏排行榜页面
 */

enum RankName { Totlerank, Levlerank, Heightrank, End };

class Ranksprite {
    public constructor() {
        this.init();
    }
    public rankarr: number;
    public ranklevel: number;
    public rankheight: number;
    public sxdid: number;
    private init() {
    }
}

class GameRankPageShow extends Othercontainer {
    public constructor() {
        super();
    }

    private rankcon: egret.DisplayObjectContainer;
    private curselect: RankName;
    private rankselect: MyBitmap;
    private ranklish: Ranksprite[];

    protected show() {
        this.ranklish = [];
        this.curselect = RankName.Totlerank;

        for (var i: number = 0; i < 20; i++) {
            var hrd: number = RandomUtils.limitInteger(6, 18);
            var rankheight: number = 20 + (hrd - 2) * ((hrd - 3) * 5 + 25);
            var lrd: number = RandomUtils.limitInteger(6, 14);
            var rd: number = RandomUtils.limitInteger(10,170)*10;
            this.ranklish[i] = new Ranksprite();
            this.ranklish[i].rankarr = rd;
            this.ranklish[i].ranklevel = lrd;
            this.ranklish[i].rankheight = rankheight;
            this.ranklish[i].sxdid = i + 1;
        }

        var param: Object = {
            'code': 1
        }
        //GameUtil.Http.getinstance().send(param, "/" + GameConfig.SERVERNAME + "/getrank", this.getRank, this);
        this.getRank(param);
    }

    private getRank(rankdata: any) {
        if (rankdata['code'] == 1) {
            //var result = rankdata['result'];

            var rankbg: MyBitmap = new MyBitmap(RES.getRes('rankbg_png'), this.mStageW / 2, this.mStageH / 2);
            this.addChild(rankbg);
            var rankname: MyBitmap = new MyBitmap(RES.getRes('ranktext_png'), 360, 66, rankbg);
            this.addChild(rankname);

            var btntextname: string[] = ['总分排行', '关卡排行', '最大连击排行'];
            for (var i: number = 0; i < btntextname.length; i++) {
                var rankbtn: GameUtil.Menu = new GameUtil.Menu(this, 'rankname_png', 'rankname_png', this.showrankcon, [rankbg, i]);
                this.addChild(rankbtn);
                GameUtil.relativepos(rankbtn, rankbg, 122, 153 + i * 127);
            }
            this.rankselect = new MyBitmap(RES.getRes('rankselect_png'), 122, 153 + this.curselect * 127, rankbg);
            this.addChild(this.rankselect);

            for (var i: number = 0; i < 3; i++) {
                var btntext: GameUtil.MyTextField = new GameUtil.MyTextField(0, 0, 25);
                btntext.setText(btntextname[i]);
                btntext.textColor = 0xffffff;
                btntext.bold = true;
                this.addChild(btntext);
                GameUtil.relativepos(btntext, rankbg, 122, 153 + i * 127);
            }

            this.rankcon = new egret.DisplayObjectContainer();
            this.addChild(this.rankcon);
            
            this.showrankcon(rankbg, RankName.Totlerank);

            var close: GameUtil.Menu = new GameUtil.Menu(this, 'closebtn_png', 'closebtn_png', this.close);
            this.addChild(close);
            GameUtil.relativepos(close, rankbg, 664, 25);
        }
        else {
            GameUtil.trace(rankdata['msg']);
        }
    }

    private showrankcon(rankbg: any, btnid: number) {
        this.curselect = btnid;
        GameUtil.relativepos(this.rankselect, rankbg, 122, 153 + this.curselect * 127);
        this.rankcon.removeChildren();

        var rankscore: string = '';
        switch (this.curselect) {
            case RankName.Totlerank:
                
                this.ranklish.sort(function (a, b) {
                    return b.rankarr - a.rankarr;
                });
                break;
            case RankName.Levlerank:
                
                this.ranklish.sort(function (a, b) {
                    return b.ranklevel - a.ranklevel;
                });
                break;
            case RankName.Heightrank:
                
                this.ranklish.sort(function (a, b) {
                    return b.rankheight - a.rankheight;
                });
                break;
        }


        var rankcontainsv: GameUtil.ScrollView = new GameUtil.ScrollView(390, 310);
        this.rankcon.addChild(rankcontainsv);
        GameUtil.relativepos(rankcontainsv, rankbg, 240, 130);
        //console.log('result====', result.length);
        for (var i: number = 0; i < 20; i++) {
            var coverb: MyBitmap = new MyBitmap(RES.getRes('rankline_png'), 190, 15 + i * 50);
            rankcontainsv.putItem(coverb);

            var ranknt: GameUtil.MyTextField = new GameUtil.MyTextField(20, 15 + i * 50, 30);
            ranknt.setText((i + 1) + '');
            ranknt.textColor = 0xffffff;
            rankcontainsv.putItem(ranknt);

            var playname: GameUtil.MyTextField = new GameUtil.MyTextField(170, 15 + i * 50, 30, 0.5);
            playname.setText('sxd-' + this.ranklish[i].sxdid);
            playname.textColor = 0xffffff;
            rankcontainsv.putItem(playname);

            switch (this.curselect) {
                case RankName.Totlerank:
                    rankscore = '' + this.ranklish[i].rankarr;
                    break;
                case RankName.Levlerank:
                    rankscore = this.ranklish[i].ranklevel + '关';
                    break;
                case RankName.Heightrank:
                    rankscore = '' + this.ranklish[i].rankheight;
                    break;
            }
            var playscore: GameUtil.MyTextField = new GameUtil.MyTextField(370, 15 + i * 50, 30, 1);
            playscore.setText(rankscore);
            playscore.textColor = 0xffffff;
            rankcontainsv.putItem(playscore);
        }
    }

}