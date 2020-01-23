import React from 'react'
import Card from '../card/card'
import './hand.css'
import {gsap} from 'gsap' 


class Hand extends React.Component {
    constructor(props){
        super(props)
        
        this.Cards = [];
        this.Tween = null;
    }

    componentDidMount(){
        const tl = gsap.timeline()
        tl.from(this.Cards,{stagger: 0.5, ease:"elastic(1, 0.2)",scale: 0.1, x: -1000, y:1000, skewX: 45} )
           
    }
   
    playCard(i){
        this.setState({
            cards: delete this.state.cards[i]
        })
    }

    buttonClick(){
        const tl = gsap.timeline()
        tl.to(this.Cards, {duration: 3, stagger: 0.5, x:1000, y:1000, scale: 0, skewX:45 })
    }
    render(){
        console.log("rendering...")
        return(
            <div className="hand"  
                style={{ width: `${this.props.cards.length * 189 + 21 * (this.props.cards.length - 1)}px` }}
                >
                    
                <ul>
                    
                    {this.props.cards.map((card,i) =>{
                        
                            
                        
                    return(
                        <li key={i} ref={li => this.Cards[i] = li} onMouseEnter={() =>console.log('spagett')}>
                        <Card 
                            cost={card.cost}
                            name={card.name}
                            description={card.description}
                            img={card.img}/> 
                        </li>
                    )})}
                </ul>
                <button onClick={ ()=> this.buttonClick()}>click me!</button>
            </div>
        )



    }
}

export default Hand;