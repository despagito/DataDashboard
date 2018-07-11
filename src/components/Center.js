import React, { Component } from 'react'
import io from 'socket.io-client'

import BarChart from '../Echarts/BarChart.js'
import MapChart from '../Echarts/MapChart.js'
import WordCloud from '../Echarts/WordCloud.js'
import Danmu from '../Danmu/Danmu.js'
import Chat from '../Chat/Chat.js'

import "./App.css"
import "./Center.css"

import bar1logo from '../Echarts/bar1-logo.png'
import bar2logo from '../Echarts/bar2-logo.png'
import wordcloudlogo from '../Echarts/wordcloud-logo.png'
import danmulogo from '../Danmu/danmu-logo.png'

// if (status == 'dev') {
//   socket = io('localhost:3002')
// } else {
//   socket = io('10.99.23.88:51201')
// }

// Connect to server
// let socket = io('localhost:3002')
let socket = io('10.99.23.88:51201')
let uid = 1001;

socket.on('connect', function () {
  socket.emit('login', uid);
  console.log(socket.id)
});


// 这里需要考虑一个加载速度的问题,可以考虑模块化加载(异步加载.)
export default class Center extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialog: [],
      // danmu: [
      //   { value: "这里少个分号", top: 10 },
      //   { value: "生无可恋.jpg", top: 35 },
      //   { value: "后方小哥迷之傲视", top: 20 },
      //   { value: "你们好吵", top: 40 },
      //   { value: "233333", top: 10 },
      //   { value: "玛德智障", top: 70 },
      //   { value: "一个颜文字~_~", top: 85 },
      //   { value: "1表白图中妹子~_~", top: 55 }
      // ],
      danmu: [
        // "这里少个分号",
        // "生无可恋.jpg",
        // "后方小哥迷之傲视",
        // "你们好吵",
        // "233333",
        // "玛德智障",
        // "一个颜文字~_~",
        // "1表白图中妹子~_~",
      ],
      dialog: [{
        QUESTION: "secivressruoh42",
        ANSWER: "[dfdsfds]很高兴为您服务[/dfdfjfdhjd]",
      }],
      another_state: null
    };
  }

  componentDidMount() {

    socket.on('reload', function (msg) {
      window.location.reload();
    });


    // 分时段业务量, bar chart
    socket.on('DBvData', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log("分时段业务量", data);

      let barOption1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#626F86'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#626F86'
            }
          }
        },
        color: ['#7FB800', '#EFA900', '#FD6A3C', '#00A6ED'],
        legend: {
          data: [],
          right: '6%',
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        series: []
      }

      if (data) {

        // generate array placeholder
        let zero_fill_arr = []
        if (data[0].data.length <= 24) {
          let len_dif = 24 - data[0].data.length
          for (let j = 0; j < len_dif; j++) {
            zero_fill_arr.push(0)
          }
        }

        // fill bar option
        for (let i in data) {
          data[i].data = data[i].data.concat(zero_fill_arr)
          let tm = {
            name: data[i].name,
            type: 'bar',
            stack: 'same_stack',
            data: data[i].data
          }

          barOption1.legend.data.push(data[i].name)
          barOption1.series.push(tm)
        }

        this.setState({ barOption1 })
      }



    });

    // bar2 chart
    socket.on('TopQuestion', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log("TOP问题", data);
      let barOption2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '6%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#626F86'
            }
          }
        },
        yAxis: {
          // data应该是各种访问的问题.
          data: [],
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#626F86'
            }
          }
        },
        color: ['#A7D4FD'],
        series: [{
          name: '访问量',
          type: 'bar',
          stack: 'same_stack',
          data: [],
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              // fontSize: '16',
              color: '#2B3648'
            }
          }
        }]
      }
      barOption2.yAxis.data = data.FAQ_NAME.reverse()
      barOption2.series[0].data = data.cont.reverse()

      this.setState({ barOption2 })

    });

    // 词云
    socket.on('Keywords', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      console.log("词云", data);

      this.setState({ wordCloudData: data })
    });

    // 用户原声,滚动呈现
    socket.on('UserVoc', (data) => {
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      data = data.map((entry) => {
        return entry.context
      })
      console.log("用户原声", data);
      this.setState({ danmu: data })
    });

    // 对话
    let itv
    socket.on('RealtimeCase', (data) => {
      clearInterval(itv)
      if (typeof data == "string") {
        data = JSON.parse(data)
      }
      // return;
      console.log("实时对话", data);

      let count = 0

      this.setState({
        dialog: data[count].QA,
        place: data[count].ADDRESS
        // place: { city: "长沙", region: "湖南" }
      })
      console.log(count, data[count].ADDRESS)

      itv = setInterval(function () {
        count++
        this.setState({
          dialog: data[count].QA,
          place: data[count].ADDRESS
        })

        if (count == data.length - 1) {
          clearInterval(itv)
        }
        // console.log(count)
        console.log(count, data[count].ADDRESS)

      }.bind(this), 11000)
    });
  }

  render() {
    return (
      <div className="center mid">
        <div className="left_body fl">
          <div className="dialog">
            <Chat dialog={this.state.dialog} />
          </div>
          <div className="map">
            <MapChart place={this.state.place} />
          </div>
        </div>
        <div className="right_body fr">
          <div className="barChart" id="bar1Chart">
            <div style={{ left: '5%', right: 'auto' }} className="ctitle"><img src={bar1logo} className="ctitle-img" /><span>分时段业务量</span></div>
            <BarChart option={this.state.barOption1} />
          </div>
          <div className="top_question">
            <div className="ctitle"><img src={bar2logo} className="ctitle-img" /><span>访问量 Top10 问题</span></div>
            <BarChart option={this.state.barOption2} />
          </div>
          <div className="word_cloud">
            <div className="ctitle"><img src={wordcloudlogo} className="ctitle-img" /><span>访问量 Top50 词云</span></div>
            <WordCloud wordCloudData={this.state.wordCloudData} />
          </div>
          <div className="user_question">
            <div className="ctitle"><img src={danmulogo} className="ctitle-img" /><span>用户原声</span></div>
            {/* <Barrage barrageList={this.state.danmu} color={{ random: true }} /> */}
            {/* <Danmu content={this.state.danmu} /> */}
            <Danmu danmuList={this.state.danmu} />
          </div>
        </div>
      </div>
    );
  }
}
