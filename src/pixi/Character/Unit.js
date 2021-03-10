import { Container, Text, TextStyle } from "pixi.js";

const typeDef = {
    0: '兵',
    1: '帥',
    2: '胖',
    3: '嚇',
    4: '奴'
}

export default class Unit extends Container{
    init(type, index){
        this.text = new Text(typeDef[type], new TextStyle({
            fontSize: 32
        }))
        this.text.anchor.set(.5)

        this.addChild(this.text)
        
        window.dispatchEvent(new CustomEvent('addToBorder', {detail:{
            index, unit: this
        }}))

        return this
    }
}