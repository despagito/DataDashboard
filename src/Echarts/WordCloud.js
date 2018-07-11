import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
require('echarts-wordcloud');

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'

export default class WordCloud extends React.Component {

  constructor(props) {
    super(props)
    this.initWordCloud = this.initWordCloud.bind(this)
  }

  initWordCloud() {
    // const { option = {} } = this.props //外部传入的data数据

    let option = {
      // title: {
      //   text: '访问量 Top100 词语云',
      //   left: 'center',
      //   textStyle: {
      //     color: '#A7D4FD',
      //     verticalAlign: 'bottom'
      //   }
      // },
      // show hover data
      tooltip: { show: true },
      series: [{
        type: 'wordCloud',

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.
        shape: 'circle',

        // A silhouette image which the white area will be excluded from drawing texts.
        // The shape option will continue to apply as the shape of the cloud to grow.
        // maskImage: maskImage, // 如果要将文字画成某种图形的样子,就打开这个

        // Following left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.
        left: 'center',
        top: 'center',
        width: '70%',
        height: '60%',
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.
        sizeRange: [8, 40],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
        rotationRange: [0, 0],//[-90,90]
        // rotationStep: 45,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.
        gridSize: 8,

        // set to true to allow word being draw partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        drawOutOfBound: false,

        // Global text style
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 120 + 120),
                Math.round(Math.random() * 120 + 120),
                Math.round(Math.random() * 120 + 120)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },

        // Data is an array. Each array item must have name and value property.
        data: [{ name: "正在返回数据...", value: 100 }]
      }]
    }
    // console.log(this.props.wordCloudData)
    if (this.props.wordCloudData) {
      option.series[0].data = this.props.wordCloudData;
    }

    let myChart = echarts.init(this.ID) //初始化echarts

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  componentDidMount() {
    this.initWordCloud()
  }

  componentDidUpdate() {
    this.initWordCloud()
  }

  shouldComponentUpdate(nextState, nextProps) {
    // console.log(this.props.danmuList, nextProps, nextState.danmuList)
    if (this.props.wordCloudData == nextState.wordCloudData) {
      return false
    } else {
      return true
    }
  }

  render() {
    // let hello = "by adele"
    // const { papa = "100%" } = this.props
    const { width = "100%", height = "100%" } = this.props
    return <div ref={ID => this.ID = ID} style={{ width, height }}></div>
  }
};