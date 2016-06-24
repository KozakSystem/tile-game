import React, { Component, PropTypes } from 'react'
import s from './NotFound.scss'

export default class NotFound extends Component {
  render() {
    return (
      <div className={s.root}>
        <img src={require('./not-found.svg')} alt="Page not found"/>
        <h1 className={s.title}>Page not found</h1>
      </div>
    );
  }
}
