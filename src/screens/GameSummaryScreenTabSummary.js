import React, { Component } from "react";
import "../App.css";
import "./GameSummaryScreen.css";
import { chartOptions } from "../options/ChartOptions.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
import 'react-web-tabs/dist/react-web-tabs.css';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class GameSummaryScreenTabSummary extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

      tableColumns: [{
        Header: 'Team',
        accessor: 'team_name', // String-based value accessors!
        width: 200
      }, {
        Header: 'P1',
        accessor: 'period1',
        width: 100
      }, {
        Header: 'P2',
        accessor: 'period2',
        width: 100
      },
      {
        Header: 'P3',
        accessor: 'period3',
        width: 100
      },
      {
        Header: 'P4',
        accessor: 'period4',
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
        width: 100
      }
      ]
    };
  }


  componentWillMount() { }

  componentDidMount() {
  }

  componentDidUpdate() { }

  componentWillReceiveProps() {
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
            className="-striped -highlight"
            style={{ color: "#656565ff" }}
          />)}
        </div>


        <div style={{ "paddingTop": "40px" , "paddingBottom": "20px"}}>



            <div className="timeseries-chart-container-major" style={{  "paddingLeft":"2%","paddingRight":"2%", "paddingBottom": "20px"}}>

              {this.props.cumulativeScoresLineChart && (
                <div >
                  <div className="chart-title-large" >{"Cumulative Scores"}</div>

                  <Line id="timeseries-cumulative-scores"
                    data={this.props.cumulativeScoresLineChart.data}
                  >
                  </Line>
                </div>
              )}
            </div>

            <div className="horizontal-chart-container" style={{"maxHeight":"200px",  "paddingLeft":"2%","paddingRight":"2%"}}>
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


        <div style={{ "paddingTop": "20px","paddingBottom": "20px" }}>

            <div className="timeseries-chart-container-major" style={{ "paddingLeft":"2%","paddingRight":"2%", "paddingBottom": "20px", "paddingTop": "20px" }}>

              {this.props.cumulativeLeadLineChart && (

                <div >
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

            <div className="horizontal-chart-container" style={{"maxHeight":"200px",  "paddingLeft":"2%","paddingRight":"2%", "paddingBottom":"40px"}}>

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


        <div className="chart-title-large" >{"Shots Attempted"}</div>

        <div className="horizontal-chart-container" style={{"paddingTop":"20px", "paddingLeft":"2%","paddingRight":"2%"}}>

          <div style={{ "flex": "1" }}>
            {this.props.gameMetricsCompPieChartShotsAttempted && this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameHomeTeam] && (

              <div className="timeseries-chart-container-minor">
                <div className="chart-title-small" >{this.props.teamNameHomeTeam}</div>
                <Pie
                  data={
                    this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameHomeTeam]
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
            {this.props.gameMetricsCompPieChartShotsAttempted && this.props.gameMetricsCompPieChartShotsAttempted.data[this.props.teamNameAwayTeam] && (

              <div className="timeseries-chart-container-minor" style={{"paddingTop":"20px", "paddingLeft":"2%","paddingRight":"2%"}}>
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

        <div className="horizontal-chart-container" id="Defensive Plays Block" style={{"paddingTop": "30px",  "paddingLeft":"2%","paddingRight":"2%"}}>

          <div style={{ "flex": "5" }}>

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







        <div className="horizontal-chart-container" style={{ "paddingTop":"20px","paddingLeft":"2%","paddingRight":"2%"}}>

          <div style={{ "flex": "5" }}>

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