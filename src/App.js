import { Stage } from '@inlet/react-pixi'
import React, { Component } from 'react'
import './App.css'
import Main from './pixi/Main'

export let app

export default class App extends Component {
  mountEvent = (e) => {
    app = e
    console.log('mou',  app, new Main().init())
  }

  render() {
    return (
      <div className="game-container">
        <Stage width={720} height={1280} options={{resolution: 1, backgroundColor: 0xFFFFFF}} onMount={this.mountEvent}/>
      </div>
    )
  }
}
