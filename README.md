# Fiba Basketball Machine Learning - React Web App
Web app with vizualizations and some insights related to my [Fiba Basketball Machine Learning Project](https://github.com/insho/fiba-europe-basketball-project).


## The Project:

Create a web app to both visualize and better explain my Fiba basketball machine learning project. Besides a nice companion to the machine learning project, it was an excellent opportunity to gain some experience building and deploying a react web app for the first time.

The machine learning project itself can be [found here](https://github.com/insho/fiba-europe-basketball-project). 

It involved four main parts:

1. **[Acquiring the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part1_acquiring_data.ipynb)**
2. **[Processing the Data](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part2_process_data.ipynb)**
3. **[Finding Additional Metadata](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part3_finding_additional_metadata.ipynb)**
4. **[Creating, Testing and Comparing Machine Learning Algorithms](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_part4_making_algs.ipynb)**


**Extra SQL DEMO:** 

I've also included a 'sql demo' notebook showcasing some sql-based analysis and (somewhat) complicated querying of the fiba europe files. 

It's not particularly easy to get sql syntax to render properly in an ipython notebook on github. I've found the best option is to launch the notebook via binder [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/insho/fiba-europe-basketball-project/master?filepath=fiba_europe_sql_demo.ipynb). 

Here's the best way to do it:
* [Launch the notebook in Binder](https://mybinder.org/v2/gh/insho/fiba-europe-basketball-project/master?filepath=fiba_europe_sql_demo.ipynb)
* Click on the cell with the javasript snippet, that looks like so:
    ```javascript
    require(['notebook/js/codecell'], function(codecell) {
    codecell.CodeCell.options_default.highlight_modes['magic_text/x-mssql'] = {'reg':[/^%%sql/]} ;
    Jupyter.notebook.events.one('kernel_ready.Kernel', function(){
    Jupyter.notebook.get_cells().map(function(cell){
        if (cell.cell_type == 'code'){ cell.auto_highlight(); } }) ;
    ```
and press CTR+ENTER (or CMD+ENTER) to run the cell
* Then, if you click on any of the subsequent cells which contain sql code, the syntax should transform into the proper sql highlighting, etc.


Other, Less Fun Options:
* [nbviewer works, but won't highlight syntax](https://nbviewer.jupyter.org/github/insho/fiba-europe-basketball-project/blob/master/fiba_europe_sql_demo.ipynb) 
* [Github maaay work, but sometimes fails to load](https://github.com/insho/fiba-europe-basketball-project/blob/master/fiba_europe_sql_demo.ipynb)  




