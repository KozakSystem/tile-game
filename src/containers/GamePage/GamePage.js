import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pageActions from '../../actions/PageActions'
import * as gameActions from '../../actions/GameActions'
import InfoPanel from '../../components/InfoPanel'
import Tile from '../../components/Tile'
import s from './GamePage.scss'

class GamePage extends Component {
  static childContextTypes = {
    active_tile: PropTypes.object,
    finish_tiles: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      show_round_num: false
    }
  }

  getChildContext() {
    const { active_tile, finish_tiles } = this.props.game.current_round

    return {
      active_tile: active_tile,
      finish_tiles: finish_tiles
    }
  }

  componentWillMount() {
    const { 
      page, 
      pageActions,
      gameActions } = this.props

    if(pageActions) {
      pageActions.getGameData(() => {
        gameActions.generateRound()
        pageActions.startGame()
      })
    }
  }

  componentWillUpdate(nextState) {
    const { game, gameActions } = this.props
    let self = this

    if(nextState.game.current_round.number !== game.current_round.number) {
      this.setState({
        show_round_num: true
      })

      setTimeout(function() {
        self.setState({
          show_round_num: false
        })
      }, 1500)
    }
  }

  componentDidUpdate() {
    const { game, gameActions } = this.props
    const { current_round } = this.props.game
    
    if(
      _.size(current_round.tiles) !== 0 
      && _.size(current_round.finish_tiles) === _.size(current_round.tiles) / 2
    ) {
      gameActions.goToNextRound()
    }
  }

  clickHandler(tile_id, group_id) {
    const  { game, gameActions } = this.props
    let { active_tile, finish_tiles } = game.current_round
  
    if(
      tile_id !== active_tile.id
      && group_id === active_tile.group_id 
      && !finish_tiles[active_tile.group_id]
    ) {
      let obj = {}
      obj[active_tile.group_id] = {}
      obj[active_tile.group_id][active_tile.id] = game.current_round.tiles[active_tile.id]
      obj[active_tile.group_id][tile_id] = game.current_round.tiles[tile_id]
      
      gameActions.setFinishTiles(obj)
      gameActions.setGameScore()
    }

    if(
      tile_id !== active_tile.id
      && !finish_tiles[group_id]
    ) {
      gameActions.setActiveTile(tile_id, group_id)

      setTimeout(function(tile_id) {
        if(active_tile.id == tile_id) gameActions.setActiveTile(null)
      }, DEFAULT_TILE_SHOW_TIME)
    }
  }

  renderTiles(tiles) {
    if(!tiles) return

    return tiles.map((tile, i) => {
      return <Tile 
              key={i}
              id={tile.id}
              group_id={tile.group_id}
              img={tile.img} 
              color={tile.color} 
              onClick={this.clickHandler.bind(this)} />
    })
  }

  render() {
    const { page, game, gameActions } = this.props
    
    return (
      <div className={`${s.root} ${page.game_start ? s.show : ''}`}>
        <div className={`${s.roundInfo} ${!this.state.show_round_num ? s.hide : ''}`} 
             style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0}}>
             <span className={s.roundNum}>Round <i>{game.current_round.number}</i></span>
        </div>

        <div className="container">
          <InfoPanel 
            round={game.current_round.number}
            time={DEFAULT_ROUND_TIME}
            score={game.current_round.score}
            endTimeHandler={gameActions.dropRound} />

          <div className={s.tileList}>
            { this.renderTiles(game.current_round.tiles) }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
    game: state.game
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
