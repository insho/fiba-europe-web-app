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
  ,assembleChartDataCollectionSimpleMultipleMixedType
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
      // matchId: '10002',
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


        if (!this.state.cumulativePredictionsFinaleScoreHometeamLineChart) {

          this.fillGameMachineLearningCharts();
        }
        break;
    }

  }


  


  componentWillMount() {
    window.addEventListener('resize',this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize',this.handleWindowSizeChange);
  }
  
  
  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight})
  }



  fillPlayerSummaryCharts = () => {
    const periodsString = this.state.gameSummaryTabPlayerSummarySelectedPeriods.map(item => item.value).join(',,');

    // console.log(periodsString)
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GamePlayerDetailBoxScores',
      matchId: (this.state.selectedMatch && this.state.selectedMatch.value),
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
    this.setState({
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
      selectedMatch:  {value: "104721", label: "2007-02-08 Cavigal Nice Basket vs Basket Landes"},

      matchDropdownList: [{value: "104721" , label: "2007-02-08 Cavigal Nice Basket vs Basket Landes"},
      {value: "110811" , label: "2008-12-03 TTT Riga vs VBW CEKK Ceglèd"},
      {value: "108292" , label: "2010-07-14 Elfic Fribourg vs Cavigal Nice Basket"},
      {value: "103202" , label: "2010-11-17 Nantes Reze vs Basketball Nymburk"},
      {value: "101423" , label: "2010-12-01 Eisvögel USC vs Carolo Basket"},
      {value: "10068"  , label: "2011-11-02 Dexia Namur vs Optimum Ted Ankara"},
      {value: "10081"  , label: "2011-11-02 Olimpia  vs Dynamo Kursk"},
      {value: "10066"  , label: "2011-11-02 Lemminkainen vs Hainaut Basket"},
      {value: "10067"  , label: "2011-11-02 Flying Foxes vs Gran Canaria"},
      {value: "10069"  , label: "2011-11-02 Lombos vs Botas"},
      {value: "10065"  , label: "2011-11-02 Lotto Young Cats vs Besiktas JK"},
      {value: "10084"  , label: "2011-11-03 BBC Sint-Katelijne-Waver vs Arras"},
      {value: "10076"  , label: "2011-11-03 Maccabi Bnot  vs Kayseri Kaskispor"},
      {value: "10077"  , label: "2011-11-03 Partizan Galenika vs MBK Ruzomberok"},
      {value: "10078"  , label: "2011-11-03 Elitzur Ramla vs Spartak Noginsk"},
      {value: "10396"  , label: "2011-11-03 Dynamo Kursk vs Olimpia "},
      {value: "10083"  , label: "2011-11-03 AD Vagos vs Nantes Reze"},
      {value: "10082"  , label: "2011-11-03 Horizont vs WBC Dynamo"},
      {value: "10080"  , label: "2011-11-03 Sdent Helios vs Basket Landes"},
      {value: "10079"  , label: "2011-11-03 SISU vs Chevakata"},
      {value: "10432"  , label: "2011-11-09 Arras vs SISU"},
      {value: "10428"  , label: "2011-11-09 WBC Dynamo vs Lombos"},
      {value: "10430"  , label: "2011-11-09 Nantes Reze vs Dexia Namur"},
      {value: "10431"  , label: "2011-11-09 Hainaut Basket vs Flying Foxes"},
      {value: "10446"  , label: "2011-11-10 Besiktas JK vs Telge Basket"},
      {value: "10442"  , label: "2011-11-10 Spartak Noginsk vs USO Mondeville"},
      {value: "10445"  , label: "2011-11-10 Kayseri Kaskispor vs Olimpia "},
      {value: "10443"  , label: "2011-11-10 Dynamo - GUVD vs Lotto Young Cats"},
      {value: "10440"  , label: "2011-11-10 Botas vs Horizont"},
      {value: "10444"  , label: "2011-11-10 Basket Landes vs Partizan Galenika"},
      {value: "10448"  , label: "2011-11-10 AD Vagos vs Optimum Ted Ankara"},
      {value: "10447"  , label: "2011-11-10 Gran Canaria vs Lemminkainen"},
      {value: "10556"  , label: "2011-11-16 Lotto Young Cats vs Telge Basket"},
      {value: "10560"  , label: "2011-11-16 Dexia Namur vs AD Vagos"},
      {value: "10559"  , label: "2011-11-16 Nantes Reze vs Optimum Ted Ankara"},
      {value: "10558"  , label: "2011-11-16 Dynamo Kursk vs Kayseri Kaskispor"},
      {value: "10557"  , label: "2011-11-16 WBC Dynamo vs Botas"},
      {value: "10583"  , label: "2011-11-17 USO Mondeville vs Elitzur Ramla"},
      {value: "10586"  , label: "2011-11-17 Lombos vs Horizont"},
      {value: "10582"  , label: "2011-11-17 Basket Landes vs MBK Ruzomberok"},
      {value: "10581"  , label: "2011-11-17 Partizan Galenika vs Sdent Helios"},
      {value: "10585"  , label: "2011-11-17 BBC Sint-Katelijne-Waver vs SISU"},
      {value: "10580"  , label: "2011-11-17 Maccabi Bnot  vs Olimpia "},
      {value: "10584"  , label: "2011-11-17 Gran Canaria vs Hainaut Basket"},
      {value: "10579"  , label: "2011-11-17 Lemminkainen vs Flying Foxes"},
      {value: "10578"  , label: "2011-11-17 Dynamo - GUVD vs Besiktas JK"},
      {value: "10577"  , label: "2011-11-17 Chevakata vs Arras"},
      {value: "10587"  , label: "2011-11-19 Horizont vs Lombos"},
      {value: "10660"  , label: "2011-11-23 Hainaut Basket vs Lemminkainen"},
      {value: "10661"  , label: "2011-11-23 Nantes Reze vs AD Vagos"},
      {value: "10658"  , label: "2011-11-23 WBC Dynamo vs Horizont"},
      {value: "10703"  , label: "2011-11-24 Gran Canaria vs Flying Foxes"},
      {value: "10696"  , label: "2011-11-24 Chevakata vs SISU"},
      {value: "10697"  , label: "2011-11-24 Spartak Noginsk vs Elitzur Ramla"},
      {value: "10699"  , label: "2011-11-24 Botas vs Lombos"},
      {value: "10700"  , label: "2011-11-24 Dynamo - GUVD vs Telge Basket"},
      {value: "10701"  , label: "2011-11-24 Basket Landes vs Sdent Helios"},
      {value: "10702"  , label: "2011-11-24 Kayseri Kaskispor vs Maccabi Bnot "},
      {value: "10704"  , label: "2011-11-24 Besiktas JK vs Lotto Young Cats"},
      {value: "10768"  , label: "2011-11-30 Dexia Namur vs Nantes Reze"},
      {value: "10765"  , label: "2011-11-30 Lotto Young Cats vs Dynamo - GUVD"},
      {value: "10767"  , label: "2011-11-30 Flying Foxes vs Hainaut Basket"},
      {value: "10780"  , label: "2011-12-01 Telge Basket vs Besiktas JK"},
      {value: "10787"  , label: "2011-12-01 Lombos vs WBC Dynamo"},
      {value: "10782"  , label: "2011-12-01 Maccabi Bnot  vs Dynamo Kursk"},
      {value: "10783"  , label: "2011-12-01 Sdent Helios vs MBK Ruzomberok"},
      {value: "10781"  , label: "2011-12-01 Partizan Galenika vs Basket Landes"},
      {value: "10784"  , label: "2011-12-01 USO Mondeville vs Spartak Noginsk"},
      {value: "10785"  , label: "2011-12-01 SISU vs Arras"},
      {value: "10853"  , label: "2011-12-07 Hainaut Basket vs Gran Canaria"},
      {value: "10852"  , label: "2011-12-07 Telge Basket vs Lotto Young Cats"},
      {value: "10851"  , label: "2011-12-07 MBK Ruzomberok vs Basket Landes"},
      {value: "10862"  , label: "2011-12-08 Elitzur Ramla vs USO Mondeville"},
      {value: "10871"  , label: "2011-12-08 AD Vagos vs Dexia Namur"},
      {value: "10869"  , label: "2011-12-08 Olimpia  vs Maccabi Bnot "},
      {value: "10867"  , label: "2011-12-08 Sdent Helios vs Partizan Galenika"},
      {value: "10866"  , label: "2011-12-08 SISU vs BBC Sint-Katelijne-Waver"},
      {value: "10865"  , label: "2011-12-08 Botas vs WBC Dynamo"},
      {value: "10863"  , label: "2011-12-08 Optimum Ted Ankara vs Nantes Reze"},
      {value: "11162"  , label: "2012-01-11 Lotto Young Cats vs Chevakata"},
      {value: "11164"  , label: "2012-01-11 Dexia Namur vs Hainaut Basket"},
      {value: "11163"  , label: "2012-01-11 Basket Landes vs Arras"},
      {value: "11172"  , label: "2012-01-12 Gran Canaria vs Besiktas JK"},
      {value: "11170"  , label: "2012-01-12 Horizont vs Dynamo Kursk"},
      {value: "11171"  , label: "2012-01-12 USO Mondeville vs Botas"},
      {value: "104833" , label: "2012-10-05 Basketball Nymburk vs Nantes Reze"},
      {value: "101420" , label: "2013-01-15 Basket 90 Gdynia vs Elfic Fribourg"},
      {value: "108293" , label: "Unknown Nantes Reze vs Virtus Eirene Ragusa"},
      {value: "108294" , label: "Unknown Basket Landes vs Reyer Venezia"},
      {value: "108296" , label: "Unknown Carolo Basket vs Lulea BBK"},
      {value: "108297" , label: "Unknown Namur vs Basketball Nymburk"},
      {value: "108298" , label: "Unknown Castors Braine vs Spar Citylift Girona"},
      {value: "108299" , label: "Unknown Sparta&k M.R. Vidnoje vs VBW CEKK Ceglèd"},
      {value: "108300" , label: "Unknown Olympiacos vs Aluinvent Miskolc"},
      {value: "108301" , label: "Unknown Good Angels Kosice vs Yakin Dogu Universitesi"},
      {value: "108304" , label: "Unknown TSV 1880 vs Umea Udominate"},
      {value: "108305" , label: "Unknown Hoptrans-Sirenos vs Maccabi Bnot"},
      {value: "109473" , label: "Unknown PEAC Pécs vs Galatasaray"},
      {value: "109474" , label: "Unknown TSV 1880 vs Spar Citylift Girona"},
      {value: "109475" , label: "Unknown Basketball Nymburk vs Virtus Eirene Ragusa"},
      {value: "109476" , label: "Unknown Reyer Venezia vs Maccabi Bnot"},
      {value: "109534" , label: "Unknown Good Angels Kosice vs Carolo Basket"},
      {value: "109535" , label: "Unknown VBW CEKK Ceglèd vs TTT Riga"},
      {value: "109536" , label: "Unknown Cavigal Nice Basket vs Bellona AGÜ"},
      {value: "109537" , label: "Unknown Rutronik Stars Keltern vs Yakin Dogu Universitesi"},
      {value: "110736" , label: "Unknown Bellona AGÜ vs Cavigal Nice Basket"},
      {value: "110737" , label: "Unknown Spar Citylift Girona vs TSV 1880"},
      {value: "110738" , label: "Unknown Carolo Basket vs Good Angels Kosice"},
      {value: "110740" , label: "Unknown Virtus Eirene Ragusa vs Basketball Nymburk"},
      {value: "110810" , label: "Unknown Maccabi Bnot vs Reyer Venezia"},
      {value: "104831" , label: "Unknown Yakin Dogu Universitesi vs Olympiacos"},
      {value: "101418" , label: "Unknown PEAC Pécs vs Pieštanské Cajky"},
      {value: "101419" , label: "Unknown Samsun Canik vs Chevakata"},
      {value: "101421" , label: "Unknown Yakin Dogu Universitesi vs Istanbul Universitesi "},
      {value: "101422" , label: "Unknown VBW CEKK Ceglèd vs Enisey "},
      {value: "101424" , label: "Unknown Rutronik Stars Keltern vs KP Brno"},
      {value: "101425" , label: "Unknown Amsterdam Angels vs Nantes Reze"},
      {value: "101426" , label: "Unknown Pieštanské Cajky vs PEAC Pécs"},
      {value: "101427" , label: "Unknown KP Brno vs Rutronik Stars Keltern"},
      {value: "101428" , label: "Unknown Elfic Fribourg vs Basket 90 Gdynia"},
      {value: "101429" , label: "Unknown Carolo Basket vs Eisvögel USC"},
      {value: "101430" , label: "Unknown Nantes Reze vs Amsterdam Angels"},
      {value: "101431" , label: "Unknown Chevakata vs Samsun Canik"},
      {value: "101432" , label: "Unknown Enisey  vs VBW CEKK Ceglèd"},
      {value: "101433" , label: "Unknown Istanbul Universitesi  vs Yakin Dogu Universitesi"},
      {value: "101434" , label: "Unknown Sparta&k M.R. Vidnoje vs Maccabi Bnot"},
      {value: "101435" , label: "Unknown Bellona AGÜ vs Pinkk Pécsi 424"},
      {value: "101436" , label: "Unknown Good Angels Kosice vs Aluinvent Miskolc"},
      {value: "101437" , label: "Unknown TSV 1880 vs Lulea BBK"},
      {value: "101438" , label: "Unknown Galatasaray vs TTT Riga"},
      {value: "101439" , label: "Unknown Basket Landes vs Cavigal Nice Basket"},
      {value: "101440" , label: "Unknown Namur vs Virtus Eirene Ragusa"},
      {value: "101441" , label: "Unknown Castors Braine vs União Sportiva"},
      {value: "102201" , label: "Unknown Pinkk Pécsi 424 vs MBA Moscow"},
      {value: "102202" , label: "Unknown Umea Udominate vs TSV 1880"},
      {value: "102203" , label: "Unknown Reyer Venezia vs Basket Landes"},
      {value: "102317" , label: "Unknown Aluinvent Miskolc vs Olympiacos"},
      {value: "102318" , label: "Unknown Basketball Nymburk vs Namur"},
      {value: "102319" , label: "Unknown Maccabi Bnot vs Hoptrans-Sirenos"},
      {value: "102320" , label: "Unknown TTT Riga vs Dynamo Novosibirsk"},
      {value: "102321" , label: "Unknown Spar Citylift Girona vs Castors Braine"},
      {value: "102816" , label: "Unknown Olympiacos vs Good Angels Kosice"},
      {value: "102817" , label: "Unknown Dynamo Novosibirsk vs Galatasaray"},
      {value: "102818" , label: "Unknown Cavigal Nice Basket vs Reyer Venezia"},
      {value: "102819" , label: "Unknown Virtus Eirene Ragusa vs Basketball Nymburk"},
      {value: "102820" , label: "Unknown União Sportiva vs Spar Citylift Girona"},
      {value: "102894" , label: "Unknown MBA Moscow vs Bellona AGÜ"},
      {value: "102895" , label: "Unknown Lulea BBK vs Umea Udominate"},
      {value: "102896" , label: "Unknown Hoptrans-Sirenos vs Sparta&k M.R. Vidnoje"},
      {value: "102991" , label: "Unknown MBA Moscow vs PEAC Pécs"},
      {value: "102992" , label: "Unknown PEAC Pécs vs Bellona AGÜ"},
      {value: "102993" , label: "Unknown Cavigal Nice Basket vs Elfic Fribourg"},
      {value: "102994" , label: "Unknown União Sportiva vs Rutronik Stars Keltern"},
      {value: "102995" , label: "Unknown Lulea BBK vs Carolo Basket"},
      {value: "102996" , label: "Unknown Virtus Eirene Ragusa vs Nantes Reze"},
      {value: "102997" , label: "Unknown Pinkk Pécsi 424 vs PEAC Pécs"},
      {value: "103095" , label: "Unknown Dynamo Novosibirsk vs Samsun Canik"},
      {value: "103096" , label: "Unknown Olympiacos vs Yakin Dogu Universitesi"},
      {value: "103097" , label: "Unknown Hoptrans-Sirenos vs VBW CEKK Ceglèd"},
      {value: "103098" , label: "Unknown Aluinvent Miskolc vs Yakin Dogu Universitesi"},
      {value: "103099" , label: "Unknown Maccabi Bnot vs VBW CEKK Ceglèd"},
      {value: "103100" , label: "Unknown TTT Riga vs Samsun Canik"},
      {value: "103200" , label: "Unknown Rutronik Stars Keltern vs Spar Citylift Girona"},
      {value: "103201" , label: "Unknown Elfic Fribourg vs Reyer Venezia"},
      {value: "103203" , label: "Unknown Carolo Basket vs Umea Udominate"},
      {value: "103204" , label: "Unknown Yakin Dogu Universitesi vs Good Angels Kosice"},
      {value: "103205" , label: "Unknown Elfic Fribourg vs Basket Landes"},
      {value: "103206" , label: "Unknown Nantes Reze vs Namur"},
      {value: "103207" , label: "Unknown Carolo Basket vs TSV 1880"},
      {value: "103257" , label: "Unknown VBW CEKK Ceglèd vs Sparta&k M.R. Vidnoje"},
      {value: "103372" , label: "Unknown Samsun Canik vs Galatasaray"},
      {value: "103434" , label: "Unknown Castors Braine vs Rutronik Stars Keltern"},
      {value: "104718" , label: "Unknown Aluinvent Miskolc vs Good Angels Kosice"},
      {value: "104719" , label: "Unknown PEAC Pécs vs MBA Moscow"},
      {value: "104720" , label: "Unknown Pinkk Pécsi 424 vs Bellona AGÜ"},
      {value: "104722" , label: "Unknown União Sportiva vs Castors Braine"},
      {value: "104723" , label: "Unknown Reyer Venezia vs Elfic Fribourg"},
      {value: "104830" , label: "Unknown Samsun Canik vs Dynamo Novosibirsk"},
      {value: "104832" , label: "Unknown VBW CEKK Ceglèd vs Hoptrans-Sirenos"},
      {value: "104834" , label: "Unknown Maccabi Bnot vs Sparta&k M.R. Vidnoje"},
      {value: "104835" , label: "Unknown Umea Udominate vs Carolo Basket"},
      {value: "104836" , label: "Unknown Lulea BBK vs TSV 1880"},
      {value: "104837" , label: "Unknown TTT Riga vs Galatasaray"},
      {value: "104838" , label: "Unknown Spar Citylift Girona vs Rutronik Stars Keltern"},
      {value: "104839" , label: "Unknown Virtus Eirene Ragusa vs Namur"},
      {value: "106161" , label: "Unknown Rutronik Stars Keltern vs Castors Braine"},
      {value: "106162" , label: "Unknown Galatasaray vs Dynamo Novosibirsk"},
      {value: "106163" , label: "Unknown Basket Landes vs Elfic Fribourg"},
      {value: "106164" , label: "Unknown Spar Citylift Girona vs União Sportiva"},
      {value: "106166" , label: "Unknown Reyer Venezia vs Cavigal Nice Basket"},
      {value: "106250" , label: "Unknown Samsun Canik vs TTT Riga"},
      {value: "106251" , label: "Unknown Yakin Dogu Universitesi vs Aluinvent Miskolc"},
      {value: "106252" , label: "Unknown Sparta&k M.R. Vidnoje vs Hoptrans-Sirenos"},
      {value: "106254" , label: "Unknown VBW CEKK Ceglèd vs Maccabi Bnot"},
      {value: "106255" , label: "Unknown Basketball Nymburk vs Virtus Eirene Ragusa"},
      {value: "106256" , label: "Unknown Umea Udominate vs Lulea BBK"},
      {value: "108290" , label: "Unknown Bellona AGÜ vs PEAC Pécs"}],

      finalScoreMatchAlgCompsPredictorTagDropdownOptions: [
        { value: "somepredictorsA", label: "Alg A (some)" , sort: 1},
        { value: "severalpredictorsA", label: "Alg B (several)" , sort: 2},
        { value: "manypredictorsA", label: "Alg C (many)" , sort: 3}
      ],
      finalScoreMatchAlgCompsPredictorTagSelectedTags: [
        { value: "somepredictorsA", label: "Alg A (some)" , sort: 1}    ]
      
    
      
    })

    const metadataPromise = this.METADATASMARTMAKING();

    metadataPromise.then(() => {
      // // console.log("Filling game summary charts")
      // console.log(this.state.selectedMatch.value)
      this.fillGameSummaryCharts();
    })

  }

  METADATASMARTMAKING = () => {

    /* Get Metadata for Match ID */

    return $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameMetadata',
      matchId: (this.state.selectedMatch && this.state.selectedMatch.value) || '104721'
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
      matchId: this.state.selectedMatch.value
    }), data => {
      // console.log(this.state.selectedMatch.value)
      // console.log("DATA LENGTH " + data.length)

      if (data.length >= 1) {
        this.setState({
          tableData: data

        });
      }

    });

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativeStats',
      matchId: (this.state.selectedMatch && this.state.selectedMatch.value)
      // dateRange:this.state.selectedDateRange.value
    }), data => {

      const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');

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
      matchId: (this.state.selectedMatch && this.state.selectedMatch.value) || "104721"
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
      matchId: (this.state.selectedMatch && this.state.selectedMatch.value) || "104721"
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
        }
      })

    });

  }


  fillGameMachineLearningCharts = () => {

    const tagsString = this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags.map(item => item.value).join(',,');
    
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionComps',
      matchId: this.state.selectedMatch.value,
      tagsString: tagsString
    }), data => {
      this.setState({
        cumulativePredictionsFinaleScoreHometeamLineChart: {
                      data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'final_score_hometeam', 'final_score_hometeam_prediction_some','final_score_hometeam_prediction_several','final_score_hometeam_prediction_many'], { labels: ["current score", "final score (actual)", "Alg A (some)","Alg B (several)","Alg C (many)"], backgroundColors: ["#64b5f6","#656565", "#a60000","#e6a312","#d44fe8"], borderColors: ["#64b5f6","#656565", "#a60000","#e6a312","#d44fe8"] })
        }

      })

    });

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionCompsWinPct',
      matchId: this.state.selectedMatch.value,
      tagsString: tagsString
    }), data => {
      this.setState({
        cumulativePredictionsWinnerHometeamLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['final_winner_hometeam', 'win_pct_somepredictors','win_pct_severalpredictors','win_pct_manypredictors'], { labels: ["winner (actual)", "Alg A (some)","Alg B (several)","Alg C (many)"], backgroundColors: ["#656565", "#a60000","#e6a312","#d44fe8"], borderColors: ["#656565", "#a60000","#e6a312","#d44fe8"] })
}



      })

    });

    

  }


  componentDidUpdate() {

  }



  handleDropdownSelectorChangeGameSummaryTabPlayerSummarySelector = (selectedPeriods) => {
    // console.log(this.state.gameSummaryTabPlayerSummarySelectedPeriods)

    // if(this.state.gameSummaryTabPlayerSummarySelectedPeriods === undefined || (this.state.gameSummaryTabPlayerSummarySelectedPeriods!== selectedPeriods)) {

    Promise.resolve(this.setState({ gameSummaryTabPlayerSummarySelectedPeriods: selectedPeriods })).then(() => { this.fillPlayerSummaryCharts() });
    // }
  }


  // handleDropdownSelectorChangeBrand = (selectedBrand) => {
  //   if (this.state.previouslySelectedBrand === undefined || (this.state.selectedBrand !== selectedBrand)) {
  //     Promise.resolve(this.setState({ previouslySelectedBrand: this.state.selectedBrand, selectedBrand })).then(() => { this.updateTimeseriesBrands() }).then(() => { this.fillAllCharts() }).then(() => { this.fillTimeSeriesCharts(); });;
  //   }
  // }

  // handleDropdownSelectorChangeDateRange = (selectedDateRange) => {
  //   Promise.resolve(this.setState({ previouslyselectedDateRange: this.state.selectedDateRange, selectedDateRange })).then(() => { this.fillAllCharts() }).then(() => { this.fillTimeSeriesCharts(); });;
  // }

  // handleDropdownSelectorChangeDateFrequency = (selectedTimeSeriesDateFrequency) => {
  //   Promise.resolve(this.setState({ selectedTimeSeriesDateFrequency })).then(() => { this.fillTimeSeriesCharts() });
  // }

  // handleDropdownSelectorChangeProductDomains = (selectedTimeSeriesProductDomains) => {
  //   Promise.resolve(this.setState({ selectedTimeSeriesProductDomains })).then(() => { this.fillTimeSeriesCharts() });
  // }



  handleDropdownSelectorChangeCompetition = (selectedCompetition) => {
    if(this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition!== selectedCompetition)) {

      // this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})

      Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {
      // console.log("competition changed to " + selectedCompetition.value)
        const changeMatchPromise = this.changeMatch();
      // console.log("Changing match")

      changeMatchPromise.then(() => {
        //  console.log("filling metadata")
        // console.log(this.state.selectedMatch.value)
        const metadataPromise = this.METADATASMARTMAKING();

        metadataPromise.then(() => {
          // console.log("Filling game summary charts")
          // console.log(this.state.selectedMatch.value)
          this.fillAllCharts();
        })

      })
    })
      // Promise.resolve(this.setState({previouslySelectedCompetition:this.state.selectedCompetition,selectedCompetition})).then(() => {this.changeMatch(); }).then(()=> {this.METADATASMARTMAKING()}).then(() => {this.fillAllCharts(); });
    }
  }

  

  handleDropdownSelectorChangeMatch = (selectedMatch) => {
    if(this.state.previouslySelectedMatch === undefined || (this.state.selectedMatch!== selectedMatch)) {
      
      Promise.resolve(this.setState({previouslySelectedMatch:this.state.selectedMatch,selectedMatch})).then(()=> {this.METADATASMARTMAKING()}).then(() => {this.fillAllCharts(); });
    }
  }


  changeMatch = () => {

    return $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameDropdownSelector',
      selectedCompetition: this.state.selectedCompetition.value
    }), data => {
      if(data.length>0) {

        this.setState({
          matchDropdownList: data,
          selectedMatch: data[0]
        });
  
      }
  
  
    });
  }

  fillAllCharts = () => {

    this.fillGameSummaryCharts();
    this.fillGameMachineLearningCharts();
    // const fillChartsPromise = this.fillGameSummaryCharts();

    // fillChartsPromise.then(() => {
    //   this.fillGameMachineLearningCharts();
    // })

    
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



  handleChangeSelectorTagSelected = (selectedTags) => {
    selectedTags = selectedTags.sort((a, b) => (a.sort > b.sort) ? 1 : -1)

    // console.log(this.state.gameSummaryTabPlayerSummaryselectedTags)

    // if(this.state.gameSummaryTabPlayerSummarySelectedPeriods === undefined || (this.state.gameSummaryTabPlayerSummarySelectedPeriods!== selectedPeriods)) {

    Promise.resolve(this.setState({ finalScoreMatchAlgCompsPredictorTagSelectedTags: selectedTags })).then(() => { this.fillGameMachineLearningCharts() });
    // }
  }



  render() {

    const isMobile = (window.innerWidth< window.innerHeight);

    var flyOutWidth = '25vw'
    if(isMobile) {
      flyOutWidth = '100vw'
    }

    return (

      <div>
       <Menu menuVisibility={this.state.visible}
       flyOutWidth = {flyOutWidth}
      toggleParentMenu={this.toggleMenu.bind(this)}/>
        <div onMouseDown={this.closeMfenu}>

          <Banner bannerTextMajor={"Game Detail"} bannerTextMinor={"Summary"}
            dropDownItemsListSelectorOne={this.state.competitionDropdownList}
            selectedValueSelectorOne={this.state.selectedCompetition}
            setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeCompetition.bind(this)}
            dropDownItemsListSelectorTwo={this.state.matchDropdownList}
            selectedValueSelectorTwo={this.state.selectedMatch}
            setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeMatch.bind(this)}
            toggleParentMenu={this.toggleMenu.bind(this)}/>


          <div className="page-body" >

            <PageHeader header={this.state.competitionName}
              header2={this.state.competitionNameDetail}
              subHeaderHomeTeam={this.state.teamNameHomeTeam}
              subHeaderAwayTeam={this.state.teamNameAwayTeam}
              finalScoreHomeTeam={this.state.finalScoreHomeTeam}
              finalScoreAwayTeam={this.state.finalScoreAwayTeam}
              matchLocation={this.state.matchLocation}
              matchScheduleDateText={this.state.matchScheduleDateText}
              showMatchInfo={true}
              isMobile={isMobile}
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
                  <Tab tabFor="one" >Stats</Tab>
                  <Tab tabFor="two">Machine Learning</Tab>

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

                    {/* <GameSummaryScreenTabPlayerSummary
                      tableData={this.state.playerSummaryBoxScoresTableData}
                      teamNameHomeTeam={this.state.teamNameHomeTeam}
                      teamNameAwayTeam={this.state.teamNameAwayTeam}
                      gameSummaryTabPlayerSummarySelectedPeriods={this.state.gameSummaryTabPlayerSummarySelectedPeriods}
                      gameSummaryTabPlayerSummarySelectorChanged={this.handleDropdownSelectorChangeGameSummaryTabPlayerSummarySelector.bind(this)}
                    /> */}

                    <GameSummaryScreenTabMachineLearning
                    // matchId={this.state.selectedMatch.value}
                    selectedTabId={this.state.selectedTabId}
                    cumulativePredictionsFinaleScoreHometeamLineChart={this.state.cumulativePredictionsFinaleScoreHometeamLineChart}
                    cumulativePredictionsWinnerHometeamLineChart={this.state.cumulativePredictionsWinnerHometeamLineChart}
                    finalScoreMatchAlgCompsPredictorTagSelectedTags={this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags}
                    finalScoreMatchAlgCompsPredictorTagDropdownOptions={this.state.finalScoreMatchAlgCompsPredictorTagDropdownOptions}
                    setParentSelectorStateSelectorOne ={this.handleChangeSelectorTagSelected.bind(this)}
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
