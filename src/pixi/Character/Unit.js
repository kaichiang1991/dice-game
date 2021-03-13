import gsap from "gsap";
import { Container, Text, TextStyle } from "pixi.js";
import EnemyController from "../Enemy/EnemyController";
import Blood from "./Blood";
import Bullet from "./Bullet";
import UnitController from "./UnitController";

const typeDef = {
    0: {name: '兵', distance: 300 ** 2, attack: 10},
    1: {name: '帥', distance: 300 ** 2, attack: 10},
    2: {name: '胖', distance: 300 ** 2, attack: 10},
    3: {name: '嚇', distance: 300 ** 2, attack: 10},
    4: {name: '奴', distance: 300 ** 2, attack: 10},
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

        this.type = type
        this.index = index
        this.level = 0
        this.isAlive = true
        this.shootCountdown = 0
        this.onRegisterEvent()
        return this
    }

    update(dt){
        if((this.shootCountdown -= dt) <= 0){
            this.attack()
            this.shootCountdown = 1000
        }
    }

    /**
     * 角色受傷
     * @returns true 角色死亡 / false 還沒死
     */
    async hurt(){
        const blood = await this.blood.startBleeding()
        if(!blood){     // 角色死亡
            this.die()
            return true
        }

        return false
    }

    attack(){
        this.enemy = EnemyController.enemies.filter(enemy => Math.abs(enemy.y - this.y) < 500).find(enemy => (enemy.x - this.x)** 2 + (enemy.y - this.y)** 2 < typeDef[this.type].distance)
        if(this.enemy){
            new Bullet().init(typeDef[this.type].attack).shoot(this, this.enemy)
        }
    }

    die(){
        this.isAlive = false
        window.dispatchEvent(new CustomEvent('removeFromBorder', {detail:{
            index: this.index, unit: this
        }}))

        delete UnitController.unitArr[this.index]
    }

    onRegisterEvent(){
        window.dispatchEvent(new CustomEvent('addToBorder', {detail:{
            index: this.index, unit: this
        }}))
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