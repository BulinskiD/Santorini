export const moveBuilder=(pole)=>{
    return{
        type: 'MOVE_BUILDER',
        payload: pole
    }
}

export const placeBuilder=(pole)=>{
    return{
        type:'PLACE_BUILDER',
        payload: pole
    }
}


export const selectPole=(pole)=>{
    return {
        type: 'SELECTED_POLE',
        payload: pole
    }
}

export const addPole=(pole)=>{
    return{
        type: 'ADD_POLE',
        payload: pole
    }
}

export const updatePole=(pole)=>{
    return{
        type: 'UPDATE_POLE',
        payload: pole
    }
}

export const setPlayersNames = (players) =>{
    return{
        type: 'SET_PLAYERS_NAMES',
        payload: players
    }
}

export const resetGame = () =>{
    return {
        type: 'RESET_GAME'
    }
}

export const updateGameStage=()=>{
    return {
        type: 'UPDATE_GAME_STAGE'
    }
}

export const endGame = (winner)=>{
    return {
        type: 'END_GAME',
        payload: winner
    }
}