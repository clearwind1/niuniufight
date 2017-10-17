/**
 * Created by pior on 16/12/6.
 */
class MySound {
    private sound: egret.Sound;
    private soundchannel: egret.SoundChannel;
    private isadddone: boolean = false;
    public soundtype: string;

    public constructor(soundname: string) {
        this.init(soundname);
    }

    private init(soundname: string) {
        this.sound = new egret.Sound();
        var self: any = this;
        this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
            self.isadddone = true;
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/sound/" + soundname);
    }

    public play(startTime: number = 0, loops: number = 1) {
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

    }

    public stop() {
        if (this.soundchannel)
            this.soundchannel.stop();
    }

    public setvolume(vaule) {
        if (this.soundchannel) {
            this.soundchannel.volume = vaule;
        }
    }

}