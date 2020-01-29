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
import { HashLoader } from 'react-spinners';
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
} from "../options/ChartAssembly";


const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";

function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject).map(key => `${key}=${paramObject[key]}`).join('&')}`;
}

class AlgCompsScreen extends Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      loading: true,
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
      
      metricDropdownList: [{value: "accuracy", label: "accuracy"},
      {value: "true positive rate", label: "true positive rate"},
      {value: "true negative rate", label: "true negative rate"},
      {value: "positive predictive value", label: "positive predictive value"},
      {value: "negative predictive value", label: "negative predictive value"},
      {value: "false positive rate", label: "false positive rate"},
      {value: "false negative rate", label: "false negative rate"},
      {value: "false discovery rate", label: "false discovery rate"}
      // {value: "r2", label: "r2"},
    ],
    selectedMetric: { value: "accuracy", label: "accuracy" }


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
    this.setState({loading: false});
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

  updateCharts = () => {
  

    if (this.state.selectedMetric !== undefined 
      && this.state.selectedMetric !== this.state.previouslySelectedMetric )
    {
  

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsExample',
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

markdown = "This is text related to MAKING SWEET ALGS.\n\n\n\
The code for this app [is here](https://github.com/insho/fiba-europe-web-app)\n\n\n\
The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project). It involved four main parts:\n\n\
1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**\n\
2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**\n\
3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**\n\
4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**\n\n\n";


  render() {

    return (

      <div>
      <Menu menuVisibility={this.state.visible}/>
      
      <div onMouseDown={this.closeMenu}>

      <Banner bannerTextMajor = {"Comparing Algorithms"} bannerTextMinor = {"Sub Banner"} 
      toggleParentMenu={this.toggleMenu.bind(this)}/>


        <div className="page-body">

          {/* <PageHeader header="Competitions" subHeader={(this.state.sexDropdownList && this.state.ageDropdownList) && this.state.selectedSex.label + " - " + this.state.selectedAge.label}/> */}

          <div className="split-table-container-upper"> 

          <ReactMarkdown source={this.markdown}/>
          <br></br>


          
    <DropdownSelectorGroup  
      dropDownItemsListSelectorOne={this.state.metricDropdownList} 
      selectedValueSelectorOne = {this.state.selectedMetric} 
      setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeMetric.bind(this)}
    
      dropDownItemsListSelectorTwo={this.state.sexDropdownList} 
      selectedValueSelectorTwo = {this.state.selectedSex} 
      setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeSex.bind(this)}

      dropDownItemsListSelectorThree={this.state.ageDropdownList} 
      selectedValueSelectorThree = {this.state.selectedAge} 
      setParentSelectorStateSelectorThree={this.handleDropdownSelectorChangeAge.bind(this)}        
      toggleParentMenu={this.toggleMenu.bind(this)}/>

      <div style={{ "paddingTop": "20px" }}>
        
        {this.state.algCompsLineChartWinnerHometeam && (
          <div>
            <div className="chart-title-large" >{"Alg Comps Title"}</div>

            <Line
              data={this.state.algCompsLineChartWinnerHometeam.data}
            >
            </Line>
          </div>
        )}


          </div>



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
export default AlgCompsScreen;          

