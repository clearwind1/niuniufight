/**
 * 创建图片
 * Created by pior on 16/1/19.
 */
class MyBitmap extends egret.Bitmap {
    public constructor(texture: egret.Texture, posx: number = 0, posy: number = 0, target: any = null) {
        super();
        this.init(texture, posx, posy,target);
    }

    private init(texture: egret.Texture, posx: number, posy: number, target: any) {
        this.texture = texture;
        this.$setX(posx);
        this.$setY(posy);

        this.setanchorOff(0.5, 0.5);
        if (target != null) {
            GameUtil.relativepos(this, target, posx, posy);
        }
    }

    public setNewTexture(texture: egret.Texture) {
        this.texture = texture;
        //this.setanchorOff(0.5,0.5);
    }

    public setanchorOff(anchorx: number, anchory: number) {
        this.anchorOffsetX = this.$getWidth() * anchorx;
        this.anchorOffsetY = this.$getHeight() * anchory;
    }
}