import React, { Component } from "react";
import $ from "jquery";
import "../App.css";
import "./AlgOverviewScreen.css";
import { chartOptions } from "../options/ChartOptions.js";
import { HorizontalBar, Bar, Line, Pie } from "react-chartjs-2";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import {
  assembleChartDataCollectionSimpleMultiple,
  assembleChartDataCollectionGrouped,
  assembleChartDataCollectionSimplewithColors,
  assemblePivotedPieChartCollection
} from "../options/ChartAssembly";
const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

// TODO - Make Global
function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject)
    .map(key => `${key}=${paramObject[key]}`)
    .join("&")}`;
}



const columns = [{
  Header: 'Date',
  accessor: 'schedule_date',
  width: 120
}, {
  Header: 'Home Team',
  accessor: 'team_name_hometeam',
  width: 180,
  getProps: (state, rowInfo, column) => {
    return {
      style: {
        background: rowInfo && tableRowWinnerColorHex('home', rowInfo.row.winner_hometeam)
      },
    };
  }
},
{
  Header: 'Away Team',
  accessor: 'team_name_awayteam',
  width: 180,
  getProps: (state, rowInfo, column) => {
    return {
      style: {
        background: rowInfo && tableRowWinnerColorHex('away', rowInfo.row.winner_hometeam)
      },
    };
  }

},
{
  Header: 'Final Score',
  accessor: 'final_score_homeaway',
  width: 100
},




{
  Header: "Field Goal %",
  accessor: 'field_goal_pct_homeaway',
  width: 150

},
{
  Header: "3PT %",
  accessor: 'three_point_pct_homeaway',
  width: 150

},
{
  Header: "Rebounds",
  accessor: 'total_rebounds_homeaway',
  width: 100

},
{
  Header: "Assists",
  accessor: 'assists_homeaway',
  width: 100

},

{
  accessor: 'winner_hometeam',
  show: false
}
]


function tableRowWinnerColorHex(homeaway, winner_hometeam) {
  if (parseInt(winner_hometeam) == 1 && homeaway == 'home') {
    return "#58e04a80"; // 
  } else if (parseInt(winner_hometeam) == 0 && homeaway == 'away') {
    return "#58e04a80"; // 
  }

  return "#ffffff"
}



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


class CompetitionDetailScreenTabStats extends Component {

  // export default class  extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      periodDropdownList: [{ value: "1", label: "Period 1" },
      { value: "2", label: "Period 2" },
      { value: "3", label: "Period 3" },
      { value: "4", label: "Period 4" }
      ],
      selectedPeriod: { value: "1", label: "Period 1" },

      minuteDropdownList: [{ value: "1", label: "Minute 1" },
      { value: "2", label: "Minute 2" },
      { value: "3", label: "Minute 3" },
      { value: "4", label: "Minute 4" },
      { value: "5", label: "Minute 5" },
      { value: "6", label: "Minute 6" },
      { value: "7", label: "Minute 7" },
      { value: "8", label: "Minute 8" },
      { value: "9", label: "Minute 9" },
      { value: "10", label: "Minute 10" }],
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
      metricDropdownList: [{ value: "accuracy", label: "Overall Accuracy" },
      { value: "true positive rate", label: "True Positive Rate" },
      { value: "true negative rate", label: "True Negative Rate" },
      { value: "positive predictive value", label: "Positive Predictive Value" },
      { value: "negative predictive value", label: "Negative Predictive Value" },
      { value: "false positive rate", label: "False Positive Rate" },
      { value: "false negative rate", label: "False Negative Rate" },
      { value: "false discovery rate", label: "False Discovery Rate" }
        // {value: "r2", label: "r2"},
      ],
      selectedMetric: { value: "accuracy", label: "Overall Accuracy" },

      periodDropdownList: [{ value: "1", label: "Period 1" },
      { value: "2", label: "Period 2" },
      { value: "3", label: "Period 3" },
      { value: "4", label: "Period 4" }
      ],
      selectedPeriod: { value: "1", label: "Period 1" },

      minuteDropdownList: [{ value: "1", label: "Minute 1" },
      { value: "2", label: "Minute 2" },
      { value: "3", label: "Minute 3" },
      { value: "4", label: "Minute 4" },
      { value: "5", label: "Minute 5" },
      { value: "6", label: "Minute 6" },
      { value: "7", label: "Minute 7" },
      { value: "8", label: "Minute 8" },
      { value: "9", label: "Minute 9" },
      { value: "10", label: "Minute 10" }],
      selectedMinute: { value: "3", label: "Minute 3" },
      predictorDropdownList: [{ value: "somepredictors", label: "Alg A (some)" },
      { value: "severalpredictors", label: "Alg B (several)" },
      { value: "manypredictors", label: "Alg C (many)" }],
      selectedPredictor: { value: "somepredictors", label: "Alg A (some)" },
      competitionDropdownList: [
        { value: "EuroBasket - DIVISION A", label: "EuroBasket - DIVISION A" },
        { value: "EuroBasket Women - DIVISION B", label: "EuroBasket Women - DIVISION B" },
        { value: "U16 Men - DIVISION B", label: "U16 Men - DIVISION B" },
        { value: "EuroChallenge", label: "EuroChallenge" },
        { value: "U20 Women - DIVISION B", label: "U20 Women - DIVISION B" },
        { value: "EuroLeague Women", label: "EuroLeague Women" },
        { value: "EuroCup Women", label: "EuroCup Women" },
        { value: "U18 Men - DIVISION A", label: "U18 Men - DIVISION A" },
        { value: "U18 Women - DIVISION B", label: "U18 Women - DIVISION B" },
        { value: "EuroBasket Women - DIVISION A", label: "EuroBasket Women - DIVISION A" },
        { value: "South American League", label: "South American League" },
        { value: "U16 Men Div. C", label: "U16 Men Div. C" },
        { value: "U18 Men - DIVISION B", label: "U18 Men - DIVISION B" },
        { value: "U16 Women - DIVISION B", label: "U16 Women - DIVISION B" },
        { value: "Division C Men", label: "Division C Men" }
      ],
      selectedCompetition: { value: "EuroCup Women", label: "EuroCup Women" }




    });



  }


  componentDidUpdate() {
    /* On first page load, after default brand has been selected from brand list in componentDidMount,
      we want to then load corresponding charts for that brand. Here we check if
      1. There is a currently selected brand
      2. There is no prior selected brand 
      If so, update charts
      */

    if (this.state.previouslySelectedAge === undefined &&
      this.state.previouslySelectedSex === undefined &&
      this.state.selectedAge && this.state.selectedSex) {
      Promise.resolve(this.setState({ previouslySelectedAge: this.state.selectedAge, previouslyselectedSex: this.state.selectedSex })).then(() => { this.fillTable(); }).then(() => { this.fillCharts(); });
    }
  }

  handleDropdownSelectorChangeAge = (selectedAge) => {
    if (this.state.previouslySelectedAge === undefined || (this.state.selectedAge !== selectedAge)) {
      Promise.resolve(this.setState({ previouslySelectedAge: this.state.selectedAge, selectedAge })).then(() => { this.fillTable() });;
    }
  }

  handleDropdownSelectorChangeSex = (selectedSex) => {
    if (this.state.previouslySelectedSex === undefined || (this.state.selectedSex !== selectedSex)) {
      Promise.resolve(this.setState({ previouslySelectedSex: this.state.selectedSex, selectedSex })).then(() => { this.fillTable() });;
    }
  }

  handleDropdownSelectorChangePeriod = (selectedPeriod) => {
    if (this.state.previouslySelectedPeriod === undefined || (this.state.selectedPeriod !== selectedPeriod)) {
      Promise.resolve(this.setState({ previouslySelectedPeriod: this.state.selectedPeriod, selectedPeriod })).then(() => { this.fillCharts() });
    }
  }

  handleDropdownSelectorChangeMinute = (selectedMinute) => {
    if (this.state.previouslySelectedMinute === undefined || (this.state.selectedMinute !== selectedMinute)) {
      Promise.resolve(this.setState({ previouslySelectedMinute: this.state.selectedMinute, selectedMinute })).then(() => { this.fillCharts() });
    }
  }

  handleDropdownSelectorChangePredictor = (selectedPredictor) => {
    if (this.state.previouslySelectedPredictor === undefined || (this.state.selectedPredictor !== selectedPredictor)) {
      Promise.resolve(this.setState({ previouslySelectedPredictor: this.state.selectedPredictor, selectedPredictor })).then(() => { this.fillCharts() });
    }
  }

  handleDropdownSelectorChangeCompetition = (selectedCompetition) => {
    if (this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition !== selectedCompetition)) {
      Promise.resolve(this.setState({ previouslySelectedCompetition: this.state.selectedCompetition, selectedCompetition })).then(() => { this.fillTable(); }).then(() => { this.fillCharts(); });

    }
  }


  fillTable() {
    if (this.state.selectedCompetition != null) {

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'CompetitionDetailMatchDetail',
        selectedCompetition: this.state.selectedCompetition.value,
      }), data => {

        if (data.length >= 1) {
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
      }), data => {
        this.setState({
          competitionMatchCountBarChart: {
            data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'matches', 'color_number', { backgroundColor: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'] })
          },
          competitionFinalScoreBarChart: {
            data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'med_final_score_hometeam', 'color_number', { backgroundColor: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'] })
          },
          competitionWinPctBarChart: {
            data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'win_pct_hometeam', 'color_number', { backgroundColor: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'] })
          }
        })
      });

    }

    if (this.state.selectedPredictor != null) {
      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'AlgCompsWinnerAccuracyLinexCompetition',
        selectedMetric: 'r2',
        selectedTarget: 'final_score_hometeam',
        selectedPredictor: this.state.selectedPredictor.value
      }), data => {

        this.setState({
          algCompsLineChartFinalScoreHometeam: {
            data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_adult_female', 'metric_rate_adult_male', 'metric_rate_youth_female', 'metric_rate_youth_male'], { labels: ["Adult Female", "Adult Male", "Youth Female", "Youth Male"], backgroundColors: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'], borderColors: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'] })
          }
        })

      });

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'AlgCompsWinnerAccuracyLinexCompetition',
        selectedMetric: 'accuracy',
        selectedTarget: 'winner_hometeam',
        selectedPredictor: this.state.selectedPredictor.value
      }), data => {

        this.setState({
          algCompsLineChartWinnerHometeam: {
            data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_adult_female', 'metric_rate_adult_male', 'metric_rate_youth_female', 'metric_rate_youth_male'], { labels: ["Adult Female", "Adult Male", "Youth Female", "Youth Male"], backgroundColors: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'], borderColors: ['#57A0E0', '#ffb812', '#f7163c', '#81c784'] })
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
        }
      })
    });


  }


  markdown1_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To create the predictive algorithms I used around 40,000 matches, belonging to about 5,000 \"competitions\". A competition, in this context, could mean anything from immediately recognizable leagues like \"Euroleague Men\'s Final\" to lower-level B and C league matches from Georgia (match and league names denoted in Georgian script)\n\n";
  markdown2_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While the algorithms themselves were created using this large pool of matches, for presentation purposes in this app, I have limited the pool to just a few competitions, ones that are well known, representing a variety of age, sex and skill levels. They are listed below:\n\n";
  markdown3_mfdisparity = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As you can see, this \"show dataset\" has a disproportionately large number of female adult matches. This is primarily to do with readily available competition/date metadata for this segment. You can read more about the metadata issue here, in the \"[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)\" portion of my github write-up.\n\n";

  render() {
    return (
      <div>
      
        <div style={{ paddingTop: '2%' }} />

        {this.props.tableData && (<ReactTable
          data={this.props.tableData}
          columns={columns}
          showPagination={true}
          defaultPageSize={10}
          className="-striped -highlight"
          style={{ color: "#656565ff", paddingLeft: "10px", paddingRight: "10px" }}

        />)}


        <div style={{ paddingTop: '2%' }} />


        <div className="horizontal-chart-container">
          <div style={{ "flex": "2" }}>


            <div className="vertical-chart-container">

              {this.props.gameMetricsCompBarChartShotsMade && (

                <div className="timeseries-chart-container-minor">
                  <div className="chart-title-large" >{"Avg Shots Made"}</div>
                  <HorizontalBar
                    data={
                      this.props.gameMetricsCompBarChartShotsMade.data
                    }
                    options={
                      chartOptions.gameMetricsCompBarChart
                    }
                  />
                </div>
              )}

              {this.props.gameMetricsCompBarChartShotPercentages && (

                <div className="timeseries-chart-container-minor" style={{ "padding-top": "8px" }}>
                  <div className="chart-title-large" >{"Avg Shot Percentages"}</div>
                  <HorizontalBar

                    data={
                      this.props.gameMetricsCompBarChartShotPercentages
                        .data
                    }
                    options={
                      chartOptions.gameMetricsCompBarChartPercents
                    }
                  />
                </div>
              )}


            </div>

          </div>




          <div style={{ "flex": "1" }}>

            <div className="vertical-chart-container">

              {this.props.gameMetricsCompBarChartAssistsRebounds && (

                <div className="timeseries-chart-container-minor">
                  <div className="chart-title-large" >{"Avg Rebounds, Assists, Steals"}</div>
                  <HorizontalBar

                    data={
                      this.props.gameMetricsCompBarChartAssistsRebounds
                        .data
                    }
                    options={
                      chartOptions.gameMetricsCompBarChart
                    }
                  />
                </div>
              )}

              {this.props.gameMetricsCompBarChartFouls && (

                <div className="timeseries-chart-container-minor" style={{ "padding-top": "8px" }}>
                  <div className="chart-title-large" >{this.props.gameMetricsCompBarChartFouls && "Fouls"}</div>
                  <HorizontalBar

                    data={
                      this.props.gameMetricsCompBarChartFouls.data
                    }
                    options={
                      chartOptions.gameMetricsCompBarChart
                    }
                  />
                </div>
              )}

            </div>

          </div>

        </div>



        <div className="chart-title-large" >{"Avg Shots Attempted"}</div>

        <div className="horizontal-chart-container" >

          <div style={{ "flex": "1" }}>
            {this.state.gameMetricsCompPieChartShotsAttempted && this.state.gameMetricsCompPieChartShotsAttempted.data['home'] && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-small" >{"Home Team"}</div>
                <Pie
                  data={
                    this.state.gameMetricsCompPieChartShotsAttempted.data['home']
                  }
                  options={{
                    legend: {
                      display: true,
                      position: 'right'
                    },
                    plugins: {
                      labels: [
                        {
                          render: 'percentage',
                          fontSize: 14,
                          fontColor: '#ffffff'
                        }
                      ]
                    }
                  }}


                />
              </div>
            )}
          </div>

          <div style={{ "flex": "1" }}>
            {this.state.gameMetricsCompPieChartShotsAttempted && this.state.gameMetricsCompPieChartShotsAttempted.data['away'] && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-small" >{"Away Team"}</div>
                <Pie
                  data={
                    this.state.gameMetricsCompPieChartShotsAttempted.data['away']
                  }
                  options={{
                    legend: {
                      display: true,
                      position: 'right'
                    },
                    plugins: {
                      labels: [
                        {
                          render: 'percentage',
                          fontSize: 14,
                          fontColor: '#ffffff'
                        }
                      ]
                    }
                  }}
                />
              </div>
            )}
          </div>

        </div>

        <div className="horizontal-chart-container" id="Defensive Plays Block">

          <div style={{ "flex": "2" }}>

            {this.state.cumulativeDefensiveStatsBarChartHomeTeam && (

              <div>
                <div className="chart-title-large" >{"Avg Defensive Plays - "}{"Home Team"}</div>
                <Bar
                  data={this.state.cumulativeDefensiveStatsBarChartHomeTeam.data}
                  options={{
                    legend: {
                      display: true
                    }, plugins: {
                      labels: false
                    }, scales: {
                      xAxes: [
                        {
                          stacked: true,
                          gridLines: {
                            drawBorder: true
                          },
                          ticks: {
                            fontColor: "#656565",
                            fontFamily: "Open Sans",
                            fontSize: 10
                          }
                        }
                      ],
                      yAxes: [
                        {
                          stacked: false,
                          gridLines: {
                            display: false
                          },
                          ticks: {
                            fontColor: "#656565",
                            fontFamily: "Open Sans",
                            fontSize: 10,

                          }
                        }
                      ]
                    }

                  }}
                >
                </Bar>

              </div>

            )}


          </div>

          <div style={{ "flex": "1" }}> </div>
        </div>


        <div className="horizontal-chart-container" >

          <div style={{ "flex": "2" }}>

            {this.state.cumulativeDefensiveStatsBarChartAwayTeam && (

              <div>
                <div className="chart-title-large" >{"Avg Defensive Plays - "}{'Away Team'}</div>
                <Bar
                  data={this.state.cumulativeDefensiveStatsBarChartAwayTeam.data}
                  options={{
                    legend: {
                      display: true
                    }, plugins: {
                      labels: false
                    }, scales: {
                      xAxes: [
                        {
                          stacked: true,
                          gridLines: {
                            drawBorder: true
                          },
                          ticks: {
                            fontColor: "#656565",
                            fontFamily: "Open Sans",
                            fontSize: 10
                          }
                        }
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          gridLines: {
                            display: false
                          },
                          ticks: {
                            fontColor: "#656565",
                            fontFamily: "Open Sans",
                            fontSize: 10,

                          }
                        }
                      ]
                    }

                  }}
                >
                </Bar>

              </div>



            )}


          </div>

          <div style={{ "flex": "1" }}> </div>
        </div>



        <div >



        </div>


      </div>

    );
  }
}
export default CompetitionDetailScreenTabStats; 