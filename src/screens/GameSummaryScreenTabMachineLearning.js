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

  render() {

    return (

      <div >
        <div style={{ "paddingTop": "20px" }}>
          {this.state.cumulativePredictionsFinaleScoreHometeamLineChart && (
            <div>
              <div className="chart-title-large" >{"Home Team Final Score Predictons"}</div>


              <Line
                data={this.state.cumulativePredictionsFinaleScoreHometeamLineChart.data}
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

  {this.state.cumulativeAOVImpact && (

    <ChartBlock
      chartData={this.state.cumulativeAOVImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"AOV Impact"}
      chartSubTitle={this.state.cumulativeAOVImpact.segmentTypeSubTitle}

    />

  )}

  {this.state.cumulativeAIVImpact && (

    <ChartBlock
      chartData={this.state.cumulativeAIVImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"AIV Impact"}
      chartSubTitle={this.state.cumulativeAIVImpact.segmentTypeSubTitle}

    />

  )}

  <div className="chart-divider" />

  {this.state.cumulativeVisitsperUserImpact && (

    <ChartBlock
      chartData={this.state.cumulativeVisitsperUserImpact}
      chartOptions={chartOptions.ImpactLineChart}
      chartTitle={"Visits per User Impact"}
      chartSubTitle={this.state.cumulativeVisitsperUserImpact.segmentTypeSubTitle}

    />

  )}



</div>



}

      </div>
    );
  }
}
export default GameSummaryScreenTabMachineLearning;          