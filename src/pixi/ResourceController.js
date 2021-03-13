import { app } from "../App"
import ResourceBtn from "./UI/ResourceBtn"

export default class ResourceController{
    
    static init(){
        const {stage} = app

        this.resourceBtn = new ResourceBtn('0').init()
        this.resourceBtn.position.set(550, 1200)
        stage.addChild(this.resourceBtn)

        this.resource = 0
        this.onRegisterEvent()
    }

    static onRegisterEvent(){
        window.addEventListener('addResource', context =>{
            const {value} = context.detail
            this.resource += value
            this.resourceBtn.addResource(this.resource)
        })
    }
}