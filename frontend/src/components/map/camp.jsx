import React, { Component } from 'react'
import campfire from "../../assest/campfire.jpg";

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

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
                <img src={campfire} alt=""/>
                <p>You took a good rest by the campfire while making s'mores.</p>
                <p>HP increased by 20.</p>
            </div>
        )
    }

}