import {
  PREPARE_ROUND,
  ROUND_READY,
  DROP_ROUND,
  GENERATE_CURRENT_ROUND,
  CHANGE_ACTIVE_TILE,
  SET_FINISH_TILES,
  SET_GAME_SCORE,
  GO_TO_NEXT_ROUND
} from '../constants/Game'
import load from '../utils/load'

const default_round_opt = {
  active_tile: {},
  finish_tiles: {},
  time: DEFAULT_ROUND_TIME,
  score: 0
}

export function generateRound() {
  
  return (dispatch, getState) => {
    const all_tiles = getState().page.game_data

    dispatch({
      type: PREPARE_ROUND 
    })

    dispatch({
      type: GENERATE_CURRENT_ROUND,
      payload: {
        number: 1,
        tiles: tilesGenerator(all_tiles),
        ...default_round_opt
      }
    })

    dispatch({
      type: ROUND_READY 
    })
  }
}

export function dropRound() {
  
  return (dispatch, getState) => {
    dispatch({
      type: DROP_ROUND,
      payload: {
        number: 0,
        tiles: null,
        ...default_round_opt
      }
    })
  }
}

export function setActiveTile(tile_id, group_id) {
  
  return (dispatch) => {
    dispatch({
      type: CHANGE_ACTIVE_TILE,
      payload: {
        id: tile_id,
        group_id: group_id
      }
    })
  }

}

export function setFinishTiles(tiles) {
  
  return (dispatch, getState) => {
    dispatch({
      type: SET_FINISH_TILES,
      payload: tiles
    })
  }

}

export function goToNextRound() {
  
  return (dispatch, getState) => {
    const all_tiles = getState().page.game_data
    let prev_round = getState().game.current_round 
    
    dispatch({
      type: PREPARE_ROUND
    })

    dispatch({
      type: GENERATE_CURRENT_ROUND,
      payload: {
        ...default_round_opt,
        number: prev_round.number + 1,
        tiles: tilesGenerator(all_tiles),
        score: prev_round.score,
        time: prev_round.time > 20 
              ? prev_round.time - 5
              : prev_round.time
      }
    })

    dispatch({
      type: ROUND_READY 
    })
  }

}

export function setGameScore() {
  
  return (dispatch, getState) => {
    let score = getState().game.current_round.score

    dispatch({
      type: SET_GAME_SCORE,
      payload: ++score
    })
  }

}


function tilesGenerator(tiles) {
  let tiles_length = _.size(tiles)
  let require_length = DEFAULT_TILES_COUNT / 2

  if(tiles_length * 2 > DEFAULT_TILES_COUNT) {
    return _.sampleSize(tiles, require_length)
  } else {
    let output_tiles = _.clone(tiles) 

    while(output_tiles.length < require_length) {
      output_tiles[output_tiles.length] = _.sample(tiles)
    }

    _.forEach(output_tiles, function(value, key) {
      let push_id = output_tiles.length
      
      output_tiles[push_id] = _.clone(value)
      output_tiles[push_id].id = push_id
    });

    return _.shuffle(output_tiles)
  }
}