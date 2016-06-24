import React, { Component, PropTypes } from 'react'
import Link from '../Link'
import s from './Menu.scss'


export default class Menu extends Component {
  render() {
    return (
      <div className={`${s.root} ${this.props.show ? 'center' : 'top'}`} style={{ opacity: 0, visibility: 'hidden'}}>
        <div className={s.topBlk}>
          <h1 className={s.headline}>Tile Game</h1>
        </div>

        <div className={s.bottomBlk}>
          <Link to="game" className={`${s.link} animated pulse infinite`}>Click to begin...</Link>
        </div>
      </div>
    );
  }
}
