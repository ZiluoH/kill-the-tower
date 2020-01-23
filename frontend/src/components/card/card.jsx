import React from 'react'
import './card.css' 

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

   


    render() {

        
        return (
          <div className="outter">
            <div className="card-frame" onClick={this.props.Strike}>
              <div className="card-content">
                <div className="card-heading">
                  <div id="card-cost">
                    <div id="inner">{this.props.cost}</div>
                  </div>
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