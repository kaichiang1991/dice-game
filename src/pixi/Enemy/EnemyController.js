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
            this.counter = 9999999999//gsap.utils.random(1000, 1500)
            this.createEnemy()
        }

        this.enemies.filter(enemy => !enemy.attacking).forEach(enemy =>{
            // console.log('enemy')
            UnitController.unitArr.map(unit => enemy.hit(unit)).forEach(unit => {
                if(unit){
                    enemy.attack()
                    unit.hurt()
                }
            })
            // if(UnitController.unitArr.map(unit => enemy.hit(unit) !== null).length){
            //     console.log('hit')
            //     enemy.attack()
            // }
        })
    }

    static createEnemy(){
        const enemy = new Enemy().init(gsap.utils.random(0, 720), gsap.utils.random(-50, -100))
        const {stage} = app
        stage.addChild(enemy)

        this.enemies.push(enemy)
    }
}