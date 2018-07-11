import React from 'react'
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'

export default class BarChart extends React.Component {

  constructor(props) {
    super(props)
    this.initBar = this.initBar.bind(this)
  }

  initBar() {
    // 先初始化option,然后赋this.props给他?
    const { option = {} } = this.props //外部传入的data数据
    let myChart = echarts.init(this.ID) //初始化echarts

    //设置options
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  componentDidMount() {
    this.initBar()
  }

  componentDidUpdate() {
    this.initBar()
  }

  shouldComponentUpdate(nextState, nextProps) {
    // console.log(this.props.option, nextProps, nextState.option, 700)
    if (this.props.option == nextState.option) {
      return false
    } else {
      return true
    }
  }

  render() {
    let hello = "by adele"
    const { papa = "100%" } = this.props
    const { width = "100%", height = "100%" } = this.props
    return <div ref={ID => this.ID = ID} style={{ width, height }}></div>
  }
};