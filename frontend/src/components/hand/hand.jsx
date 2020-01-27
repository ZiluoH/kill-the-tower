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
            hand:[]
        }
        this.drawCard = this.drawCard.bind(this);
    }
    
    componentDidMount(){
        const tl = gsap.timeline()
        tl.from(this.Cards,{stagger: 0.5, ease:"elastic(1, 0.2)",scale: 0.1, x: -1000, y:1000, skewX: 45} )
        this.setState({hand: this.props.deck.slice(5)})
        setTimeout(() => console.dir(this.props), 500);
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
                          strike = {this.props.strike}
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