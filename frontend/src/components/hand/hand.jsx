import React from 'react'
import Card from '../card/card'
import './hand.css'
import {gsap} from 'gsap' 


class Hand extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            hand: [],
            playerTurn: true
        }
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.endTurn = this.endTurn.bind(this);
    }
    
    componentDidMount(){
        // const tl = gsap.timeline()
        // tl.from(this.state.hand,{stagger: 0.5, ease:"elastic(1, 0.2)",scale: 0.1, x: -1000, y:1000, skewX: 45} )
        this.drawCard();
    }

    componentDidUpdate(){
        if (this.props.enengy <= 0 && this.state.playerTurn) {
            this.endTurn();
        }
    }
   
    playCard(cardId){
        this.setState({
            hand: this.state.hand.filter(card => card._id !== cardId)
        })
    }
 
    drawCard(){
        let temp = [...this.props.deck]
        temp = this.shuffle(temp);
        this.setState({hand: temp.slice(5)});
    }

    shuffle(array) {
        let i = 0;
        let j = 0;
        let temp = null;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array;
    }

    endTurn(){
        if(this.state.playerTurn){
            this.setState({ playerTurn: false });
            setTimeout(() => {
                this.props.endTurn();
            }, 1000);

            setTimeout(() => {
                this.drawCard();
                this.setState({ playerTurn: true })
            }, 2000);
        }
    }

    render(){
        const { player, enemy, enengy} = this.props;
        
        return(
            <div className="hand" 
            style={{width:`${this.state.hand.length* 189 +30*(this.state.hand.length - 1)}px`}} >
               
                <div>{this.props.enengy}/4</div>
                <ul>
                    
                    {this.state.hand.map((card,i) =>{
                        let action;
                        switch (card.name) {
                            case "Strike":
                                action = this.props.strike;
                                break;
                            case "Bash":
                                action = this.props.bash;
                                break;
                            case "Defend":
                                action = this.props.defend;
                                break;
                            case "Barrier":
                                action = this.props.barrier;
                                break;
                            default:
                                return null;
                        }

                    return (
                      <li key={i}>
                        <Card
                          id={card._id}
                          cost={card.cost}
                          name={card.name}
                          description={card.description}
                          img={card.img}
                          player={player}
                          enemy={enemy}
                          action = {action}
                          enengy = {enengy}
                          playCard = {this.playCard}
                          playerTurn={this.state.playerTurn}
                        />
                      </li>
                    );})}
                </ul>
                <div>
                    <button onClick={this.endTurn}>end turn</button>
                </div>
            </div>
        )
    }
}

export default Hand;