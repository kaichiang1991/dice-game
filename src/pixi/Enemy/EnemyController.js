import gsap from "gsap"
import { app } from "../../App"
import Enemy from "./Enemy"

export default class EnemyController{

    static init(){
        this.enemies = []
        this.enemiyId = 0
        window.ea = this.enemies
        this.counter = 1000
    }

    static end(){
        this.counter = 1000
        this.enemies.forEach(enemy => enemy.end())
    }

    static enemyGameLoop(dt){
        if((this.counter -= dt) < 0){
            this.counter = gsap.utils.random(1000, 1500)       // 產出倒數
            this.createEnemy()
        }

        this.enemies.forEach(async enemy =>{
            let hitUnit = enemy.hit()
            if(hitUnit){
                if(await enemy.attack(hitUnit)){
                    hitUnit.hurt()
                }
            }else{
                enemy.walk()
            }
        })
    }

    static createEnemy(){
        const enemy = new Enemy().init(this.enemiyId, gsap.utils.random(100, 620), gsap.utils.random(-50, -100))
        const {stage} = app
        stage.addChild(enemy)

        this.enemies[this.enemiyId++] = enemy
    }

    static endEnemy(enemy){
        // 從陣列移出
        delete this.enemies[enemy.index]
        enemy.parent?.removeChild(enemy)
        enemy.end()
    }
}