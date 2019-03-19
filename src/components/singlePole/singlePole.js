import React from 'react';
import { connect } from 'react-redux';

import { selectPole, addPole, updatePole, placeBuilder, moveBuilder, endGame, updateGameStage } from '../../actions';
import './singlePole.css';
import { buildersSelect, build, onBuilderMove, selectBuilder } from '../../logic/';


class singlePole extends React.Component {

    componentDidMount() {
        let pole = { id: this.props.id, x: this.props.x, y: this.props.y, level: 0, current1: false, current2: false, builder: ''}
        this.props.addPole(pole);
    }

    checkIfActive = () => {
        let newClass = 'singlePole';

        switch (this.props.pole.level){
            case 0:
                newClass+=' level0';
                break;
            case 1:
                newClass+=' level1';
                break;
            case 2:
                newClass+=' level2';
                break;
            case 3:
                newClass+=' level3';
                break;
            case 4:
                newClass+=' level4';
                break;
            default:
                break;
        }


        // Set all active for placing builders
        if(this.props.gameStage===0 && !this.props.pole.current1 && !this.props.pole.current2){
            newClass+=' active';
        }


        // Mark active poles and builders positions
        if (this.props.pole.active) {
            newClass += ' active';
        }
        else if (this.props.pole.current1) {
            newClass += ' current1';
        }
        else if(this.props.pole.current2){
            newClass+=' current2';
        }



        // Set hover class for current player
        if((this.props.gameStage===1 && this.props.pole.current1) ||
            (this.props.gameStage===4 && this.props.pole.current2)){
            newClass+=' current_active';
        }

        return newClass;
    }


    gameAnalyse = async (pole) => {

        switch (this.props.gameStage) {
            default:
                // Place builders
                if(buildersSelect(this.props, pole)){ //Return true when every builder is placed
                    this.props.updateGameStage();
                }
            break;

            case 1: case 4:
                // Select builder
                selectBuilder(this.props, this.props.gameStage===1?pole.current1: pole.current2, pole);
                break;


            case 2: case 5:
                // Move builder
                let builder1= {'index': 0, 'text': 'builder1'};
                let builder2=  {'index': 1, 'text': 'builder2'};

                if(this.props.gameStage===5){
                    builder1=  {'index': 2, 'text': 'builder3'};
                    builder2=  {'index': 3, 'text': 'builder4'}; 
                }
                
                await onBuilderMove(this.props, pole, builder1, builder2); 
            break;


            case 3: case 6:
                // Build
                build(this.props, pole);
            break;
            

            case null:
                //Game ENDED
            break;
        }
    }


    render() {
        if (this.props.pole !== undefined) {
            return (
                <div
                    onClick={() => { this.gameAnalyse(this.props.pole); }}
                    className={this.checkIfActive()}>
                    {this.props.pole.level}
                </div>);
        }

        return <div className="singlePole"></div>;
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        pole: state.pole[ownProps.id],
        poles: state.pole,
        builderPos: state.builderPos,
        gameStage: state.gameStage,
        selectedPole: state.selectedPole,
        players: state.players
    }

}

export default connect(mapStateToProps, {
    placeBuilder,
    moveBuilder,
    selectPole,
    addPole,
    updatePole,
    endGame,
    updateGameStage
})(singlePole);