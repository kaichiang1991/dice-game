import gsap from "gsap/gsap-core"
import { gamePad } from "../Main"
import Unit from "./Unit"

export default class UnitController{
    static init(){
        this.unitArr = []
        this.onRegisterEvent()
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

            this.unitArr.push(new Unit().init(type, gsap.utils.shuffle(notUsedIndex)[0]))
        })
    }
}