export const buildersSelect = (props, pole)=>{

    for(let builder in props.builderPos){
        if(props.builderPos[builder]===pole){
            return 0;
        }
    }

    if (props.builderPos.length === 0) {
        pole.builder= 'builder1';
        pole.current1= true;
        props.placeBuilder(pole);
        return 0;
    }
    else if (props.builderPos.length === 1) {
        pole.builder= 'builder2';
        pole.current1= true;
        props.placeBuilder(pole);
        return 0;
    }
    else if (props.builderPos.length === 2) {
        pole.builder= 'builder3';
        pole.current2= true;
        props.placeBuilder(pole);
        return 0;
    }
    else if (props.builderPos.length === 3) {
        pole.builder= 'builder4';
        pole.current2= true;
        props.placeBuilder(pole);
        return 1;
    }
    else {
        return 0;
    }
}



export const build = (props, pole) =>{
    if (pole.active && pole.level < 4) {
            pole.level += 1;
            props.updatePole(pole);
            props.updateGameStage();
            findActive(props, true, {});
    }
}




export const onBuilderMove = async (props, pole, builder1, builder2) =>{
    if (pole.active) {


        pole.builder = props.selectedPole.builder;
        
        let oldPole= {...props.selectedPole};
        pole.current1 = props.selectedPole.current1;
        pole.current2 = props.selectedPole.current2;
       
       
        oldPole.builder='';
        oldPole.current1=false;
        oldPole.current2=false;
        
        props.poles[oldPole.id]=oldPole;

   
        
        let secondBuilder;
        if (props.selectedPole.builder === builder1.text) {
            secondBuilder=props.builderPos[builder2.index];
        }
        else {
            secondBuilder=props.builderPos[builder1.index];
        }

        await props.moveBuilder(pole);
        await props.updatePole(oldPole);
        await props.updatePole(pole);


        checkWin(props, pole, secondBuilder);
    }
}


const checkWin = async (props, pole, secondBuilder)=>{
    if(pole.level<3){   
        findActive(props, false, pole, secondBuilder);
        props.updateGameStage();
    }
    else{
        if(pole.builder === 'builder1' || pole.builder === 'builder2'){
            await props.endGame({'winner':props.players.player1});
        }
        else{
            await props.endGame({'winner':props.players.player2});
        }
        findActive(props, true, {}, {});
    }
}




export const selectBuilder = (props, current, pole) =>{
    if (current) {
        findActive(props, false, pole);
        props.selectPole(pole);
        props.updateGameStage();
    }
}




const findActive= (props, resetActive, builder1, builder2={}) =>{

    props.poles.map((pole)=>{
        
        if((!pole.current1 && !pole.current2) &&
            (((pole.x<=builder1.x+1 && pole.y<=builder1.y+1) &&
            (pole.x>=builder1.x-1 && pole.y>=builder1.y-1)) || 
            ((pole.x<=builder2.x+1 && pole.y<=builder2.y+1) &&
            (pole.x>=builder2.x-1 && pole.y>=builder2.y-1))) && !resetActive){
        
                if((props.gameStage===5 && pole.level<4) || (props.gameStage===2 && pole.level<4) || pole.level<= builder1.level+1){
                    pole.active= true;
                }

        }
        else{            
            pole.active= false;
         }
     props.updatePole(pole);
     return pole;
});

}


