import React from 'react';
import { connect } from 'react-redux';

import {endGame} from '../actions';

import SinglePole from './singlePole/singlePole';

class Board extends React.Component {


    renderBoard=()=>{
        let board=[];
        let id=0;
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                            board.push(
                <SinglePole
                    key={id} 
                    id={id} 
                    x={j} 
                    y={i} />);
                id++;
            }
        }
        return board; 
    }


    render(){
        return this.renderBoard();
    }
}

const mapStateToProps=(state)=>{
    return {builderPos: state.builderPos,
            gameStage: state.gameStage,
            selectedPole: state.selectedPole,
            pole: state.pole}
}

export default connect(mapStateToProps, {endGame})(Board);