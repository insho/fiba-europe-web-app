// import React from "react";
import React, { Component } from "react";
import $ from "jquery";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import makeAnimated from 'react-select';
import "../App.css";
import "./GameSummaryScreen.css";
import PageHeader from "../components/PageHeader"
import { chartOptions } from "../options/ChartOptions.js";
import { defaultColors } from "../options/DefaultColors.js";
import { Pie, Bar, Line, HorizontalBar } from "react-chartjs-2";
import { selectStylesSecondary } from "../options/SelectStyles";
import GameSummaryScreenTabSummary from "./GameSummaryScreenTabSummary"
import GameSummaryScreenTabPlayerSummary from "./GameSummaryScreenTabPlayerSummary"
import GameSummaryScreenTabMachineLearning from "./GameSummaryScreenTabMachineLearning"
import 'react-web-tabs/dist/react-web-tabs.css';
import Banner from "../components/Banner.js";
import { TabProvider, Tab, TabPanel, TabList, Tabs } from 'react-web-tabs';
// import ReactTable from 'react-table';
// import logo from "../images/logo-white.png";
// import MenuButton from "../components/MenuButton";
import Menu from "./Menu";
import {
  assembleChartDataCollectionSimple
  , assembleChartDataCollectionStacked
  , assembleChartDataCollectionSimpleMultiple
  , assembleChartDataCollectionGrouped
  , assemblePivotedPieChart
  , assemblePivotedPieChartCollection
} from "../options/ChartAssembly";


// import { wrap } from "module";

const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject).map(key => `${key}=${paramObject[key]}`).join('&')}`;
}



class GameSummaryScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      matchId: '10002',
      selectedTabId: "one"
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



  toggleMenu = this.toggleMenu.bind(this);
  handleMouseDown = this.handleMouseDown.bind(this);



  handleTabChange = (selectedTabId) => {
    // this.setState({selectedTabId: selectedTabId})
    this.setState({
      selectedTabId
    });

    // console.log("tabid:" + selectedTabId + ", STATE selectedTabId: " + this.state.selectedTabId)
    switch (selectedTabId) {
      case "one":
        if (!this.state.tableData) {
          this.fillGameSummaryCharts();
        }
        break;
      case "two":


        if (!this.state.playerSummaryBoxScoresTableData) {

          this.fillPlayerSummaryCharts();
        }
        break;
    }

  }


  componentWillMount() {




  }

  fillPlayerSummaryCharts = () => {
    const periodsString = this.state.gameSummaryTabPlayerSummarySelectedPeriods.map(item => item.value).join(',,');

    // console.log(periodsString)
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GamePlayerDetailBoxScores',
      matchId: '10002',
      periodsString: periodsString
    }), data => {
      // console.log('xxx')
      // console.log(data)

      // console.log(data.filter(item => item.home_away == 'home').length)

      if (data.length >= 1) {
        this.setState({
          playerSummaryBoxScoresTableData: {
            home: data.filter(item => item.home_away == 'home')
            , away: data.filter(item => item.home_away == 'away')
          }

        });
      }
    });
  }


  componentDidMount() {

    const metadataPromise = this.METADATASMARTMAKING();

    metadataPromise.then(() => {
      this.fillGameSummaryCharts();
    });

  }

  METADATASMARTMAKING = () => {

    /* Get Metadata for Match ID */

    return $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameMetadata',
      matchId: this.state.matchId || '3781'
    }), data => {

      if (data.length > 0) {
        this.setState({
          competitionName: data[0]['metadata_competition_name'],
          competitionNameDetail: data[0]['metadata_competition_name_detail'],
          teamNameHomeTeam: data[0]['team_name_hometeam'],
          teamNameAwayTeam: data[0]['team_name_awayteam'],
          matchLocation: data[0]['match_location'],
          matchScheduleDateText: data[0]['schedule_date_text'],
          finalScoreHomeTeam: data[0]['final_score_hometeam'],
          finalScoreAwayTeam: data[0]['final_score_awayteam'],
          matchId: data[0]['match_id'],
          // selectedTimeSeriesProductDomains: ['1','2','3','4','5']
          gameSummaryTabPlayerSummarySelectedPeriods: [
            { value: "1", label: "P1", sort: 1 },
            { value: "2", label: "P2", sort: 2 },
            { value: "3", label: "P3", sort: 3 },
            { value: "4", label: "P4", sort: 4 },
            { value: "5", label: "P5", sort: 5 }
          ]
        });
      }
    })


  }

  fillGameSummaryCharts = () => {


    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GamePeriodScores_pivot',
      matchId: '10002'
      // dateRange:this.state.selectedDateRange.value
    }), data => {

      if (data.length >= 1) {
        this.setState({
          tableData: data

        });
      }
      /*
        // const colorsCollection = data.map(item => getColorsForProductDomain(item['product_domain']).backgroundColor);
        
          // const period_labels = [...new Set(data.map(item => item['period']))]
          const score_hometeam = [...new Set(data.map(item => item['score_hometeam']))]
          // const score_awayteam = [...new Set(data.map(item => item['score_awayteam']))]

          // const scores = [...new Set(data.map(item => [item['score_hometeam'],item['score_awayteam']] ))]

          var datasets = [];
          data.forEach((item) => {
            datasets.push({label:item['period'],data:[item['score_hometeam'],item['score_awayteam']],backgroundColor:defaultColors.periodColor[item['period']].backgroundColor})
          });
          // console.log(score_hometeam)

            this.setState({
             quarterScoresBarChart: {    
               
              data : { 
                datasets:datasets,
                labels:[this.state.teamNameHomeTeam,this.state.teamNameAwayTeam]
              }
              ,options : {
                scales: {
                     xAxes: [{
                         stacked: true
                     }],
                     yAxes: [{
                         stacked: true
                     }]
                 }
             }               
                }
             }
            );
                */
    });

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativeStats',
      matchId: '10002'
      // dateRange:this.state.selectedDateRange.value
    }), data => {

      // const colours = [...new Set(data.map(item => item['current_lead_hometeam'] >= 0 ?  '#64b5f6' : '#ae4126'))]
      const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');
      // const colours = ['#64b5f6','#ae4126' ]
      // console.log(colours)

      // var cumulativeScoresLineChartData = {}
      // Promise.resolve(

      //  cumulativeScoresLineChartData = assembleChartDataCollectionSimpleMultiple(data,'minute',['current_score_hometeam','current_score_awayteam'],{labels: [this.state.teamNameHomeTeam,this.state.teamNameAwayTeam],backgroundColors:["#64b5f6","#ae4126"],borderColors:["#64b5f6","#ae4126"]})
      // ).then(() => {
      //   console.log(cumulativeScoresLineChartData)
      //   this.setState({
      //     cumulativeScoresLineChart: {
      //        data: cumulativeScoresLineChartData
      //        }

      //     })

      // });
      // console.log(data)
      // console.log(" -----")
      // const fooo = 
      // console.log(fooo)

      this.setState({
        cumulativeScoresLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'current_score_awayteam'], { labels: [this.state.teamNameHomeTeam, this.state.teamNameAwayTeam], backgroundColors: ["#64b5f6", "#ae4126"], borderColors: ["#64b5f6", "#ae4126"] })
        },

      })



      this.setState({
        cumulativeLeadLineChart: {
          data: assembleChartDataCollectionSimple(data, 'minute', 'current_lead_hometeam', { label: "Hometeam Lead +/-", backgroundColor: colours, borderColor: colours })
          // data: assembleChartDataCollectionSimpleMultiple(data,'minute',['current_lead_hometeam_pos','current_lead_hometeam_neg'],{labels: [this.state.teamNameHomeTeam,this.state.teamNameAwayTeam],backgroundColors:["#64b5f6","#ae4126"],borderColors:["#64b5f6","#ae4126"],fill:[true,true]})
        }
      })

    });


 


    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameMetricsInstanceCounts',
      matchId: this.state.matchId
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
      queryName: 'GameMetricsComp',
      matchId: this.state.matchId
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
      teamPieChartColors[this.state.teamNameHomeTeam] = ['#57A0E0', "#50CEF4", "#A1E6F4"];
      teamPieChartColors[this.state.teamNameAwayTeam] = ['#e05757', '#f45053', '#f4a1a4'];

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

    /*
                 $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
                  queryName: 'GamePeriodScores',
                  matchId: '10002'
                }), data => {
            
                        // const colours = [...new Set(data.map(item => item['current_lead_hometeam'] >= 0 ?  '#64b5f6' : '#ae4126'))]
                        const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');
                        console.log(colours)
            
                         this.setState({
                          cumulativeScoresLineChart: {
                             data: assembleChartDataCollectionSimpleMultiple(data,'minute',['current_score_hometeam','current_score_awayteam'],{labels: [this.state.teamNameHomeTeam,this.state.teamNameAwayTeam],backgroundColors:["#64b5f6","#ae4126"],borderColors:["#64b5f6","#ae4126"]})
                             },
                             
                          })
            
            
            
                          this.setState({cumulativeLeadLineChart: {
                            data: assembleChartDataCollectionSimple(data,'minute','current_lead_hometeam',{label: "Hometeam Lead +/-",backgroundColor:colours,borderColor:colours,fill:false})
                            // data: assembleChartDataCollectionSimpleMultiple(data,'minute',['current_lead_hometeam_pos','current_lead_hometeam_neg'],{labels: [this.state.teamNameHomeTeam,this.state.teamNameAwayTeam],backgroundColors:["#64b5f6","#ae4126"],borderColors:["#64b5f6","#ae4126"],fill:[true,true]})
                           }})
            
                           
                          
            
                        // );
                            
                     });
                     */




  }




  componentDidUpdate() {
    /* On first page load, after default brand has been automatically selected from brand list in componentDidMount,
      we want to then load corresponding charts for that brand. Here we check if
      1. There is a currently selected brand
      2. There is no prior selected brand 
      If so, set a previously selected brand and update all charts
      */
    if (this.state.selectedBrand && (this.state.previouslySelectedBrand === undefined
      && this.state.selectedDateRange && (this.state.previouslySelectedDateRange === undefined))) {
      Promise.resolve(this.setState({ previouslySelectedBrand: this.state.selectedBrand, previouslyselectedDateRange: this.state.selectedDateRange })).then(() => { this.fillAllCharts(); }).then(() => { this.fillTimeSeriesCharts(); });
    }

    /* Product Domain dropdown list is depedent on the brandId. So once brandId dropddown is selected for the first time, then fill product domain dropdown */
    if (this.state.selectedBrand && (this.state.timeSeriesProductDomainDropdownList === undefined)) {
      this.updateTimeseriesBrands();
    }

    //If its the first time loading product domains, run the time series charts
    if (this.state.selectedTimeSeriesProductDomains && (this.state.previouslySelectedProductDomains === null)) {
      this.setState({ previouslySelectedProductDomains: this.state.selectedTimeSeriesProductDomains })
      this.handleDropdownSelectorChangeProductDomains(this.state.selectedTimeSeriesProductDomains)
    }

    // this.fillGameSummaryCharts();
  }

  updateTimeseriesBrands = () => {

    //   $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
    //     queryName: 'BrandSalesSelectorTimeSeriesGetProductDomains',
    //     brandId:  this.state.selectedBrand.value
    //     }), data => {    
    //     // add colors to the result set, one for each product domain
    //     data.map(item => item.color = getColorsForProductDomain(item.label).backgroundColor)    
    //   this.setState({timeSeriesProductDomainDropdownList: data, selectedTimeSeriesProductDomains: data});                
    // }); 
  }


  handleDropdownSelectorChangeGameSummaryTabPlayerSummarySelector = (selectedPeriods) => {
    console.log(this.state.gameSummaryTabPlayerSummarySelectedPeriods)

    // if(this.state.gameSummaryTabPlayerSummarySelectedPeriods === undefined || (this.state.gameSummaryTabPlayerSummarySelectedPeriods!== selectedPeriods)) {

    Promise.resolve(this.setState({ gameSummaryTabPlayerSummarySelectedPeriods: selectedPeriods })).then(() => { this.fillPlayerSummaryCharts() });
    // }
  }


  handleDropdownSelectorChangeBrand = (selectedBrand) => {
    if (this.state.previouslySelectedBrand === undefined || (this.state.selectedBrand !== selectedBrand)) {
      Promise.resolve(this.setState({ previouslySelectedBrand: this.state.selectedBrand, selectedBrand })).then(() => { this.updateTimeseriesBrands() }).then(() => { this.fillAllCharts() }).then(() => { this.fillTimeSeriesCharts(); });;
    }
  }

  handleDropdownSelectorChangeDateRange = (selectedDateRange) => {
    Promise.resolve(this.setState({ previouslyselectedDateRange: this.state.selectedDateRange, selectedDateRange })).then(() => { this.fillAllCharts() }).then(() => { this.fillTimeSeriesCharts(); });;
  }

  handleDropdownSelectorChangeDateFrequency = (selectedTimeSeriesDateFrequency) => {
    Promise.resolve(this.setState({ selectedTimeSeriesDateFrequency })).then(() => { this.fillTimeSeriesCharts() });
  }

  handleDropdownSelectorChangeProductDomains = (selectedTimeSeriesProductDomains) => {
    Promise.resolve(this.setState({ selectedTimeSeriesProductDomains })).then(() => { this.fillTimeSeriesCharts() });
  }



  fillAllCharts = () => {

    if (this.state.selectedBrand !== undefined && this.state.selectedDateRange !== undefined
      && (this.state.selectedBrand !== this.state.previouslySelectedBrand ||
        this.state.selectedDateRange !== this.state.previouslySelectedDateRange
      )

    ) {
      // console.log("filling all charts")

      //Query Data for Brand Consistency Data - Main (overall consistency charts)



      /*
         $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
          queryName: 'BrandSalesDataSalesXProductDomain',
          brandId: this.state.selectedBrand.value,
          dateRange:this.state.selectedDateRange.value
        }), data => {

              const colorsCollection = data.map(item => getColorsForProductDomain(item['product_domain']).backgroundColor);
            
                this.setState({
                 pieChartSalesXProductDomain: {      
                    data: assembleChartDataCollectionSimple(data,'product_domain','ordered_items',{label: "Sales x Product Category",backgroundColor:colorsCollection})
                  //  ,chartOptions: chartOptions.brandDetailsPieChartSales
                    }
                 }
                );

                this.setState({
                    barChartSalesXProductDomain: {
                       data: assembleChartDataCollectionSimple(data,'product_domain','ordered_items',{label: "Purchased Items x Product Category",backgroundColor:"#64b5f6"})
                      // ,chartOptions: chartOptions.brandDetailsBarChartSales
                       }
                    }
                   );


                   this.setState({
                    barChartReturnRateXProductDomain: {
                       data: assembleChartDataCollectionSimple(data,'product_domain','sixty_day_return_rate',{label: "60 Day Return Rate",backgroundColor:"#64b5f6"})
                      // ,chartOptions: chartOptions.brandDetailsBarChartReturns
                       }
                    }
                   );                       
             });
             */

      //  this.fillTimeSeriesCharts();
    }
  }


  fillTimeSeriesCharts = () => {
    // console.log("selected brand: " + JSON.stringify(this.state.selectedBrand));
    // console.log("selected selectedDateRange: " + JSON.stringify(this.state.selectedDateRange));

    if (this.state.selectedBrand !== undefined
      // && this.state.selectedDateRange !== undefined 
      && this.state.selectedTimeSeriesDateFrequency !== undefined
      && this.state.selectedTimeSeriesProductDomains !== undefined
    ) {

      //Query Data for Brand Consistency Data - Main (overall consistency charts)
      // console.log("this prod domain: " + JSON.stringify(this.state.selectedTimeSeriesProductDomains))
      // var domainsString;

      const domainsString = this.state.selectedTimeSeriesProductDomains.map(item => item.value).join(',,');
      // console.log("domainstring: " + JSON.stringify(domainsString))



      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'BrandSalesDataSalesXReturnsXProductDomainTimeSeries',
        brandId: this.state.selectedBrand.value,
        dateFrequency: this.state.selectedTimeSeriesDateFrequency.value,
        productDomainIDs: domainsString
      }), data => {

        // const colorsCollection = [...new Set(data.map(item => getColorsForProductDomain(item['product_domain']).backgroundColor))]
        // console.log("setting state timeseries")  
        //   this.setState({
        //    timeSeriesSales: {
        //       data: assembleChartDataCollectionStacked(data,'date_text_format','ordered_items','product_domain',{ backgroundColor: colorsCollection})
        //     //  ,chartOptions: chartOptions.timeSeriesStackedBar
        //       }
        //  });     
      });


      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'BrandSalesDataSalesXReturnsTimeSeries',
        brandId: this.state.selectedBrand.value,
        dateFrequency: this.state.selectedTimeSeriesDateFrequency.value,
        productDomainIDs: domainsString
      }), data => {


        var datatransform = assembleChartDataCollectionSimple(data, 'date_text_format', 'returned_items_sixty_day', { backgroundColor: '#ffffff' });
        datatransform.datasets[0].borderWidth = 1
        datatransform.datasets[0].borderColor = 'rgb(0,0,0)'

        this.setState({
          timeSeriesReturns: {
            data: datatransform
            // ,chartOptions: chartOptions.brandDetailsSalesReturnRateLineChart
          }
        });


      });


    }
  }



  // handleMouseDown(e) {
  //   this.toggleMenu();
  //   e.stopPropagation();
  // }

  closeMenu(e) {
    if (this.state.visible === true) {
      this.toggleMenu();
      e.stopPropagation();
    }
  }

  // toggleMenu() {
  //     this.setState({
  //         visible: !this.state.visible
  //     });
  //   }




  render() {
    return (

      <div>
        <Menu menuVisibility={this.state.visible} />
        <div onMouseDown={this.closeMenu}  >


          <Banner bannerTextMajor={"Game Detail"} bannerTextMinor={"Summary"}
            dropDownItemsListSelectorOne={this.state.brandDropdownList}
            selectedValueSelectorOne={this.state.selectedBrand}
            setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeBrand.bind(this)}
            dropDownItemsListSelectorTwo={this.state.dateRangeDropdownList}
            selectedValueSelectorTwo={this.state.selectedDateRange}
            setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeDateRange.bind(this)}
            toggleParentMenu={this.toggleMenu.bind(this)} />


          <div className="page-body" >
            {/* <div>
            <div className="page-header" >Brand Detail: Sales</div>
            <div className="page-sub-header-red">Brand: {this.state.brandDropdownList && this.state.selectedBrand.label}</div>
            </div> */}

            <PageHeader header={this.state.competitionName}
              header2={this.state.competitionNameDetail}
              subHeaderHomeTeam={this.state.teamNameHomeTeam}
              subHeaderAwayTeam={this.state.teamNameAwayTeam}
              finalScoreHomeTeam={this.state.finalScoreHomeTeam}
              finalScoreAwayTeam={this.state.finalScoreAwayTeam}
              matchLocation={this.state.matchLocation}
              matchScheduleDateText={this.state.matchScheduleDateText}
            />

            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                height: .8
              }}
            />
            <TabProvider defaultTab="one" onChange={(tabId) => {this.handleTabChange(tabId) }}>
              <section className="my-tabs">
                <TabList className="my-tablist">
                  <Tab tabFor="one" >Summary</Tab>

                  <Tab tabFor="two">Player Summary</Tab>
                  <Tab tabFor="three">Player Detail</Tab>

                  <Tab tabFor="four" className="my-tab">Advanced Stats</Tab>
                  <Tab tabFor="five" className="my-tab">Comparisons</Tab>
                  <Tab tabFor="six" className="my-tab">Machine Learning</Tab>
                </TabList>
                <div className="wrapper">
                  <TabPanel tabId="one">

                    <GameSummaryScreenTabSummary
                      tableData={this.state.tableData}
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
                    {/* <p>Tab 2 content</p> */}

                    <GameSummaryScreenTabPlayerSummary
                      tableData={this.state.playerSummaryBoxScoresTableData}
                      teamNameHomeTeam={this.state.teamNameHomeTeam}
                      teamNameAwayTeam={this.state.teamNameAwayTeam}
                      gameSummaryTabPlayerSummarySelectedPeriods={this.state.gameSummaryTabPlayerSummarySelectedPeriods}
                      gameSummaryTabPlayerSummarySelectorChanged={this.handleDropdownSelectorChangeGameSummaryTabPlayerSummarySelector.bind(this)}
                    />


                  </TabPanel>
                  <TabPanel tabId="three">
                    <p>Tab 3 content</p>
                    <GameSummaryScreenTabMachineLearning
                    matchId={this.state.matchId}
                    selectedTabId={this.state.selectedTabId}
                    // handlePropsThing={this.handlePropsThing.bind(this)}
                    />

                  </TabPanel>
                </div>
              </section>
            </TabProvider>







          </div>

        </div>
      </div>
    );
  }
}
export default GameSummaryScreen;          
