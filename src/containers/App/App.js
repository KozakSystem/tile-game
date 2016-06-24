import React, { Component, PropTypes } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pageActions from '../../actions/PageActions'
import Header from '../../components/Header'
import s from './App.scss'
import '../../styles/global.scss'


class App extends Component {
  render() {
    const { page } = this.props

    return (
      !this.props.error ? (
        <div className={s.root}>
          <Header show={page.game_start} />
          <div className={`${s.contentWrapper} content-container`}>
            {this.props.children}
          </div>
        </div>
      ) : this.props.children
    )
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
