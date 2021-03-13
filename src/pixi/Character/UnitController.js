import gsap from "gsap/gsap-core"
import { gamePad } from "../Main"
import ResourceController from "../ResourceController"
import Unit, {typeDef} from "./Unit"

export default class UnitController{
    static init(){
        this.unitArr = []
        window.ua = this.unitArr
        this.onRegisterEvent()
    }

    static characterGameLoop(dt){
        this.unitArr?.forEach(unit =>{
            unit.update(dt)
        })
    }

    static upgradeAll(){
        return this.unitArr?.map(unit => unit.upgrade())
    }

    static onRegisterEvent(){
        window.addEventListener('newUnit', context =>{
            const notUsedIndex = gamePad.borderArr.filter(border => !border.Use).map(border => border.Index)
            const {type} = context.detail

            if(typeDef[type].cost > ResourceController.resource){
                console.log('資源不夠')
                return
            }

            if(!notUsedIndex.length){
                console.log('沒有位子')
                return
            }

            const index = gsap.utils.shuffle(notUsedIndex)[0]
            this.unitArr[index] = new Unit().init(type, index)
            window.dispatchEvent(new CustomEvent('addResource', {detail: {value: -100}}))
        })
    }
}