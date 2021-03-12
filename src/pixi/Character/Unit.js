import gsap from "gsap";
import { Container, Text, TextStyle } from "pixi.js";
import Blood from "./Blood";

const typeDef = {
    0: {name: '兵',},
    1: {name: '帥',},
    2: {name: '胖',},
    3: {name: '嚇',},
    4: {name: '奴'},
}

export default class Unit extends Container{
    init(type, index){
        // 角色本人
        this.text = new Text(typeDef[type].name, new TextStyle({
            fontSize: 32
        }))
        this.text.anchor.set(.5)

        this.plus = new Text('', new TextStyle({
            fill: 0x832a2a,
            fillGradientType: 1,
            fontSize: 20,
            fontStyle: "italic",
            fontWeight: 'bolder'
        }))
        this.plus.anchor.set(-.3, 1)

        // 血條
        this.blood = new Blood().init()
        
        this.addChild(this.text, this.blood, this.plus)

        this.index = index
        this.level = 0
        this.hurtCountdown = 0
        this.onRegisterEvent()
        return this
    }

    update(dt){
        if(this.hurtCountdown > 0){
            console.log('update', 'minus')
            this.hurtCountdown -= dt
        }
    }

    async hurt(){
        if(this.hurtCountdown <= 0){
            this.hurtCountdown = 500
            const blood = await this.blood.startBleeding()
            console.log(blood)
        }
    }

    onRegisterEvent(){
        window.dispatchEvent(new CustomEvent('addToBorder', {detail:{
            index: this.index, unit: this
        }}))

        this.interactive = this.buttonMode = true
        this.on('pointerdown', ()=>{
            this.blood.startBleeding()
        })
    }

    upgrade(){
        if(this.level++ < 5){
            this.upgradeUnit()
        }
    }

    upgradeUnit(){
        this.text.style.fontSize += 5
        this.plus.text = '+1'
        this.upgradeTween?.isActive() && this.upgradeTween.progress(1)

        this.upgradeTween = gsap.timeline()
        .fromTo(this.plus, {y: 0, alpha: 1}, {y: -15, alpha: 0})
    }
}