import React, { Component } from "react";
// import $ from "jquery";
import "../App.css";
import "./GameSummaryScreen.css";

import { chartOptions } from "../options/ChartOptions.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactTable from 'react-table';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { ChartModule } from 'chartjs-plugin-labels';
// import { ChartModule } from 'angular2-chartjs';





class GameSummaryScreenTabSummary extends Component {
  constructor(props, context) {
    super(props, context);
    // this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      // matchId: this.props.matchId,
      // tableData: null,
      // cumulativeLeadLineChart: null,
      // gameMetricsCompBarChartShotPercentages: null,
      // gameMetricsCompBarChartShotsMade: null,
      // cumulativeScoresLineChart: null,
      tableColumns: [{
        Header: 'Team',
        accessor: 'team_name', // String-based value accessors!
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 200
        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'P1',
        accessor: 'period1',
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 100
      }, {
        Header: 'P2',
        accessor: 'period2',
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 100
      },
      {
        Header: 'P3',
        accessor: 'period3',
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 100
      },
      {
        Header: 'P4',
        accessor: 'period4',
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 100
      },
      {
        Header: 'Final',
        accessor: 'final',
        getProps: (state, rowInfo, column) => {
          return {
            style: {
              "font-weight": "bold"
            },
          };
        },
        // Cell: ({row}) =><a href={'teams/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
        width: 100
      }
      ]
    };
  }


  componentWillMount() { }

  componentDidMount() {
    // console.log("________")
    // console.log(this.props.gameMetricsCompBarChartFouls.data)
  }

  componentDidUpdate() { }

  componentWillReceiveProps() {
    // console.log("________")
    // console.log(this.props.gameMetricsCompBarChartFouls)
    // console.log(this.props.gameMetricsCompPieChartShotsAttempted)
  }

  render() {

    return (

      <div >

        <div style={{ display: "flex", "flex-wrap": "wrap", "padding-top": "20px" }}>
          {this.props.tableData && (<ReactTable
            data={this.props.tableData}
            columns={this.state.tableColumns}
            showPagination={false}
            pageSize={2}
            // defaultPageSize={1}
            className="-striped -highlight"
            style={{ color: "#656565ff" }}
          />)}
        </div>


        <div style={{ "paddingTop": "20px" }}>


          <div className="horizontal-chart-container">

            <div className="timeseries-chart-container-major" style={{ "flex": "2" }}>

              {this.props.cumulativeScoresLineChart && (
                <div >
                  <div className="chart-title-large" >{"Cumulative Scores"}</div>

                  <Line id="timeseries-cumulative-scores"
                    data={this.props.cumulativeScoresLineChart.data}
                  // options={{}}
                  // options={chartOptions.brandDetailsSalesReturnRateLineChart}
                  >
                  </Line>
                </div>
              )}
            </div>
            <div style={{ "flex": "1" }}>

              <div className="vertical-chart-container">

                {this.props.gameMetricsCompBarChartShotsMade && (

                  <div className="timeseries-chart-container-minor">
                    <div className="chart-title-large" >{"Shots Made"}</div>
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
                    <div className="chart-title-large" >{"Shot Percentages"}</div>
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

          </div>
        </div>


        {/* </div> */}



        <div style={{ "paddingTop": "20px" }}>
          {/* <div className="chart-title-large" >{this.state.cumulativeLeadLineChart && "Cumulative Scores"}</div> */}

          <div className="horizontal-chart-container">

            <div className="timeseries-chart-container-major" style={{ "flex": "2" }}>

              {this.props.cumulativeLeadLineChart && (

                <div>
                  <div className="chart-title-large" >{"Hometeam Lead +/-"}</div>
                  <Bar
                    data={this.props.cumulativeLeadLineChart.data}
                    options={{
                      legend: {
                        display: false
                      }, plugins: {
                        labels: false
                      }

                    }}
                  >
                  </Bar>

                </div>



              )}
            </div>
            <div style={{ "flex": "1" }}>

              <div className="vertical-chart-container">

                {this.props.gameMetricsCompBarChartAssistsRebounds && (

                  <div className="timeseries-chart-container-minor">
                    <div className="chart-title-large" >{"Rebounds, Assists, Steals"}</div>
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
        </div>



{/* 
        <div className="horizontal-chart-container">
          <div className="small-chart-flex">
            {this.props.gameMetricsCompBarChartAssistsRebounds && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-large" >{"Rebounds, Assists, Steals"}</div>
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
          </div>
          <div className="small-chart-flex">
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

          <div style={{ "flex": 1 }}></div>

        </div> */}








        <div className="chart-title-large" >{"Shots Attempted"}</div>

        <div className="horizontal-chart-container" >

          <div style={{ "flex": "1" }}>
            {this.props.gameMetricsCompPieChartShotsAttempted && this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameHomeTeam] && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-small" >{this.props.teamNameHomeTeam}</div>
                <Pie
                  data={
                    this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameHomeTeam]
                  }
                  // options={chartOptions.pieChart}
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
            {this.props.gameMetricsCompPieChartShotsAttempted && this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameAwayTeam] && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-small" >{this.props.teamNameAwayTeam}</div>
                <Pie
                  data={
                    this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameAwayTeam]
                  }
                  // options={chartOptions.pieChart}
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

            {this.props.cumulativeDefensiveStatsBarChartHomeTeam && (

              <div>
                <div className="chart-title-large" >{"Defensive Plays - "}{this.props.teamNameHomeTeam}</div>
                <Bar
                  data={this.props.cumulativeDefensiveStatsBarChartHomeTeam.data}
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
                            // min: 0,
                            // max: 1,
                            // stepSize: 0.2,
                            // Include a dollar sign in the ticks
                            // callback: function(value, index, values) {
                            //   return value * 100 + "%";
                            // }
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

            {this.props.cumulativeDefensiveStatsBarChartAwayTeam && (

              <div>
                <div className="chart-title-large" >{"Defensive Plays - "}{this.props.teamNameAwayTeam}</div>
                <Bar
                  data={this.props.cumulativeDefensiveStatsBarChartAwayTeam.data}
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
                            // min: 0,
                            // max: 1,
                            // stepSize: 0.2,
                            // Include a dollar sign in the ticks
                            // callback: function(value, index, values) {
                            //   return value * 100 + "%";
                            // }
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

      </div>
    );
  }
}
export default GameSummaryScreenTabSummary;          