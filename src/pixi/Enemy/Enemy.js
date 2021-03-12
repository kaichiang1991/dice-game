import gsap, { Power0 } from "gsap/all";
import { Container } from "pixi.js";
import GameAnimationManager from "../System/Assets/Animation/GameAnimationManager";

export default class Enemy extends Container{
    
    init(x, y){
        
        this.anim = GameAnimationManager.playEnemyAnim()
        this.anim.scale.y = -1
        this.addChild(this.anim)
        this.position.set(x, y)

        this.walk()
        return this
    }

    walk(){
        this.walkTween = gsap.to(this, {ease: Power0.easeNone, duration: 5, y: 1200})
    }

    hit(charater){
        return ((charater.x - this.x) ** 2 + (charater.y - this.y) ** 2) < 2500? charater: null
    }

    attack(){
        this.walkTween?.paused(true)
    }
}