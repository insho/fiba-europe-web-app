import React from "react";
import "./WelcomeScreen.css";
import ReactMarkdown from 'react-markdown';
import Menu from "./Menu";
import Banner from "../components/Banner.js";
export default class WelcomeScreen extends React.Component {

  state = { visible: true };

  markdown = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This app is a companion piece to my [Fiba Basketball Machine Learning Project](https://github.com/insho/fiba-europe-basketball-project). I built it as a way to visualize and better explain aspects of the project, as well as to gain experience creating and deploying a react web app for the first time.\n\n\n\
* The code for this app can be [found here on github](https://github.com/insho/fiba-europe-web-app)\n\
* The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project).\n\n\n\
## This App\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The goal here is to showcase some findings from the project regarding feature inputs, accuracy scores and predictions for different algorithm variations, etc. \
I've also included stats and charts for a set of about 500 competitions and matches (a small subset of the roughly 40,000 matches\
   which were used to train and test the algorithms). I've limited the competition and match detail pages to this subset to keep the size of the database nicely \
   compact and manageable. The matches included here are representative of a variety of kinds of matches (age, sex), and they have, for the most part, proper metadata associated wtih them (match date, location, etc).\n\n\n\n"



  markdown2 = "## Process Overview\n\n\
The project itself involved four main parts:\n\n\
1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fiba basketball matches could, until late 2019, be found in two places:\n\
* http://www.fibalivestats.com - fiba basketball matches from around the world, available in json format\n\
* http://live.fibaeurope.com - fiba basketball matches from european leagues, available in xml format\n\n\
This project focuses on the latter \"live.fibaeurope.com\" data. The notebook has functions for downloading and storing these files.\n\n\
Unfortunately, as of late 2019, the site no longer seems to be up, and I am not sure how one can find the xml files. I have included a few in the repo for example purposes.\n\n\
2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The raw xml files are \"processed\" into a format conducive to data analysis and machine learning. The result is a single dataframe with a columns for each action/event of interest. A few examples:\n\
* team_fouls_committed_awayteam\n\
* avg_time_between_scoring_events_overall_hometeam\n\
* current_lead_hometeam\n\
* cumulative_lead_changes_game\n\
* cumulative_possessions_overall_hometeam\n\
* starting_five_in_play_hometeam\n\
* top_five_scorers_in_play_hometeam\n\
* points_scored_by_players_in_play_awayteam\n\
* percent_of_total_points_scored_by_players_in_play_awayteam\n\
* points_scored_period1_combined\n\
* current_score_combined\n\
* cumulative_possessions_overall_combined\n\
* starting_five_in_play_combined\n\
* top_five_scorers_in_play_combined\n\
* percent_of_total_stat_count_by_players_in_play_combined\n\
* cumulative_player_personal_fouls_hometeam\n\
* players_with_one_foul_hometeam\n\n\
3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While the raw match files contain some metadata, like competition name, location of the match, team names, etc, there are **NO DATES** associated with these matches.\n\
So, when did the matches occur, and in what sequence? This is not strictly necessary to create algorithms that rely on in-game information to predict outcomes, but I found it an annoyance.\n\
Of more immediate importance, there is also **no clean metadata regarding the age group and sex of the players**. Matches include all age groups, from U14 to professional, for both male and female athletes.\n\
To remedy this I scrape a site with archival fiba tournament schedule and boxscore information, and pair that metadata with my fiba matches (based on team names, final scores, and some other logic and ranking). This last bit is done in sql.\n\n\
4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**\n\n\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I use sklearn GradientBoostingRegressor and GradientBoostingClassifier to build some predictive algorithms based on the compiled and processed play-by-play match files.\n\
As an example, I walkthrough the process of predicting the winner (hometeam or awayteam) based on play-by-play information available in the 1st period with 3 minutes of play remaining. I make three algs, with varying sets of input features. The algs are tested on a test dataset, and the results recorded and compared. The best-performing of these (which also happens to have the most inputs), correctly predicts the winner roughly 67% of the time.\n\
Example training and test sets are included in the repo.\n\n\n\
## The Result\n\n\
Algorithms that take as their inputs play by play data up to a given moment in time during a Fiba basketball match, and produce as their outputs predictions of the relative and/or combined scores of the home and away teams, which team will win the match, etc.\n\n"

  markdown3 = "**Extra SQL DEMO:** \n\n\
I've also included a 'sql demo' notebook showcasing some sql-based analysis and (somewhat) complicated querying of the fiba europe files.\n\n\
It's not particularly easy to get sql syntax to render properly in an ipython notebook on github. I've found the best option is to launch the notebook via binder, like so:  [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/insho/fiba-europe-basketball-project/master?filepath=fiba_europe_sql_demo.ipynb).\n\n\
"


  componentDidMount() {
    // If mobile
    if (window.innerWidth < window.innerHeight) {
      this.setState({
        visible: false

      });
    } else {
      this.setState({
        visible: true
      });
    }



  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  toggleMenu() {
    // console.log("TOGGLING MENU")
    this.setState({
      visible: !this.state.visible
    });
  }

  handleMouseDown(e) {
    this.toggleMenu();
    e.stopPropagation();
  }

  closeMenu(e) {
    if (this.state.visible === true) {
      this.toggleMenu();
      e.stopPropagation();
    }
  }



  toggleMenu = this.toggleMenu.bind(this);
  handleMouseDown = this.handleMouseDown.bind(this);


  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }


  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidUpdate() { }



  render() {

    const isMobile = (window.innerWidth < window.innerHeight);

    if (isMobile) {



      return (
        <div>
          <Menu
            menuVisibility={this.state.visible}
            flyOutWidth='100vw'
            toggleParentMenu={this.toggleMenu.bind(this)}
            isMobile={isMobile}
          />


          <Banner bannerTextMajor={"Welcome"}
            toggleParentMenu={this.toggleMenu.bind(this)}
            isWelcomeScreen={true}
          />


          <div className="simple-row-container" style={{ paddingLeft: '3%' }}>
            <div></div>
            <div id="welcome-screen-text-container" style={{ "paddingStart": "20px" }}>

            <div className="welcome-screen-text" id="welcome-screen-text-main-title" style={{"fontSize":"40px","paddingTop":"2px"}}>Fiba Basketball</div>
            <div className="welcome-screen-text" id="welcome-screen-text-main-title" style={{"fontSize":"40px","paddingTop":"2px"}}>Machine Learning Project</div>

              <ReactMarkdown source={this.markdown} />
              <br></br>
              <ReactMarkdown source={this.markdown2} />
              <br></br>
              <ReactMarkdown source={this.markdown3} />

            </div>
          </div>
        </div>
      );





    } else {

      return (
        <div>
          <Menu
            menuVisibility={this.state.visible}
            toggleParentMenu={this.toggleMenu.bind(this)}
            isWelcomeScreen={true}
          />

          <div className="simple-row-container" style={{ "paddingright": '0px' }}>
            <div></div>

            <div id="welcome-screen-text-container" style={{ "paddingStart": "20px" }}>

              <div className="welcome-screen-text" id="welcome-screen-text-main-title" style={{"fontSize":"40px","paddingTop":"2px"}}>Fiba Basketball</div>
              <div className="welcome-screen-text" id="welcome-screen-text-main-title" style={{"fontSize":"40px","paddingTop":"2px"}}>Machine Learning Project</div>

              <div style={{ "paddingLeft": "20px" }}>
                <ReactMarkdown source={this.markdown} />
                <br></br>
                <ReactMarkdown source={this.markdown2} />
                <br></br>
                <ReactMarkdown source={this.markdown3} />
              </div>

            </div>
          </div>
        </div>
      );
    }
  }


}
