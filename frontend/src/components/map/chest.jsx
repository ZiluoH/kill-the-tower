import React, { Component } from 'react'

import chest from "../../assest/chest.jpg";

export default class Message extends Component {
    constructor(props){
        super(props);
        this.imgChest = new Image();
        this.imgChest.src = chest;

        this.state = {
            nextAction: null
        }
    }

    componentDidMount(){
        const el = document.getElementById("chest-frame");

        el.addEventListener("click", () => {
            this.props.handleCloseModal("showChest");
            this.props.trigger(this.state.nextAction);
        })
        this.setState({ nextAction: this.props.openChest() });
    }

    render() {
        return (
            <div id="chest-frame" className="message-frame">
                <img src={chest} alt="" className="message-img"/>
                <p className="message-txt" >{"You found a chest and opened it immediately. Inside is a " + this.state.nextAction + "."}</p>

            </div>
        )
    }

}