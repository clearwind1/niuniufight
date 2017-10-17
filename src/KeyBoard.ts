
enum KEYCODE {LEFT=37,UP,RIGHT,DOWN,SPACE=32};

class KeyBoard {
	private keyinfo: any[];
	public constructor() {
		this.init();
	}
	private init() {
		this.keyinfo = [];

		window.addEventListener('keydown', (e) => {
			this.run(e.keyCode);
        }, false);
	}

	public bindfun(target, fun: Function, keycode: KEYCODE) {
		let info = { target: target, fun: fun, keycode: keycode };
		this.keyinfo.push(info);
	}
	private run(keycode) {
		for (let i: number = 0; i < this.keyinfo.length; i++){
			if (this.keyinfo[i].keycode == keycode) {
				let fun: Function = <Function>this.keyinfo[i].fun;
				fun.apply(this.keyinfo[i].target);
				break;
			}
		}
	}

	private static _instance: KeyBoard = null;
    public static _i(): KeyBoard {
        if (this._instance == null) {
            this._instance = new KeyBoard();
        }

        return this._instance;
    }
}