import React from "react";
import $ from "jquery";
import "../App.css";
// import "./CompetitionsSummaryScreen.css";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import { selectStylesSecondary, selectStylesTertiary } from "../options/SelectStyles";

import "./AlgOverviewScreen.css";
import Banner from "../components/Banner.js";
import HorizontalTextwithBoldedSection from "../components/HorizontalTextwithBoldedSection"
import PageHeader from "../components/PageHeader"
import { chartOptions } from "../options/ChartOptions.js";
import { HorizontalBar,Bar,Line } from "react-chartjs-2";
import Menu from "./Menu";
import ReactTable from 'react-table';
import { assembleChartDataCollectionSimple,
  assembleChartDataCollectionSimpleMultiple,
  assembleChartDataCollectionGrouped,
  assembleChartDataCollectionStacked,
  assembleChartDataCollectionSimplewithColors
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
  Header: '#',
  accessor: 'row_rank', // String-based value accessors!
  width: 50
  // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  Header: 'Competition',
  accessor: 'competition_group',
  Cell: ({row}) =><a href={'competitionscreen/' + row.competition_group_id} style={{color: "#656565ff"}}> {row.competition_group} </a>,
  width: 300
}, {
  Header: 'First Match Date',
  accessor: 'from_date',
  Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
}, 
{
    Header: 'Last Match Date',
    accessor: 'to_date'
    
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
    Header: 'Events',
    accessor: 'event_count',
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
    Header: 'Matches',
    accessor: 'match_count',
    // Cell: props =>  parseFloat(props.value*100.0).toFixed(2)+"%"
  
},
{
 accessor: 'competition_group_id',
 show: false
}
]


/**
 * Gets the corresponding color and text for a given brand's size consistency score.
 * The score goes from 0 to 1, where 0 is totally inconsistent, and 1 is totall constistent.
 * There are four levels of consistency: very inconsistent, inconsistent, consistent and very consistent
 * @param {number} size_consistency
 */
// function getSizeConsistencyData(size_consistency) {
//   if (size_consistency >= SIZE_CONSISTENCY_BOUNDARY_VERY_CONSISTENT) {
//     return {
//       text: "Very Consistent",
//       color: SIZE_CONSISTENCY_COLOR_VERY_CONSISTENT
//     };
//   } else if (size_consistency >= SIZE_CONSISTENCY_BOUNDARY_CONSISTENT) {
//     return {
//       text: "Consistent",
//       color: SIZE_CONSISTENCY_COLOR_CONSISTENT
//     };
//   } else if (size_consistency >= SIZE_CONSISTENCY_BOUNDARY_INCONSISTENT) {
//     return {
//       text: "Inconsistent",
//       color: SIZE_CONSISTENCY_COLOR_INCONSISTENT
//     };
//   } else if (size_consistency >= SIZE_CONSISTENCY_BOUNDARY_VERY_INCONSISTENT) {
//     return {
//       text: "Very Inconsistent",
//       color: SIZE_CONSISTENCY_COLOR_VERY_INCONSISTENT
//     };
//   } else {
//     return {
//       text: "",
//       color: "#e9e9e9"
//     };
//   }
// }

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
  selectedPredictor: {value: "somepredictors", label: "Alg A (some)"}
     
    });
     
    /*
    $.get(
      API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: "CompetitionsDropdownSelectorAge"
      }),
      data => {
        this.setState({
          ageDropdownList: data,
          selectedAge: data[0]
          // selectedAge: searchDropdownListArrayforObjectwithValue(data,this.props,'competition_name')
        });
      }
    );
     

    $.get(
      API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: "CompetitionsDropdownSelectorSex"
      }),
      data => {

        this.setState({
          sexDropdownList: data,
          selectedSex: data[0]
          // selectedSex: searchDropdownListArrayforObjectwithValue(data,this.props,'competition_name')

        });
      }
    );
  */
 


  }


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

  /**
   * Creates an array of chart objects from the results of a sql query. One chart is created for
   * each distinct value specified in the groupColumn.
   *
   * Use this to return several individual charts (one for each groupColumnv value) from the contents of one sql query.
   *
   * @param {Object} data - collected data object from sql query
   * @param {String} labelColumn - name of column which will be the labels of each chart
   * @param {String} rowColumn  - name of column which will be the values of each chart
   * @param {String} groupColumn - column by which we will group our charts. For example:
   * if the product_domain is our groupColumn, and there are two distinct product_domain values
   * in our dataset, this will create two sets of charts, one for each of the product_domains in our data.
   */
  // assembleChartDataCollectionGroupedArray(
  //   data,
  //   labelColumn,
  //   rowColumn,
  //   groupColumn
  // ) {
  //   var chartCollection = [];

  //   // TODO - Make this global
  //   function groupBy(list, keyGetter) {
  //     const map = new Map();
  //     list.forEach(item => {
  //       const key = keyGetter(item);
  //       const collection = map.get(key);
  //       if (!collection) {
  //         map.set(key, [item]);
  //       } else {
  //         collection.push(item);
  //       }
  //     });
  //     return map;
  //   }

  //   const grouped = groupBy(data, dataRow => dataRow[groupColumn]);

  //   /* Get set of unique values for our group column (i.e. if group column is product_domain, get unique set of product domains)*/
  //   const unique_group_column_values = [
  //     ...new Set(data.map(item => item[groupColumn]))
  //   ];

  //   for (var i in unique_group_column_values) {
  //     const dataset = grouped.get(unique_group_column_values[i]);
  //     const colors = dataset.map(
  //       item => getSizeConsistencyData(item[rowColumn]).color
  //     );

  //     chartCollection.push({
  //       domain: unique_group_column_values[i],
  //       chartData: {
  //         data: assembleChartDataCollectionSimple(
  //           dataset,
  //           labelColumn,
  //           "size_consistency",
  //           {
  //             label: "Brand Consistency x " + unique_group_column_values[i],
  //             backgroundColor: colors
  //           }
  //         )
  //       },
  //       chartOptions: chartOptions.horizontalBarchartOverallConsistency
  //     });
  //   }
  //   return chartCollection;
  // }

  // handleDropdownSelectorChange = selectedBrand => {
  //   Promise.resolve(
  //     this.setState({
  //       previouslySelectedBrand: this.state.selectedBrand,
  //       selectedBrand
  //     })
  //   ).then(() => {
  //     this.fillTable();
  //   });
  // };



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


  
  fillTable() {
    if (this.state.selectedSex != null && this.state.selectedAge != null) {

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'CompetitionsGroupsSummary',
        competitionGroupSex: this.state.selectedSex.value,
        competitionGroupAge: this.state.selectedAge.value
        }), data => {

        if(data.length>=1){
          this.setState({
            tableData: data
            
          });
        }
    });

      //Query Data for Brand Consistency Data - Main (overall consistency charts)

      //Request and Handle Brand Consistency Data x Product Domain x Variation

      // $.get(
      //   API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      //     queryName: "BrandConsistencyDataXProductDomainXVariation",
      //     brandId: this.state.selectedBrand.value,
      //     minConsideredThresholdToAssessConsistency: MIN_CONSIDERED_THRESHOLD_TO_ASSES_CONSISTENCY
      //   }),
      //   data => {
      //     this.setState({
      //       horizontalBarchartConsistencyXProductDomainXVariationChartCollection: this.assembleChartDataCollectionGroupedArray(
      //         data,
      //         "variation",
      //         "size_consistency",
      //         "product_domain"
      //       )
      //     });
      //     // console.log(Object.keys(this.state.horizontalBarchartConsistencyXProductDomainXVariationChartCollection))
      //   }
      // );

      //Request and Handle Brand Consistency Data x Product Domain x Scale Type

      // $.get(
      //   API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      //     queryName: "BrandConsistencyDataXProductDomainXScaleType",
      //     brandId: this.state.selectedBrand.value,
      //     minConsideredThresholdToAssessConsistency: MIN_CONSIDERED_THRESHOLD_TO_ASSES_CONSISTENCY
      //   }),
      //   data => {
      //     this.setState({
      //       horizontalBarchartConsistencyXProductDomainXScaleTypeChartCollection: this.assembleChartDataCollectionGroupedArray(
      //         data,
      //         "scale_type",
      //         "size_consistency",
      //         "product_domain"
      //       )
      //     });
      //   }
      // );
    }
  }

  fillCharts() {
    if (this.state.selectedSex != null && this.state.selectedAge != null) {
      
      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'CompetitionsOverviewMatchCount',
        competitionGroupSex: this.state.selectedSex.value,
        competitionGroupAge: this.state.selectedAge.value
        }), data => {
          this.setState({
            competitionMatchCountBarChart: {
                  data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'matches','color_number',{backgroundColor: ['#57A0E0','#50CEF4','#A1E6F4','#81c784']})
                },
            competitionFinalScoreBarChart: {
              data: assembleChartDataCollectionSimplewithColors(data, 'competition', 'med_final_score_hometeam','color_number',{backgroundColor: ['#57A0E0','#50CEF4','#A1E6F4','#81c784']})
            }
    

                
          })
    });

    }

    if (this.state.selectedPredictor != null ) {
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerAccuracyLinexCompetition',
      selectedMetric: 'r2',
      selectedTarget: 'final_score_hometeam',
      // selectedAge: this.state.selectedAge.value,
      // selectedSex: this.state.selectedSex.value,
      selectedPredictor: this.state.selectedPredictor.value
    }), data => {
    
      this.setState({
        algCompsLineChartFinalScoreHometeam: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_adult_male', 'metric_rate_adult_female', 'metric_rate_youth_male','metric_rate_youth_female'], { labels: ["Adult Male", "Adult Female", "Youth Male","Youth Female"], backgroundColors: ["#64b5f6","#656565", "#ae4126","#fcd303"], borderColors: ["#64b5f6","#656565", "#ae4126","#fcd303"]})
        }
      })
    
    });

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerAccuracyLinexCompetition',
      selectedMetric: 'accuracy',
      selectedTarget: 'winner_hometeam',
      // selectedAge: this.state.selectedAge.value,
      // selectedSex: this.state.selectedSex.value,
      selectedPredictor: this.state.selectedPredictor.value
    }), data => {
    
      this.setState({
        algCompsLineChartWinnerHometeam: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_adult_male', 'metric_rate_adult_female', 'metric_rate_youth_male','metric_rate_youth_female'], { labels: ["Adult Male", "Adult Female", "Youth Male","Youth Female"], backgroundColors: ["#64b5f6","#656565", "#ae4126","#fcd303"], borderColors: ["#64b5f6","#656565", "#ae4126","#fcd303"]})
        }
      })
    
    });
  }
  }
  

  render() {
    return (
      <div>
        <Menu menuVisibility={this.state.visible}/>
        
        
        <div onMouseDown={this.closeMenu}>

        <Banner bannerTextMajor = {"Competitions"} bannerTextMinor = {"Sub Banner"} 
        dropDownItemsListSelectorOne={this.state.sexDropdownList} 
        selectedValueSelectorOne = {this.state.selectedSex} 
        setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeSex.bind(this)}
        dropDownItemsListSelectorTwo={this.state.ageDropdownList} 
        selectedValueSelectorTwo = {this.state.selectedAge} 
        setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeAge.bind(this)}        
        toggleParentMenu={this.toggleMenu.bind(this)}/>


<PageHeader header="Competitions" subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label}/>


<div>
{this.state.competitionMatchCountBarChart && (
<div className="feature-importance-chart-container" style={{maxHeight: '35vh', width: '70vw',paddingTop: '20px', paddingBottom: '5vh'}}>

<div className="chart-title-large" >{"Matches"}</div>

<Bar
  data={this.state.competitionMatchCountBarChart.data}
  // options={chartOptions.featureImportances}
  options={this.state.competitionMatchCountBarChart.chartOptions}
>
</Bar>
</div>
)}


{this.state.competitionFinalScoreBarChart && (
<div className="feature-importance-chart-container" style={{maxHeight: '35vh', width: '70vw',paddingTop: '20px', paddingBottom: '5vh'}}>

<div className="chart-title-large" >{"Median Final Score"}</div>

<Bar
  data={this.state.competitionFinalScoreBarChart.data}
  // options={chartOptions.featureImportances}
  options={this.state.competitionFinalScoreBarChart.chartOptions}
>
</Bar>
</div>
)}



<div>
  <DropdownSelectorGroup 
dropDownItemsListSelectorOne={this.state.periodDropdownList} 
selectedValueSelectorOne = {this.state.selectedPeriod} 
setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangePeriod.bind(this)}

dropDownItemsListSelectorTwo={this.state.minuteDropdownList} 
selectedValueSelectorTwo = {this.state.selectedMinute} 
setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeMinute.bind(this)}
// dropDownItemsListSelectorThree={this.state.ageDropdownList} 
// selectedValueSelectorThree = {this.state.selectedAge} 
// setParentSelectorStateSelectorThree={this.handleDropdownSelectorChangeAge.bind(this)}        
selectedSyles = {selectStylesTertiary}
toggleParentMenu={this.toggleMenu.bind(this)}/>       
</div>
</div>




<DropdownSelectorGroup 
dropDownItemsListSelectorOne={this.state.predictorDropdownList} 
selectedValueSelectorOne = {this.state.selectedPredictor} 
setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangePredictor.bind(this)}


selectedSyles = {selectStylesTertiary}
toggleParentMenu={this.toggleMenu.bind(this)}/>   

{this.state.algCompsLineChartFinalScoreHometeam && (
          <div>
            <div className="chart-title-large" >{"Algorithm R2 - Predicting Final Score Home Team"}</div>
            {/* <div className="chart-title-small" >{"Adult Male Matches"}</div> */}
            {/* {this.state.selectedMetric && (<div className="chart-title-small" >{this.state.selectedMetric.label}</div>)} */}
      

            <Line data={this.state.algCompsLineChartFinalScoreHometeam.data}>
            </Line>
          </div>
        )}

{this.state.algCompsLineChartWinnerHometeam && (
          <div>
            <div className="chart-title-large" >{"Algorithm Accuracy - Predicting Winner"}</div>
            <div className="chart-title-small" >{"Accuracy"}</div>
            {/* {this.state.selectedMetric && (<div className="chart-title-small" >{this.state.selectedMetric.label}</div>)} */}
      

            <Line data={this.state.algCompsLineChartWinnerHometeam.data}>
            </Line>
          </div>
        )}

            <div > 

{/* 
            <ReactTable
              data={this.state.tableData}
              columns={columns}
              showPagination={false}
              // defaultPageSize={1}
              className="-striped -highlight"
              style={{color: "#656565ff"}}

            /> */}

            </div>





         

           

        </div>
      </div>
    );
  }
}
