import React from 'react'

class Card extends React.Component{
   constructor(props){
       super(props)
       this.state = {}
   }

   componentWillMount(){
       //retrieve card from db and set state
   }


    render(){
        return(
            <div className="card-frame">
                <div className="card-heading">
                    <div id="card-cost">{this.state.cost}</div>
                    <div id="card-name">{this.state.name}</div>
                </div>
                <div className="card-text">{this.state.</div>
            </div>
        )
    }
}