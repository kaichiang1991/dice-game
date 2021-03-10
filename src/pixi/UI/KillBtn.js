import { Container, Graphics, Text } from "pixi.js";

export default class KillBtn extends Container{

    init(pos){
        this.bg = new Graphics()
        .beginFill(0xFF0000)
        .drawCircle(0, 0, 100)
        .endFill()

        this.text = new Text('殺！')
        this.text.position.set(0, -30)
        this.text.anchor.set(.5)
        
        this.addChild(this.bg, this.text)
        this.position.set(...pos)

        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        this.interactive = this.buttonMode = true
        this.on('pointerdown', ()=>{
            window.dispatchEvent(new CustomEvent('newUnit', {detail:{
                type: ~~(Math.random() * 5)
            }}))
        })
    }
}