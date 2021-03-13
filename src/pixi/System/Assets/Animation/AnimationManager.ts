import { Spritesheet, Texture, AnimatedSprite } from "pixi.js"
import { app } from "../../../../App"
import FireManImg from '../../../../assets/FireMan.png'
import FireManJson from '../../../../assets/FireMan.json'
import LoadingImg from '../../../../assets/Loading.png'
import LoadingJson from '../../../../assets/Loading.json'

export default class AnimationManager{

    private static readonly animationLists: {[key: string]: {img, atlas}} = {
        'FireMan': {img: FireManImg, atlas: FireManJson},
        'Loading': {img: LoadingImg, atlas: LoadingJson}
    }

    /** 讀取所有動畫的資源 */
    public static async loadAnimations(){        
        await new Promise<void>(res =>{
            app.loader
            .add(Object.values(this.animationLists).map(value => value.img))
            .load(async () =>{
                const allPromise: Array<Promise<void>> = Object.values(this.animationLists).map(value => new Promise<void>(res => new Spritesheet(Texture.from(value.img).baseTexture, value.atlas).parse(res)))
                await Promise.all(allPromise)
                res()
            })
        })

    }

    /**
     * 撥放指定動畫
     * @param parent 父容器
     * @param spriteName 圖集名稱
     * @param animName 動畫名稱
     * @param _config 自訂的動畫參數
     * @returns 撥放的動畫組件
     */
    public static playAnimation(parent, key, animName = key){
        const animSprite = new AnimatedSprite(this.animationLists[key].atlas.animations[animName].map(frame => Texture.from(frame)))
        animSprite.play()
        animSprite.animationSpeed = .3
        parent.addChild(animSprite)

        return animSprite

        // const sp = await Sprite.from(FireMan.animations['fireMan'][0])

        // const sp = await Sprite.from(FireMan)
        // console.log('sp', sp)
        // stage.addChild(sp)
        // sp.position.set(200, 200)
        // const animSp = new AnimatedSprite(Texture.from())
        // let res = await AssetLoader.getAsset(url)
        // let animatedSprite: AnimatedSprite = new AnimatedSprite(Object.values(res.textures))
        
        // let _pos: Point = new Point(0), _anchor: Point = new Point(.5, .5), _animSpeed: number = 1, _loop: boolean = true, _callback: Function
        // if(_config){
        //     _config.pos && (_pos = _config.pos)
        //     _config.anchor && _config.anchor.copyTo(_anchor);
        //     (_config.animSpeed != null) && (_animSpeed = _config.animSpeed);
        //     (_config.loop != null) && (_loop = _config.loop);
        //     _config.completeCallback && (animatedSprite.onComplete = ()=> _config.completeCallback())
        // }

        // _pos.copyTo(animatedSprite.position)
        // _anchor.copyTo(animatedSprite.anchor)
        // animatedSprite.animationSpeed = _animSpeed
        // animatedSprite.loop = _loop

        // parent.addChild(animatedSprite)
        // return animatedSprite
    }
}