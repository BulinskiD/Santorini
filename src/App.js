import React from 'react';
import { connect } from 'react-redux';

import Board from './components/Board';
import GameStageInfo from './components/gameStageInfo';
import GameControl from './components/gameControl';
import { updateGameStage, resetGame  } from './actions';



class App extends React.Component {
    
    renderBoard=()=>{
        return (
        <div>
        <div className="row">
        <Board />
        </div>
        <GameStageInfo />
        </div>);
    }
    
    render(){
        return (
            <div className="container">
            <GameControl />
            {this.props.gameStage>-1 ? this.renderBoard(): null}
            </div>);
        }
}

const mapStateToProps = (state) =>{
    return{
        gameStage: state.gameStage
    }
}


export default connect(mapStateToProps, {updateGameStage, resetGame})(App);
