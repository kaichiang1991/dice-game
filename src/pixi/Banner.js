import { Container, Graphics, Text } from "pixi.js";

export default class Banner extends Container{

    init(bgColor, txt){
        
        this.bg = new Graphics()
        .beginFill(bgColor, .3)
        .drawRoundedRect(0, 0, 720, 100, 10)
        .endFill()

        this.txt = new Text(txt)

        this.addChild(this.bg, this.txt)
        return this
    }
}