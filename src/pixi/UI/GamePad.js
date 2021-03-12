import { Container, Graphics } from "pixi.js";
import { app } from "../../App";

export const posDef = [
    [[240, 880], [360, 880], [480, 880]],
    [[180, 980], [300, 980], [420, 980], [540, 980]],
    [[120, 1080], [240, 1080], [360, 1080], [480, 1080], [600, 1080]],
]

export default class GamePad extends Container{
    init(){

        let border
        this.borderArr = []
        posDef.flat().forEach((pos, index) => {
            border = new Border().init(index)
            border.position.set(...pos)
            this.borderArr.push(border)
        })
        
        const {stage} = app
        this.borderArr.forEach(border =>{
            border.setParent(stage)
        })

        return this
    }
}

class Border extends Graphics{
    
    get Use(){return this.isUse}
    get Index() {return this.index}

    init(index){
        this.lineStyle(3, 0x00000D)
        .drawCircle(0, 0, 50)

        this.index = index
        this.isUse = false
        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        const {stage} = app
        window.addEventListener('addToBorder', context =>{
            const {index, unit} = context.detail
            if(index !== this.index)
                return

            stage.addChild(unit)
            unit.position.set(...posDef.flat()[index])
            this.isUse = true
        })

        window.addEventListener('removeFromBorder', context =>{
            const {index, unit} = context.detail
            if(index !== this.index)
                return
            
            unit.parent?.removeChild(unit)
            this.isUse = false
        })
    }
}