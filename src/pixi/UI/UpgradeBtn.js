import Btn from "./Btn";

export default class UpgradeBtn extends Btn{

    init(){
        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        this.interactive = this.buttonMode = true
        this.on('pointerdown', ()=>{
            console.log('upgrade')
        })
    }
}