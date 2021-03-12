import { app } from "../../App"
import Enemy from "./Enemy"

export default class EnemyController{

    static init(){
        this.enemies = []
    }

    static createEnemy(){
        const enemy = new Enemy().init(Math.random() * 720, -50 + -50 * Math.random())
        const {stage} = app
        stage.addChild(enemy)

        this.enemies.push(enemy)
    }
}