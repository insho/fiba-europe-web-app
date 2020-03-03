import React, { Component } from "react";
import "./PageHeader.css"

class PageHeader extends Component {
    
    
      render() {
      
      if(this.props.isMobile) {

            return (
          <div>
             
  
            <div style={{ "width": "100%", "display": "flex", "flex-direction": "column" }}>
              
              <div style={{"paddingBottom":"30px"}}>
                <div className="page-header">{this.props.header}</div>
                <div className="page-sub-header">{this.props.header2}</div>
                <div className="page-sub-header-grey" style={{ "padding-top": "10px" }}>{this.props.matchLocation}</div>
                <div className="page-sub-header-grey">{this.props.matchScheduleDateText}</div>
              </div>
  
              {this.props.showMatchInfo  && (
              
              <div style={{ "paddingLeft":"4px","paddingTop": "2px", "display": "flex", "flex-direction": "column", "flex-wrap": "wrap", "width": "100%", "align": "left", "padding-left":"0px", "padding-bottom":"2px" }}>
  
               <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "row", "justify-content": "left", "flex-wrap": "wrap","align-self": "left","align": "left","flex":"6", "padding-left":"0px"}}>
                
                <div style={{"flex":"5", "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "left", "flex-wrap": "wrap","align-self": "left","align": "left"}}>
                  <div className="page-score" style={{"font-size":"20px", "justifyContent": "left", "align" : "left"}}>{this.props.subHeaderHomeTeam}</div>
                  <div className="page-homeaway" style={{"align-self": "center", "font-size": "14px","color":"#64b5f6","font-weight":"bold"}} >{"(home)"}</div>
                </div>
                <div className="page-score" style={{"font-size":"20px", "flex":"1","justifyContent": "top", "align" : "top","align-self" : "top"}}>{this.props.finalScoreHomeTeam}</div>
                {/* <div className="page-homeaway" style={{"align-self": "center", "font-size": "14px","color":"#64b5f6","font-weight":"bold"}} >{" "}</div> */}
                </div>
  
                <div style={{  "display": "flex", "flex-direction": "column", "justify-content": "center", "padding-left":"0px", "padding-bottom":"2px"   }}>
                  <div className="page-score" style={{ "paddingLeft": "8px",  "font-size": "16px", "align": "bottom" }}>{" vs "}</div>
                </div>
  

  
              <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "row", "justify-content": "left", "flex-wrap": "wrap","align-self": "left","align": "left","flex":"6", "padding-left":"0px"}}>
                
                <div style={{"flex":"5", "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "left", "flex-wrap": "wrap","align-self": "left","align": "left"}}>
                  <div className="page-score" style={{"font-size":"20px", "justifyContent": "left", "align" : "left"}}>{this.props.subHeaderAwayTeam}</div>
                  <div className="page-homeaway" style={{"align-self": "center", "font-size": "14px","color":"#ae4126","font-weight":"bold"}} >{"(away)"}</div>
                </div>
                <div className="page-score" style={{"font-size":"20px", "flex":"1","justifyContent": "top", "align" : "top","align-self" : "top"}}>{this.props.finalScoreAwayTeam}</div>
                {/* <div className="page-homeaway" style={{"align-self": "center", "font-size": "14px","color":"#64b5f6","font-weight":"bold"}} >{" "}</div> */}
                </div>


              </div>
              )}
            </div>
  
  
            </div>
  );
      } else {
        // ITS DESKTOP
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
              
              <div style={{ "paddingLeft":"30px","paddingRight":"5%","paddingTop": "2px", "display": "flex", "flex-direction": "row", "flex-wrap": "wrap", "justify-content": "center", "width": "80%", "align": "right", "padding-right":"0px" }}>
  
                <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center", "flex-wrap": "wrap","align-self": "right","align": "right", "paddingRight":"50px" }}>
                  <div className="page-score" style={{ "justifyContent": "center", "align" : "center"}}>{this.props.subHeaderHomeTeam}</div>
                  <div className="page-homeaway" style={{"align-self": "center", "font-size": "12px","color":"#64b5f6","font-weight":"bold"}} >{"(home)"}</div>
                  <div className="page-score">{this.props.finalScoreHomeTeam}</div>
                </div>
  
                <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center",  }}>
                  <div className="page-score" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" vs "}</div>
                  <div className="page-homeaway" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" "}</div>
                  <div className="page-score" style={{ "paddingLeft": "8px", "paddingRight": "8px", "font-size": "20px", "align": "bottom" }}>{" - "}</div>
                </div>
  
  
                <div style={{ "paddingTop": "2px", "display": "flex", "flex-direction": "column", "justify-content": "center","align-self": "left","align": "left", "paddingLeft":"50px" }}>
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
}
 
export default PageHeader;


