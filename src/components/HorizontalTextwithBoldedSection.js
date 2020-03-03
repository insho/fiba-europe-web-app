import React, { Component } from "react";
import "./HorizontalTextwithBoldedSection.css"

class HorizontalTextwithBoldedSection extends Component {
    
    
      render() {
        return (


                <div className="simple-inline-container">
                  
                  <p className="horizontal-text-with-bolded-section" style={this.props.textPrefixStyle}>
                    {this.props.textBolded && this.props.textPrefix }
                  </p>
                  <p className="horizontal-text-with-bolded-section" style={this.props.textBoldedStyle}>
                    
                    {this.props.textBolded}
                  </p>
                  <p className="horizontal-text-with-bolded-section" style={this.props.textSuffixStyle}>
                    
                    {this.props.textBolded && this.props.textSuffix }
                  </p>
                </div>
);
  }
}
 
export default HorizontalTextwithBoldedSection;


