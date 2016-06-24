import React, { Component, PropTypes } from 'react'
import s from './InfoPanel.scss'

let clockInterval

export default class InfoPanel extends Component {
  static propTypes = {
    time: PropTypes.number,
    score: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      round: this.props.round,
      time: this.props.time,
      show_message: false
    }
  }

  componentWillUpdate(nextState) {
    if(nextState.round !== this.props.round) {
      this.setState({
        time: DEFAULT_ROUND_TIME
      })
    }
  }

  componentDidMount() {
    this.clock()
  }

  componentWillUnmount() {
    clearTimeout(clockInterval)
  }

  clock() {
    let self = this
    
    clockInterval = setInterval(function() {
      if(self.state.time <= 0) {
        self.setState({
          show_message: true
        })

        clearTimeout(clockInterval)
        return
      }

      self.setState({
        time: self.state.time - 1
      })
    }, 1000)
  }

  render() {
    return (
      <div className={s.root}>
        <div>
          <h2 className={s.title}>Round {this.props.round}</h2>
        </div>

        {
          this.state.time 
          ? <div className={s.timeBlk}>
              <span>Time: {this.state.time}</span>
            </div>
          : 0
        }

        <div className={s.scoreBlk}>
          <span>Score: {this.props.score}</span>
        </div>

        <div className={`${s.messageBlk} ${this.state.show_message ? s.show : ''}`}>
          <p className={s.message}>You lose!</p>
        </div>
      </div>
    );
  }
}
