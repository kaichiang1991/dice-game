import gsap, { Power0 } from "gsap/all";
import { BLEND_MODES, Container, Graphics } from "pixi.js";
import { app } from "../../App";
import GameAnimationManager from "../System/Assets/Animation/GameAnimationManager";

export default class Enemy extends Container{
    
    init(x, y){
        
        this.anim = GameAnimationManager.playEnemyAnim()
        this.anim.scale.y = -1
        this.addChild(this.anim)
        this.position.set(x, y)

        this.slash = new Graphics()
        .beginFill(0xFF0000)
        .drawEllipse(0, 0, 5, 30)
        .endFill()
        this.slash.skew.x = .7

        this.attacking = false
        // gsap.from(this.slash, {duration: .1, height: 0})

        this.walk()
        return this
    }

    walk(){
        if(!this.walkTween)
            this.walkTween = gsap.to(this, {ease: Power0.easeNone, duration: 5, y: 1200})
        else
            this.walkTween.paused(false)
    }

    hit(charater){
        return !charater.isAlive? null: ((charater.x - this.x) ** 2 + (charater.y - this.y) ** 2) < 2500? charater: null
    }

    async attack(character){
        if(this.attacking)
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
        return true
    }
}