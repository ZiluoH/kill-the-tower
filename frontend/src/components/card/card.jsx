import React from 'react'
import './card.css' 

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
       
    }


    render() {
        return (
            <div className="outter">
                <div className="card-frame">
                    <div className="card-content">
                        <div className="card-heading">
                            <div id="card-cost"><div id="inner">1</div></div>
                            <div id="card-name">Name</div>
                        </div>
                            <div className="card-img-border">
                                <div id="card-img">
                                    <img src={this.state.img} alt="" />
                                </div>
                            </div>
                        
                        <div className="card-text">Do something</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;