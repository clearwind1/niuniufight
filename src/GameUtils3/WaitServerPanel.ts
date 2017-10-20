/**
 * 等待响应
 * Created by pior on 15/11/11.
 */

module GameUtil {
    export class WaitServerPanel extends egret.DisplayObjectContainer {

        private coverBg: egret.Shape;
        public constructor() {
            super();
            this.init();
        }
        public wainttext: GameUtil.MyTextField;
        private init(): void {
            this.coverBg = GameUtil.createRect(0, 0, GameConfig.getSW(), GameConfig.getSH(), 0.3, 0x000000);
            this.addChild(this.coverBg);

            this.touchEnabled = true;

            this.wainttext = new GameUtil.MyTextField(GameConfig.getSW() / 2, GameConfig.getSH() / 2, 30, 0.5, 0.5);
            this.wainttext.setText('请等待其他玩家下注');
            this.wainttext.textColor = 0x3399fe;
            this.addChild(this.wainttext);
        }

        public setAlpha(aplha: number): void {
            this.coverBg.alpha = aplha;
        }


        private static _instance: WaitServerPanel;
        public static getInstace(): WaitServerPanel {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel();
            }

            return this._instance;
        }

    }
}