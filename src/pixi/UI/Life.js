import gsap from "gsap/all";
import { Container, Graphics, utils } from "pixi.js";

export default class Life extends Container{

    init(){
        this.startImg = new Graphics()
        .lineStyle(2, 0xFF0000)
        .beginFill(0xDD0000)
        .drawStar(0, 0, 5, 20)
        .endFill()

        this.addChild(this.startImg)
        return this
    }

    async minus(){
        const config = {
            red: utils.hex2rgb(0xDD0000)[0],
            green: 0,
            blue: 0
        }

        await new Promise(res =>{
            gsap.to(config, {duration: .5, red: 1, green: 1, blue: 1, onUpdate: ()=>{
                this.startImg.clear()
                .lineStyle(2, 0xFF0000)
                .beginFill(utils.rgb2hex([config.red, config.green, config.blue]))
                .drawStar(0, 0, 5, 20)
                .endFill()
            }, onComplete: res})
        })
    }
}