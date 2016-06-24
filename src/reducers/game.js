import {
  PREPARE_ROUND,
  ROUND_READY,
  DROP_ROUND,
  GENERATE_CURRENT_ROUND,
  CHANGE_ACTIVE_TILE,
  SET_GAME_SCORE,
  SET_FINISH_TILES
} from '../constants/Game'

const initialState = {
  current_round: {
    number: 0,
    active_tile: {},
    finish_tiles: {},
    game_time: 0,
    score: 0,
    tiles: null
  },
  rounds: {},
  fetching: false
}

export default function game(state = initialState, action) {

  switch (action.type) {

    case PREPARE_ROUND:
      return { 
        ...state, 
        fetching: true
      }

    case ROUND_READY:
      return { 
        ...state, 
        fetching: false
      }

    case DROP_ROUND:
      return { 
        ...state, 
        current_round: action.payload
      }
    
    case GENERATE_CURRENT_ROUND:
      return { 
        ...state, 
        current_round: action.payload
      }

    case CHANGE_ACTIVE_TILE:
      return { 
        ...state, 
        current_round: {
          ...state.current_round,
          active_tile: action.payload
        }
      }

    case SET_GAME_SCORE:
      return { 
        ...state, 
        current_round: {
          ...state.current_round,
          score: action.payload
        }
      }

    case SET_FINISH_TILES:
      return { 
        ...state, 
        current_round: {
          ...state.current_round,
          finish_tiles: {
            ...state.current_round.finish_tiles,
            ...action.payload
          }
        }
      }

    default:
      return state;
  }

}
