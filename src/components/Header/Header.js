import React, { Component, PropTypes } from 'react'
import Link from '../Link'
import s from './Header.scss'


export default class Header extends Component {
  render() {
    return (
      <div className={`${s.root} ${this.props.show ? s.show : ''}`}>
       <h1 className={s.headline}>Tile Game</h1>
       <Link to="/" className={s.closeLink}></Link>
      </div>
    );
  }
}
