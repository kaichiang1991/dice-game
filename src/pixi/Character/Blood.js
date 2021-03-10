import gsap from "gsap";
import { Power0 } from "gsap/gsap-core";
import { Container, DEG_TO_RAD, Graphics } from "pixi.js";

export default class Blood extends Container{
    init(){
        this.value = 1

        this.gp = new Graphics()
        this.addChild(this.gp)
        this.updateBlood()

        return this
    }

    startBleeding(){
        // 測試扣血演出
        gsap.to(this, {ease: Power0.easeNone, duration: 3, value: 0, onUpdate: this.updateBlood.bind(this)})
    }

    updateBlood(){
        this.gp.clear()
        .lineStyle(5, this.value > .2? 0x00FF00: 0xFF0000)
        .arc(0, 0, 40, 135 * DEG_TO_RAD, (135 + 270 * this.value) * DEG_TO_RAD)
    }
}