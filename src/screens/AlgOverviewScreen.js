import React, { Component } from "react";
import $ from "jquery";
import Banner from "../components/Banner.js";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import Menu from "./Menu";
import PageHeader from "../components/PageHeader"
import HorizontalTextwithBoldedSection from "../components/HorizontalTextwithBoldedSection"
import ReactMarkdown from 'react-markdown';
import "../App.css";
import "./GameSummaryScreen.css";
import { selectStylesTertiary } from "../options/SelectStyles";
import { NavLink } from "react-router-dom";

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

class AlgOverviewScreen extends Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      loadingFeatureImportancesSeveralPredictors: true,
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
      
      metricDropdownList: [{value: "accuracy", label: "Overall Accuracy"},
      {value: "true positive rate", label: "True Positive Rate"},
      {value: "true negative rate", label: "True Negative Rate"},
      {value: "positive predictive value", label: "Positive Predictive Value"},
      {value: "negative predictive value", label: "Negative Predictive Value"},
      {value: "false positive rate", label: "False Positive Rate"},
      {value: "false negative rate", label: "False Negative Rate"},
      {value: "false discovery rate", label: "False Discovery Rate"}
      // {value: "r2", label: "r2"},
    ],
    selectedMetric: { value: "accuracy", label: "Overall Accuracy" },



    featureImportancePeriodDropdownList: [{value: "1", label: "Period 1"},
      {value: "2", label: "Period 2"},
      {value: "3", label: "Period 3"},
      {value: "4", label: "Period 4"}
    ],
    selectedFeatureImportancePeriod: { value: "1", label: "Period 1" },

    featureImportanceMinuteDropdownList: [{value: "1", label: "Minute 1"},
    {value: "2", label: "Minute 2"},
    {value: "3", label: "Minute 3"},
    {value: "4", label: "Minute 4"},
    {value: "5", label: "Minute 5"},
    {value: "6", label: "Minute 6"},
    {value: "7", label: "Minute 7"},
    {value: "8", label: "Minute 8"},
    {value: "9", label: "Minute 9"},
    {value: "10", label: "Minute 10"}],
  selectedFeatureImportanceMinute: { value: "3", label: "Minute 3" }

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
    // this.setState({loading: false});
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

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerFeatureImportanceSeveralPredictors',
      selectedAge: this.state.selectedAge.value,
      selectedSex: this.state.selectedSex.value,
      selectedTarget: 'winner_hometeam',
      period: this.state.selectedFeatureImportancePeriod.value,
      minute: this.state.selectedFeatureImportanceMinute.value
      

    }), data => {

      this.setState({
        algCompsWinnerFeatureImporancesSeveralPredictors: {
          data: assembleChartDataCollectionSingleRowMultipleColumns(data, ['current_score_hometeam','current_score_awayteam','two_point_shots_made_hometeam','two_point_shots_missed_hometeam','three_point_shots_made_hometeam','three_point_shots_missed_hometeam','free_throw_shots_made_hometeam','free_throw_shots_missed_hometeam','two_point_shots_made_awayteam','two_point_shots_missed_awayteam','three_point_shots_made_awayteam','three_point_shots_missed_awayteam','free_throw_shots_made_awayteam','free_throw_shots_missed_awayteam'], { labels: ['current score hometeam','current score awayteam','two point shots made hometeam','two point shots missed hometeam','three point shots made hometeam','three point shots missed hometeam','free throw shots made hometeam','free throw shots missed hometeam','two point shots made awayteam','two point shots missed awayteam','three point shots made awayteam','three point shots missed awayteam','free throw shots made awayteam','free throw shots missed awayteam']})
        },
        loadingFeatureImportancesSeveralPredictors: false
      })

    });
    }


    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerFeatureImportanceManyPredictors',
      selectedAge: this.state.selectedAge.value,
      selectedSex: this.state.selectedSex.value,
      selectedTarget: 'winner_hometeam',
      period: this.state.selectedFeatureImportancePeriod.value,
      minute: this.state.selectedFeatureImportanceMinute.value
      

    }), data => {

      this.setState({
        algCompsWinnerFeatureImporancesManyPredictors: {
          data: assembleChartDataCollectionSingleRowMultipleColumns(data, ['current_score_hometeam','current_score_awayteam','team_fouls_committed_hometeam','team_fouls_committed_awayteam','avg_time_between_scoring_events_overall_hometeam','avg_time_between_scoring_events_overall_awayteam','avg_time_between_scoring_events_overall','current_lead_hometeam','cumulative_lead_changes_game','cumulative_avg_abs_size_of_lead_game','cumulative_max_abs_size_of_lead_game','cumulative_max_size_of_lead_game_hometeam','cumulative_max_size_of_lead_game_awayteam','avg_abs_size_of_lead_quarter','cumulative_possessions_overall_hometeam','cumulative_possessions_overall_awayteam','starting_five_in_play_hometeam','starting_five_in_play_awayteam','top_five_scorers_in_play_hometeam','top_five_scorers_in_play_awayteam','percent_of_total_points_scored_by_players_in_play_awayteam','percent_of_total_points_scored_by_players_in_play_hometeam','points_scored_by_players_in_play_hometeam','points_scored_by_players_in_play_awayteam','top_five_players_in_play_hometeam','top_five_players_in_play_awayteam','total_stat_count_players_in_play_hometeam','total_stat_count_players_in_play_awayteam','percent_of_total_stat_count_by_players_in_play_hometeam','percent_of_total_stat_count_by_players_in_play_awayteam','cumulative_player_personal_fouls_hometeam','cumulative_player_personal_fouls_awayteam','players_with_one_foul_hometeam','players_with_two_fouls_hometeam','players_with_three_fouls_hometeam','players_with_four_fouls_hometeam','players_with_five_fouls_hometeam','players_with_one_foul_awayteam','players_with_two_fouls_awayteam','players_with_three_fouls_awayteam','players_with_four_fouls_awayteam','players_with_five_fouls_awayteam','two_point_shots_made_hometeam','jump_shots_made_hometeam','lay_up_shots_made_hometeam','put_backs_shots_made_hometeam','dunk_shots_made_hometeam','two_point_shots_missed_hometeam','jump_shots_missed_hometeam','lay_up_shots_missed_hometeam','put_backs_shots_missed_hometeam','dunk_shots_missed_hometeam','three_point_shots_made_hometeam','three_point_shots_missed_hometeam','free_throw_shots_made_hometeam','free_throw_shots_missed_hometeam','two_point_shots_made_awayteam','jump_shots_made_awayteam','lay_up_shots_made_awayteam','put_backs_shots_made_awayteam','dunk_shots_made_awayteam','two_point_shots_missed_awayteam','jump_shots_missed_awayteam','lay_up_shots_missed_awayteam','put_backs_shots_missed_awayteam','dunk_shots_missed_awayteam','three_point_shots_made_awayteam','three_point_shots_missed_awayteam','free_throw_shots_made_awayteam','free_throw_shots_missed_awayteam'], { labels: ['current score hometeam','current score awayteam','team fouls committed hometeam','team fouls committed awayteam','avg time between scoring events overall hometeam','avg time between scoring events overall awayteam','avg time between scoring events overall','current lead hometeam','cumulative lead changes game','cumulative avg abs size of lead game','cumulative max abs size of lead game','cumulative max size of lead game hometeam','cumulative max size of lead game awayteam','avg abs size of lead quarter','cumulative possessions overall hometeam','cumulative possessions overall awayteam','starting five in play hometeam','starting five in play awayteam','top five scorers in play hometeam','top five scorers in play awayteam','percent of total points scored by players in play awayteam','percent of total points scored by players in play hometeam','points scored by players in play hometeam','points scored by players in play awayteam','top five players in play hometeam','top five players in play awayteam','total stat count players in play hometeam','total stat count players in play awayteam','percent of total stat count by players in play hometeam','percent of total stat count by players in play awayteam','cumulative player personal fouls hometeam','cumulative player personal fouls awayteam','players with one foul hometeam','players with two fouls hometeam','players with three fouls hometeam','players with four fouls hometeam','players with five fouls hometeam','players with one foul awayteam','players with two fouls awayteam','players with three fouls awayteam','players with four fouls awayteam','players with five fouls awayteam','two point shots made hometeam','jump shots made hometeam','lay up shots made hometeam','put backs shots made hometeam','dunk shots made hometeam','two point shots missed hometeam','jump shots missed hometeam','lay up shots missed hometeam','put backs shots missed hometeam','dunk shots missed hometeam','three point shots made hometeam','three point shots missed hometeam','free throw shots made hometeam','free throw shots missed hometeam','two point shots made awayteam','jump shots made awayteam','lay up shots made awayteam','put backs shots made awayteam','dunk shots made awayteam','two point shots missed awayteam','jump shots missed awayteam','lay up shots missed awayteam','put backs shots missed awayteam','dunk shots missed awayteam','three point shots made awayteam','three point shots missed awayteam','free throw shots made awayteam','free throw shots missed awayteam']})
        }
      })

    });
  
    

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

    handleDropdownSelectorChangeFeatureImportancePeriod = (selectedFeatureImportancePeriod) => {
    if(this.state.previouslySelectedFeatureImportancePeriod === undefined || (this.state.selectedFeatureImportancePeriod!== selectedFeatureImportancePeriod)) {
      Promise.resolve(this.setState({previouslySelectedFeatureImportancePeriod:this.state.selectedFeatureImportancePeriod,selectedFeatureImportancePeriod})).then(() => {this.updateCharts()});
    }
  }

  handleDropdownSelectorChangeFeatureImportanceMinute = (selectedFeatureImportanceMinute) => {
    if(this.state.previouslySelectedFeatureImportanceMinute === undefined || (this.state.selectedFeatureImportanceMinute!== selectedFeatureImportanceMinute)) {
      Promise.resolve(this.setState({previouslySelectedFeatureImportanceMinute:this.state.selectedFeatureImportanceMinute,selectedFeatureImportanceMinute})).then(() => {this.updateCharts()});
    }
  }

markdown = "I've created and tested three algorithms for each metric (winner, points scored, etc), using different sets of input features. They are the following:\n\n\n\n\n\
* **A. \"Some Features**\"\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is the simplest algorithm, involving only two features:\n\n";


markdown1 = "```\n\
current_score_hometeam\n\
current_score_awayteam\n\
```\n\n\
";

markdown1b = "* **B. \"Several Features**\"\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is a bit more complex, involving the two features from alg A, as well as 12 others:\n\n";


markdown2 = "\
```python\n\
current_score_hometeam\n\
current_score_awayteam\n\
two_point_shots_made_hometeam\n\
two_point_shots_missed_hometeam\n\
three_point_shots_made_hometeam\n\
three_point_shots_missed_hometeam\n\
free_throw_shots_made_hometeam\n\
free_throw_shots_missed_hometeam\n\
two_point_shots_made_awayteam\n\
two_point_shots_missed_awayteam\n\
three_point_shots_made_awayteam\n\
three_point_shots_missed_awayteam\n\
free_throw_shots_made_awayteam\n\
free_throw_shots_missed_awayteam\n\
```\n\
";
markdown3 = "\
* **C. \"Many Features**\"\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I threw in everything I could think of here. There are something like 80 fields:\n\n\n";

markdown4 = "```\n\
current_score_hometeam\n\
current_score_awayteam\n\
team_fouls_committed_hometeam\n\
team_fouls_committed_awayteam\n\
avg_time_between_scoring_events_overall_hometeam\n\
avg_time_between_scoring_events_overall_awayteam\n\
avg_time_between_scoring_events_overall\n\
current_lead_hometeam\n\
cumulative_lead_changes_game\n\
cumulative_avg_abs_size_of_lead_game\n\
cumulative_max_abs_size_of_lead_game\n\
cumulative_max_size_of_lead_game_hometeam\n\
cumulative_max_size_of_lead_game_awayteam\n\
avg_abs_size_of_lead_quarter\n\
cumulative_possessions_overall_hometeam\n\
cumulative_possessions_overall_awayteam\n\
starting_five_in_play_hometeam\n\
starting_five_in_play_awayteam\n\
top_five_scorers_in_play_hometeam\n\
top_five_scorers_in_play_awayteam\n\
percent_of_total_points_scored_by_players_in_play_awayteam\n\
percent_of_total_points_scored_by_players_in_play_hometeam\n\
points_scored_by_players_in_play_hometeam\n\
points_scored_by_players_in_play_awayteam\n\
top_five_players_in_play_hometeam\n\
top_five_players_in_play_awayteam\n\
total_stat_count_players_in_play_hometeam\n\
total_stat_count_players_in_play_awayteam\n\
percent_of_total_stat_count_by_players_in_play_hometeam\n\
percent_of_total_stat_count_by_players_in_play_awayteam\n\
cumulative_player_personal_fouls_hometeam\n\
cumulative_player_personal_fouls_awayteam\n\
players_with_one_foul_hometeam\n\
players_with_two_fouls_hometeam\n\
players_with_three_fouls_hometeam\n\
players_with_four_fouls_hometeam\n\
players_with_five_fouls_hometeam\n\
players_with_one_foul_awayteam\n\
players_with_two_fouls_awayteam\n\
players_with_three_fouls_awayteam\n\
players_with_four_fouls_awayteam\n\
players_with_five_fouls_awayteam\n\
two_point_shots_made_hometeam\n\
jump_shots_made_hometeam\n\
lay_up_shots_made_hometeam\n\
put_backs_shots_made_hometeam\n\
dunk_shots_made_hometeam\n\
two_point_shots_missed_hometeam\n\
jump_shots_missed_hometeam\n\
lay_up_shots_missed_hometeam\n\
put_backs_shots_missed_hometeam\n\
dunk_shots_missed_hometeam\n\
three_point_shots_made_hometeam\n\
three_point_shots_missed_hometeam\n\
free_throw_shots_made_hometeam\n\
free_throw_shots_missed_hometeam\n\
two_point_shots_made_awayteam\n\
jump_shots_made_awayteam\n\
lay_up_shots_made_awayteam\n\
put_backs_shots_made_awayteam\n\
dunk_shots_made_awayteam\n\
two_point_shots_missed_awayteam\n\
jump_shots_missed_awayteam\n\
lay_up_shots_missed_awayteam\n\
put_backs_shots_missed_awayteam\n\
dunk_shots_missed_awayteam\n\
three_point_shots_made_awayteam\n\
three_point_shots_missed_awayteam\n\
free_throw_shots_made_awayteam\n\
free_throw_shots_missed_awayteam\n\
```\n\
"

markdownFeatureImportance = "Feature Importances indicate the importance/relevance of the input features to the target (output) feature for which the model predicts\n\n\
The feature importances plotted below are for algs predicting whether the home team won the match, at the specified period and minute:"

markdownTuning1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For the purpose of this exercise I refrained from properly tuning any of the algorithms. I opted instead to input the following hyperparameters:\n\n"
markdownTuning2Code = "```python \
{n_estimators: 200,\n\
 max_depth: 10,\n\
 # Rule of thumb for min_samples_split is to take ~0.5-1% of total values in the dataset\n\
 min_samples_split: int(round(len(dataset)*.007,0)),\n\
 # Rule of thumb for min_samples_leaf is for it to be about 1/10 of the min_samples_split\n\
 min_samples_leaf:  int(round(len(dataset)*.0007,0)),\n\
 subsample: .8,\n\
 max_features: \"sqrt\",\n\
 learning_rate:.005}\n\
 ```";

 markdownFurtherInfo = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Further info regarding the creation of the algorithms can be found here:\n\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**"

 markdownConclusion1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As one would expect, the most important feature in predicting whether the home team won a match is the home team's current score. The second most important is the away team's current score. This is true for all three algorithms.\n\n\ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We can see that, particularly early in the match, there is a virtual tie between home team and away team current score for Alg A and B. Alg C, on the other hand, clearly favors the home team's current score far more than any other factor, almost twice as much (!) as the away team's final score. I am a bit wary of this result. My first thought is that something eronious is occurring, as the addition of several other less important inputs (like 'players with two fouls for the home team' for example) would cause 'current score home team' to suddenly be so disproportionaly imporant. Alg B certainly does not exhibit this kind of difference. "


 // The code for this app [is here](https://github.com/insho/fiba-europe-web-app)\n\n\n\
// The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project). It involved four main parts:\n\n\
// 1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**\n\
// 2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**\n\
// 3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**\n\
// 4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**\n\n\n";


  render() {

    return (

      <div>
      <Menu menuVisibility={this.state.visible}
      toggleParentMenu={this.toggleMenu.bind(this)}/>
      
      
      <div onMouseDown={this.closeMenu}>

      <Banner bannerTextMajor = {"Algorithms Overview"}  
      toggleParentMenu={this.toggleMenu.bind(this)}/>


        <div className="page-body">

          <PageHeader header="The Algorithms" subHeader={""}/>

          
 
          <div className="split-table-container-upper" style={{paddingRight:'4%'}}> 


          

        <ReactMarkdown source={this.markdown} style={{paddingLeft: '10%', width: '60%', paddingTop: '2%'}}/>

  
    <div style={{paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '60%'}}>

              <ReactMarkdown source={this.markdown1}/> 
              </div>
        {/* <ReactMarkdown source={this.markdown1} style={{paddingLeft: '10%', width: '60%', backgroundColor: "#656565ff"}}/> */}

        {/* <div className="horizontal-chart-container" style={{width: '70vw',paddingTop: '20px'}}> */}

    
        
        
        {/* <ReactMarkdown source={this.markdown1b}/>  */}
        {/* <div style={{paddingLeft: '10%', width: '60%'}}> */}
              <ReactMarkdown source={this.markdown1b}  style={{paddingTop: '2%'}}/> 
           {/* </div> */}

            <div style={{paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '60%'}}>
              <ReactMarkdown source={this.markdown2}/> 
           </div>


           

        




           <br></br>
           <ReactMarkdown source={this.markdown3} style={{paddingTop: '20px'}}/>
                     



           <div style={{paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '60%'}}>
           <ReactMarkdown source={this.markdown4}/> 
           </div>
 



<div className="chart-divider" />
  <hr
    style={{
      color: "#ced6d4",
      backgroundColor: "#e7e7e7",
      height: '.1',
      paddingLeft: '2%',
            paddingRight: '2%'
      // paddingTop: "5%",
      //       paddingBottom: "5%"

    }}
  />


<div style={{ width: '60%', paddingLeft: '2%'}}>


<PageHeader header="Alg Tuning & Hyper Parameters" subHeader={""}/>

<div >
           <ReactMarkdown source={this.markdownTuning1}/> 
           </div>

           <div >
           <ReactMarkdown source={this.markdownTuning2Code} style={{paddingLeft: '10vw', maxHeight: '35vh', width: '70vw',paddingTop: '5px', paddingBottom: '5vh'}}/> 
           </div>

           <ReactMarkdown source={this.markdownFurtherInfo} style={{maxHeight: '35vh', width: '70vw',paddingTop: '5px', paddingBottom: '5vh'}}/> 
           

           <div className="chart-divider" />
  <hr
    style={{
      color: "#ced6d4",
      backgroundColor: "#e7e7e7",
      height: '.1',
      paddingLeft: '2%',
            paddingRight: '2%'
      // paddingTop: "5%",
      //       paddingBottom: "5%"

    }}
  />

<PageHeader header="Feature Importances" subHeader={""}/>

{/* <div className="chart-title-large" >{"Feature Importances"}</div> */}
{/* <div className="chart-title-small">{"Feature Importances indicate the importance/relevance of the input features to the target (output) feature for which the model predicts"}</div>
<div className="chart-title-small">{"The feature importances plotted below are for algs predicting the winner of the match, at the period and minute specified below:"}</div> */}





<div >
           <ReactMarkdown source={this.markdownFeatureImportance}/> 
           </div>



<DropdownSelectorGroup 
dropDownItemsListSelectorOne={this.state.featureImportancePeriodDropdownList} 
selectedValueSelectorOne = {this.state.selectedFeatureImportancePeriod} 
setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeFeatureImportancePeriod.bind(this)}

dropDownItemsListSelectorTwo={this.state.featureImportanceMinuteDropdownList} 
selectedValueSelectorTwo = {this.state.selectedFeatureImportanceMinute} 
setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeFeatureImportanceMinute.bind(this)}
// dropDownItemsListSelectorThree={this.state.ageDropdownList} 
// selectedValueSelectorThree = {this.state.selectedAge} 
// setParentSelectorStateSelectorThree={this.handleDropdownSelectorChangeAge.bind(this)}        
selectedSyles = {selectStylesTertiary}
toggleParentMenu={this.toggleMenu.bind(this)}/>


{this.state.algCompsWinnerFeatureImporancesSomePredictors && (
<div className="feature-importance-chart-container" style={{maxHeight: '35vh', width: '70vw',paddingTop: '20px', paddingBottom: '5vh'}}>
   

{/* <div className="chart-title-large" >{this.props.chartTitle}</div> */}


<div className="chart-title-large" >{"Algorithm A"}</div>

{/* <ReactMarkdown source={this.markdownFeatureImportance}/> */}

{/* <div className="chart-title-small" style={{fontSize: '14px'}}>{"Predicting the winner of the match"}</div> */}


<Bar
  data={this.state.algCompsWinnerFeatureImporancesSomePredictors.data}
  options={chartOptions.featureImportances}
>
</Bar>
</div>
)}
          

{this.state.loading ? <div className='loading-spinner' style={{paddingTop: '5vh'}}>
<HashLoader
  // css={override}
  sizeUnit={"px"}
  size={100}
  color={'#d14972'}
  loading={this.state.loading}
/>
</div> :
<div>
{this.state.algCompsWinnerFeatureImporancesSeveralPredictors 
  &&   (
<div className="feature-importance-chart-container" style={{width: '70vw',paddingTop: '5vh'}}>
  {/* <div className="chart-title-large" >{this.props.chartTitle}</div> */}
  <div className="chart-title-large" >{"Algorithm B"}</div>
  <Bar 
    data={this.state.algCompsWinnerFeatureImporancesSeveralPredictors.data}
    options={chartOptions.featureImportances}
  >
  </Bar>

</div>
  )}
  </div>
  }



          

{this.state.algCompsWinnerFeatureImporancesManyPredictors && (
<div className="feature-importance-chart-container" style={{width: '70vw',paddingTop: '5vh'}}>
{/* <div className="chart-title-large" >{this.props.chartTitle}</div> */}
<div className="chart-title-large" >{"Algorithm C"}</div>
<Bar
data={this.state.algCompsWinnerFeatureImporancesManyPredictors.data}
options={chartOptions.featureImportances}
>
</Bar>

</div>
)}


<div style={{paddingTop: "10px"}}>
           <ReactMarkdown source={this.markdownConclusion1}/> 
           </div>

{/* <div className="horizontal-chart-container" style={{paddingTop: "10px"}}> */}
{/* <ReactMarkdown source={"We can see how the algorithms fared against a test data set here, on the 'Alg Comparisons' page"}/> */}
<NavLink  exact to="/machine-learning-alg-comps">We can see how the algorithms fared against a test data set here, on the 'Alg Comparisons' page</NavLink>
{/* </div> */}

          </div>
          

</div>


                 
        </div>
      </div>
    </div>
     
    );
  }
}
export default AlgOverviewScreen;          

