import React, { Component, PropTypes } from 'react'
import s from './Tile.scss'

export default class Tile extends Component {
  static propTypes = {
    img: PropTypes.string,
    color: PropTypes.string
  }

  static contextTypes = {
    active_tile: PropTypes.object,
    finish_tiles: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  clickHandler() {
    this.props.onClick(+arguments[0], +arguments[1])
  }

  isActive() {
    let { active_tile, finish_tiles } = this.context

    return this.props.id === active_tile.id || finish_tiles[this.props.group_id]
  }

  render() {
    let { active_tile } = this.context

    return (
      <div className={`${s.root} ${this.isActive() ? s.active : ''} animated flipInY`} 
           onClick={this.clickHandler.bind(this, this.props.id, this.props.group_id)} 
           style={{ backgroundColor: this.isActive() ? this.props.color : '#7b706d' }}
           data-tile-id={this.props.id}>
           <img src={this.props.img} alt="tile" />
           <span className={`${s.hoverCard} animated ${this.isActive() ? 'zoomOut' : 'zoomIn'}`}></span>
      </div>
    );
  }
}
