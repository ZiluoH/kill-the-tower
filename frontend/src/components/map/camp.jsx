import React, { Component } from 'react'
import campfire from "../../assets/campfire.jpg";

export default class Message extends Component {

    componentDidMount() {
        const el = document.getElementById("camp-frame");
        el.addEventListener("click", () => {
            this.props.handleCloseModal("showCamp");
            this.props.restAtCamp();
        })

    }

    render() {
        return (
            <div id="camp-frame" className="message-frame">
                {/* <canvas id="camp"></canvas> */}
                <img src={campfire} alt="" className="message-img"/>
                <p className="message-txt">You took a good rest by the campfire while making s'mores.</p>
                <p className="message-txt">HP increased by 20.</p>
            </div>
        )
    }

}