// import React from "react";
import React, { Component } from "react";
import $ from "jquery";
import "../App.css";
// import "./CompetitionDetailScreen.css";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import { selectStylesSecondary, selectStylesTertiary } from "../options/SelectStyles";
import ReactMarkdown from 'react-markdown';
import "./AlgOverviewScreen.css";
import Banner from "../components/Banner.js";
import HorizontalTextwithBoldedSection from "../components/HorizontalTextwithBoldedSection"
import PageHeader from "../components/PageHeader"
import { chartOptions } from "../options/ChartOptions.js";
import { HorizontalBar,Bar,Line, Pie } from "react-chartjs-2";
import Menu from "./Menu";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { TabProvider, Tab, TabPanel, TabList, Tabs } from 'react-web-tabs';
import CompetitionDetailScreenTabStats from "./CompetitionDetailScreenTabStats";
import CompetitionDetailScreenTabMachineLearning from "./CompetitionDetailScreenTabMachineLearning";
import { assembleChartDataCollectionSimple,
  assembleChartDataCollectionSimpleMultiple,
  assembleChartDataCollectionGrouped,
  assembleChartDataCollectionStacked,
  assembleChartDataCollectionSimplewithColors,
     assemblePivotedPieChart,
  assemblePivotedPieChartCollection
 } from "../options/ChartAssembly";
import HorizontalChartandtitleContainer from "../components/HorizontalChartandTitleContainer";
// import executeQuery from "/Users/joe/src/testapp_dd2/server/index.js"
const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

// Consistency Definitions
// const SIZE_CONSISTENCY_BOUNDARY_VERY_INCONSISTENT = 0;
// const SIZE_CONSISTENCY_BOUNDARY_INCONSISTENT = 0.2;
// const SIZE_CONSISTENCY_BOUNDARY_CONSISTENT = 0.5;
// const SIZE_CONSISTENCY_BOUNDARY_VERY_CONSISTENT = 0.8;

// Consistency Colors
// const SIZE_CONSISTENCY_COLOR_VERY_INCONSISTENT = "#b71c1c";
// const SIZE_CONSISTENCY_COLOR_INCONSISTENT = "#ff8f00";
// const SIZE_CONSISTENCY_COLOR_CONSISTENT = "#81c784";
// const SIZE_CONSISTENCY_COLOR_VERY_CONSISTENT = "#388e3c";

// Consistency Colors
const MIN_CONSIDERED_THRESHOLD_TO_ASSES_CONSISTENCY = 5;

// TODO - Make Global
function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject)
    .map(key => `${key}=${paramObject[key]}`)
    .join("&")}`;
}


function numberWithCommas(x) {
  try {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } catch(e) {
    return x
  }

}

const columns = [{
  Header: 'Year',
  accessor: 'schedule_year',
  // Cell: ({row}) =><a href={'competitionscreen/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
  width: 80
}, {
  Header: 'First Match',
  accessor: 'from_date',
  width: 120
  // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
}, 
{
    Header: 'Last Match',
    accessor: 'to_date',
    width: 120
    
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
    Header: 'Teams Involved',
    accessor: 'teams',
    width: 180
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
    Header: 'Matches',
    accessor: 'matches',
    width: 140
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
 accessor: 'competition_group_id',
 show: false
}
]


/**
 * If a dropdown value is passed to the current screen from a url param (like a brand_id, for example), check to see if
 * 1. the param is indeed defined
 * 2. the array of dropdown objects contains the "value" property matching the url param
 * If so, return this item from the dropdown array. Otherwise return the first array entry.
 * @param {Array} dropdownListArray - array of dropdown objects (each containing a "value" and "label" property)
 * @param {Object} props  - props passed to screen
 * @param {String} parameterName - name of parameter (brandId, dateRange, etc)
 */
function searchDropdownListArrayforObjectwithValue(dropdownListArray, props, parameterName) {
  try {
    const value = (((props || {}).match || {}).params || {})[parameterName];

    if (value === undefined) {
      return dropdownListArray[0];
    } else {
      for (var i = 0; i < dropdownListArray.length; i++) {
        if (dropdownListArray[i].value === value) {
          return dropdownListArray[i];
        } else if (i + 1 === dropdownListArray.length) {
          return dropdownListArray[0];
        }
      }
    }
  } catch (e) {
    return dropdownListArray[0];
  }
}



export default class CompetitionDetailScreen extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      periodDropdownList: [{value: "1", label: "Period 1"},
      {value: "2", label: "Period 2"},
      {value: "3", label: "Period 3"},
      {value: "4", label: "Period 4"}
    ],
    selectedPeriod: { value: "1", label: "Period 1" },

    minuteDropdownList: [{value: "1", label: "Minute 1"},
    {value: "2", label: "Minute 2"},
    {value: "3", label: "Minute 3"},
    {value: "4", label: "Minute 4"},
    {value: "5", label: "Minute 5"},
    {value: "6", label: "Minute 6"},
    {value: "7", label: "Minute 7"},
    {value: "8", label: "Minute 8"},
    {value: "9", label: "Minute 9"},
    {value: "10", label: "Minute 10"}],
  selectedMinute: { value: "3", label: "Minute 3" }
    };

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

  state = {
    brandDropdownList: null,
    data: null,
    selectedBrand: null,
    previouslySelectedBrand: null
  };

  toggleMenu = this.toggleMenu.bind(this);
  handleMouseDown = this.handleMouseDown.bind(this);

  closeMenu(e) {
    if (this.state.visible === true) {
      this.toggleMenu();
      e.stopPropagation();
    }
  }

  componentDidMount() {
    //Get list of brands for brand selector dropdown
    this.setState({
      ageDropdownList: [{ value: "Adult", label: "Adult" },
      { value: "U20", label: "U20" },
      { value: "U18", label: "U18" },
      { value: "U16", label: "U16" }],
      selectedAge: { value: "Adult", label: "Adult" },
      sexDropdownList: [{ value: "female", label: "Female" },
      { value: "male", label: "Male" }],
      selectedSex: { value: "male", label: "Male" },
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
    
    periodDropdownList: [{value: "1", label: "Period 1"},
      {value: "2", label: "Period 2"},
      {value: "3", label: "Period 3"},
      {value: "4", label: "Period 4"}
    ],
    selectedPeriod: { value: "1", label: "Period 1" },

    minuteDropdownList: [{value: "1", label: "Minute 1"},
    {value: "2", label: "Minute 2"},
    {value: "3", label: "Minute 3"},
    {value: "4", label: "Minute 4"},
    {value: "5", label: "Minute 5"},
    {value: "6", label: "Minute 6"},
    {value: "7", label: "Minute 7"},
    {value: "8", label: "Minute 8"},
    {value: "9", label: "Minute 9"},
    {value: "10", label: "Minute 10"}],
  selectedMinute: { value: "3", label: "Minute 3" } ,
  predictorDropdownList: [{value: "somepredictors", label: "Alg A (some)"},
  {value: "severalpredictors", label: "Alg B (several)"},
  {value: "manypredictors", label: "Alg C (many)"}],
  selectedPredictor: {value: "somepredictors", label: "Alg A (some)"},
  competitionDropdownList: [
    {value: "EuroBasket - DIVISION A", label: "EuroBasket - DIVISION A"},
    {value: "EuroBasket Women - DIVISION B", label: "EuroBasket Women - DIVISION B"},
    {value: "U16 Men - DIVISION B", label: "U16 Men - DIVISION B"},
    {value: "EuroChallenge", label: "EuroChallenge"},
    {value: "U20 Women - DIVISION B", label: "U20 Women - DIVISION B"},
    {value: "EuroLeague Women", label: "EuroLeague Women"},
    {value: "EuroCup Women", label: "EuroCup Women"},
    {value: "U18 Men - DIVISION A", label: "U18 Men - DIVISION A"},
    {value: "U18 Women - DIVISION B", label: "U18 Women - DIVISION B"},
    {value: "EuroBasket Women - DIVISION A", label: "EuroBasket Women - DIVISION A"},
    {value: "South American League", label: "South American League"},
    {value: "U16 Men Div. C", label: "U16 Men Div. C"},
    {value: "U18 Men - DIVISION B", label: "U18 Men - DIVISION B"},
    {value: "U16 Women - DIVISION B", label: "U16 Women - DIVISION B"},
    {value: "Division C Men", label: "Division C Men"}
  ],
  selectedCompetition: {value: "EuroCup Women", label: "EuroCup Women"},
  competitionGroupId: "eurocup_women"

  
  

    });
     
console.log("ID " + this.props.match.params.competitionGroupId)
this.handleCompetitionPassedbyURL(this.props.match.params.competitionGroupId)

  }


  handleCompetitionPassedbyURL = (competitionGroupId) => {
    if (this.state.competitionGroupId == null || this.state.competitionGroupId != competitionGroupId ) {
      
      const competitionDropdownDict= {
        "eurobasket_-_division_a": {value: "EuroBasket - DIVISION A", label: "EuroBasket - DIVISION A"},
        "eurobasket_women_-_division_b": {value: "EuroBasket Women - DIVISION B", label: "EuroBasket Women - DIVISION B"},
        "u16_men_-_division_b": {value: "U16 Men - DIVISION B", label: "U16 Men - DIVISION B"},
        "eurochallenge": {value: "EuroChallenge", label: "EuroChallenge"},
        "u20_women_-_division_b": {value: "U20 Women - DIVISION B", label: "U20 Women - DIVISION B"},
        "euroleague_women": {value: "EuroLeague Women", label: "EuroLeague Women"},
        "eurocup_women": {value: "EuroCup Women", label: "EuroCup Women"},
        "u18 men_-_division_a": {value: "U18 Men - DIVISION A", label: "U18 Men - DIVISION A"},
        "u18 women_-_division_b": {value: "U18 Women - DIVISION B", label: "U18 Women - DIVISION B"},
        "eurobasket_women_-_division_a": {value: "EuroBasket Women - DIVISION A", label: "EuroBasket Women - DIVISION A"},
        "south_american_league": {value: "South American League", label: "South American League"},
        "u16_men_div._c": {value: "U16 Men Div. C", label: "U16 Men Div. C"},
        "u18_men_-_division_b": {value: "U18 Men - DIVISION B", label: "U18 Men - DIVISION B"},
        "u16_women_-_division_b": {value: "U16 Women - DIVISION B", label: "U16 Women - DIVISION B"},
        "division_c_men": {value: "Division C Men", label: "Division C Men"}
      }

      if (competitionGroupId in competitionDropdownDict) {
        this.setState({
          competitionGroupId: competitionGroupId
          // selectedCompetition: competitionDropdownDict[competitionGroupId]
        });

        this.handleDropdownSelectorChangeCompetition(competitionDropdownDict[competitionGroupId])
      }


  }
}

  // handleCompetitionPassedbyURL = (competitionGroupId) => {

    
  //   if(this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition!== selectedCompetition)) {
  //     // Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.fillCharts()});
  //     Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.fillTable(); }).then(() => {this.fillCharts(); }).then(() => {this.fillMachineLearningcharts(); });

  //   }
  // }

  componentDidUpdate() {
    /* On first page load, after default brand has been selected from brand list in componentDidMount,
      we want to then load corresponding charts for that brand. Here we check if
      1. There is a currently selected brand
      2. There is no prior selected brand 
      If so, update charts
      */
 

 
    if(this.state.previouslySelectedAge === undefined &&
      this.state.previouslySelectedSex === undefined &&
      this.state.selectedAge && this.state.selectedSex) {

       Promise.resolve(this.setState({previouslySelectedAge:this.state.selectedAge,previouslyselectedSex:this.state.selectedSex})).then(() => {this.fillTable(); }).then(() => {this.fillCharts(); });

  
   }
   
   
  }



  handleDropdownSelectorChangeAge = (selectedAge) => {
    if(this.state.previouslySelectedAge === undefined || (this.state.selectedAge!== selectedAge)) {
      Promise.resolve(this.setState({previouslySelectedAge:this.state.selectedAge,selectedAge})).then(() => {this.fillTable()});;        
    }
  }

  handleDropdownSelectorChangeSex = (selectedSex) => {
    if(this.state.previouslySelectedSex === undefined || (this.state.selectedSex!== selectedSex)) {
      Promise.resolve(this.setState({previouslySelectedSex:this.state.selectedSex,selectedSex})).then(() => {this.fillTable()});;        

      // Promise.resolve(this.setState({previouslySelectedSex:this.state.selectedSex,selectedSex})).then(() => {this.fillAllCharts()}).then(() => {this.fillAllCharts()}).then(() => {this.fillTimeSeriesCharts(); });;        
    }
  }

  handleDropdownSelectorChangePeriod = (selectedPeriod) => {
    if(this.state.previouslySelectedPeriod === undefined || (this.state.selectedPeriod!== selectedPeriod)) {
      Promise.resolve(this.setState({previouslySelectedPeriod:this.state.selectedPeriod,selectedPeriod})).then(() => {this.fillCharts()});
    }
  }

  handleDropdownSelectorChangeMinute = (selectedMinute) => {
    if(this.state.previouslySelectedMinute === undefined || (this.state.selectedMinute!== selectedMinute)) {
      Promise.resolve(this.setState({previouslySelectedMinute:this.state.selectedMinute,selectedMinute})).then(() => {this.fillCharts()});
    }
  }

  handleDropdownSelectorChangePredictor = (selectedPredictor) => {
    if(this.state.previouslySelectedPredictor === undefined || (this.state.selectedPredictor!== selectedPredictor)) {
      Promise.resolve(this.setState({previouslySelectedPredictor:this.state.selectedPredictor,selectedPredictor})).then(() => {this.fillCharts()});
    }
  }

  handleDropdownSelectorChangeCompetition = (selectedCompetition) => {
    if(this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition!== selectedCompetition)) {
      // Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.fillCharts()});
      Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.fillTable(); }).then(() => {this.fillCharts(); }).then(() => {this.fillMachineLearningcharts(); });

    }
  }
  
  
  fillTable() {
    if (this.state.selectedCompetition != null ) {

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        // queryName: 'CompetitionsGroupsSummary',
        queryName: 'CompetitionDetailMatchDetail',
        selectedCompetition: this.state.selectedCompetition.value,
        // competitionGroupAge: this.state.selectedAge.value
        }), data => {

        if(data.length>=1){
          this.setState({
            tableData: data
            
          });
        }
    });

    }
  }

  fillCharts() {
    if (this.state.selectedSex != null && this.state.selectedAge != null) {
      
      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'CompetitionsOverviewMatchCount'
        // competitionGroupSex: this.state.selectedSex.value,
        // competitionGroupAge: this.state.selectedAge.value
        }), data => {
          this.setState({
            competitionMatchCountBarChart: {
                  data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'matches','color_number',{backgroundColor: ['#57A0E0']})
                },
            competitionFinalScoreBarChart: {
              data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'med_final_score_hometeam','color_number',{backgroundColor: ['#57A0E0']})
            },
            competitionWinPctBarChart: {
              data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'win_pct_hometeam','color_number',{backgroundColor: ['#57A0E0']})
            }

            
    

                
          })
    });

    }

   



  $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
    queryName: 'CompetitionMetricsInstanceCounts',
    selectedCompetition: this.state.selectedCompetition.value
    // dateRange:this.state.selectedDateRange.value
  }), data => {


    this.setState({
      cumulativeDefensiveStatsBarChartHomeTeam: {
        data: assembleChartDataCollectionSimpleMultiple(data, 'period', ['shot_blocked_hometeam', 'defensive_rebounds_hometeam', 'offensive_rebounds_hometeam', 'steals_hometeam'], { labels: ["Blocked Shots", "Defensive Rebounds", "Offensive Rebounds", "Steals"], backgroundColors: ["#656565", "#2fb1eb", "#0973ba", "#0a527e"], borderColors: ["#656565", "#2fb1eb", "#0973ba", "#0a527e"] })
      },
      cumulativeDefensiveStatsBarChartAwayTeam: {
        data: assembleChartDataCollectionSimpleMultiple(data, 'period', ['shot_blocked_awayteam', 'defensive_rebounds_awayteam', 'offensive_rebounds_awayteam', 'steals_awayteam'], { labels: ["Blocked Shots", "Defensive Rebounds", "Offensive Rebounds", "Steals"], backgroundColors: ["#656565", "#2fb1eb", "#0973ba", "#0a527e"], borderColors: ["#656565", "#2fb1eb", "#0973ba", "#0a527e"] })
      }

    })

  });

  $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
    queryName: 'CompetitionMetricsComp',
    selectedCompetition: this.state.selectedCompetition.value
  }), data => {



    /* Shots Made */
    const shotsmadeGroupLabels = ['Two Point Shots Made'
      , 'Three Point Shots Made'
      , 'Free Throw Shots Made']

    const shotsmadeGroupColumns = ['two_point_shots_made'
      , 'three_point_shots_made'
      , 'free_throw_shots_made'
    ]

    /* Shots Attempted */
    const shotsAttemptedGroupLabels = ['Two Point Shots'
      , 'Three Point Shots'
      , 'Free Throw Shots']

    const shotsAttemptedGroupColumns = ['two_point_shots_attempted'
      , 'three_point_shots_attempted'
      , 'free_throw_shots_attempted'
    ]


    /* Shot Percentages */
    const shotPercentagesGroupLabels = ['Field Goal %'
      , 'Three Point %'
      , 'Free Throw %']

    const shotPercentagesGroupColumns = ['field_goal_pct'
      , 'three_point_pct'
      , 'free_throw_pct'
    ]

    /* Assists, Rebounds, Steals */
    const reboundAssistsGroupLabels = ['Offensive Rebounds'
      , 'Defensive Rebounds'
      , 'Assists'
      , 'Shots Blocked'
      , 'Steals'
    ]

    const reboundAssistsGroupColumns = ['offensive_rebounds'
      , 'defensive_rebounds'
      , 'assists'
      , 'shot_blocked'
      , 'steals'
    ]

    /* Fouls */
    const foulsGroupLabels = ['Personal Fouls'
      , 'Team Fouls'
    ]

    const foulsGroupColumns = ['personal_fouls_committed'
      , 'team_fouls_committed'
    ]

    const segmentColors = ['#64b5f6', '#ae4126']

    var teamPieChartColors = {}
    teamPieChartColors['home'] = ['#57A0E0', "#50CEF4", "#A1E6F4"];
    teamPieChartColors['away'] = ['#e05757', '#f45053', '#f4a1a4'];

    // console.log("BBBB")
    // console.log(assemblePivotedPieChartCollection(data,shotsmadeGroupLabels,shotsmadeGroupColumns,'team',segmentColors))
    this.setState({
      gameMetricsCompBarChartShotsMade: {
        data: assembleChartDataCollectionGrouped(data, shotsmadeGroupLabels, shotsmadeGroupColumns, 'team', segmentColors)
      },
      gameMetricsCompBarChartShotPercentages: {
        data: assembleChartDataCollectionGrouped(data, shotPercentagesGroupLabels, shotPercentagesGroupColumns, 'team', segmentColors)
      },
      gameMetricsCompBarChartAssistsRebounds: {
        data: assembleChartDataCollectionGrouped(data, reboundAssistsGroupLabels, reboundAssistsGroupColumns, 'team', segmentColors)
      },
      gameMetricsCompBarChartFouls: {
        data: assembleChartDataCollectionGrouped(data, foulsGroupLabels, foulsGroupColumns, 'team', segmentColors)
      },
      gameMetricsCompPieChartShotsAttempted: {

        data: assemblePivotedPieChartCollection(data, shotsAttemptedGroupLabels, shotsAttemptedGroupColumns, 'team', teamPieChartColors)
        // data: assemblePivotedPieChartCollection(data,shotsmadeGroupLabels,shotsmadeGroupColumns,'team',['#57A0E0',"#50CEF4","#A1E6F4"])
      }
    })

  });


  }
  

  fillMachineLearningcharts() {

    if (this.state.selectedPredictor != null && this.state.selectedCompetition) {
      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'AlgCompsWinnerAccuracyLinexCompetitionDetail',
        selectedMetric: 'r2',
        selectedTarget: 'final_score_hometeam',
        selectedCompetition: this.state.selectedCompetition.value,
        // selectedAge: this.state.selectedAge.value,
        // selectedSex: this.state.selectedSex.value,
        selectedPredictor: this.state.selectedPredictor.value
      }), data => {
      
        this.setState({
          algCompsLineChartFinalScoreHometeam: {
            data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors','metric_rate_severalpredictors','metric_rate_manypredictors'], { labels: ["Alg A (some)","Alg B (several)","Alg C (many)"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"]})
          }
        })
      
      });
  
      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'AlgCompsWinnerAccuracyLinexCompetitionDetail',
        selectedMetric: 'accuracy',
        selectedTarget: 'winner_hometeam',
        selectedCompetition: this.state.selectedCompetition.value,
        // selectedAge: this.state.selectedAge.value,
        // selectedSex: this.state.selectedSex.value,
        selectedPredictor: this.state.selectedPredictor.value
      }), data => {
      
        this.setState({
          algCompsLineChartWinnerHometeam: {
            data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors','metric_rate_severalpredictors','metric_rate_manypredictors'], { labels: ["Alg A (some)","Alg B (several)","Alg C (many)"], backgroundColors: ["#64b5f6","#656565", "#ae4126"], borderColors: ["#64b5f6","#656565", "#ae4126"]})
          }
        })
      
      });
    }
  }

  
markdown1_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To create the predictive algorithms I used around 40,000 matches, belonging to about 5,000 \"competitions\". A competition, in this context, could mean anything from immediately recognizable leagues like \"Euroleague Men\'s Final\" to lower-level B and C league matches from Georgia (match and league names denoted in Georgian script)\n\n";
markdown2_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While the algorithms themselves were created using this large pool of matches, for presentation purposes in this app, I have limited the pool to just a few competitions, ones that are well known, representing a variety of age, sex and skill levels. They are listed below:\n\n";
markdown3_mfdisparity = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As you can see, this \"show dataset\" has a disproportionately large number of female adult matches. This is primarily to do with readily available competition/date metadata for this segment. You can read more about the metadata issue here, in the \"[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)\" portion of my github write-up.\n\n";


handleTabChange = (selectedTabId) => {
  // this.setState({selectedTabId: selectedTabId})
  this.setState({
    selectedTabId
  });

  // console.log("tabid:" + selectedTabId + ", STATE selectedTabId: " + this.state.selectedTabId)
  switch (selectedTabId) {
    case "one":
      if (!this.state.tableData) {
        this.fillCharts();
      }
      break;
    case "two":


      if (!this.state.algCompsLineChartWinnerHometeam) {

        this.fillMachineLearningcharts();
      }
      break;
  }

}




  render() {
    return (
      <div>
        <Menu menuVisibility={this.state.visible}
      toggleParentMenu={this.toggleMenu.bind(this)}/>
      
        
        <div onMouseDown={this.closeMenu}>

        <Banner bannerTextMajor = {"Competition Detail"} 
        bannerTextMinor = {this.state.selectedCompetition && this.state.selectedCompetition.label}
        // dropDownItemsListSelectorOne={this.state.sexDropdownList} 
        // selectedValueSelectorOne = {this.state.selectedSex} 
        // setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeSex.bind(this)}
        dropDownItemsListSelectorTwo={this.state.competitionDropdownList} 
        selectedValueSelectorTwo = {this.state.selectedCompetition} 
        setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeCompetition.bind(this)}        
        toggleParentMenu={this.toggleMenu.bind(this)}/>

<div className= "page-body">
<PageHeader header={(this.state.selectedCompetition && this.state.selectedCompetition.label)} subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label}/>

 <div style={{paddingTop: '2%'}}/>


<TabProvider defaultTab="one" onChange={(tabId) => {this.handleTabChange(tabId) }}>
              <section className="my-tabs">
                <TabList className="my-tablist">
                  <Tab tabFor="one" >Stats</Tab>
                  <Tab tabFor="two">Machine Learning</Tab>
                  {/* <Tab tabFor="three">Player Detail</Tab>

                  <Tab tabFor="four" className="my-tab">Advanced Stats</Tab>
                  <Tab tabFor="five" className="my-tab">Comparisons</Tab>
                  <Tab tabFor="six" className="my-tab">Machine Learning</Tab> */}
                </TabList>
                <div className="wrapper">
                  <TabPanel tabId="one">

                    <CompetitionDetailScreenTabStats
                      // tableData={this.state.tableData}
                      tableData = {this.state.tableData}
                      cumulativeScoresLineChart={this.state.cumulativeScoresLineChart}
                      gameMetricsCompBarChartShotsMade={this.state.gameMetricsCompBarChartShotsMade}
                      gameMetricsCompBarChartShotPercentages={this.state.gameMetricsCompBarChartShotPercentages}
                      cumulativeLeadLineChart={this.state.cumulativeLeadLineChart}
                      gameMetricsCompBarChartAssistsRebounds={this.state.gameMetricsCompBarChartAssistsRebounds}
                      gameMetricsCompBarChartFouls={this.state.gameMetricsCompBarChartFouls}
                      gameMetricsCompPieChartShotsAttempted={this.state.gameMetricsCompPieChartShotsAttempted}
                      cumulativeDefensiveStatsBarChartHomeTeam={this.state.cumulativeDefensiveStatsBarChartHomeTeam}
                      cumulativeDefensiveStatsBarChartAwayTeam={this.state.cumulativeDefensiveStatsBarChartAwayTeam}
                      teamNameHomeTeam={this.state.teamNameHomeTeam}
                      teamNameAwayTeam={this.state.teamNameAwayTeam}
                    />

                  </TabPanel>
                  <TabPanel tabId="two">

                  <CompetitionDetailScreenTabMachineLearning
                      // tableData={this.state.tableData}
                      // tableData = {this.state.tableData}
                      predictorDropdownList = {this.state.predictorDropdownList}
                      selectedPredictor = {this.state.selectedPredictor}
                      // toggleParentMenu={this.toggleMenu.bind(this)}
                      setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangePredictor.bind(this)}

                      algCompsLineChartWinnerHometeam = {this.state.algCompsLineChartWinnerHometeam}
                      algCompsLineChartFinalScoreHometeam = {this.state.algCompsLineChartFinalScoreHometeam}

                      // cumulativeScoresLineChart={this.state.cumulativeScoresLineChart}
                      // gameMetricsCompBarChartShotsMade={this.state.gameMetricsCompBarChartShotsMade}
                      // gameMetricsCompBarChartShotPercentages={this.state.gameMetricsCompBarChartShotPercentages}
                      // cumulativeLeadLineChart={this.state.cumulativeLeadLineChart}
                      // gameMetricsCompBarChartAssistsRebounds={this.state.gameMetricsCompBarChartAssistsRebounds}
                      // gameMetricsCompBarChartFouls={this.state.gameMetricsCompBarChartFouls}
                      // gameMetricsCompPieChartShotsAttempted={this.state.gameMetricsCompPieChartShotsAttempted}
                      // cumulativeDefensiveStatsBarChartHomeTeam={this.state.cumulativeDefensiveStatsBarChartHomeTeam}
                      // cumulativeDefensiveStatsBarChartAwayTeam={this.state.cumulativeDefensiveStatsBarChartAwayTeam}
                      // teamNameHomeTeam={this.state.teamNameHomeTeam}
                      // teamNameAwayTeam={this.state.teamNameAwayTeam}
                    />


                  </TabPanel>

                </div>
              </section>
            </TabProvider>


            </div>






            <div > 



            </div>





         

           

        </div>
      </div>
    );
  }
}
