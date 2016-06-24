import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Menu from '../../components/Menu'
import * as pageActions from '../../actions/PageActions'
import * as gameActions from '../../actions/GameActions'

class MainPage extends Component {

  componentWillMount() {
    const { page, pageActions, gameActions } = this.props


    if(pageActions && page.game_start) {
      pageActions.stopGame()
      gameActions.dropRound()
    }
  }

  render() {
    const { page } = this.props

    return (
      <div>
        <Menu show={!page.game_start} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
