import * as PIXI from 'pixi.js'

import { app } from "../App"
import Banner from "./Banner"
import UnitController from "./Character/UnitController"
import KillBtn from "./UI/KillBtn"
import ResourceBtn from "./UI/ResourceBtn"
import UpgradeBtn from "./UI/UpgradeBtn"
import GamePad from './UI/GamePad'
import gsap from "gsap"
import Enemy from "./Enemy/Enemy"
import AnimationManager from "./System/Assets/Animation/AnimationManager"

export const gamePad = new GamePad()

export default class Main{
    init = () => {

        // PIXI.LoaderResource.setExtensionLoadType('json', PIXI.LoaderResource.LOAD_TYPE.XHR);
        // PIXI.LoaderResource.setExtensionXhrType('json', PIXI.LoaderResource.XHR_RESPONSE_TYPE.JSON)
        // 敵人提示
        const enemyBanner = new Banner().init(0xFF0000, 'Enemy')
        gsap.to(enemyBanner, {duration: 1, yoyo: true, alpha: 0, repeat: -1})
        
        // 派兵按鈕
        const killBtn = new KillBtn().init([360, 1280])
        // UI 線
        const uiLine = new PIXI.Graphics()
        .lineStyle(7)
        .moveTo(0, 1150)
        .lineTo(720, 1150)
        // 升級按鈕
        const upgradeBtn = new UpgradeBtn('升級').init()
        upgradeBtn.position.set(70, 1200)
        // 資源
        const resourceBtn = new ResourceBtn('0').init()
        resourceBtn.position.set(550, 1200)
        // 遊戲畫面
        gamePad.init()
        
        const {stage} = app
        stage.addChild(enemyBanner, killBtn, uiLine, upgradeBtn, resourceBtn, gamePad)

        UnitController.init()

        AnimationManager.playAnimation(null, null)
        // let value = 10
        // senterval(() => {
        //     window.dispatchEvent(new CustomEvent('updateRes', {detail: {
        //         value
        //     }}))
        //     value += 50
        // }, 2000)
        
    }
}