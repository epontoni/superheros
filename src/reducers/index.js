import * as actionType from '../actions/actionsType'

const initialState = {
    league: [],
    loading: false,
    isAuthenticated: false,
}

export const heroReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_HERO_TO_LEAGUE:
            return {
                ...state,
                league: state.league.concat(action.payload),
            }
        case actionType.ERASE_LEAGUE_HERO:
            return {
                ...state,
                league: state.league.filter( hero => hero.id !== action.payload),
            }
        case actionType.LOG_IN_USER:
            return {
                ...state,
                isAuthenticated: true,
            }
        case actionType.LOG_OUT_USER:
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}

