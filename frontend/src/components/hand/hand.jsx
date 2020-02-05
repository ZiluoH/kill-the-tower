import React from 'react'
import Card from '../card/card'
import './hand.css'
import {gsap} from 'gsap' 


class Hand extends React.Component {
    constructor(props){
        super(props)
        
        this.Cards = [];
        this.Tween = null;
        this.state = {
            hand: []
        }
        this.drawCard = this.drawCard.bind(this);
        this.playCard = this.playCard.bind(this);
        this.endTurn = this.endTurn.bind(this);
    }
    
    componentDidMount(){
        const tl = gsap.timeline()
        tl.from(this.Cards,{stagger: 0.5, ease:"elastic(1, 0.2)",scale: 0.1, x: -1000, y:1000, skewX: 45} )
        this.drawCard();
    }

    componentDidUpdate(){
        if (this.props.enengy <= 0) {
            setTimeout( () => {
                this.props.endTurn();
                this.drawCard();
            } , 1500);
        }
    }
   
    playCard(cardId){
        this.setState({
            hand: this.state.hand.filter(card => card._id !== cardId)
        })
    }
 
    drawCard(){
        let hands = [];
        let temp = [...this.props.deck]
        // debugger
        temp = temp.sort(() => (.5 - Math.random()));
        while (hands.length < 5) {
            hands.push(temp.pop());
        }
        this.setState({hand: hands});
    }

    endTurn(){
        this.props.endTurn();
        this.drawCard();
    }

    render(){
        const { player, enemy, enengy} = this.props;
        console.log(this.props);
        
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