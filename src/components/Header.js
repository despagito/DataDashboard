import React, { Component } from 'react'
import CountUp from 'react-countup'

import io from 'socket.io-client'
import "./App.css"
import "./Header.css"



// Connect to server
// if (status == 'dev') {
//   socket = io('localhost:3002')
// } else {
//   socket = io('10.99.23.88:51201')
// }
// let socket = io('localhost:3002')
let socket = io('10.99.23.88:51201')
let uid = 1001;

socket.on('connect', function () {
  socket.emit('login', uid);
  console.log(socket.id)
});


export default class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: "no-date-yet",
      uv_liang: 0,
      uv_liang2: 0,
      yewu_liang: 0,
      yewu_liang2: 0,

      uv_liang_old: 0,
      uv_liang2_old: 0,
      yewu_liang_old: 0,
      yewu_liang2_old: 0,

      yewu_liang3: 0,
      lijie_lv: 0,
      lijie_lv2: 0,
      jiejue_lv: 0,
      jiejue_lv2: 0,
      manyi_du: 0,
      manyi_du2: 0
    };
  }

  // 放在这个函数里面只会收到一次吧.....?
  componentDidMount() {

    socket.on('Nowdate', (data) => {
      // console.log(data);
      this.setState({
        today: data
      })
    });
    socket.on('UvData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log('uv', data);
      this.state.uv_liang_old = this.state.uv_liang
      this.state.uv_liang2_old = this.state.uv_liang2
      this.setState({
        uv_liang: data[0],
        uv_liang2: data[1],
      })
      // console.log(data, this.state);
    });
    // 业务量
    socket.on('BvData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log('业务量', data);
      this.state.yewu_liang_old = this.state.yewu_liang
      this.state.yewu_liang2_old = this.state.yewu_liang2
      this.setState({
        yewu_liang: data[0],
        yewu_liang2: data[1],
        yewu_liang3: data[2]
      })
    });
    // 理解率
    socket.on('CompRateData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      // console.log(data);
      this.setState({
        lijie_lv: data[0].toLocaleString(),
        lijie_lv2: data[1].toLocaleString(),
        lijie_lv3: data[2]
      })
    });
    // 解决率
    socket.on('ResolutionRateData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      // console.log(data);
      this.setState({
        jiejue_lv: data[0].toLocaleString(),
        jiejue_lv2: data[1]
      })
    });
    // 满意度
    socket.on('SatisfactionRateData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      // console.log(data);
      this.setState({
        manyi_du: data[0].toLocaleString(),
        manyi_du2: data[1]
      })
    });
  }

  render() {
    return (
      <div className="header mid">

        <div className="time"> {this.state.today} </div>

        <ul className="list_board">
          <li className="header_item">
            <div className="title">UV</div>
            <div className="number"><CountUp start={this.state.uv_liang_old} end={this.state.uv_liang} useGrouping separator="," duration={60} /></div>
            <div className="note">FY18/19累计UV：<CountUp start={this.state.uv_liang2_old} end={this.state.uv_liang2} useGrouping separator="," duration={60} /></div>
            {/* <div className="note">FY18/19累计UV：{this.state.uv_liang2} </div> */}
          </li>
          <li className="header_item">
            <div className="title">业务量</div>
            <div className="number"> <CountUp start={this.state.yewu_liang_old} end={this.state.yewu_liang} useGrouping separator="," duration={60} /> </div>
            <div className="note">FY18/19累计业务量：<CountUp start={this.state.yewu_liang2_old} end={this.state.yewu_liang2} useGrouping separator="," duration={60} /> <br />近30日机器人服务占比：{this.state.lijie_lv3}</div>
            {/* <div className="note">FY18/19累计业务量：{this.state.yewu_liang2} <br />近30日机器人服务占比：{this.state.lijie_lv3}</div> */}
          </li>
          <li className="header_item">
            <div className="title">理解率</div>
            <div className="number">{this.state.lijie_lv}</div>
            <div className="note">近30日理解率：{this.state.lijie_lv2}</div>
          </li>
          <li className="header_item">
            <div className="title">解决率</div>
            <div className="number">{this.state.jiejue_lv}</div>
            <div className="note">近30日解决率：{this.state.jiejue_lv2}</div>
          </li>
          <li className="header_item">
            <div className="title">满意度</div>
            <div className="number">{this.state.manyi_du}</div>
            <div className="note">近30日满意度：{this.state.manyi_du2}</div>
          </li>
        </ul>
      </div>
    );
  }
}


