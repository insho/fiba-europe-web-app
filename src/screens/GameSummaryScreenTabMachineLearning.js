import React, { Component } from "react";
import $ from "jquery";
// import $ from "jquery";
import "../App.css";
import "./GameSummaryScreen.css";
import { HashLoader } from 'react-spinners';
import { chartOptions } from "../options/ChartOptions.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
import 'react-web-tabs/dist/react-web-tabs.css';
import ReactTable from 'react-table';
import { ChartModule } from 'chartjs-plugin-labels';
// import { ChartModule } from 'angular2-chartjs';
import ChartBlock from "../components/ChartBlock.js";
import Select from 'react-select';
  
import {
  assembleChartDataCollectionSimple
  , assembleChartDataCollectionStacked
  , assembleChartDataCollectionSimpleMultiple
  , assembleChartDataCollectionGrouped
  , assemblePivotedPieChart
  , assemblePivotedPieChartCollection
} from "../options/ChartAssembly";


const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

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
    // console.log("________")
    // console.log(this.props.gameMetricsCompBarChartFouls.data)
    this.setState({loading: false});
  }

  componentDidUpdate() { 

    // console.log("will receive props: " + this.props.selectedTabId)

  }


  componentWillReceiveProps(nextProps) {
    // this.setState({ data: nextProps.data });  

    // console.log("state tab id: " + this.state.selectedTabId)
    // console.log("props tab id: " + nextProps.selectedTabId)
    if(this.state.selectedTabId != "three" && nextProps.selectedTabId == "three") {
      console.log("SETTING STATE")
      this.setState({selectedTabId: nextProps.selectedTabId});
      this.updateCharts();
    }


    // console.log("________")
    // console.log(this.props.gameMetricsCompBarChartFouls)
    // console.log(this.props.gameMetricsCompPieChartShotsAttempted)

  }

  updateCharts = () => {

  
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionComps',
      matchId: this.props.matchId
      // dateRange:this.state.selectedDateRange.value
    }), data => {
      console.log(data)
      this.setState({
        cumulativePredictionsFinaleScoreHometeamLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'final_score_hometeam', 'final_score_hometeam_prediction'], { labels: ["current score", "final score (actual)", "final score (prediciton)"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"] })
        }

      })

    });
  }


  selectorChangeEventSelectorOne = (selectedValue) => {
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
                                          // styles={selectStylesSecondary} 
                                          // components={makeAnimated()}
                                          // styles={colourStyles}
                                          ></Select>
                          )}
    
                        </div>
            </div>



          {this.props.cumulativePredictionsFinaleScoreHometeamLineChart && (
            <div>
              <div className="chart-title-large" >{"Home Team Final Score Predictons"}</div>


              <Line
                data={this.props.cumulativePredictionsFinaleScoreHometeamLineChart.data}
              // options={chartOptions.brandDetailsSalesReturnRateLineChart}
              >
              </Line>
            </div>
          )}


        </div>



{this.state.loading ? <div className='loading-spinner'>
<HashLoader
  // css={override}
  sizeUnit={"px"}
  size={100}
  color={'#d14972'}
  loading={this.state.loading}
/>
</div> :
<div className="chart-and-inputs-block">



  {this.state.cumulativeVisitorCVRImpact && (

    <ChartBlock
      chartData={this.state.cumulativeVisitorCVRImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"CVR Impact (User-Basis)"}
      chartSubTitle={this.state.cumulativeVisitorCVRImpact.segmentTypeSubTitle}

    />

  )}
  <div className="chart-divider" />
  {this.state.cumulativePredictionsFinaleScoreHometeamLineChart && (

    <ChartBlock
      chartData={this.state.cumulativePredictionsFinaleScoreHometeamLineChart}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"Home Team Final Score Predictons"}
      chartSubTitle={""}
    />


  )}


  <div className="chart-divider" />
  <hr
    style={{
      color: "#a3a3a3",
      backgroundColor: "#a3a3a3",
      height: .5,

    }}
  />

  {this.state.cumulativeVisitCVRImpact && (

    <ChartBlock
      chartData={this.state.cumulativeVisitCVRImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"CVR Impact (Visit-Basis)"}
      chartSubTitle={this.state.cumulativeVisitCVRImpact.segmentTypeSubTitle}

    />

  )}


  <div className="chart-divider" />
  {this.state.cumulativeVisitRPVImpact && (

    <ChartBlock
      chartData={this.state.cumulativeVisitRPVImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"RPV Impact (Visit-Basis)"}
      chartSubTitle={this.state.cumulativeVisitRPVImpact.segmentTypeSubTitle}
    />


  )}

  <div className="chart-divider" />

  <hr
    style={{
      color: "#a3a3a3",
      backgroundColor: "#a3a3a3",
      height: .5,

    }}
  />

  
EXTRA SHIT HERE BELOW:

<div style={{ "paddingTop": "20px" }}>
          {this.state.cumulativePredictionsFinaleScoreHometeamLineChart && (
            <div>
              <div className="chart-title-large" >{this.state.selectedMatch.label}</div>
            <div className="chart-title-small" >{"Home Team Final Score"}</div>


            <div className="banner-dropdown-container" id="banner-dropdown-container--left">
                      
                      <div className="dropdown-selector-container" >
    
                          {this.props.finalScoreMatchAlgCompsPredictorTagSelectedTags && (
    
                                      <Select className="drop-down-select"
                                          value={this.props.finalScoreMatchAlgCompsPredictorTagSelectedTags}
                                          closeMenuOnSelect={false}
                                          onChange={this.handleChangeSelectorTagSelected}
                                          isMulti
                                          options={this.state.finalScoreMatchAlgCompsPredictorTagDropdownOptions}  
                                          // styles={selectStylesSecondary} 
                                          // components={makeAnimated()}
                                          // styles={colourStyles}
                                          ></Select>
                          )}
    
                        </div>
            </div>

              <Line
                data={this.state.cumulativePredictionsFinaleScoreHometeamLineChart.data}
              // options={chartOptions.brandDetailsSalesReturnRateLineChart}
              >
              </Line>
            </div>
          )}


        </div>
  



</div>



}

      </div>
    );
  }
}
export default GameSummaryScreenTabMachineLearning;          