import React, { Component } from 'react'
import './Danmu.css'


export default class Danmu extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }
  shouldComponentUpdate(nextState, nextProps) {
    // console.log(this.props.danmuList, nextProps, nextState.danmuList)
    if (this.props.danmuList == nextState.danmuList) {
      return false
    } else {
      return true
    }
  }

  render() {

    let boardHeight = 250
    let danmuLines = boardHeight / 50
    let eachLineNums = this.props.danmuList.length / danmuLines
    let danmuList = JSON.parse(JSON.stringify(this.props.danmuList))
    let newDanmuList = []

    while (danmuList.length) {
      newDanmuList.push(danmuList.splice(0, eachLineNums))
    }

    let multiMarq = newDanmuList.map((entry, key) => {
      return (<Marquee1 danmuList={entry} key={key} />)
    })

    return (
      <div className="danmu-board" >
        {multiMarq}
      </div >
    )
  }
}


/*
marquee using css animation

bad
- hard to control
- if width:200%, then left:200% hard to solve long danmu
- solution: 200% infinite and change content over time.

good
- easy to infinite
*/

class Marquee1 extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let bg_choices = ['#7C9CE2', '#2C59BB', '#2c4785'] // '#CAD8F0',

    let domList = this.props.danmuList.map((entry, key) => {
      let random_bg = bg_choices[Math.floor(Math.random() * bg_choices.length)];
      let style = {
        background: random_bg
      }
      return (
        <li key={key} className="danmu-item" style={style}>{entry}</li>
      )
    })

    let style = {
      animationDuration: Math.floor(Math.random() * 20 + 20) + 's'
    }

    return (
      // <ul className="marquee marquee1" style={{ animationDuration: `${this.state.speed}%` }}>
      <ul className="marquee marquee1" style={style}>
        {domList}
      </ul >
    )
  }
}



