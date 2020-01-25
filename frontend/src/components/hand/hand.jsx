import React from 'react'
import Card from '../card/card'
import './hand.css'
import {gsap} from 'gsap' 
import {fetchStarterCards} from '../../actions/card_actions'

class Hand extends React.Component {
    constructor(props){
        super(props)
        this.Cards = [];
        this.Tween = null;
        this.state = {
            hand:[]
        }
        this.drawCard = this.drawCard.bind(this);
    }
    
    componentDidMount(){
        
        this.Tween = gsap.from(this.Cards, 0.1, { duration: 1, scale: 0.01, ease: "elastic.easeOut.config(1, 0.3)",stagger: {amount:1, from: 0} } )
        this.drawCard();
    }
   
    playCard(i){
        this.setState({
            cards: delete this.state.cards[i]
        })
    }

    drawCard(){
        let hands = [];
        while (hands.length < 5) {
            hands.push(this.props.deck[Math.floor(Math.random() * 10) ]);
        }
        this.setState({hand: hands})
    }



    render(){
        const { player, enemy, deck} = this.props;
        
        
        return(
            <div className="hand" 
            style={{width:`${this.props.cards.length* 189 +30*(this.props.cards.length - 1)}px`}} >
               
                <div>{this.props.enengy}/4</div>
                <ul>
                    
                    {this.state.hand.map((card,i) =>{
                    
                    return (
                      <li key={i} ref={li => (this.Cards[i] = li)}>
                        <Card
                          cost={card.cost}
                          name={card.name}
                          description={card.description}
                          img={card.img}
                          player={player}
                          enemy={enemy}
                          Strike = {this.props.Strike}
                        />
                      </li>
                    );})}
                </ul>
                <div>
                    <button>end turn</button>
                </div>
            </div>
        )



    }
}

export default Hand;