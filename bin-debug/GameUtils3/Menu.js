var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 菜单，按钮类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    /*
     *创建按钮
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * 创建菜单按钮类
         * @param context {any} 按钮所在stage
         * @param normal {string} 按钮普通状态下的图片文件名
         * @param select {string} 按钮选中状态下的图片文件名
         * @param backFun {Function} 按钮绑定的事件函数
         * @param param {any[]} 按钮绑定的事件函数的参数
         */
        function Menu(context, normal, select, backFun, param) {
            if (backFun === void 0) { backFun = null; }
            if (param === void 0) { param = null; }
            var _this = _super.call(this) || this;
            _this.menuNormalTexture = null;
            _this.menuSelectTexture = null;
            _this.bScaleMode = false;
            _this.mScale = 0.9;
            _this.isActive = false;
            _this.thisObj = context;
            _this.param = param;
            _this.init(normal, select, backFun);
            return _this;
        }
        Menu.prototype.init = function (normal, select, backFun) {
            if (backFun === void 0) { backFun = null; }
            this.btnsound = null;
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new MyBitmap(this.menuNormalTexture, 0, 0);
            this.addChild(this.btnImg);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.TouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.TouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.TouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.TouchCancel, this);
        };
        Menu.prototype.setBackFun = function (backFun) {
            this.backFun = backFun;
        };
        /**设置按钮音效 */
        Menu.prototype.setBtnSound = function (btnsound) {
            this.btnsound = btnsound;
        };
        /**
         * 设置按钮的缩放模式，按钮状态只做缩放时可使用
         * @param scale {number} 缩放大小
         */
        Menu.prototype.setScaleMode = function (scale) {
            if (scale === void 0) { scale = 0.9; }
            this.bScaleMode = true;
            this.mScale = scale;
        };
        /**
         * 设置按钮图片
         * @param normal
         * @param select
         */
        Menu.prototype.setButtonTexture = function (normal, select) {
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.btnImg.setNewTexture(this.menuNormalTexture);
        };
        /**
         * 给按钮添加图片
         * @img 图片资源名
         */
        Menu.prototype.addButtonImg = function (img, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            this.addImg = new MyBitmap(RES.getRes(img), offx, offy);
            this.addChild(this.addImg);
        };
        Menu.prototype.setAddImgTexture = function (img) {
            this.addImg.setNewTexture(RES.getRes(img));
        };
        /**
         * 给按钮添加文字
         * @text 文字内容
         * @size 文字大小
         */
        Menu.prototype.addButtonText = function (text, size, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            if (this.btnImg.texture != null) {
                //console.log("fdsafdsafdsa=====",this.btnImg.texture.$getTextureWidth()/2);
                this.mTextField = new GameUtil.MyTextField(offx, offy, size); //createTextField(this.btnImg.texture.$getTextureWidth()/2+offx,this.btnImg.texture.$getTextureHeight()/2+offy,20);
            }
            else {
                this.mTextField = new GameUtil.MyTextField(offx, offy, size);
            }
            this.mTextField.setText(text);
            this.addChild(this.mTextField);
        };
        Menu.prototype.addButtonShap = function (shap, offx, offy) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            shap.x += offx;
            shap.y += offy;
            this.addChild(shap);
        };
        Menu.prototype.getBtnText = function () {
            return this.mTextField;
        };
        Menu.prototype.setBtnScale = function (scaleX, scaleY) {
            this.btnImg.scaleX = scaleX;
            this.btnImg.scaleY = scaleY;
        };
        Menu.prototype.TouchBegin = function (event) {
            //console.log("touchbegin");
            if (this.btnsound) {
                this.btnsound.play();
            }
            this.btnImg.setNewTexture(this.menuSelectTexture);
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = this.mScale;
            }
            this.isActive = true;
        };
        Menu.prototype.TouchMove = function (event) {
            //console.log("touchmove");
        };
        Menu.prototype.TouchEnd = function (event) {
            //console.log("touchend");
            this.btnImg.setNewTexture(this.menuNormalTexture);
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = 1;
            }
            if (this.isActive) {
                this.backFun.apply(this.thisObj, this.param);
            }
            this.isActive = false;
        };
        Menu.prototype.TouchCancel = function (event) {
            //console.log("touchcancel");
            this.btnImg.setNewTexture(this.menuNormalTexture);
            if (this.bScaleMode) {
                this.scaleX = this.scaleY = 1;
            }
            this.isActive = false;
        };
        return Menu;
    }(egret.DisplayObjectContainer));
    GameUtil.Menu = Menu;
    __reflect(Menu.prototype, "GameUtil.Menu");
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=Menu.js.map