import React, { Component } from "react";
import $ from "jquery";
import Banner from "../components/Banner.js";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import Menu from "./Menu";
// import PageHeader from "../components/PageHeader"
import HorizontalTextwithBoldedSection from "../components/HorizontalTextwithBoldedSection"
import ReactMarkdown from 'react-markdown';
import "../App.css";
import "./GameSummaryScreen.css";
import { HashLoader } from 'react-spinners';
// import ScrollView from 'react-native';
// import ScrollText from 'react-scroll-text';
// import  ScrollArea from 'react-scrollbar'; 
import { chartOptions } from "../options/ChartOptions.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
 
// import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactTable from 'react-table';
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
  ,assembleChartDataCollectionSingleRowMultipleColumns
} from "../options/ChartAssembly";



const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject).map(key => `${key}=${paramObject[key]}`).join('&')}`;
}

class AlgCompsScreen extends Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      loading: true,
      // selectedMetric: 'accuracy',
      // selectedAge: 'adult',
      // selectedSex: 'male',
      compTarget: 'winner_hometeam',
      ageDropdownList: [{ value: "adult", label: "Adult" },
      { value: "U20", label: "U20" },
      { value: "U18", label: "U18" },
      { value: "U16", label: "U16" }],
      selectedAge: { value: "adult", label: "Adult" },
      sexDropdownList: [{ value: "female", label: "Female" },
      { value: "male", label: "Male" }],
      selectedSex: { value: "male", label: "Male" } , 
      
      metricDropdownList: [{value: "accuracy", label: "accuracy"},
      {value: "true positive rate", label: "true positive rate"},
      {value: "true negative rate", label: "true negative rate"},
      {value: "positive predictive value", label: "positive predictive value"},
      {value: "negative predictive value", label: "negative predictive value"},
      {value: "false positive rate", label: "false positive rate"},
      {value: "false negative rate", label: "false negative rate"},
      {value: "false discovery rate", label: "false discovery rate"}
      // {value: "r2", label: "r2"},
    ],
    selectedMetric: { value: "accuracy", label: "accuracy" },



    featureImportancePeriodDropdownList: [{value: "1", label: "1"},
      {value: "2", label: "2"},
      {value: "3", label: "3"},
      {value: "4", label: "4"}
    ],
    selectedFeatureImportancePeriod: { value: "1", label: "1" },

    featureImportanceMinuteDropdownList: [{value: "1", label: "1"},
    {value: "2", label: "2"},
    {value: "3", label: "3"},
    {value: "4", label: "4"},
    {value: "5", label: "5"},
    {value: "6", label: "6"},
    {value: "7", label: "7"},
    {value: "8", label: "8"},
    {value: "9", label: "9"},
    {value: "10", label: "10"}],
  selectedFeatureImportanceMinute: { value: "3", label: "3" }

    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);    
  }

  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleMouseDown(e) {
    this.toggleMenu();
    e.stopPropagation();
  }

  // state = {
  //   brandDropdownList: null,
  //   data: null,
  //   selectedBrand: null,
  //   previouslySelectedBrand: null
  // };

  toggleMenu = this.toggleMenu.bind(this);
  handleMouseDown = this.handleMouseDown.bind(this);

  closeMenu(e) {
    if (this.state.visible === true) {
      this.toggleMenu();
      e.stopPropagation();
    }
  }

  componentWillMount() {
    
   }

  componentDidMount() {
    this.setState({loading: false});
    this.updateCharts();
  }

  componentDidUpdate() {
    // this.updateCharts();
   }


  componentWillReceiveProps(nextProps) {
    // if(this.state.selectedTabId != "three" && nextProps.selectedTabId == "three") {
    //   console.log("SETTING STATE")
    //   this.setState({selectedTabId: nextProps.selectedTabId});
      // this.updateCharts();
    // }

  }

  updateCharts = () => {
  
    

 if ((this.state.selectedFeatureImportancePeriod !== undefined 
      && this.state.selectedFeatureImportancePeriod !== this.state.previouslySelectedFeatureImportancePeriod ) ||
      (this.state.selectedFeatureImportanceMinute !== undefined 
        && this.state.selectedFeatureImportanceMinute !== this.state.previouslySelectedFeatureImportanceMinute ))
    {
  

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerFeatureImportanceSomePredictors',
      selectedAge: this.state.selectedAge.value,
      selectedSex: this.state.selectedSex.value,
      selectedTarget: 'winner_hometeam',
      period: this.state.selectedFeatureImportancePeriod.value,
      minute: this.state.selectedFeatureImportanceMinute.value
      

    }), data => {

      this.setState({
        algCompsWinnerFeatureImporancesSomePredictors: {
          data: assembleChartDataCollectionSingleRowMultipleColumns(data, [ 'current_score_hometeam', 'current_score_awayteam'], { labels: ["current score hometeam", "current score awayteam"], backgroundColors: ["#64b5f6","#64b5f6"], borderColors: ["#64b5f6","#64b5f6"] })
        }
      })

    });
    }

    

    if (this.state.selectedMetric !== undefined 
      && this.state.selectedMetric !== this.state.previouslySelectedMetric )
    {
  

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerAccuracyLine',
      selectedMetric: this.state.selectedMetric.value,
      selectedAge: this.state.selectedAge.value,
      selectedSex: this.state.selectedSex.value,
      selectedTarget: 'winner_hometeam'
    }), data => {

      this.setState({
        algCompsLineChartWinnerHometeam: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors', 'metric_rate_severalpredictors', 'metric_rate_manypredictors'], { labels: ["some predictors", "several predictors", "many predictors"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"] })
        }
      })

    });
    }
  }

  handleDropdownSelectorChangeAge = (selectedAge) => {
    if(this.state.previouslySelectedAge === undefined || (this.state.selectedAge!== selectedAge)) {
      Promise.resolve(this.setState({previouslySelectedAge:this.state.selectedAge,selectedAge})).then(() => {this.updateCharts()});
    }
  }

  handleDropdownSelectorChangeSex = (selectedSex) => {
    if(this.state.previouslySelectedSex === undefined || (this.state.selectedSex!== selectedSex)) {
      Promise.resolve(this.setState({previouslySelectedSex:this.state.selectedSex,selectedSex})).then(() => {this.updateCharts()});        
    }
  }

  handleDropdownSelectorChangeMetric = (selectedMetric) => {
    if(this.state.previouslySelectedMetric === undefined || (this.state.selectedMetric!== selectedMetric)) {
      Promise.resolve(this.setState({previouslySelectedMetric:this.state.selectedMetric,selectedMetric})).then(() => {this.updateCharts()});
    }
  }

markdown = "For this project I've made three algorithms for each metric, using different sets of features. They are the following:\n\n\n\
* A. \"Some Features\"\n\
This is the simplest algorithm, involving only two features:\n\
";


markdown1 = "```\n\
current_score_hometeam\n\
current_score_awayteam\n\
```\n\n\
";

markdown1b = "* B. \"Several Features\"\n\
This is a bit more complex, involving the two features from alg A, as well as 12 others:\"\n\
";


markdown2 = "\
```python\n\
current_score_hometeam,\n\
current_score_awayteam,\n\
two_point_shots_made_hometeam,\n\
two_point_shots_missed_hometeam,\n\
three_point_shots_made_hometeam,\n\
three_point_shots_missed_hometeam,\n\
free_throw_shots_made_hometeam,\n\
free_throw_shots_missed_hometeam,\n\
two_point_shots_made_awayteam,\n\
two_point_shots_missed_awayteam,\n\
three_point_shots_made_awayteam,\n\
three_point_shots_missed_awayteam,\n\
free_throw_shots_made_awayteam,\n\
free_throw_shots_missed_awayteam,\n\
```\n\
";
markdown3 = "\
* C. \"Many Features\"\n\
I threw in everything I could think of here. There are something like 80 fields:\n\n\
"

markdown4 = "```\n\
current_score_hometeam,\n\
current_score_awayteam,\n\
team_fouls_committed_hometeam,\n\
team_fouls_committed_awayteam,\n\
avg_time_between_scoring_events_overall_hometeam,\n\
avg_time_between_scoring_events_overall_awayteam,\n\
avg_time_between_scoring_events_overall,\n\
current_lead_hometeam,\n\
cumulative_lead_changes_game,\n\
cumulative_avg_abs_size_of_lead_game,\n\
cumulative_max_abs_size_of_lead_game,\n\
cumulative_max_size_of_lead_game_hometeam,\n\
cumulative_max_size_of_lead_game_awayteam,\n\
avg_abs_size_of_lead_quarter,\n\
cumulative_possessions_overall_hometeam,\n\
cumulative_possessions_overall_awayteam,\n\
starting_five_in_play_hometeam,\n\
starting_five_in_play_awayteam,\n\
top_five_scorers_in_play_hometeam,\n\
top_five_scorers_in_play_awayteam,\n\
percent_of_total_points_scored_by_players_in_play_awayteam,\n\
percent_of_total_points_scored_by_players_in_play_hometeam,\n\
points_scored_by_players_in_play_hometeam,\n\
points_scored_by_players_in_play_awayteam,\n\
top_five_players_in_play_hometeam,\n\
top_five_players_in_play_awayteam,\n\
total_stat_count_players_in_play_hometeam,\n\
total_stat_count_players_in_play_awayteam,\n\
percent_of_total_stat_count_by_players_in_play_hometeam,\n\
percent_of_total_stat_count_by_players_in_play_awayteam,\n\
cumulative_player_personal_fouls_hometeam,\n\
cumulative_player_personal_fouls_awayteam,\n\
players_with_one_foul_hometeam,\n\
players_with_two_fouls_hometeam,\n\
players_with_three_fouls_hometeam,\n\
players_with_four_fouls_hometeam,\n\
players_with_five_fouls_hometeam,\n\
players_with_one_foul_awayteam,\n\
players_with_two_fouls_awayteam,\n\
players_with_three_fouls_awayteam,\n\
players_with_four_fouls_awayteam,\n\
players_with_five_fouls_awayteam,\n\
two_point_shots_made_hometeam,\n\
jump_shots_made_hometeam,\n\
lay_up_shots_made_hometeam,\n\
put_backs_shots_made_hometeam,\n\
dunk_shots_made_hometeam,\n\
two_point_shots_missed_hometeam,\n\
jump_shots_missed_hometeam,\n\
lay_up_shots_missed_hometeam,\n\
put_backs_shots_missed_hometeam,\n\
dunk_shots_missed_hometeam,\n\
three_point_shots_made_hometeam,\n\
three_point_shots_missed_hometeam,\n\
free_throw_shots_made_hometeam,\n\
free_throw_shots_missed_hometeam,\n\
two_point_shots_made_awayteam,\n\
jump_shots_made_awayteam,\n\
lay_up_shots_made_awayteam,\n\
put_backs_shots_made_awayteam,\n\
dunk_shots_made_awayteam,\n\
two_point_shots_missed_awayteam,\n\
jump_shots_missed_awayteam,\n\
lay_up_shots_missed_awayteam,\n\
put_backs_shots_missed_awayteam,\n\
dunk_shots_missed_awayteam,\n\
three_point_shots_made_awayteam,\n\
three_point_shots_missed_awayteam,\n\
free_throw_shots_made_awayteam,\n\
free_throw_shots_missed_awayteam\n\
```\n\
"



// The code for this app [is here](https://github.com/insho/fiba-europe-web-app)\n\n\n\
// The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project). It involved four main parts:\n\n\
// 1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**\n\
// 2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**\n\
// 3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**\n\
// 4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**\n\n\n";


  render() {

    return (

      <div>
      <Menu menuVisibility={this.state.visible}/>
      
      <div onMouseDown={this.closeMenu}>

      <Banner bannerTextMajor = {"Comparing Algorithms"} bannerTextMinor = {"Sub Banner"} 
      toggleParentMenu={this.toggleMenu.bind(this)}/>


        <div className="page-body">

          {/* <PageHeader header="Competitions" subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label}/> */}

          
          <div className="split-table-container-upper"> 


          <ReactMarkdown source={this.markdown}/>

        <div className="horizontal-row-block">

        <ReactMarkdown source={this.markdown1}/>


        {this.state.algCompsWinnerFeatureImporancesSomePredictors && (
      <div className="chart-container">
        {/* <div className="chart-title-large" >{this.props.chartTitle}</div> */}
        <div className="chart-title-small" >{"Feature Importances"}</div>

        <Bar
          data={this.state.algCompsWinnerFeatureImporancesSomePredictors.data}
          options={chartOptions.featureImportances}
        >
        </Bar>

      </div>
      )}
        </div>

        
        <ReactMarkdown source={this.markdown1b}/> 
            <div style={{paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '45%'}}>
              <ReactMarkdown source={this.markdown2}/> 
           </div>


           <br></br>
           <ReactMarkdown source={this.markdown3}/>
                     
           <div style={{overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '50%'}}>
              <ReactMarkdown source={this.markdown4}/> 
           </div>
           
           <br></br>



          

      <div style={{ "paddingTop": "20px" }}>
        
        {this.state.algCompsLineChartWinnerHometeam && (
          <div>
            <div className="chart-title-large" >{"Algorithm Comparisons (Adult Male Matches)"}</div>
            {/* {this.state.selectedMetric && (<div className="chart-title-small" >{this.state.selectedMetric.label}</div>)} */}
            
            <DropdownSelectorGroup  
      dropDownItemsListSelectorOne={this.state.metricDropdownList} 
      selectedValueSelectorOne = {this.state.selectedMetric} 
      setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeMetric.bind(this)}
    
      // dropDownItemsListSelectorTwo={this.state.sexDropdownList} 
      // selectedValueSelectorTwo = {this.state.selectedSex} 
      // setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeSex.bind(this)}
      // dropDownItemsListSelectorThree={this.state.ageDropdownList} 
      // selectedValueSelectorThree = {this.state.selectedAge} 
      // setParentSelectorStateSelectorThree={this.handleDropdownSelectorChangeAge.bind(this)}        
      toggleParentMenu={this.toggleMenu.bind(this)}/>


            <Line
              data={this.state.algCompsLineChartWinnerHometeam.data}
            >
            </Line>
          </div>
        )}


          </div>



          </div>



          <div className="simple-inline-container">

            <div id="overall-consistency-chart-and-data-container">

              <div id="overall-consistency-chart-container">
                {this.state.horizontalBarchartOverallConsistency && (
                  <HorizontalBar
                    id="overall-brand-consistency-horizontal-bar"
                    data={
                      this.state.horizontalBarchartOverallConsistency.data
                    }
                    options={
                      this.state.horizontalBarchartOverallConsistency
                        .chartOptions
                    }
                  />
                )}
              </div>
             
              <HorizontalTextwithBoldedSection textPrefix="Overall Consistency: " textPrefixStyle={{ 'font-size': "24px"}}
             textBolded={this.state.consistencyScoreText} textBoldedStyle={{ 'font-size': "28px", "padding-left": "6px", "font-weight": "bold"}}/> 

             <HorizontalTextwithBoldedSection textPrefix="Consistency Based on" 
             textBolded={this.state.seedsCountText} textBoldedStyle={{ 'font-size': "16px", color: "#8c3858", "padding-left": "6px", "padding-right": "6px"}}
             textSuffix="Seeds in Users' Fit Profiles" /> 
            
            </div>
            

            <div id="consistency-by-domain-chart-and-data-container"> 
              
              <div
                className="section-title-large-no-padding"
                id="chart-title-consistency-x-domain"
              >
                {this.state.horizontalBarchartConsistencyXProductDomain &&
                  "Consistency x Product Category"}
              </div>
              
              <div style={{height:"90%"}} >
                {this.state.horizontalBarchartConsistencyXProductDomain && (
                  <HorizontalBar 
                    
                    data={
                      this.state.horizontalBarchartConsistencyXProductDomain
                        .data
                    }
                    options={
                      this.state.horizontalBarchartConsistencyXProductDomain
                        .chartOptions
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <div className="section-title-large">
            {this.state
              .horizontalBarchartConsistencyXProductDomainXVariationChartCollection &&
              "Fit Consistency x Size Type"}
          </div>



          <div className="section-title-large">
            {this.state
              .horizontalBarchartConsistencyXProductDomainXScaleTypeChartCollection &&
              "Fit Consistency x Scale Type"}
          </div>


         
        </div>
      </div>
    </div>
     
    );
  }
}
export default AlgCompsScreen;          

