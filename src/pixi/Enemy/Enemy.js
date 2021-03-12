import gsap, { Power0 } from "gsap/all";
import { Container } from "pixi.js";
import GameAnimationManager from "../System/Assets/Animation/GameAnimationManager";

export default class Enemy extends Container{
    
    init(x, y){
        
        this.anim = GameAnimationManager.playEnemyAnim()
        this.addChild(this.anim)
        this.position.set(x, y)

        this.walk()
        return this
    }

    walk(){
        gsap.to(this, {ease: Power0.easeNone, duration: 5, y: '+=1280'})
    }
}