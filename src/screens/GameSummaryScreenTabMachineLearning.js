import React, { Component } from "react";
import $ from "jquery";
import "../App.css";
import "./GameSummaryScreen.css";
import { HashLoader } from 'react-spinners';
import { chartOptions } from "../options/ChartOptions.js";
import {Line } from "react-chartjs-2";
import 'react-web-tabs/dist/react-web-tabs.css';
import Select from 'react-select';

import {
   assembleChartDataCollectionSimpleMultiple
} from "../options/ChartAssembly";


// const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";
const API_ENDPOINT_URL_GENERIC = '//bold-vortex-250420.appspot.com/generic_query'


function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject).map(key => `${key}=${paramObject[key]}`).join('&')}`;
}


class GameSummaryScreenTabMachineLearning extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true
    }
  }


  componentWillMount() { }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentDidUpdate() {
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.selectedTabId != "three" && nextProps.selectedTabId == "three") {
      this.setState({ selectedTabId: nextProps.selectedTabId });
      this.updateCharts();
    }

  }

  updateCharts = () => {


    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionComps',
      matchId: this.props.matchId
    }), data => {
      // console.log(data)
      this.setState({
        cumulativePredictionsFinaleScoreHometeamLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'final_score_hometeam', 'final_score_hometeam_prediction'], { labels: ["current score", "final score (actual)", "final score (prediciton)"], backgroundColors: ["#64b5f6", "#656565", "#ae4126"], borderColors: ["#64b5f6", "#656565", "#ae4126"] })
        }

      })

    });
  }



  handleChangeSelectorTagSelected = (selectedValue) => {
    this.setState({
      selectedValueSelectorOne: selectedValue
    });
    this.props.setParentSelectorStateSelectorOne(selectedValue)
  }


  render() {

    return (

      <div >
        <div style={{ "paddingTop": "20px" }}>

          <div className="banner-dropdown-container" id="banner-dropdown-container--left">

            <div className="dropdown-selector-container" >

              {this.props.finalScoreMatchAlgCompsPredictorTagSelectedTags && (

                <Select className="drop-down-select"
                  value={this.props.finalScoreMatchAlgCompsPredictorTagSelectedTags}
                  closeMenuOnSelect={false}
                  onChange={this.handleChangeSelectorTagSelected}
                  isMulti
                  options={this.props.finalScoreMatchAlgCompsPredictorTagDropdownOptions}
                ></Select>
              )}

            </div>
          </div>



          {this.props.cumulativePredictionsFinaleScoreHometeamLineChart && (
            <div>
              <div className="chart-title-large" >{"Home Team Final Score Predictions"}</div>


              <Line
                data={this.props.cumulativePredictionsFinaleScoreHometeamLineChart.data}
              >
              </Line>
            </div>
          )}


          {this.props.cumulativePredictionsWinnerHometeamLineChart && (
            <div>
              <div className="chart-title-large" >{"Predicted Win Likelihood (Home Team)"}</div>


              <Line
                data={this.props.cumulativePredictionsWinnerHometeamLineChart.data}
              >
              </Line>
            </div>
          )}



        </div>




      </div>
    );
  }
}
export default GameSummaryScreenTabMachineLearning;          