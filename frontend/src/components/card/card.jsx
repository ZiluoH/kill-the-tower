import React from 'react'
import './card.css' 
import {gsap} from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.card = null;
        this.hover = this.hover.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.hover = this.hover.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.playCard = this.playCard.bind(this);
    }

    hover(){
        const tl = gsap.timeline()
            tl.to(this.card,{duration: 0.3,y: -100})
                .from(this.card, { rotationX: 15, rotationY:-5, ease:'slow'})
                
    }

    mouseOut(){
        gsap.to(this.card, { duration: 0.5, y: 0, ease:"slow" })
    }

    onClick(){
        gsap.to()
    }

    playCard(){
        if(this.props.enengy >= this.props.cost && this.props.playerTurn){
            this.props.action();
            this.props.playCard(this.props.id);
        }
    }

    render() {        
        return (
            <div className="outter" ref={div => this.card = div} onMouseEnter={this.hover} onMouseLeave={this.mouseOut} onClick={this.playCard}>
                <div className="card-frame">
                    <svg>
                        <path id="amble-path" d="M0,10a10,10 0 1,0 20,0a10,10 0 1,0 -20,0" />
                        
                    </svg>
                    <div className="card-content">
                        <div className="card-heading">
                            <div id="card-cost"><div id="inner" >{this.props.cost}</div></div>
                            <div id="card-name">{this.props.name}</div>
                        </div>
                            <div className="card-img-border">
                                <div id="card-img">
                                    <img src={this.props.img} alt="" />
                                </div>
                            </div>
                        
                        <div className="card-text">{this.props.description}</div>
                    </div>
                </div>
                
        </div>
        
        
        );
    }
}

export default Card;