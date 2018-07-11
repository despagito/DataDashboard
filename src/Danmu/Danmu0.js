import React, { Component } from 'react';
import './Danmu.css';


export default class Danmu extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
  }

  // add a new danmu
  handleAddList(value) {
    // 如果直接push到content,还需不需要setState呢?
    let data = this.props.content;
    data.push({ value: value });
    this.setState({ data });
  }

  render() {
    return (
      <div className="danmu">
        <div className="danmu-title"><img src="/src/Danmu/danmu-logo.png" className="danmu-title-img" /><span>用户原声</span></div>
        <Main
          data={this.props.content}
          url="./src/img.jpg"
        />
        {/* 这是发弹幕的入口,暂时不需要 */}
        {/* <Prompt buttonValue={this.handleAddList.bind(this)} /> */}
      </div>
    );
  }
}

class Main extends Component {
  move_simultaneously() {
    // console.log(this.props.data);
    let span = document.querySelector('.main_dan').querySelectorAll('span');
    for (let i = 0; i < span.length; i++) {
      span[i].classList.remove("move")
    }

    // init,Set offset everytime mount
    for (let i = 0; i < span.length; i++) {
      span[i].style.offset = { left: '100%' }
    }
    let i = 0;
    let timer = null;

    // 控制每个item的发送时间不等
    // must bind anonymous function to this.
    timer = setInterval(function () {
      // 通过 css animation 动起来. 这一步会覆盖原来的className,有没有add class的方法呢?
      span[i].className = 'move';
      i++;

      if (i >= span.length) {
        clearInterval(timer);
      }
    }.bind(this), 2000);
  }
  move_messily() {
    // todo
    // dont overlap
    // dont start at once
  }
  move_multi_thread() {
    // todo
    // lines = full_height / single_height
    // create lines queue
    let lines = this.clientHeight / 40
    // console.log(this)
  }
  componentDidMount() {
    // if (this.props.content) {
    this.move_simultaneously();
    // }
  }

  componentDidUpdate() {
    // if (this.props.content) {
    this.move_simultaneously();
    // }
  }

  render() {
    // 每次选出5个,然后五个分别上下浮动一点点就行了.
    let valList = this.props.data.map(function (itemlist, key) {
      return (
        <Item value={itemlist.context} top={itemlist.top} key={key} />
      );
    }, this);

    return (
      <div className="main" style={{ backgroundImage: 'url(' + this.props.url + ')' }}>
        <section className="main_dan">
          {valList}
        </section>
      </div>
    );
  }
}

class Item extends Component {

  render() {
    let value = this.props.value;
    // let top = this.props.top; // 需要在不同层次发出
    let top = Math.floor(Math.random() * 90)

    // console.log(top)

    let bg_choices = ['#7C9CE2', '#2C59BB', '#2c4785'] // '#CAD8F0',
    let random_bg = bg_choices[Math.floor(Math.random() * bg_choices.length)];
    // let random_bg = bg_choices[1]

    return (
      <span style={{ top: top + "%", left: '100%', background: random_bg }} className="damu-item">{value}</span>
    );
  }
}

// 这里是用来发弹幕的地方.
class Prompt extends Component {
  buttonValue(e) {
    e.preventDefault();
    let value = this.refs.tcval.value.trim();
    if (!value) {
      return;
    }
    this.props.buttonValue(value);
    this.refs.tcval.value = "";
  }

  render() {
    return (
      <form className="prompt" onSubmit={this.buttonValue.bind(this)}>
        <input id="tcval" ref="tcval" type="text" placeholder="吐槽一下！" />
        <button type="submit">吐槽</button>
      </form>
    );
  }
}


