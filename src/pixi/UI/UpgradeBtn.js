import UnitController from "../Character/UnitController";
import Btn from "./Btn";

export default class UpgradeBtn extends Btn{

    init(){
        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        this.interactive = this.buttonMode = true
        this.on('pointerdown', ()=>{
            UnitController.upgradeAll()
        })
    }
}