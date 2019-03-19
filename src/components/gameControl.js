import React from 'react';

import {connect} from 'react-redux'
import {resetGame, updateGameStage, setPlayersNames} from '../actions';


class gameControl extends React.Component{
    
    state={
        player1: '',
        player2: '',
        error: null
    };

    
    validate = (e) =>{
        e.preventDefault();
        if(this.state.player1 !== '' && this.state.player2 !== ''){
            this.props.setPlayersNames({player1: this.state.player1, player2: this.state.player2});
            this.props.updateGameStage();
            this.setState({error: null});
        }
        else{
            this.setState({error: "Podaj poprawne nazwy graczy!"});            
        }
    }
    

    renderOnGameForm(){
        return(
        <div className="mb-1">
            <button className="btn btn-dark" onClick={ this.props.resetGame }>
                Zacznij od nowa
            </button>
        </div>);
    }

    renderOffGameForm(){
        return (<div className="col-12 mt-3">
            <form onSubmit={ this.validate } className="mx-auto mt-3" style={{width: '400px'}}> 
                <div className="form-group row">
                    <div 
                    className={this.state.error!==null ? 'anim col-12 alert alert-danger text-center' : 'anim'}>
                    {this.state.error}</div>
                </div>
                <div className="form-group row">
                    <label className="col-4 text-center" htmlFor="player1">Gracz 1</label>
                    <input className="col-8 form-control" value={this.state.player1} onChange={e=>this.setState({player1: e.target.value})} name="player1" type="text" />
                </div>
                <div className="form-group row">
                    <label className="col-4 text-center" htmlFor="player2">Gracz 2</label>
                    <input className="col-8 form-control" value={this.state.player2} onChange={e=>this.setState({player2: e.target.value})} name="player2" type="text" />
                </div>
                <input type="submit" className="btn btn-dark float-right" value='Rozpocznij grę' />                
            </form>
        </div>
        );
    }
    
    
    
    render() {
        if(this.props.gameStage>-1){
            return (
                <div>{this.renderOnGameForm()}</div>
            );
        }
        else{
            return(
                <div>{this.renderOffGameForm()}</div>
            )
        }
    }
}










const mapStateToProps= (state)=>{
       return { 
           gameStage: state.gameStage

        }
}

export default connect(mapStateToProps, {updateGameStage, resetGame, setPlayersNames})(gameControl);