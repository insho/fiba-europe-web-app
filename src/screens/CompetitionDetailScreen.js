import React from "react";
import $ from "jquery";
import "../App.css";
import "./CompetitionsSummaryScreen.css";
import Banner from "../components/Banner.js";
import HorizontalTextwithBoldedSection from "../components/HorizontalTextwithBoldedSection"
import PageHeader from "../components/PageHeader"
import { chartOptions } from "../options/ChartOptions.js";
import { HorizontalBar } from "react-chartjs-2";
import Menu from "./Menu";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
// import {useTable} from 'react-table';
import { assembleChartDataCollectionSimple } from "../options/ChartAssembly";
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



export default class CompetitionDetailScreen extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
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
      selectedSex: { value: "male", label: "Male" }      
    });
     
    /*
    $.get(
      API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: "CompetitionsDropdownSelectorAge"
      }),
      data => {
        console.log('asdf')
        console.log(data)
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

       Promise.resolve(this.setState({previouslySelectedAge:this.state.selectedAge,previouslyselectedSex:this.state.selectedSex})).then(() => {this.fillTable(); });

  
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

  handleDropdownSelectorChange = selectedBrand => {
    Promise.resolve(
      this.setState({
        previouslySelectedBrand: this.state.selectedBrand,
        selectedBrand
      })
    ).then(() => {
      this.fillTable();
    });
  };



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

          <div className="page-body">

            <PageHeader header="Competitions" subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label}/>


            <div className="split-table-container-upper"> 


            <ReactTable
              data={this.state.tableData}
              columns={columns}
              showPagination={false}
              // defaultPageSize={1}
              className="-striped -highlight"
              style={{color: "#656565ff"}}
            />

            </div>



            <div className="simple-inline-container">

              <div id="overall-consistency-chart-and-data-container">

                <div id="overall-consistency-chart-container">
                  {this.state.horizontalBarchartOverallConsistency && (
                    <HorizontalBar
                      id="overall-brand-consistency-horizontal-bar"
                      data={
                        this.state.horizontalBarchartOverallConsistency.data
                      }
                      options={
                        this.state.horizontalBarchartOverallConsistency
                          .chartOptions
                      }
                    />
                  )}
                </div>
               
                <HorizontalTextwithBoldedSection textPrefix="Overall Consistency: " textPrefixStyle={{ 'font-size': "24px"}}
               textBolded={this.state.consistencyScoreText} textBoldedStyle={{ 'font-size': "28px", "padding-left": "6px", "font-weight": "bold"}}/> 

               <HorizontalTextwithBoldedSection textPrefix="Consistency Based on" 
               textBolded={this.state.seedsCountText} textBoldedStyle={{ 'font-size': "16px", color: "#8c3858", "padding-left": "6px", "padding-right": "6px"}}
               textSuffix="Seeds in Users' Fit Profiles" /> 
              
              </div>
              

              <div id="consistency-by-domain-chart-and-data-container"> 
                
                <div
                  className="section-title-large-no-padding"
                  id="chart-title-consistency-x-domain"
                >
                  {this.state.horizontalBarchartConsistencyXProductDomain &&
                    "Consistency x Product Category"}
                </div>
                
                <div style={{height:"90%"}} >
                  {this.state.horizontalBarchartConsistencyXProductDomain && (
                    <HorizontalBar 
                      
                      data={
                        this.state.horizontalBarchartConsistencyXProductDomain
                          .data
                      }
                      options={
                        this.state.horizontalBarchartConsistencyXProductDomain
                          .chartOptions
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="section-title-large">
              {this.state
                .horizontalBarchartConsistencyXProductDomainXVariationChartCollection &&
                "Fit Consistency x Size Type"}
            </div>



            <div className="section-title-large">
              {this.state
                .horizontalBarchartConsistencyXProductDomainXScaleTypeChartCollection &&
                "Fit Consistency x Scale Type"}
            </div>


           
          </div>
        </div>
      </div>
    );
  }
}
