import { Container, Graphics, Text } from "pixi.js";

export default class Btn extends Container{

    constructor(txt){
        super()
        this.bg = new Graphics()
        .beginFill(0xDD0000, .5)
        .drawRoundedRect(0, 0, 100, 50, 5)
        .endFill()

        this.text = new Text(txt)
        this.text.anchor.set(.5)
        this.text.position.set(50, 25)

        this.addChild(this.bg, this.text)
    }
}