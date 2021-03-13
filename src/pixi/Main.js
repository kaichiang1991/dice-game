import * as PIXI from 'pixi.js'

import { app } from "../App"
import Banner from "./Banner"
import UnitController from "./Character/UnitController"
import KillBtn from "./UI/KillBtn"
import UpgradeBtn from "./UI/UpgradeBtn"
import GamePad from './UI/GamePad'
import gsap from "gsap"
import AnimationManager from "./System/Assets/Animation/AnimationManager"
import EnemyController from './Enemy/EnemyController'
import LifeController from './UI/LifeController'
import { PixiPlugin } from 'gsap/all'
import ResourceController from './ResourceController'

export const gamePad = new GamePad()

export default class Main{
    init = async () => {

        gsap.registerPlugin(PixiPlugin)

        await AnimationManager.loadAnimations()
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
        // 遊戲畫面
        gamePad.init()
        
        const {stage} = app
        stage.addChild(enemyBanner, killBtn, uiLine, upgradeBtn, gamePad)

        ResourceController.init()
        LifeController.init()        // 生命
        UnitController.init()
        EnemyController.init()

        window.dispatchEvent(new CustomEvent('addResource', {detail: {value: 1000}}))

        this.isPlaying = true
        this.gameLoop = (time, dt)=>{
            UnitController.characterGameLoop(dt)
            EnemyController.enemyGameLoop(dt)
        }
        gsap.ticker.add(this.gameLoop)

        this.onRegisterEvent()
    }

    onRegisterEvent(){
        window.addEventListener('gameOver', context =>{
            console.log('gameOver')
            EnemyController.end()
            this.isPlaying = false
            gsap.ticker.remove(this.gameLoop)
        })
    }
}