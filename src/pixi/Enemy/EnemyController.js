import gsap from "gsap"
import { app } from "../../App"
import UnitController from "../Character/UnitController"
import Enemy from "./Enemy"

export default class EnemyController{

    static init(){
        this.enemies = []
        this.counter = 1000
    }

    static enemyGameLoop(dt){
        if((this.counter -= dt) < 0){
            this.counter =  gsap.utils.random(1000, 1500)       // 產出倒數
            this.createEnemy()
        }

        this.enemies.forEach(async enemy =>{
            let hitUnit
            if(hitUnit = enemy.hit()){
                if(await enemy.attack(hitUnit)){
                    hitUnit.hurt()
                }
            }else{
                enemy.walk()
            }
        })
    }

    static createEnemy(){
        const enemy = new Enemy().init(gsap.utils.random(100, 620), gsap.utils.random(-50, -100))
        const {stage} = app
        stage.addChild(enemy)

        this.enemies.push(enemy)
    }
}