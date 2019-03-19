import {combineReducers} from 'redux';

const selectedPoleReducer = (selectedPole = null, action) =>{
    if(action.type=== 'SELECTED_POLE'){
        return action.payload;
    }

    if(action.type=== 'RESET_GAME'){
        return null;
    }
    return selectedPole;
}

const poleReducer= (state= [], action) =>{
    if(action.type === 'ADD_POLE'){
        return [...state, action.payload];
    }
    if(action.type === 'UPDATE_POLE'){
        let newState = [...state];
        newState[action.payload.id]= action.payload;
        return newState;
    }
    if(action.type=== 'RESET_GAME'){
        return [];
    }
    
    return state;
}

const builderPosReducer= (state = [], action)=>{
    
    if(action.type === 'PLACE_BUILDER'){
        return [...state, action.payload]
    }
    if(action.type === 'MOVE_BUILDER'){
        let newState= [...state];
        newState[newState.findIndex( x=>x.builder===action.payload.builder )]= action.payload;
        return newState;
    }
    if(action.type=== 'RESET_GAME'){
        return [];
    }
    return state;
}

const gameStageReducer= (state= -1, action) =>{
    if(action.type === 'UPDATE_GAME_STAGE'){
        let newState=state;
        if(state<=5){
        return newState+1;
        }
        else
        return 1;
    }

    if(action.type === 'RESET_GAME'){
        return -1;
    }

    if(action.type === 'END_GAME'){
        return null;
    }
    return state;
}


const playersReducer= (state={}, action)=>{
    if(action.type === 'SET_PLAYERS_NAMES'){
        return action.payload;
    }
    if(action.type === 'RESET_GAME'){
        return {};
    }  
    if(action.type === 'END_GAME'){
        return action.payload;
    }  
    return state;
}


export default combineReducers({
    selectedPole: selectedPoleReducer,
    pole: poleReducer,
    builderPos: builderPosReducer,
    gameStage: gameStageReducer,
    players: playersReducer
});