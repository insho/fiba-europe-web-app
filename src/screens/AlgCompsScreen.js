import React, { Component } from "react";
import $ from "jquery";
import Banner from "../components/Banner.js";
import DropdownSelectorGroup from "../components/DropdownSelectorGroup.js";
import Menu from "./Menu";
import PageHeader from "../components/PageHeader"
import ReactMarkdown from 'react-markdown';
import "../App.css";
import "./GameSummaryScreen.css";
import { selectStylesTertiary } from "../options/SelectStyles";
import Select from 'react-select';
import { Line} from "react-chartjs-2";
import {assembleChartDataCollectionSimpleMultiple} from "../options/ChartAssembly";

// const API_ENDPOINT_URL_GENERIC = "//localhost:3002/generic_query";
const API_ENDPOINT_URL_GENERIC = '//bold-vortex-250420.appspot.com/generic_query';

function createAPIEndpointParamString(paramObject) {
  return `?${Object.keys(paramObject).map(key => `${key}=${paramObject[key]}`).join('&')}`;
}

class AlgCompsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loadingFeatureImportancesSeveralPredictors: true,
      compTarget: 'winner_hometeam',
      ageDropdownList: [{ value: "adult", label: "Adult" },
      { value: "U20", label: "U20" },
      { value: "U18", label: "U18" },
      { value: "U16", label: "U16" }],
      selectedAge: { value: "adult", label: "Adult" },
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
      competitionDropdownList: [{ value: 'Division C Men', label: 'Division C Men' },
      { value: 'EuroBasket - DIVISION A', label: 'EuroBasket - DIVISION A' },
      { value: 'EuroBasket Women - DIVISION A', label: 'EuroBasket Women - DIVISION A' },
      { value: 'EuroBasket Women - DIVISION B', label: 'EuroBasket Women - DIVISION B' },
      { value: 'EuroChallenge', label: 'EuroChallenge' },
      { value: 'EuroCup Women', label: 'EuroCup Women' },
      { value: 'EuroLeague Women', label: 'EuroLeague Women' },
      { value: 'South American League', label: 'South American League' },
      { value: 'U16 Men Div. C', label: 'U16 Men Div. C' },
      { value: 'U16 Men - DIVISION B', label: 'U16 Men - DIVISION B' },
      { value: 'U16 Women - DIVISION B', label: 'U16 Women - DIVISION B' },
      { value: 'U18 Men - DIVISION A', label: 'U18 Men - DIVISION A' },
      { value: 'U18 Men - DIVISION B', label: 'U18 Men - DIVISION B' },
      { value: 'U18 Women - DIVISION B', label: 'U18 Women - DIVISION B' },
      { value: 'U20 Women - DIVISION B', label: 'U20 Women - DIVISION B' }],
      selectedCompetition: { value: 'EuroBasket - DIVISION A', label: 'EuroBasket - DIVISION A' },
      matchDropdownList: [{ value: 1115, label: '2006-08-31 Czech Republic vs Belgium' },
      { value: 1109, label: '2006-08-31 Portugal vs F.Y.R. of Macedonia' },
      { value: 1117, label: '2006-09-03 Latvia vs Estonia' },
      { value: 1105, label: '2006-09-03 Ukraine vs Sweden' },
      { value: 1118, label: '2006-09-06 Croatia vs Estonia' },
      { value: 1111, label: '2006-09-06 F.Y.R. of Macedonia vs Bosnia and Herzegovina' },
      { value: 1112, label: '2006-09-09 F.Y.R. of Macedonia vs Portugal' },
      { value: 1106, label: '2006-09-09 Ukraine vs Bulgaria' },
      { value: 1113, label: '2006-09-13 Czech Republic vs Hungary' },
      { value: 1107, label: '2006-09-13 Portugal vs Bosnia and Herzegovina' },
      { value: 1116, label: '2006-09-16 Latvia vs Denmark' },
      { value: 1108, label: '2006-09-16 Portugal vs Israel' },
      { value: 1104, label: '2006-09-16 Ukraine vs Poland' },
      { value: 111, label: '2008-08-23 Finland vs Bulgaria' },
      { value: 109, label: '2008-09-13 Finland vs Italy' },
      { value: 110, label: '2008-09-20 Finland vs Hungary' },
      { value: 1110, label: '2012-12-11 F.Y.R. of Macedonia vs Israel' }],
      selectedMatch: { value: 110, label: '2008-09-20 Finland vs Hungary' },
      finalScoreMatchAlgCompsPredictorTagDropdownOptions: [
        { value: "somepredictorsA", label: "Alg A (some)", sort: 1 },
        { value: "severalpredictorsA", label: "Alg B (several)", sort: 2 },
        { value: "manypredictorsA", label: "Alg C (many)", sort: 3 }
      ],
      finalScoreMatchAlgCompsPredictorTagSelectedTags: [
        { value: "somepredictorsA", label: "Alg A (some)", sort: 1 }]
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
    Promise.resolve(this.updateAccuracyCharts()).then(() => { this.updatePredictionChart() });

  }

  componentDidUpdate() { }


  componentWillReceiveProps(nextProps) {
  }

  updateMatchDropdown = () => {

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'MatchDropdownSelector',
      selectedCompetition: this.state.selectedCompetition.value
    }), data => {
      // console.log("heres selected match : " + data[0].value)  

      this.setState({
        matchDropdownList: data,
        selectedMatch: data[0]
      })
    });

  }


  updateAccuracyCharts = () => {


    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'AlgCompsWinnerAccuracyLine',
      selectedMetric: 'r2',
      selectedAge: this.state.selectedAge.value,
      selectedSex: this.state.selectedSex.value,
      selectedTarget: 'final_score_hometeam'
    }), data => {

      this.setState({
        algCompsLineChartFinalScoreHometeam: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors', 'metric_rate_severalpredictors', 'metric_rate_manypredictors'], { labels: ["some predictors", "several predictors", "many predictors"], backgroundColors: ["#64b5f6", "#656565", "#ae4126"], borderColors: ["#64b5f6", "#656565", "#ae4126"] })
        }
      })

    });

    if (this.state.selectedMetric !== undefined
      && this.state.selectedMetric !== this.state.previouslySelectedMetric) {

      $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
        queryName: 'AlgCompsWinnerAccuracyLine',
        selectedMetric: this.state.selectedMetric.value,
        selectedAge: this.state.selectedAge.value,
        selectedSex: this.state.selectedSex.value,
        selectedTarget: 'winner_hometeam'
      }), data => {

        this.setState({
          algCompsLineChartWinnerHometeam: {
            data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['metric_rate_somepredictors', 'metric_rate_severalpredictors', 'metric_rate_manypredictors'], { labels: ["some predictors", "several predictors", "many predictors"], backgroundColors: ["#64b5f6", "#656565", "#ae4126"], borderColors: ["#64b5f6", "#656565", "#ae4126"] })
          }
        })

      });
    }

    const tagsString = this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags.map(item => item.value).join(',,');
    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionComps',
      matchId: this.state.selectedMatch.value,
      tagsString: tagsString
    }), data => {
      this.setState({
        cumulativePredictionsFinaleScoreHometeamLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'final_score_hometeam', 'final_score_hometeam_prediction_some', 'final_score_hometeam_prediction_several', 'final_score_hometeam_prediction_many'], { labels: ["current score", "final score (actual)", "Alg A (some)", "Alg B (several)", "Alg C (many)"], backgroundColors: ["#64b5f6", "#656565", "#a60000", "#e6a312", "#d44fe8"], borderColors: ["#64b5f6", "#656565", "#a60000", "#e6a312", "#d44fe8"] })
        }

      })

    });
  }



  updatePredictionChart = () => {

    const tagsString = this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags.map(item => item.value).join(',,');

    $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'GameCumulativePredictionComps',
      matchId: this.state.selectedMatch.value,
      tagsString: tagsString
    }), data => {
      this.setState({
        cumulativePredictionsFinaleScoreHometeamLineChart: {
          data: assembleChartDataCollectionSimpleMultiple(data, 'minute', ['current_score_hometeam', 'final_score_hometeam', 'final_score_hometeam_prediction_some', 'final_score_hometeam_prediction_several', 'final_score_hometeam_prediction_many'], { labels: ["current score", "final score (actual)", "Alg A (some)", "Alg B (several)", "Alg C (many)"], backgroundColors: ["#64b5f6", "#656565", "#a60000", "#e6a312", "#d44fe8"], borderColors: ["#64b5f6", "#656565", "#a60000", "#e6a312", "#d44fe8"] })
        }

      })

    });
  }

  handleDropdownSelectorChangeAge = (selectedAge) => {
    if (this.state.previouslySelectedAge === undefined || (this.state.selectedAge !== selectedAge)) {
      Promise.resolve(this.setState({ previouslySelectedAge: this.state.selectedAge, selectedAge })).then(() => { this.updateAccuracyCharts() });
    }
  }

  handleDropdownSelectorChangeSex = (selectedSex) => {
    if (this.state.previouslySelectedSex === undefined || (this.state.selectedSex !== selectedSex)) {
      Promise.resolve(this.setState({ previouslySelectedSex: this.state.selectedSex, selectedSex })).then(() => { this.updateAccuracyCharts() });
    }
  }

  handleDropdownSelectorChangeMetric = (selectedMetric) => {
    if (this.state.previouslySelectedMetric === undefined || (this.state.selectedMetric !== selectedMetric)) {
      Promise.resolve(this.setState({ previouslySelectedMetric: this.state.selectedMetric, selectedMetric })).then(() => { this.updateAccuracyCharts() });
    }
  }

  handleDropdownSelectorChangeCompetition = (selectedCompetition) => {
    if (this.state.previouslySelectedCompetition === undefined || (this.state.selectedCompetition !== selectedCompetition)) {
      this.setState({ previouslySelectedCompetition: this.state.selectedCompetition, selectedCompetition });

      const updateMatchDropdownPromise = this.updateMatchDropdownConst(selectedCompetition.value);

      updateMatchDropdownPromise.then(() => {
        this.updatePredictionChart();
      });

    }
  }

  updateMatchDropdownConst = (selectedCompetition) => {

    return $.get(API_ENDPOINT_URL_GENERIC + createAPIEndpointParamString({
      queryName: 'MatchDropdownSelector',
      selectedCompetition: selectedCompetition
    }), data => {
      this.setState({
        matchDropdownList: data,
        selectedMatch: data[0]
      })
    });
  }

  handleDropdownSelectorChangeMatch = (selectedMatch) => {
    if (this.state.previouslySelectedMatch === undefined || (this.state.selectedMatch !== selectedMatch)) {
      Promise.resolve(this.setState({ previouslySelectedMatch: this.state.selectedMatch, selectedMatch })).then(() => { this.updatePredictionChart() });
    }
  }


  handleChangeSelectorTagSelected = (selectedTags) => {
    selectedTags = selectedTags.sort((a, b) => (a.sort > b.sort) ? 1 : -1)
    Promise.resolve(this.setState({ finalScoreMatchAlgCompsPredictorTagSelectedTags: selectedTags })).then(() => { this.updatePredictionChart() });
  }


  markdownWinnerAlg1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As expected, the simplest algorithm (Alg A, with the current score of the home and away teams as its only inputs) performs the worst out of the three. The algorithm with the most inputs (Alg C) performs the best, particularly toward the end of the match. However, Alg B, which has as its inputs the current score broken down by shot type (inputs like 'free throws made by home team' and 'two point shots made by home team'), but is lacking various ancillary inputs not related to the score, is almost neck and neck with Alg C for the majority of the points in time during the match. In fact, Alg B performs at an equivalent rate of overall accuracy, or even better, at a few choice points early in the matches. \n\n\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Perhaps the takeaway here is that, in the early stages of a match, metrics that are not directly related to score, like 'starting five in play home team' only server to muddle things, or lead to over-fitting of the alg on the training set. \n\n\n\n"
  markdownWinnerAlg2 = "### False Negatives & False Positives\n\n\
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If we switch the metric selector drop-down from ‘Overall Accuracy’ to ‘False Positives’, it is apparent that much of the difference between Alg A and Algs B and C comes from an improvement in the rate of False Negatives (a false negative in this case being the erroneous conclusion that the home team lost a match which it actually ended up winning). Alg A has a false negative rate that is almost 10 percentage points higher than B and C at several points in the match. On the other hand, the rate of false positives (the erroneous conclusion that the home team won a match it actually lost), is essentially the same for all three algs. Interesting! \n\n\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; One common reason for an excess of false negatives in a classification model has to do with class imbalance (i.e. having significantly more matches in the training set which the home team won instead of lost. Perhaps there is some truth to this, given that 'home team advantage' is a known phenomenon. The analytics website 538 states that the home team wins NBA games 59.9% of the time. We can investigate this rate on the Fiba data set using the following query:"
  markdownWinnerAlg3 = "```sql\n\
WITH hometeam_win_loss as (\n\
  SELECT\n\
      winner,\n\
      count(*) as match_count\n\
  from\n\
      (\n\
          SELECT\n\
              match_id,\n\
              (\n\
                  case\n\
                      when max(final_score_hometeam) > max(final_score_awayteam) then 'home team'\n\
                      else 'away team'\n\
                  end\n\
              ) as winner\n\
          from\n\
              fiba_europe_games_master\n\
          group by\n\
              1\n\
      ) as s1\n\
  group by\n\
      1\n\
)\n\
SELECT\n\
  winner,\n\
  match_count /(\n\
      SELECT\n\
          SUM(match_count)\n\
      from\n\
          hometeam_win_loss\n\
  ) as win_pct\n\
from\n\
  hometeam_win_loss;\n\
```"


  markdownWinnerAlg4 = "The results:\n\n\
home team win rate: **57.1%**\n\n\
away team win rate: **42.9%**\n\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It appears that home field advantage does indeed exist in our dataset, and that our two classes of games (home team wins, home team loses) are indeed somewhat imbalanced. \
One remedy is to weight the training data set (sklearn has a package for this). However, as we saw above, simply adding more features also significantly improves the false negative rates. Perhaps the takeaway here is that simply taking into account the current home team and away team scores does a decent job of telling us when the home team will win, but not when they will lose."



  markdownFinalScoreAlg1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Interestingly, when it comes to predicting the final score of the home team, the differences between the three algs are a tale of two halves. In the first half of a match, when the current score is less determinant of the final score, Alg A performs particularly poorly, with an R2 of 10% at minute 7 (i.e. 7 minutes into the first period). This is in comparison to R2 rates of around 27-28% for Algs B and C.\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;However, as the games progress to the 2nd half, Alg A does just as well as Alg B at predicting the final score, while Alg C, with all its various inputs, performs markedly worse than the other two. On reflection, this is an understandable outcome. The inputs for algs A and B are solely related to scoring. It follows that these algs would perform particularly well as the game progresses, when the current score becomes increasingly, disproportionately important in predicting the final score of the game.\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The variety of inputs in Alg C help to predict outcomes early in the game, but these fields seem to do more to muddle the predictive ability of the alg in the later stages of the game.\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alg B appears to be a solid middle ground, equally successful in the first and second halves. Of course, to truly maximize the predictive power here we would need to both experiment more with the input fields, as well as tweak the alg hyper-parameters."


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
    if (isMobile) {
      flyOutWidth = '100vw'
    }


    return (

      <div >
        <Menu menuVisibility={this.state.visible}
          flyOutWidth={flyOutWidth}
          toggleParentMenu={this.toggleMenu.bind(this)} />


        <div onMouseDown={this.closeMenu}>

          <Banner bannerTextMajor={"Comparing Algorithms"}
            toggleParentMenu={this.toggleMenu.bind(this)} />

          <div className="page-body">

            <PageHeader header="The Algorithms" subHeader={""} />

            <div className="split-table-container-upper" style={{ paddingRight: '4%' }}>

              {this.state.algCompsLineChartWinnerHometeam && (
                <div>
                  <div className="chart-title-large" >{"Algorithm Comparisons - Predicting Match Winner"}</div>
                  <div className="chart-title-small" >{"Adult Male Matches"}</div>

                  <DropdownSelectorGroup
                    dropDownItemsListSelectorOne={this.state.metricDropdownList}
                    selectedValueSelectorOne={this.state.selectedMetric}
                    setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeMetric.bind(this)}
                    isMobile={this.isMobile}
                    toggleParentMenu={this.toggleMenu.bind(this)} />

                  <Line data={this.state.algCompsLineChartWinnerHometeam.data}
                  options = {{
                    scales: {
                      xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Minute'
                        }
                      }]
                    }     
                  }}
                  >

                  </Line>
                </div>
              )}



              <ReactMarkdown source={this.markdownWinnerAlg1} style={{ paddingLeft: '10%', width: '60%', paddingTop: '4%' }} />
              <ReactMarkdown source={this.markdownWinnerAlg2} style={{ paddingLeft: '10%', width: '60%', paddingTop: '6%' }} />

              <div style={{ paddingLeft: '10%', overflowX: false, overflowY: 'scroll', maxHeight: '200px', display: 'block', width: '60%' }}>
                <ReactMarkdown source={this.markdownWinnerAlg3} style={{ paddingLeft: '10%', width: '60%', paddingTop: '6%' }} />
              </div>

              <ReactMarkdown source={this.markdownWinnerAlg4} style={{ paddingLeft: '10%', width: '60%', paddingTop: '6%' }} />


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

              {this.state.algCompsLineChartFinalScoreHometeam && (
                <div>
                  <div className="chart-title-large" >{"Algorithm Comparisons - Predicting Home Team Final Score"}</div>
                  <div className="chart-title-small" >{"Adult Male Matches"}</div>

                  <Line data={this.state.algCompsLineChartFinalScoreHometeam.data}
                  options = {{
                    scales: {
                      xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Minute'
                        }
                      }]
                    }     
                  }}>
                  </Line>
                </div>
              )}

              <ReactMarkdown source={this.markdownFinalScoreAlg1} style={{ paddingLeft: '10%', width: '60%', paddingTop: '6%' }} />

            </div>


            <div className="split-table-container-lower" style={{ paddingRight: '4%' }}>


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

              <div>
                <div className="chart-title-large" >{"Individual Match Predictions"}</div>
                <div className="chart-title-small" >{"Home Team Final Score"}</div>
              </div>

              <DropdownSelectorGroup
                style={{ "minWidth": "35vw" }}
                isMobile={this.isMobile}
                dropDownItemsListSelectorOne={this.state.competitionDropdownList}
                selectedValueSelectorOne={this.state.selectedCompetition}
                setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeCompetition.bind(this)}
                selectedSyles={selectStylesTertiary}
                toggleParentMenu={this.toggleMenu.bind(this)} />


              <DropdownSelectorGroup
                style={{ "width": "35vw" }}
                isMobile={this.isMobile}
                dropDownItemsListSelectorOne={this.state.matchDropdownList}
                selectedValueSelectorOne={this.state.selectedMatch}
                setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeMatch.bind(this)}
                selectedSyles={selectStylesTertiary}
                toggleParentMenu={this.toggleMenu.bind(this)} />

              <div style={{ "paddingTop": "20px" }}>
                {this.state.cumulativePredictionsFinaleScoreHometeamLineChart && (
                  <div>
                    <div className="chart-title-large" >{this.state.selectedMatch.label}</div>
                    <div className="chart-title-small" >{"Home Team Final Score"}</div>

                    <div className="banner-dropdown-container" id="banner-dropdown-container--left">

                      <div className="dropdown-selector-container" >

                        {this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags && (

                          <Select className="drop-down-select"

                            value={this.state.finalScoreMatchAlgCompsPredictorTagSelectedTags}
                            closeMenuOnSelect={false}
                            onChange={this.handleChangeSelectorTagSelected}
                            isMulti
                            options={this.state.finalScoreMatchAlgCompsPredictorTagDropdownOptions}
                          ></Select>
                        )}

                      </div>
                    </div>

                    <Line
                      data={this.state.cumulativePredictionsFinaleScoreHometeamLineChart.data}
                      options = {{
                        scales: {
                          xAxes: [{
                            scaleLabel: {
                              display: true,
                              labelString: 'Minute'
                            }
                          }]
                        }     
                      }}
                    >
                    </Line>
                  </div>
                )}


              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }
}
export default AlgCompsScreen;

