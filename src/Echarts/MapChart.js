import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map' //引入地图
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/effectScatter'
import 'echarts/map/js/china' // 引入中国地图




export default class MapChart extends React.Component {

  constructor(props) {
    super(props)
    this.initMap = this.initMap.bind(this)
  }

  initMap() {
    // const { option = {} } = this.props //外部传入的data数据
    const { place = {} } = this.props //外部传入的data数据
    // let city = [{ name: '西宁', value: 72 }]

    let option = {
      tooltip: {
        show: false
      },
      visualMap: { // 左下角的数据说明
        show: false,
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['High', 'Low'],
        seriesIndex: [1],
        inRange: {
          color: ['#476baa', '#3a99ff']
        },
        calculable: true
      },
      geo: {
        map: 'china',
        // roam: true, // enable zoom
        // label: { // province name
        //     normal: {
        //         show: true,
        //         textStyle: {
        //             color: 'rgba(0,0,0,0.4)'
        //         }
        //     }
        // },
        // width: '100%', // draw area
        height: '95%', // set one, reshape in ratio
        itemStyle: { // province border style
          normal: {
            borderColor: '#444'
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: this.convertData(place.region),
          symbolSize: 20,
          // symbol: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
          symbol: 'path://M 100, 100 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0',
          //   symbolRotate: 35,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#fff'
            }
          }
        },
        {
          name: 'categoryA',
          type: 'map',
          geoIndex: 0,
          tooltip: { show: false },
          data: this.highlight_province(place.region)
        }
      ]
    }
    let myChart = echarts.init(this.ID) //初始化echarts

    //设置options
    myChart.setOption(option)

    window.onresize = function () {
      myChart.resize()
    }
  }

  componentDidMount() {
    this.initMap()
  }

  componentDidUpdate() {
    this.initMap()
    // console.log(this.props)
  }

  shouldComponentUpdate(nextState, nextProps) {
    // console.log(this.props.danmuList, nextProps, nextState.danmuList)
    if (this.props.place == nextState.place) {
      return false
    } else {
      return true
    }
  }

  convertData(province) {
    let res = [];

    let capital_citys = {
      '北京': [116.46, 39.92],
      '天津': [117.2, 39.13],
      '河北': [114.48, 38.03],
      '山西': [112.53, 37.87],
      '内蒙古': [111.65, 40.82],
      '辽宁': [123.38, 41.8],
      '吉林': [125.35, 43.88],
      '黑龙江': [126.63, 45.75],
      '上海': [121.48, 31.22],
      '江苏': [118.78, 32.04],
      '浙江': [120.19, 30.26],
      '安徽': [117.27, 31.86],
      '福建': [119.3, 26.08],
      '江西': [115.89, 28.68],
      '山东': [117, 36.65],
      '河南': [113.65, 34.76],
      '湖北': [114.31, 30.52],
      '湖南': [113, 28.21],
      '广东': [113.23, 23.16],
      '广西': [108.33, 22.84],
      '海南': [109.511909, 18.252847],
      '重庆': [106.54, 29.59],
      '四川': [104.06, 30.67],
      '贵州': [106.71, 26.57],
      '云南': [102.73, 25.04],
      '西藏': [91.11, 29.97],
      '陕西': [108.95, 34.27],
      '甘肃': [103.73, 36.03],
      '青海': [101.74, 36.56],
      '宁夏': [106.27, 38.47],
      '新疆': [87.68, 43.77],
      "香港": [114.1, 22.2],
      "澳门": [113.33, 22.13],
      "台湾": [121.5, 25.05],
    }

    let geoCoord = capital_citys[province];

    if (geoCoord) {
      res.push({
        name: province,
        // what's this 'value' for?
        value: geoCoord.concat(0)
      });
    }
    return res;
  };

  highlight_province(province) {
    let provinces = [
      { name: '北京', value: 0 },
      { name: '天津', value: 0 },
      { name: '上海', value: 0 },
      { name: '重庆', value: 0 },
      { name: '河北', value: 0 },
      { name: '河南', value: 0 },
      { name: '云南', value: 0 },
      { name: '辽宁', value: 0 },
      { name: '黑龙江', value: 0 },
      { name: '湖南', value: 0 },
      { name: '安徽', value: 0 },
      { name: '山东', value: 0 },
      { name: '新疆', value: 0 },
      { name: '江苏', value: 0 },
      { name: '浙江', value: 0 },
      { name: '江西', value: 0 },
      { name: '湖北', value: 0 },
      { name: '广西', value: 0 },
      { name: '甘肃', value: 0 },
      { name: '山西', value: 0 },
      { name: '内蒙古', value: 0 },
      { name: '陕西', value: 0 },
      { name: '吉林', value: 0 },
      { name: '福建', value: 0 },
      { name: '贵州', value: 0 },
      { name: '广东', value: 0 },
      { name: '青海', value: 0 },
      { name: '西藏', value: 0 },
      { name: '四川', value: 0 },
      { name: '宁夏', value: 0 },
      { name: '海南', value: 0 },
      { name: '台湾', value: 0 },
      { name: '香港', value: 0 },
      { name: '澳门', value: 0 }
    ]
    for (let i = 0; i < provinces.length; i++) {
      if (provinces[i].name == province) {
        // set different number to set different color
        provinces[i].value = 1000
      }
    }
    // console.log(provinces)
    return provinces
  }

  render() {
    const { width = "100%", height = "100%" } = this.props
    return <div ref={ID => this.ID = ID} style={{ width, height }}></div>
  }
}