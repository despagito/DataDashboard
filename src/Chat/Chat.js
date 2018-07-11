import React, { Component } from 'react'
import './Chat.css'
import chatlogo from '../Chat/chat-logo.png'


export default class Chat extends Component {
  constructor(props) {
    super(props)
  }

  filterQuestion(question) {
    let pinyinToHanyu = {
      secivressruoh42: "人工服务",
      dqzchbjzgt: "按主机编号查驱动",
      zpndxc: "查电脑配置",
      twfgrjgx: "人工服务",
      xxrgfwgb: "人工服务",
      xbndxc: "查保修",
      wfgrjgx: "人工服务",
      wfgraijnauggnaix: "人工服务",
      cpriapertowoh: "人工服务",
      edgnafiduomihsow: "剔掉",
      ijisvliuguw: "电脑经常死机",
      ijniyad: "剔掉",
      nuxizoannaid: "人工服务",
      ideartv: "剔掉",
    }
    if (question in pinyinToHanyu) {
      return pinyinToHanyu[question]
    } else {
      return question
    }
  }

  filterAnswer(answer) {
    let pinyinToHanyu = {
      "[hardwareInfo]": "硬件配置信息",
      "[serviceStationList]": "请您<a>点击这里</a>查询服务站地址、电话和工作时间",
      "[:)]": "好滴",
      "[driver]": "请您<a>点击这里</a>下载驱动",
      "[modelInfo]": "请您<a>点击这里</a>查询电脑型号",
      "[warranty]": "请您<a>点击这里</a>查询电脑保修",
      "[computerCepair]": "请您<a>点击这里</a>进行报修",
      "[hardwareInfo]": "请您<a>点击这里</a>查询配置信息",
    }
    if (answer in pinyinToHanyu) {
      answer = pinyinToHanyu[answer]
    }

    let double_tag = /\[[^\]]*\]([^[]*)\[\/[^\]]*\]/gi
    let single_tag = /\[[^\]]*\]/gi
    answer = answer.replace(double_tag, "<a>$1</a>")
    answer = answer.replace(single_tag, "")
    return answer
  }

  shouldComponentUpdate(nextState, nextProps) {
    // console.log(this.props.danmuList, nextProps, nextState.danmuList)
    if (this.props.dialog == nextState.dialog) {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    // let height = document.querySelector('.now-scroll')
    // console.log(height)
  }


  render() {
    let chat_list = this.props.dialog.map((entry, key) => {

      // reset css animation
      if (document.querySelector('.chat-scroll')) {
        document.querySelector('.chat-scroll').classList.remove("now-scroll")
      }
      setTimeout(() => {
        document.querySelector('.chat-scroll').classList.add("now-scroll")
      }, 100);

      return (
        <div key={key}>
          <div className="chat-item">
            <span className="chat-asker"></span>
            <span className="chat-question-corner"></span>
            <span className="chat-question">{this.filterQuestion(entry.QUESTION)}</span>
          </div>
          <div className="chat-item">
            <span className="chat-answerer"></span>
            <span className="chat-answer-corner"></span>
            <span className="chat-answer" dangerouslySetInnerHTML={{ __html: this.filterAnswer(entry.ANSWER) }}></span>
            {/* <span className="chat-answer">{entry.ANSWER}</span> */}
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className="chat-title">
          <img src={chatlogo} className="chat-logo" /><span>实时对话</span>
        </div>
        <div className="chat-board">
          <div className="chat-scroll">
            {chat_list}
          </div>
        </div>
      </div>
    )
  }
}