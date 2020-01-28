import React from "react";
import "./WelcomeScreen.css";
import ReactMarkdown from 'react-markdown'
import Menu from "./Menu";

export default class WelcomeScreen extends React.Component {

state = {visible: true};

markdown = "This is a companion piece to my [Fiba Basketball Machine Learning Project](https://github.com/insho/fiba-europe-basketball-project). It Wvisualize and better explain my Fiba basketball machine learning project. I built it as a way to visualize and better explain aspects of the machine learning project, as well as to gain experience experience building and deploying a react web app for the first time.\n\n\n\
The code for this app [is here](https://github.com/insho/fiba-europe-web-app)\n\n\n\
The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project). It involved four main parts:\n\n\
1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**\n\
2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**\n\
3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**\n\
4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**\n\n\n";

markdown2 = "**Extra SQL DEMO:** \n\n\
I've also included a 'sql demo' notebook showcasing some sql-based analysis and (somewhat) complicated querying of the fiba europe files.\n\n\
It's not particularly easy to get sql syntax to render properly in an ipython notebook on github. I've found the best option is to launch the notebook via binder [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/insho/fiba-europe-basketball-project/master?filepath=fiba_europe_sql_demo.ipynb).\n\n\
Here's the best way to do it:\n\n\
* [Launch the notebook in Binder](https://mybinder.org/v2/gh/insho/fiba-europe-basketball-project/master?filepath=fiba_europe_sql_demo.ipynb)\n\n\
* Click on the cell with the javasript snippet, that looks like so:\n\n\
    ```javascript\
    require(['notebook/js/codecell'], function(codecell) {\
    codecell.CodeCell.options_default.highlight_modes['magic_text/x-mssql'] = {'reg':[/^%%sql/]} ;\
    Jupyter.notebook.events.one('kernel_ready.Kernel', function(){\
    Jupyter.notebook.get_cells().map(function(cell){\
        if (cell.cell_type == 'code'){ cell.auto_highlight(); } }) ;\
    ```\n\n\
and press CTR+ENTER (or CMD+ENTER) to run the cell\n\
* Then, if you click on any of the subsequent cells which contain sql code, the syntax should transform into the proper sql highlighting, etc.\n\n\n\
Other, Less Fun Options:\n\n\
* [nbviewer works, but won't highlight syntax](https://nbviewer.jupyter.org/github/insho/fiba-europe-basketball-project/blob/master/fiba_europe_sql_demo.ipynb)\n\n\
* [Github maaay work, but sometimes fails to load](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_europe_sql_demo.ipynb)"

  componentDidMount() {
    this.setState({
        visible: true
    });

  }
  


componentDidUpdate() {}

 

  render() {
    return (
        <div>
                  <Menu 
            menuVisibility={this.state.visible}/>

        <div className="simple-row-container">
        <div></div>
        <div id="welcome-screen-text-container">

            <div className="welcome-screen-text" id="welcome-screen-text-main-title">Fiba Basketball Machine Learning Project</div>

            <ReactMarkdown source={this.markdown}/>
          <br></br>
            <ReactMarkdown source={this.markdown2}/>
            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "14px"}} >The Idea:</div>
            {/* <div className="welcome-screen-paragraph-container">
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>To better understand both predictive modeling using machine learning, as well as some basics about building react web apps, build predictive models using publicly available play by play data for Fiba Europe basketball games, and display some info/results about those findings here, in a react web app. Besides a variety of fun statistics, the end result should be algorithms that predict outcomes of a given game based on play by play information from the same game (at any given minute during the match). The process can be divided into four parts: </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>1. Acquiring the data </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">2. Processing the data </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">3. Creating and testing algorythms</div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph">4. Displaying results </div>
                            
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>This web app showcases data about roughly (X) Fiba Europe basketball games spanning (X) seasons, from X to Y. It is a relatively small subset of the roughly 40,000 games used to create and test the predictive algorythms. </div>
              <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "6px", fontWeight: "italic"}}>The code for each of these steps (primarily python and sql; react-js for the app) along with some more detailed explainations of the process, is hosted on [github here](link). </div>
            </div> */}

            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "12px", paddingBottom: "20px"}}>Process Overview</div>
            <div className="welcome-screen-paragraph-container">
            <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{fontSize: "20px", fontWeight:"bold"}}>1. [Acquiring Data](link)</div>
              <div className="welcome-screen-paragraph-container">
                <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>SOME TEXT ABOUT THAT</div>
              </div>
            </div>
            </div>
        </div>
        </div>
    );
  }
}
