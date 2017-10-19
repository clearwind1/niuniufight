var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KEYCODE;
(function (KEYCODE) {
    KEYCODE[KEYCODE["LEFT"] = 37] = "LEFT";
    KEYCODE[KEYCODE["UP"] = 38] = "UP";
    KEYCODE[KEYCODE["RIGHT"] = 39] = "RIGHT";
    KEYCODE[KEYCODE["DOWN"] = 40] = "DOWN";
    KEYCODE[KEYCODE["SPACE"] = 32] = "SPACE";
})(KEYCODE || (KEYCODE = {}));
;
var KeyBoard = (function () {
    function KeyBoard() {
        this.init();
    }
    KeyBoard.prototype.init = function () {
        var _this = this;
        this.keyinfo = [];
        window.addEventListener('keydown', function (e) {
            _this.run(e.keyCode);
        }, false);
    };
    KeyBoard.prototype.bindfun = function (target, fun, keycode) {
        var info = { target: target, fun: fun, keycode: keycode };
        this.keyinfo.push(info);
    };
    KeyBoard.prototype.run = function (keycode) {
        for (var i = 0; i < this.keyinfo.length; i++) {
            if (this.keyinfo[i].keycode == keycode) {
                var fun = this.keyinfo[i].fun;
                fun.apply(this.keyinfo[i].target);
                break;
            }
        }
    };
    KeyBoard._i = function () {
        if (this._instance == null) {
            this._instance = new KeyBoard();
        }
        return this._instance;
    };
    KeyBoard._instance = null;
    return KeyBoard;
}());
__reflect(KeyBoard.prototype, "KeyBoard");
//# sourceMappingURL=KeyBoard.js.map