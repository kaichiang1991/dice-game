import UnitController from "../Character/UnitController";
import ResourceController from "../ResourceController";
import Btn from "./Btn";

export default class UpgradeBtn extends Btn{

    init(){
        this.upgradeCost = 500
        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        this.interactive = this.buttonMode = true
        this.on('pointerdown', ()=>{
            if(ResourceController.resource >= this.upgradeCost){
                if(UnitController.upgradeAll()?.find(result => result)){
                    window.dispatchEvent(new CustomEvent('addResource', {detail: {value: -this.upgradeCost}}))
                }
            }
        })
    }
}