import { Container } from "pixi.js";
import GameAnimationManager from "../System/Assets/Animation/GameAnimationManager";

export default class Enemy extends Container{
    
    init(){
        
        this.anim = GameAnimationManager.playEnemyAnim()
        
        this.addChild(this.anim)
        return this
    }
}