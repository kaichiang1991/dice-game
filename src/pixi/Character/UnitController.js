import gsap from "gsap/gsap-core"
import { gamePad } from "../Main"
import Unit from "./Unit"

export default class UnitController{
    static init(){
        this.unitArr = []
        this.onRegisterEvent()
    }

    static characterGameLoop(dt){
        this.unitArr?.forEach(unit =>{
            unit.update(dt)
        })
    }

    static upgradeAll(){
        this.unitArr?.map(unit => unit.upgrade())
    }

    static onRegisterEvent(){
        window.addEventListener('newUnit', context =>{
            const notUsedIndex = gamePad.borderArr.filter(border => !border.Use).map(border => border.Index)
            const {type} = context.detail

            if(!notUsedIndex.length){
                console.log('沒有位子')
                return
            }

            const index = gsap.utils.shuffle(notUsedIndex)[0]
            this.unitArr[index] = new Unit().init(type, index)
        })
    }
}