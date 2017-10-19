var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by pior on 16/12/6.
 */
var MySound = (function () {
    function MySound(soundname) {
        this.isadddone = false;
        this.init(soundname);
    }
    MySound.prototype.init = function (soundname) {
        this.sound = new egret.Sound();
        var self = this;
        this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            self.isadddone = true;
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/sound/" + soundname);
    };
    MySound.prototype.play = function (startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 1; }
        //alert('isread');
        if (this.soundtype == egret.Sound.EFFECT && !GameConfig._i().bgamesound) {
            return;
        }
        //alert('isplay');
        var tsound = this.sound;
        if (this.isadddone) {
            //alert('isdone');
            this.soundchannel = tsound.play(startTime, loops);
        }
    };
    MySound.prototype.stop = function () {
        if (this.soundchannel)
            this.soundchannel.stop();
    };
    MySound.prototype.setvolume = function (vaule) {
        if (this.soundchannel) {
            this.soundchannel.volume = vaule;
        }
    };
    return MySound;
}());
__reflect(MySound.prototype, "MySound");
//# sourceMappingURL=MySound.js.map