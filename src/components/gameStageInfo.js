import React from 'react';

import { connect } from 'react-redux';


class gameStageInfo extends React.Component{

    gameStageDescription={
        0: 'Rozmieść swoich budowniczych',
        1: `${this.props.players.player1}: Wybierz budowniczego`,
        2: `${this.props.players.player1}: Przemieść budowniczego`,
        3: `${this.props.players.player1}: Wybierz pole do budowy`,
        4: `${this.props.players.player2}: Wybierz budowniczego`,
        5: `${this.props.players.player2}: Przemieść budowniczego`,
        6: `${this.props.players.player2}: Wybierz pole do budowy`
    }


    render(){
        if(this.props.gameStage!==null){
        return <div>{this.gameStageDescription[this.props.gameStage]}</div>
        }
        else{
            return <div>{`Wygrał gracz: ${this.props.players.winner}`}</div>
        }
    }
}


const mapStateToProps=(state)=>{
    return {gameStage: state.gameStage,
            players: state.players};
}

export default connect(mapStateToProps, {})(gameStageInfo);


