/**
 * Created by pior on 15/12/30.
 */
module GameUtil {
    export class InputTextFiled extends GameUtil.MyTextField {
        private baseText: string;
        private baseTextAlpha: number;
        private basetextsize: number;
        private sourcesize: number;
        private ispassword: boolean;
        private sourceText: string;

        public constructor(x: number, y: number, size: number, width: number, height: number, anchorX: number = 0.5, anchorY: number = 0.5) {
            super(x, y, size, anchorX, anchorY);
            this.width = width;
            this.height = size;
            this.type = egret.TextFieldType.INPUT;
            this.baseText = "";
            this.sourceText = "";
            this.ispassword = false;

            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            this.addEventListener(egret.TextEvent.CHANGE, this.change, this);
        }

        public setPassword() {
            //this.ispassword = true;
        }

        public setBaseText(basetext: string, alpha: number) {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.setText(this.baseText);
            this.alpha = this.baseTextAlpha;

            //console.log("height=====",this.anchorOffsetY);
        }

        public setBaseTextSize(size: number, sourcesize: number) {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            if (this.text == this.baseText) {
                this.setSize(this.basetextsize);
                this.height = size;
            }
        }

        public getText(): string {
            return this.sourceText;
        }

        private onFocusIn(event: egret.FocusEvent): void {
            //console.log("focusein");
            if (this.text == this.baseText) {
                this.setText("");
                this.height = this.sourcesize;
                this.setSize(this.sourcesize);
                this.alpha = 1;
            }
        }

        private onFocusOut(event: egret.FocusEvent): void {
            //console.log("focuseout");
            if (this.text == "") {
                this.setText(this.baseText);
                this.alpha = this.baseTextAlpha;
                this.height = this.basetextsize;
                this.setSize(this.basetextsize);
            }
            //console.log("outheight=====",this.anchorOffsetY);
        }
        private change(event: egret.TextEvent) {
            
            let text: string = event.currentTarget.text;
            text = text[text.length - 1];

            if (text.length < this.sourceText.length) {
                 
            }

            this.sourceText += text;
            console.log(this.sourceText);
            this.text = "";
            for (let i: number = 0; i < this.sourceText.length; i++) {
                this.text += "*";
            }
        }
    }
}