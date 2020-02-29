import React, { Component } from "react";
import "./PageHeader.css"

class PageHeader extends Component {
    
    
      render() {
        return (
        <div>
            {/* <div>
              <div className="page-header">{this.props.header}</div>
              <div className="page-sub-header">{this.props.header2}</div>
              <div className="page-sub-header-grey" style={{ "padding-top": "10px" }}>{this.props.matchLocation}</div>
              <div className="page-sub-header-grey">{this.props.matchScheduleDateText}</div>
            </div> */}

          <div style={{ "width": "100%", "display": "flex", "flex-direction": "row" }}>
            
            <div>
              <div className="page-header">{this.props.header}</div>
              <div className="page-sub-header">{this.props.header2}</div>
              <div className="page-sub-header-grey" style={{ "padding-top": "10px" }}>{this.props.matchLocation}</div>
              <div className="page-sub-header-grey">{this.props.matchScheduleDateText}</div>
            </div>

            {this.props.showMatchInfo  && (
            <div style={{ "paddingLeft":"5%","paddingRight":"5%","paddingTop": "2px", "display": "flex", "align": "center", "flex-direction": "row", "flex": "3", "flex-wrap": "wrap", "justify-content": "center", "width": "80%", "align": "right", "padding-right":"0px" }}>

              <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center", "flex": "2", "flex-wrap": "wrap" }}>
                <div className="page-score">{this.props.subHeaderHomeTeam}</div>
                <div className="page-homeaway" style={{"align-self": "center", "font-size": "12px","color":"#64b5f6","font-weight":"bold"}} >{"(home)"}</div>
                <div className="page-score">{this.props.finalScoreHomeTeam}</div>
              </div>

              <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center", "flex": "1" }}>
                <div className="page-score" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" vs "}</div>
                <div className="page-homeaway" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" "}</div>
                <div className="page-score" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" - "}</div>
              </div>


              <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center", "flex": "2" }}>
                <div className="page-score">{this.props.subHeaderAwayTeam}</div>
                <div className="page-homeaway" style={{"align-self": "center", "font-size": "12px","color":"#ae4126","font-weight":"bold"}} >{"(away)"}</div>
                <div className="page-score">{this.props.finalScoreAwayTeam}</div>
              </div>


            </div>
            )}
          </div>


          </div>
);
  }
}
 
export default PageHeader;


