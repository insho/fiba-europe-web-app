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
    competitionDropdownList: [{value: 'Division C Men', label: 'Division C Men'},
    {value: 'EuroBasket - DIVISION A', label: 'EuroBasket - DIVISION A'},
    {value: 'EuroBasket Women - DIVISION A', label: 'EuroBasket Women - DIVISION A'},
    {value: 'EuroBasket Women - DIVISION B', label: 'EuroBasket Women - DIVISION B'},
    {value: 'EuroChallenge', label: 'EuroChallenge'},
    {value: 'EuroCup Women', label: 'EuroCup Women'},
    {value: 'EuroLeague Women', label: 'EuroLeague Women'},
    {value: 'South American League', label: 'South American League'},
    {value: 'U16 Men Div. C', label: 'U16 Men Div. C'},
    {value: 'U16 Men - DIVISION B', label: 'U16 Men - DIVISION B'},
    {value: 'U16 Women - DIVISION B', label: 'U16 Women - DIVISION B'},
    {value: 'U18 Men - DIVISION A', label: 'U18 Men - DIVISION A'},
    {value: 'U18 Men - DIVISION B', label: 'U18 Men - DIVISION B'},
    {value: 'U18 Women - DIVISION B', label: 'U18 Women - DIVISION B'},
    {value: 'U20 Women - DIVISION B', label: 'U20 Women - DIVISION B'}],
    selectedCompetition: {value: 'EuroBasket - DIVISION A', label: 'EuroBasket - DIVISION A'},
    matchDropdownList: [ {value: 1115, label: '2006-08-31 Czech Republic vs Belgium'},
    {value: 1109, label: '2006-08-31 Portugal vs F.Y.R. of Macedonia'},
    {value: 1117, label: '2006-09-03 Latvia vs Estonia'},
    {value: 1105, label: '2006-09-03 Ukraine vs Sweden'},
    {value: 1118, label: '2006-09-06 Croatia vs Estonia'},
    {value: 1111, label: '2006-09-06 F.Y.R. of Macedonia vs Bosnia and Herzegovina'},
    {value: 1112, label: '2006-09-09 F.Y.R. of Macedonia vs Portugal'},
    {value: 1106, label: '2006-09-09 Ukraine vs Bulgaria'},
    {value: 1113, label: '2006-09-13 Czech Republic vs Hungary'},
    {value: 1107, label: '2006-09-13 Portugal vs Bosnia and Herzegovina'},
    {value: 1116, label: '2006-09-16 Latvia vs Denmark'},
    {value: 1108, label: '2006-09-16 Portugal vs Israel'},
    {value: 1104, label: '2006-09-16 Ukraine vs Poland'},
    {value: 111, label: '2008-08-23 Finland vs Bulgaria'},
    {value: 109, label: '2008-09-13 Finland vs Italy'},
    {value: 110, label: '2008-09-20 Finland vs Hungary'},
    {value: 1110, label: '2012-12-11 F.Y.R. of Macedonia vs Israel'}],
    selectedMatch: {value: 110, label: '2008-09-20 Finland vs Hungary'}


  //   featureImportancePeriodDropdownList: [{value: "1", label: "Period 1"},
  //     {value: "2", label: "Period 2"},
  //     {value: "3", label: "Period 3"},
  //     {value: "4", label: "Period 4"}
  //   ],
  //   selectedFeatureImportancePeriod: { value: "1", label: "Period 1" },

  //   featureImportanceMinuteDropdownList: [{value: "1", label: "Minute 1"},
  //   {value: "2", label: "Minute 2"},
  //   {value: "3", label: "Minute 3"},
  //   {value: "4", label: "Minute 4"},
  //   {value: "5", label: "Minute 5"},
  //   {value: "6", label: "Minute 6"},
  //   {value: "7", label: "Minute 7"},
  //   {value: "8", label: "Minute 8"},
  //   {value: "9", label: "Minute 9"},
  //   {value: "10", label: "Minute 10"}],
  // selectedFeatureImportanceMinute: { value: "3", label: "Minute 3" }

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

  updateMatchDropdown = () => {
  
    
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'MatchDropdownSelector',
      selectedCompetition: this.state.selectedCompetition
    }), data => {
    
      this.setState({
        matchDropdownList: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors', 'metric_rate_severalpredictors', 'metric_rate_manypredictors'], { labels: ["some predictors", "several predictors", "many predictors"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"]})
        }
      })
    });

  }


  updateCharts = () => {
  
    
$.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
  queryName: 'AlgCompsWinnerAccuracyLine',
  selectedMetric: 'r2',
  selectedAge: this.state.selectedAge.value,
  selectedSex: this.state.selectedSex.value,
  selectedTarget: 'final_score_hometeam'
}), data => {

  this.setState({
    algCompsLineChartFinalScoreHometeam: {
      data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors', 'metric_rate_severalpredictors', 'metric_rate_manypredictors'], { labels: ["some predictors", "several predictors", "many predictors"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"]})
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

  //   handleDropdownSelectorChangeFeatureImportancePeriod = (selectedFeatureImportancePeriod) => {
  //   if(this.state.previouslySelectedFeatureImportancePeriod === undefined || (this.state.selectedFeatureImportancePeriod!== selectedFeatureImportancePeriod)) {
  //     Promise.resolve(this.setState({previouslySelectedFeatureImportancePeriod:this.state.selectedFeatureImportancePeriod,selectedFeatureImportancePeriod})).then(() => {this.updateCharts()});
  //   }
  // }

  // handleDropdownSelectorChangeFeatureImportanceMinute = (selectedFeatureImportanceMinute) => {
  //   if(this.state.previouslySelectedFeatureImportanceMinute === undefined || (this.state.selectedFeatureImportanceMinute!== selectedFeatureImportanceMinute)) {
  //     Promise.resolve(this.setState({previouslySelectedFeatureImportanceMinute:this.state.selectedFeatureImportanceMinute,selectedFeatureImportanceMinute})).then(() => {this.updateCharts()});
  //   }
  // }

  handleDropdownSelectorChangeCompetition = (selectedCompetition) => {
    if(this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition!== selectedCompetition)) {
      Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.updateMatchDropdown()});
    }
  }




markdownWinnerAlg1 = "As expected, the simplist algorithm (Alg A), with it's only two inputs being the current score of the home and away teams, predictably performs the worst out of the three. The \
algorithm with the most inputs (Alg C) performs the best, particularly toward the end of the match. However, Alg B, with a points broken down by shot (inputs like 'free throws made by hometeam' and 'two point shots made by hometeam', etc) is almost neck and neck with Alg C for the majority of the minutes in the match, and in fact performs at an equivalent rate of overall accuracy, or even better, at a few choice points early in the matches. \
 Perhaps the takeaway here is that, in the early stages of a match, metrics that are not directly related to score, like  \"starting five in play hometeam\" only server to muddle things, or lead to over-fitting of the alg on the training set. \n\n\n\n"

 markdownWinnerAlg2 = "### False Negatives & False Positives\n\n\
  If we switch the metric selector dropdown from Overall Accuracy to False Positives, it's apparent that much of the difference between Alg A and Algs B and C comes from an improvement in False Negatives (erroneously concluding that the hometeam lost a match which it actually ended up winning). Alg A has a false negative rate that is almost 10 percentage points higher than B and C at several points in the match. The rate of false positives (the alg erroneously concluding that the hometeam won a match it actually lost), on the other hand, is essentially the same for all three algs. Interesting! One common reason for an excess of false negatives in a classification model has to do with class imbalance (having significantly more matches in the training set which the hometeam won, instead of lost.\
Perhaps there is some truth to this, given that \"home team advantage\" is a known phenominon. The analytics website 538 states that the hometeam wins NBA games 59.9% of the time. We can check investigate this rate on the Fiba dataset using the following query:"

markdownWinnerAlg3 = "```sql\n\
WITH hometeam_win_loss as (\n\
  SELECT\n\
      winner,\n\
      count(*) as match_count\n\
  from\n\
      (\n\
          SELECT\n\
              match_id,\n\
              (\n\
                  case\n\
                      when max(final_score_hometeam) > max(final_score_awayteam) then 'home team'\n\
                      else 'away team'\n\
                  end\n\
              ) as winner\n\
          from\n\
              fiba_europe_games_master\n\
          group by\n\
              1\n\
      ) as s1\n\
  group by\n\
      1\n\
)\n\
SELECT\n\
  winner,\n\
  match_count /(\n\
      SELECT\n\
          SUM(match_count)\n\
      from\n\
          hometeam_win_loss\n\
  ) as win_pct\n\
from\n\
  hometeam_win_loss;\n\
```"


markdownWinnerAlg4 = "The results:\n\n\
hometeam: 57.1%\n\n\
awayteam: 42.9%\n\n\n\
It appears that home field advantage does indeed exist, and that our two classes of games (home team wins, home team loses) are indeed somewhat imbalanced. \
One remedy is to weight the training dataset (sklearn has a package for this). However, as we saw above, simply adding more features also significantly improves the false negative rates. Perhaps the takeaway here is that simply taking into account the current home team and away team scores does a decent job of telling us when the hometeam will win, but not when they will lose."


 
markdownFinalScoreAlg1 = "Interestingly, when it comes to predicting the final score of the hometeam, the differences between the three algs are a tale of two halfs. In the first half of a match (when the current score is less determinant of the final score), Alg A does the worst, with an R2 of 10% at minute 7 (period 1, 3 minutes remaining in period). This is in comparison to R2 rates of around 27-28% for Algs B and C.\n\n\
However, as the games progress to the 2nd half, Alg A does just as well as Alg B at predicting the final score, while Alg C, with all its various fields, performs markedly worse than the other two. On reflection, this is an understandable outcome. The inputs for algs A and B are related to scoring (Alg A's inputs solely consisting of the current scores of the two teams, while Alg B's inputs are a more detailed breakdown of the type of scoring that has occurred thusfar in the game). It follows that these algs would perform particularly well as the game progresses, as the current score beomes increasingly, disproportionally important in predicting the final score of the game.\n\n\
The variety of inputs in Alg C help to predict outcomes early in the game, but these fields seem to do more to muddle the predictive ability of the alg in the later stages of the game.\n\n\
Alg B appears to be a solid middle ground, equally successful in the first and second halfs. Of course, to truly maximize the predictive power here we would need to both experiment more with the input fields, as well as tweak the alg hyper-parameters."



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

          <PageHeader header="The Algorithms" subHeader={""}/>

          
 
          <div className="split-table-container-upper" style={{paddingRight:'4%'}}> 


        
        {this.state.algCompsLineChartWinnerHometeam && (
          <div>
            <div className="chart-title-large" >{"Algorithm Comparisons - Predicting Match Winner"}</div>
            <div className="chart-title-small" >{"Adult Male Matches"}</div>
            {/* {this.state.selectedMetric && (<div className="chart-title-small" >{this.state.selectedMetric.label}</div>)} */}
            
            <DropdownSelectorGroup  
      dropDownItemsListSelectorOne={this.state.sexDropdownList} 
      selectedValueSelectorOne = {this.state.selectedSex} 
      setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeSex.bind(this)}
    
      dropDownItemsListSelectorTwo={this.state.ageDropdownList} 
      selectedValueSelectorTwo = {this.state.selectedAge} 
      setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeAge.bind(this)}        
      toggleParentMenu={this.toggleMenu.bind(this)}/>

<DropdownSelectorGroup  
      dropDownItemsListSelectorOne={this.state.sexDropdownList} 
      selectedValueSelectorOne = {this.state.selectedSex} 
      setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeSex.bind(this)}
    
      dropDownItemsListSelectorTwo={this.state.ageDropdownList} 
      selectedValueSelectorTwo = {this.state.selectedAge} 
      setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeAge.bind(this)}        
      toggleParentMenu={this.toggleMenu.bind(this)}/>

            <Line data={this.state.algCompsLineChartWinnerHometeam.data}>
            </Line>
          </div>
        )}



<ReactMarkdown source={this.markdownWinnerAlg1} style={{paddingLeft: '10%', width: '60%', paddingTop: '4%'}}/>
<ReactMarkdown source={this.markdownWinnerAlg2} style={{paddingLeft: '10%', width: '60%', paddingTop: '6%'}}/>

<div style={{paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '60%'}}>
<ReactMarkdown source={this.markdownWinnerAlg3} style={{paddingLeft: '10%', width: '60%', paddingTop: '6%'}}/>
 </div>
 
<ReactMarkdown source={this.markdownWinnerAlg4} style={{paddingLeft: '10%', width: '60%', paddingTop: '6%'}}/>


<div className="chart-divider" />
  <hr
    style={{
      color: "#ced6d4",
      backgroundColor: "#e7e7e7",
      height: '.1',
      paddingLeft: '2%',
      paddingRight: '2%',
      paddingRight: '5%'
      // paddingTop: "5%",
      //       paddingBottom: "5%"

    }}
  />

{this.state.algCompsLineChartFinalScoreHometeam && (
          <div>
            <div className="chart-title-large" >{"Algorithm Comparisons - Predicting Home Team Final Score"}</div>
            <div className="chart-title-small" >{"Adult Male Matches"}</div>
            {/* {this.state.selectedMetric && (<div className="chart-title-small" >{this.state.selectedMetric.label}</div>)} */}
      

            <Line data={this.state.algCompsLineChartFinalScoreHometeam.data}>
            </Line>
          </div>
        )}

        
 
        <ReactMarkdown source={this.markdownFinalScoreAlg1} style={{paddingLeft: '10%', width: '60%', paddingTop: '6%'}}/>


          </div>


          <div className="split-table-container-lower" style={{paddingRight:'4%'}}> 

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

</div>

          </div>
          

</div>


                 
        </div>
     
    );
  }
}
export default AlgCompsScreen;          

