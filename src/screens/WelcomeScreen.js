import React from "react";
import "./WelcomeScreen.css";
import ReactMarkdown from 'react-markdown';
import Menu from "./Menu";
import Banner from "../components/Banner.js";
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
    // If mobile
    if (window.innerWidth< window.innerHeight)  {
      this.setState({
        visible: false
        
    });
  } else{
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
      // matchId: '10002',
      // selectedTabId: "one"
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    
  }

  toggleMenu() {
    console.log("TOGGLING MENU")
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
  window.addEventListener('resize',this.handleWindowSizeChange);
}

componentWillUnmount() {
  window.removeEventListener('resize',this.handleWindowSizeChange);
}


handleWindowSizeChange = () => {
  this.setState({width: window.innerWidth, height: window.innerHeight})
}

componentDidUpdate() {}



  render() {

    // const {width, height} = this.state;
    const isMobile = (window.innerWidth< window.innerHeight);

    if (isMobile) {
   
   

      return (
        <div>
                  <Menu 
            menuVisibility={this.state.visible}
            flyOutWidth ='100vw'
            toggleParentMenu={this.toggleMenu.bind(this)}
            isMobile={isMobile}
            />


<Banner bannerTextMajor={"Welcome"} 
            // dropDownItemsListSelectorOne={this.state.competitionDropdownList}
            // selectedValueSelectorOne={this.state.selectedCompetition}
            // setParentSelectorStateSelectorOne={this.handleDropdownSelectorChangeCompetition.bind(this)}
            // dropDownItemsListSelectorTwo={this.state.matchDropdownList}
            // selectedValueSelectorTwo={this.state.selectedMatch}
            // setParentSelectorStateSelectorTwo={this.handleDropdownSelectorChangeMatch.bind(this)}
            toggleParentMenu={this.toggleMenu.bind(this)}
            isWelcomeScreen= {true}
          />


        <div className="simple-row-container" style={{paddingLeft: '1%'}}>
        <div></div>
        <div id="welcome-screen-text-container">

            <div className="welcome-screen-text" id="welcome-screen-text-main-title">Fiba Basketball Machine Learning Project</div>

            <ReactMarkdown source={this.markdown}/>
          <br></br>
            <ReactMarkdown source={this.markdown2}/>
            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "14px"}} >The Idea:</div>
            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "12px", paddingBottom: "20px"}}>Process Overview</div>
            <div className="welcome-screen-paragraph-container-mobile">
            <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{fontSize: "20px", fontWeight:"bold"}}>1. [Acquiring Data](link)</div>
              <div className="welcome-screen-paragraph-container-mobile">
                <div className="welcome-screen-text" id="welcome-screen-text-paragraph" style={{paddingTop: "10px"}}>SOME TEXT ABOUT THAT</div>
              </div>
            </div>
            </div>
        </div>
        </div>
    );


         


    } else {
   
      return (
        <div>
                  <Menu 
            menuVisibility={this.state.visible}
            // toggleMenu = {this.toggleMenu.bind(this)}
            toggleParentMenu={this.toggleMenu.bind(this)}
            isWelcomeScreen= {true}
            />

        <div className="simple-row-container" style={{paddingLeft: '2%'}}>
        <div></div>
        <div id="welcome-screen-text-container">

            <div className="welcome-screen-text" id="welcome-screen-text-main-title">Fiba Basketball Machine Learning Project</div>

            <ReactMarkdown source={this.markdown}/>
          <br></br>
            <ReactMarkdown source={this.markdown2}/>
            <div className="welcome-screen-text" id="welcome-screen-text-sub-title" style={{paddingTop: "14px"}} >The Idea:</div>
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

    
}
