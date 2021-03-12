import { app } from "../../../../App"
import AnimationManager from "./AnimationManager"

export default class GameAnimationManager{

    static playEnemyAnim(){
        const {stage} = app
        return AnimationManager.playAnimation(stage, 'FireMan')
    }
}