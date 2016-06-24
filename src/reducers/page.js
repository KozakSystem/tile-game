import {
  START_GAME,
  STOP_GAME,
  GAME_DATA_REQUEST,
  GAME_DATA_SUCCESS,
  GAME_DATA_FAIL
} from '../constants/Page'

const initialState = {
  game_start: 0,
  game_data: null,
  fetching: false,
  error: ''
}

export default function page(state = initialState, action) {

  switch (action.type) {

    case START_GAME:
      return { ...state, game_start: 1 }

    case STOP_GAME:
      return { ...state, game_start: 0 }

    case GAME_DATA_REQUEST:
      return { ...state, fetching: true }
    
    case GAME_DATA_SUCCESS:
      return { 
        ...state, 
        game_data: action.payload,
        fetching: false
      }

    case GAME_DATA_FAIL:
      return { ...state, error: 'Load data fail' }

    default:
      return state;
  }

}
