import React from 'react'
import Card from '../card/card'
import './hand.css'
import {TweenLite, TimelineLite, Elastic} from 'gsap' 
import {fetchStarterCards} from '../../actions/card_actions'

class Hand extends React.Component {
    constructor(props){
        super(props)
        this.Cards = [];
        this.Tween = null;
    }

    componentDidMount(){
        
        this.Tween = TweenLite.from(this.Cards, 0.1, { duration: 1, scale: 0.01, ease: "elastic.easeOut.config(1, 0.3)",stagger: {amount:1, from: 0} } )

    }
   
    playCard(i){
        this.setState({
            cards: delete this.state.cards[i]
        })
    }

    render(){
        
        return(
            <div className="hand" 
            style={{width:`${this.props.cards.length* 189 +30*(this.props.cards.length - 1)}px`}} >
               
                <ul>
                    
                    {this.props.cards.map((card,i) =>{
                        
                            
                        
                    return(
                        <li key={i} ref={li => this.Cards[i] = li}>
                        <Card 
                            cost={card.cost}
                            name={card.name}
                            description={card.description}
                            img={card.img}/> 
                        </li>
                    )})}
                </ul>
            </div>
        )



    }
}

export default Hand;