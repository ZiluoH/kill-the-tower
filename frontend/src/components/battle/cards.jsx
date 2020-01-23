import React from "react";
import { withRouter } from "react-router-dom";

class Cards extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log(this.props);
    
    return (
      <div className="hands">
        <h2> cards</h2>
      </div>
    );
  }
}

export default withRouter(Cards);
