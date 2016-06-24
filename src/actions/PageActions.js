import {
  START_GAME,
  STOP_GAME,
  GAME_DATA_REQUEST,
  GAME_DATA_SUCCESS,
  GAME_DATA_FAIL,
} from '../constants/Page'
import load from '../utils/load'

export function startGame() {
  
  return (dispatch, getState) => {
    dispatch({
      type: START_GAME
    })
  }

}

export function stopGame() {
  
  return (dispatch, getState) => {
    dispatch({
      type: STOP_GAME,
    })
  }
  
}

export function getGameData(callback) {

  return (dispatch, getState) => {
    dispatch({
      type: GAME_DATA_REQUEST
    })
  
    load(DEFAULT_TAILS_DATA)
      .then((data)=> {
        data = JSON.parse(data)
        
        dispatch({
          type: GAME_DATA_SUCCESS,
          payload: data
        })

        if(callback) callback()
      })
  }

}
