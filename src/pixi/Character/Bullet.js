import gsap from "gsap/all";
import { Container, Graphics } from "pixi.js";
import { app } from "../../App";

export default class Bullet extends Container{

    init(atk){
        this.bulletGp = new Graphics()
        .beginFill(0x00AAAA)
        .drawRoundedRect(0, 0, 5, 20, 3)
        .endFill()

        this.addChild(this.bulletGp)

        this.atk = atk
        return this
    }

    shoot(unit, enemy){
        const {stage} = app

        this.rotation = Math.atan2(enemy.x - unit.x, unit.y - enemy.y)
        const shootTween = gsap.timeline()
        .call(() => this.setParent(stage))
        .fromTo(this, {x: unit.x, y: unit.y}, {duration: .5, x: enemy.x, y: enemy.y})


        .eventCallback('onUpdate', ()=>{
            if((enemy.x - this.x)** 2 + (enemy.y - this.y)** 2 < 1600){
                shootTween.progress(1)
            }
        })

        .eventCallback('onComplete', ()=>{
            // 撞擊到
            enemy.hurt(this.atk)
            this.parent?.removeChild(this)
        })
    }
}