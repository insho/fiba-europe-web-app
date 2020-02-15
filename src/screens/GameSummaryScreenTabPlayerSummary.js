import React, { Component } from "react";
// import $ from "jquery";
import "../App.css";
import "./GameSummaryScreen.css";
import chroma from 'chroma-js';
import { chartOptions } from "../options/ChartOptions.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
import 'react-web-tabs/dist/react-web-tabs.css';
// import ReactTable from 'react-table';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
// import { ChartModule } from 'chartjs-plugin-labels';
// import { ChartModule } from 'angular2-chartjs';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {selectStylesSecondary} from "../options/SelectStyles"; 

function getHeatmapColorHex(fromColor,toColor,value) {
  try {
    

    const scale = chroma.scale([fromColor, toColor]);
    // console.log(scale)
    // console.log("value: " + JSON.stringify(value.avg_discount_percent_one_week_percentile_rank) )
      return  scale(value).hex(); // #FF7F7F  
  } catch(e) {
    console.error(e)
  }
  return "#ffffff"
}




function getHeatmapColorHexTriple(fromColor,midColor,toColor,value) {
  try {
    

    const scale = chroma.scale([fromColor, midColor, toColor]).gamma(1);
    // .domain([0,0.25,1]);;
    // console.log(scale)
    // console.log("value: " + JSON.stringify(value.avg_discount_percent_one_week_percentile_rank) )
      return  scale(value).hex(); // #FF7F7F  
  } catch(e) {
    console.error(e)
  }
  return "#ffffff"
}

// function filterToTeam(data,homeaway) {
//   team_array = []
//   data.map(x );
//   data.forEach(row => if(row.home_away== homeaway){team_array.push(row.home_away)});
// }

    


class GameSummaryScreenTabPlayerSummary extends Component {
  constructor(props, context) {
    super(props, context);
    // this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      tableColumns : [
      //   {
      //   Header: 'Team',
      //   accessor: 'team_name', // String-based value accessors!
      //   width: 150
      // }, 
      {
        Header: 'Player',
        accessor: 'player',
        // Cell: ({row}) =><a href={'brandconsistency/' + row.brand_id} style={{color: "#656565ff"}}> {row.brand_name} </a>,
        width: 200
      }, {
        Header: 'Total Points',
        accessor: 'total_points_scored',
        // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
      }, 
      {
          Header: 'Field Goal %',
          accessor: 'field_goal_pct',
          width: 100,
          Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%" ,
          // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%" + " ("+ props.original.field_goal_text + ")",
          getProps: (state, rowInfo, column) => {
            return {
                style: {
                    // background: rowInfo && getHeatmapColorHex('white','#02d602',rowInfo.row.field_goal_pct_rank) 
                    background: rowInfo && getHeatmapColorHexTriple('#ff9c9c','#ebff66','#02d602',rowInfo.row.field_goal_pct_rank) 
                },
            };
        }
        
      },
      {
        Header: 'Field Goals',
        accessor: 'field_goal_text',
        // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%",
      
    },
      
       {
        accessor: 'field_goal_pct_rank',
        show: false
      }
      ]
      


    };
  }


  componentWillMount() {
    // console.log('fooo')
    // console.log(this.props.gameSummaryTabPlayerSummarySelectedPeriods)
    this.setState({
      // gameSummaryTabPlayerSummarySelectedPeriods: this.props.gameSummaryTabPlayerSummarySelectedPeriods,
      gameSummaryTabPlayerBoxScoreSelectorOptions: [
        { value: "1", label: "P1" , sort: 1},
        { value: "2", label: "P2" , sort: 2},
        { value: "3", label: "P3" , sort: 3},
        { value: "4", label: "P4" , sort: 4},
        { value: "5", label: "P5" , sort: 5}
      ]
    })

   }

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

  selectorChangeEventSelectorBoxScorePeriods = (selectedValues) => {

    if(selectedValues) {
      this.setState({
        gameSummaryTabPlayerBoxScoreSelectorValues: selectedValues.sort((a, b) => (a.sort > b.sort) ? 1 : -1)
        });
      this.props.gameSummaryTabPlayerSummarySelectorChanged(selectedValues.sort((a, b) => (a.sort > b.sort) ? 1 : -1))  
    }
 
}

  render() {

    return (


      
      <div >



<div className="brand-detail-sales-secondary-dropdown-selector-row-container" >


<div className="banner-dropdown-container" id="banner-dropdown-container--left">
                      
                      <div className="dropdown-selector-container" >{this.state.timeSeriesProductDomainDropdownList && "Sales & Returns x Product Domain" }</div>
            </div>


    <div className="banner-dropdown-container" id="banner-dropdown-container--left">
                      
                      <div className="dropdown-selector-container" >
    
                          {this.props.gameSummaryTabPlayerSummarySelectedPeriods && (
    
                                      <Select className="drop-down-select"
                                          value={this.props.gameSummaryTabPlayerSummarySelectedPeriods}
                                          closeMenuOnSelect={false}
                                          onChange={this.selectorChangeEventSelectorBoxScorePeriods}
                                          isMulti
                                          options={this.state.gameSummaryTabPlayerBoxScoreSelectorOptions}  
                                          // styles={selectStylesSecondary} 
                                          // components={makeAnimated()}
                                          // styles={colourStyles}
                                          ></Select>
                          )}
    
                        </div>
            </div>

            <div className="banner-dropdown-container" id="banner-dropdown-container--right">
                      
                      <div className="dropdown-selector-container" >
    
                          {this.state.timeSeriesDateFrequencyDropdownList && (
    
                                      <Select className="drop-down-select"
                                          value={this.state.selectedTimeSeriesDateFrequency}
                                          onChange={this.handleDropdownSelectorChangeDateFrequency}
                                          options={this.state.timeSeriesDateFrequencyDropdownList}  
                                          styles={selectStylesSecondary} 
                                          ></Select>
                          )}
    
                        </div>
            </div>            
</div>


        <div style={{ display: "flex", "flex-wrap": "wrap", "padding-top": "40px" }}>
          {this.props.tableData && (
            <div>
          <div style={{ "font-weight": "bold", "padding-bottom": "4px" }}>{this.props.teamNameHomeTeam}{" (home)"}</div>
          <ReactTable
            data={this.props.tableData.home}
            columns={this.state.tableColumns}
            showPagination={false}
            pageSize={this.props.tableData.home.length || 8 }
            // defaultPageSize={1}
            // defaultPageSize={1}            
            className="-striped -highlight"
            style={{ color: "#656565ff" }}
          />
          </div>
          )}
          
        </div>

        <div style={{ display: "flex", "flex-wrap": "wrap", "padding-top": "20px" }}>
          {this.props.tableData && (
            <div>
          <div style={{ "font-weight": "bold", "padding-bottom": "4px" }}>{this.props.teamNameAwayTeam}{" (away)"}</div>
          <ReactTable
            data={this.props.tableData.away}
            columns={this.state.tableColumns}
            showPagination={false}
            pageSize={this.props.tableData.away.length || 8 }
            // defaultPageSize={1}
            // defaultPageSize={1}            
            className="-striped -highlight"
            style={{ color: "#656565ff" }}
          />
          </div>
          )}
          
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
export default GameSummaryScreenTabPlayerSummary;          