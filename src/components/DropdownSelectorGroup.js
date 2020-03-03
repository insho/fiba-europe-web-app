import React, { Component } from "react";
import Select from "react-select";
import "../App.css";
import "./DropdownSelectorGroup.css";
import { selectStylesSecondary } from "../options/SelectStyles";

class DropdownSelectorGroup extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleMouseDown = this.handleMouseDown.bind(this);
      }
   

selectorChangeEventSelectorOne = (selectedValue) => {
    this.setState({
        selectedValueSelectorOne: selectedValue
      });
    this.props.setParentSelectorStateSelectorOne(selectedValue)
}


selectorChangeEventSelectorTwo = (selectedValue) => {
    this.setState({
        selectedValueSelectorTwo: selectedValue
      });
    this.props.setParentSelectorStateSelectorTwo(selectedValue)
}

handleMouseDown(e) {
    this.props.toggleParentMenu()    
    e.stopPropagation();
  }


      render() {
        return (
<div id="dropdownselectorgroup-container">
           

            <div id="dropdownselectorgroup-container-inner">
            
            


              <div
                className="dropdownselectorgroup-dropdown-container"
                id="dropdownselectorgroup-dropdown-container--left"
              >
                <div className="dropdown-selector-container">
                  {this.props.dropDownItemsListSelectorOne && (
                    <Select
                      className="drop-down-select"
                      value={this.props.selectedValueSelectorOne }
                      onChange={this.selectorChangeEventSelectorOne }
                      options={this.props.dropDownItemsListSelectorOne }
                      styles={this.props.selectStyles || selectStylesSecondary}
                    />
                  )}
                </div>


                
              </div>

              
              <div
                className="dropdownselectorgroup-dropdown-container"
                id="dropdownselectorgroup-dropdown-container--right"
              >
                <div className="dropdown-selector-container">
                  {this.props.dropDownItemsListSelectorTwo && (
                    <Select
                      className="drop-down-select"
                      value={this.props.selectedValueSelectorTwo}
                      onChange={this.selectorChangeEventSelectorTwo}
                      options={this.props.dropDownItemsListSelectorTwo}
                      styles={this.props.selectStyles ||selectStylesSecondary}
                    />
                  )}
                </div>
</div>

<div
                className="dropdownselectorgroup-dropdown-container"
                id="dropdownselectorgroup-dropdown-container--right2"
              >
                <div className="dropdown-selector-container">
                  {this.props.dropDownItemsListSelectorThree && (
                    <Select
                      className="drop-down-select"
                      value={this.props.selectedValueSelectorThree}
                      onChange={this.selectorChangeEventSelectorThree}
                      options={this.props.dropDownItemsListSelectorThree}
                      styles={this.props.selectStyles ||selectStylesSecondary}
                    />
                  )}
                </div>
</div>

            </div>
          </div>

);
  }
}
 
export default DropdownSelectorGroup;          