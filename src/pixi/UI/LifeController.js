import { app } from "../../App";
import Life from "./Life";

export default class LifeController{

    static init(){
        const {stage} = app
        this.lifeArr = Array(3).fill(1).map((_, index) => {
            const life = new Life().init()
            life.position.set(690, 1180 + 40 * index)
            stage.addChild(life)
            return life
        })

        this.currentIndex = 0
        this.onRegisterEvent()
    }

    static onRegisterEvent(){
        window.addEventListener('minusLife', async () =>{
            const life = this.lifeArr[this.currentIndex++]
            life.minus()
            if(this.currentIndex >= 3){     // Game over
                window.dispatchEvent(new CustomEvent('gameOver'))
            }
        })
    }
}