import gsap, { Power0 } from "gsap/all";
import { BLEND_MODES, Container, Graphics } from "pixi.js";
import { app } from "../../App";
import UnitController from "../Character/UnitController";
import GameAnimationManager from "../System/Assets/Animation/GameAnimationManager";
import EnemyController from "./EnemyController";

export default class Enemy extends Container{
    
    init(index, x, y){
        
        this.anim = GameAnimationManager.playEnemyAnim()
        this.anim.scale.y = -1      // 上下顛倒
        this.anim.anchor.set(.5)

        this.addChild(this.anim)
        this.position.set(x, y)

        this.slash = new Graphics()
        .beginFill(0xFF0000)
        .drawEllipse(0, 0, 5, 30)
        .endFill()
        this.slash.skew.x = .7

        this.index = index
        this.attacking = false
        this.blood = 100

        this.walk()
        return this
    }

    end(){
        this.hurtTween?.isActive() && this.hurtTween.kill()
        this.walkTween?.isActive() && this.walkTween.kill()
    }

    walk(){
        if(!this.walkTween)
            this.walkTween = gsap.to(this, {ease: Power0.easeNone, duration: 13, y: 1150, onComplete: ()=>{
                window.dispatchEvent(new CustomEvent('minusLife'))
            }})
        else
            this.walkTween.paused(false)
    }

    hit(){
        return UnitController.unitArr.filter(unit => Math.abs(unit.y - this.y) < 100).find(unit => (unit.x - this.x)** 2 + (unit.y - this.y)** 2 < 2500)
    }

    hurt(value){
        this.hurtTween = gsap.timeline()
        .set(this.anim, {tint: 0xFF0000})
        .set(this.anim, {tint: 0xFFFFFF}, '+=0.1')

        if((this.blood -= value) <= 0){
            console.log('blood', this.blood)
            this.die()
        }
    }

    die(){
        // ToDo 加資源
        EnemyController.endEnemy(this)
    }

    /**
     * 執行攻擊動作
     * @param {Unit} character 要攻擊的角色
     * @returns true 攻擊結束 / false 正在攻擊
     */
    async attack(character){
        if(this.attacking)      // 正在攻擊
            return false

        this.walkTween?.paused(true)
        this.attacking = true
        const {stage} = app
        stage.addChild(this.slash)
        this.slash.position.copyFrom(character.position)

        await new Promise(res =>{
            gsap.timeline()
            .from(this.slash, {duration: .08, height: 0})
            .call(()=> this.slash.parent?.removeChild(this.slash))
            .add(res, '+=0.5')
        })

        this.attacking = false
        return true             // 攻擊結束
    }
}