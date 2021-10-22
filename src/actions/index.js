import * as types from './actionsType'

export const addHeroToLeague = (hero) => ({
    type: types.ADD_HERO_TO_LEAGUE,
    payload: hero,
})

export const eraseHero = (heroId) => ({
    type: types.ERASE_LEAGUE_HERO,
    payload: heroId,
})

export const logInUser = () => ({
    type: types.LOG_IN_USER,
    payload: true,
})

export const logOutUser = () => ({
    type: types.LOG_OUT_USER,
    payload: false,
})
