import React from "react";
import $ from "jquery";
import "../App.css";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import { selectStylesTertiary } from "../options/SelectStyles";
import ReactMarkdown from 'react-markdown';
import "./AlgOverviewScreen.css";
import Banner from "../components/Banner.js";
import PageHeader from "../components/PageHeader"
import { Bar, Line } from "react-chartjs-2";
import Menu from "./Menu";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import {
  assembleChartDataCollectionSimpleMultiple,
  assembleChartDataCollectionSimplewithColors
} from "../options/ChartAssembly";

// const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";
const API_ENDPOINT_URL_GENERIC = '//bold-vortex-250420.appspot.com/generic_query';
// TODO - Make Global
function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject)
    .map(key => `${key}=${paramObject[key]}`)
    .join("&")}`;
}


const columns = [{
  Header: '#',
  accessor: 'row_rank', // String-based value accessors!
  width: 50
}, {
  Header: 'Age',
  accessor: 'age',
  width: 80
}, {
  Header: 'Sex',
  accessor: 'sex',
  width: 80
}, {
  Header: 'Competition',
  accessor: 'competition',
  Cell: ({ row }) => <a href={'competition-detail-id/' + row.competition_group_id} style={{ color: "#656565ff" }}> {row.competition} </a>,
  width: 300
}, {
  Header: 'First Match',
  accessor: 'from_date',
},
{
  Header: 'Last Match',
  accessor: 'to_date'
},

{
  Header: 'Matches',
  accessor: 'matches',
  width: 80
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



export default class CompetitionsSummaryScreen extends React.Component {

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


  getTrProps = (state, rowInfo, instance) => {
    function getTRColor(age, sex) {
      if (age == 'adult') {
        if (sex == 'male') {
          return '#ffb81266'
        }
        return '#57A0E066'
      }

      if (sex == 'male') {
        return '#81c78466'
      }
      return '#f7163c66'

    }
    if (rowInfo) {
      return {
        style: {
          background: getTRColor(rowInfo.row.age, rowInfo.row.sex),
          // color: 'white'
        }
      }
    }
    return {};
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
      selectedPredictor: { value: "somepredictors", label: "Alg A (some)" }

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

      // Promise.resolve(this.setState({previouslySelectedSex:this.state.selectedSex,selectedSex})).then(() => {this.fillAllCharts()}).then(() => {this.fillAllCharts()}).then(() => {this.fillTimeSeriesCharts(); });;        
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



  fillTable() {
    if (this.state.selectedSex != null && this.state.selectedAge != null) {

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'CompetitionsOverviewMatchCount'
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
  }


  markdown1_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To create the predictive algorithms I used around 40,000 matches, belonging to about 5,000 \"competitions\". A competition, in this context, could mean anything from immediately recognizable leagues like \"Euroleague Men\'s Final\" to lower-level B and C league matches from Georgia (match and league names denoted in Georgian script)\n\n";
  markdown2_intro = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While the algorithms themselves were created using this large pool of matches, for presentation purposes in this app, I have limited the pool to just a few competitions, ones that are well known, representing a variety of age, sex and skill levels. They are listed below:\n\n";
  markdown3_mfdisparity = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As you can see, this \"show dataset\" has a disproportionately large number of female adult matches. This is primarily to do with readily available competition/date metadata for this segment. You can read more about the metadata issue here, in the \"[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)\" portion of my github write-up.\n\n";




  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }


  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }



  render() {


    const isMobile = (window.innerWidth < window.innerHeight);

    var flyOutWidth = '25vw'
    var chartWidth = '70vw'
    // var chartHeight = '35vw'    
    if (isMobile) {
      flyOutWidth = '100vw'
      chartWidth = '100vw'
      // chartHeight = '55vw'
    }

    

    return (


      <div>
        <Menu menuVisibility={this.state.visible}
          flyOutWidth={flyOutWidth}
          toggleParentMenu={this.toggleMenu.bind(this)} />

        <div onMouseDown={this.closeMenu}>
          <Banner bannerTextMajor={"Competitions"}
            toggleParentMenu={this.toggleMenu.bind(this)} />
          <PageHeader header="Competitions" subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label} />

          <div style={{ paddingLeft: '2%', overflowX: false, overflowY: false, width: '80%' }}>

            <ReactMarkdown source={this.markdown1_intro} style={{ paddingTop: '10px' }} />
            <ReactMarkdown source={this.markdown2_intro} style={{ paddingTop: '10px', paddingBottom: '10px' }} />
          </div>

          <div style={{ display: "flex", "flex-wrap": "wrap", "padding": "10px" }}>

            <ReactTable
              data={this.state.tableData}
              columns={columns}
              showPagination={false}
              defaultPageSize={15}
              className="-striped -highlight"
              style={{ color: "#656565ff" }}
              getTrProps={this.getTrProps}

            />
          </div>

          <div style={{  paddingTop: '2%' }}>
            {this.state.competitionMatchCountBarChart && (
              <div style={{ paddingLeft: '2%', maxHeight: '35vh', width: chartWidth, paddingTop: '20px', paddingBottom: '1vh' }}>

                <div className="chart-title-large" >{"Number of Matches"}</div>

                <Bar
                  data={this.state.competitionMatchCountBarChart.data}
                  options={{
                    legend: {
                      display: false
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
                />

              </div>
            )}
          </div>

          <div style={{ paddingLeft: '2%', overflowX: false, overflowY: false, width: '80%' }}>
            <ReactMarkdown source={this.markdown3_mfdisparity} style={{ paddingTop: '2px' }} />
          </div>

          <div style={{ paddingTop: '2%' }}>



            {this.state.competitionFinalScoreBarChart && (
              <div style={{ paddingLeft: '2%', paddingTop: '2%', maxHeight: '35vh', width: chartWidth, paddingTop: '20px', paddingBottom: '5vh' }}>

                <div className="chart-title-large" >{"Median Final Score"}</div>

                <Bar
                  data={this.state.competitionFinalScoreBarChart.data}
                  options={{
                    legend: {
                      display: false
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



          <div style={{  paddingTop: '2%' }}>



            {this.state.competitionWinPctBarChart && (
              <div style={{ paddingLeft: '2%', paddingTop: '2%', maxHeight: '35vh', width: chartWidth, paddingTop: '20px', paddingBottom: '5vh' }}>

                <div className="chart-title-large" >{"Home Team Win Percentage"}</div>

                <Bar
                  data={this.state.competitionWinPctBarChart.data}
                  options={{
                    legend: {
                      display: false
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
                            callback: function (value, index, values) {
                              return value * 100 + "%";
                            }
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





          <div className="chart-divider" />
          <hr
            style={{
              color: "#ced6d4",
              backgroundColor: "#e7e7e7",
              height: '.1',
              paddingLeft: '2%',
              paddingRight: '2%',
              paddingRight: '5%'

            }}
          />

          <PageHeader header="Algorithm Accuracy" />

          <div>
            <DropdownSelectorGroup
              dropDownItemsListSelectorOne={this.state.predictorDropdownList}
              selectedValueSelectorOne={this.state.selectedPredictor}
              setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangePredictor.bind(this)}
              isMobile={this.isMobile}
              selectedSyles={selectStylesTertiary}
              toggleParentMenu={this.toggleMenu.bind(this)}
              style={{ paddingBottom: '2%' }} />
          </div>

          <div style={{ width: '85vw', minHeight:'65vh', paddingTop: '20px', paddingBottom: '5vh' }}>

            {this.state.algCompsLineChartWinnerHometeam && (
              <div style={{ paddingBottom: '2%' }}>
                <div className="chart-title-large" >{"Predicting Winner"}</div>
                <div className="chart-title-small" >{"Accuracy %"}</div>
                <Line data={this.state.algCompsLineChartWinnerHometeam.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                  }}>
                </Line>
              </div >
            )}


            {this.state.algCompsLineChartFinalScoreHometeam && (
              <div>
                <div className="chart-title-large" >{"Predicting Final Score Home Team"}</div>
                <div className="chart-title-small" >{"R2 %"}</div>

                <Line data={this.state.algCompsLineChartFinalScoreHometeam.data} >
                </Line>
              </div>
            )}

          </div>
          <div >
          </div>
        </div>
      </div>
    );
  }
}
