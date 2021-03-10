import gsap from "gsap"
import Btn from "./Btn"

export default class ResourceBtn extends Btn{
    init(){
        this.onRegisterEvent()
        return this
    }

    onRegisterEvent(){
        window.addEventListener('updateRes', context => {
            const {value} = context.detail
            this.updateTween?.isActive() && this.updateTween.progress(1)
            this.value = +this.text.text
            this.updateTween = gsap.to(this, {duration: .5, value, onUpdate: ()=> this.text.text = ~~this.value})
        })
    }
}