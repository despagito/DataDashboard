import React, { Component } from 'react'
import Center from './Center.js'
import Header from './Header.js'
import './App.css'



export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="full-container">
        <Header />
        <Center />
      </div >
    )
  }
}
