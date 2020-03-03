
/**
* Creates a single chart data object from the results of a sql query. 
* @param {Object} data - collected data object from sql query
* @param {String} labelColumn - name of column which will be the labels of each chart
* @param {String} rowColumn  - name of column which will be the values of each chart
* @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, bordeWidth, etc)
 */
export const assembleChartDataCollectionSimple = (data, labelColumn, rowColumn, otherOptions = {}) => {
  const labels = data.map(item => item[labelColumn]);
  const dataset = data.map(item => item[rowColumn]);

  // const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');
  return {
    labels,
    datasets: [
      {
        label: otherOptions.label || "",
        backgroundColor: otherOptions.backgroundColor || "#8c8a8a",
        borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
        borderWidth: otherOptions.borderWidth || .2,
        hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
        hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
        hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
        pointBorderWidth: otherOptions.pointBorderWidth || 1,
        pointRadius: otherOptions.pointRadius || 1.5,
        pointStyle: otherOptions.pointStyle || 'square',
        // pointBorderColor: otherOptions.pointBorderColor || "rgba(255,99,132,.8)",
        data: dataset,
        fill: otherOptions.fill || "false"
      }
    ]
  };
}


/**
 * Creates a single chart data object from the results of a sql query. 
 * @param {Object} data - collected data object from sql query
 * @param {String} labelColumn - name of column which will be the labels of each chart
 * @param {String} rowColumn  - name of column which will be the values of each chart
 * @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, bordeWidth, etc)
   */
export const assembleChartDataCollectionSimplewithColors = (data, labelColumn, rowColumn, colorColumn, otherOptions = {}) => {
  const labels = data.map(item => item[labelColumn]);
  const dataset = data.map(item => item[rowColumn]);
  //  takes a number from 0 to length of number of color blocks

  const colorNumbers = data.map(item => otherOptions.backgroundColor[item[colorColumn]]);


  // const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');
  return {
    labels,
    datasets: [
      {
        label: otherOptions.label || "",
        backgroundColor: colorNumbers || "#8c8a8a",
        borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
        borderWidth: otherOptions.borderWidth || .2,
        hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
        hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
        hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
        pointBorderWidth: otherOptions.pointBorderWidth || 1,
        pointRadius: otherOptions.pointRadius || 1.5,
        pointStyle: otherOptions.pointStyle || 'square',
        // pointBorderColor: otherOptions.pointBorderColor || "rgba(255,99,132,.8)",
        data: dataset,
        fill: otherOptions.fill || "false"
      }
    ]
  };
}

/**
 * Creates a single chart data object from the results of a sql query. 
 * @param {Object} data - collected data object from sql query
 * @param {String} labelColumn - name of column which will be the labels of each chart
 * @param {Array} rowColumns  - name of columns which will be the values of each chart
 * @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, bordeWidth, etc)
   */
export const assembleChartDataCollectionSimpleMultiple = (data, labelColumn, rowColumns, otherOptions = {}) => {
  const labels = data.map(item => item[labelColumn]);

  var datasets = []
  for (var i in rowColumns) {


    /* Note:  This map being declared a constant before the push 
    appears to be necessary to avoid the data getting all fucked up. 
    It enforces sequentiality I guess, or something */
    const datamap = data.map(item => item[rowColumns[i]])

    datasets.push({
      label: otherOptions.labels[i] || "",
      backgroundColor: otherOptions.backgroundColors[i] || "#8c8a8a",
      borderColor: otherOptions.borderColors[i] || "rgba(80,80,80,.8)",
      borderWidth: otherOptions.borderWidth || 1.5,
      fill: otherOptions.fill || false,
      hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
      hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
      hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
      pointBorderWidth: otherOptions.pointBorderWidth || 1,
      pointRadius: otherOptions.pointRadius || 1.5,
      pointStyle: otherOptions.pointStyle || 'square',
      // pointBorderColor: otherOptions.pointBorderColor || "rgba(255,99,132,.8)",
      data: datamap
    })

  };

  return {
    labels,
    datasets
  };
}



/**
 * Creates a single chart data object from the results of a sql query. 
 * @param {Object} data - collected data object from sql query
 * @param {String} labelColumn - name of column which will be the labels of each chart
 * @param {Array} rowColumns  - name of columns which will be the values of each chart
 * @param {Array} chartTypes  - array of chart types to be used in mixed chart (i.e. [bar, line, line] etc)
 * @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, bordeWidth, etc)
   */
export const assembleChartDataCollectionSimpleMultipleMixedType = (data, labelColumn, rowColumns, chartTypes, otherOptions = {}) => {
  const labels = data.map(item => item[labelColumn]);

  var datasets = []
  for (var i in rowColumns) {


    /* Note:  This map being declared a constant before the push 
    appears to be necessary to avoid the data getting all fucked up. 
    It enforces sequentiality I guess, or something */
    const datamap = data.map(item => item[rowColumns[i]])

    datasets.push({
      label: otherOptions.labels[i] || "",
      backgroundColor: otherOptions.backgroundColors[i] || "#8c8a8a",
      borderColor: otherOptions.borderColors[i] || "rgba(80,80,80,.8)",
      borderWidth: otherOptions.borderWidth || 1.5,
      fill: otherOptions.fill || false,
      hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
      hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
      hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
      pointBorderWidth: otherOptions.pointBorderWidth || 1,
      pointRadius: otherOptions.pointRadius || 1.5,
      pointStyle: otherOptions.pointStyle || 'square',
      type: chartTypes[i] || 'line',
      // pointBorderColor: otherOptions.pointBorderColor || "rgba(255,99,132,.8)",
      data: datamap
    })

  };

  return {
    labels,
    datasets
  };
}

/**
 * Creates a chart data object for a stacked chart
 * This means there is a single set of labels (our axis values) and array of datasets, each of which contain values for every one of the labels.  
 * This way, for a given label, the values from the different datasets will be stacked on top of one another.
 * @param {Object} data - collected data object from sql query
 * @param {String} labelColumn 
 * @param {String} rowColumn 
 * @param {String} groupColumn - Column by which we will be splitting the datasets and stacking them
 * @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, borderWidth, etc)
 */
export const assembleChartDataCollectionStacked = (data, labelColumn, rowColumn, groupColumn, otherOptions = {}) => {

  //Get unique lable
  const labels = [...new Set(data.map(item => item[labelColumn]))]

  //GET UNIQUE Set of Group Column. We will create one dataset for each group column value
  const groupColumns = [...new Set(data.map(item => item[groupColumn]))]


  // TODO - Make this global
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // Group data by our groupColumn
  const grouped = groupBy(data, dataRow => dataRow[groupColumn]);

  var datasets = []

  for (var i in groupColumns) {

    const dataXDomain = grouped.get(groupColumns[i]);
    const dataset = dataXDomain.map(item => item[rowColumn]);

    datasets.push({
      label: groupColumns[i],
      backgroundColor: otherOptions.backgroundColor[i] || "#8c8a8a",
      borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
      borderWidth: .2,
      hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
      hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
      hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
      data: dataset



    })


  }

  return {
    labels,
    datasets: datasets
  };
}


/**
 * GROUPED BAR CHART 
 * One column from the dataset providing the grouping
 * Muliple columns in an array providing the "values" for those groups
 * 
 */




export const assembleChartDataCollectionGrouped = (data, shotsmadeGroupLabels, shotsmadeGroupColumns, segmentColumn, segmentColors, otherOptions = {}) => {


  /*
  
         //Get unique lable
         const shotsmadeGroupLabels = ['two point shots made'
           ,'three point shots made'
           ,'free throw shots made']
  
          const shotsmadeGroupColumns = ['two_point_shots_made'
           ,'three_point_shots_made'
           ,'free_throw_shots_made'
          ]     
          
          const segmentColors = [ '#64b5f6','#ae4126' ]
  
  
           const groupColumn = 'team'
    */


  //GET UNIQUE Set of Group Column. We will create one dataset for each group column value
  //  const groupColumns = [...new Set(data.map(item => item[segmentColumn]))]

  const segmentValues = data.map(item => item[segmentColumn]);

  // console.log(segmentValues)

  // TODO - Make this global
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // Group data by our groupColumn
  const grouped = groupBy(data, dataRow => dataRow[segmentColumn]);
  //  console.log("WOOO")
  var datasets = []
  // var teamColors = [ '#64b5f6','#ae4126' ]
  for (var i in segmentValues) {

    const dataXDomain = grouped.get(segmentValues[i]);
    //  console.log(dataXDomain)

    //loop through row columns and compile dataset
    var dataseto = []
    for (var ii in shotsmadeGroupColumns) {
      dataseto.push(dataXDomain[0][shotsmadeGroupColumns[ii]])


    }
    //  const dataset = dataXDomain[rowColumns];

    //  console.log(dataseto)
    //  dataXDomain.map(item => item[rowColumn]);
    //  console.log(dataset)
    datasets.push({
      label: segmentValues[i],
      backgroundColor: segmentColors[i] || "#8c8a8a",
      borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
      borderWidth: .2,
      hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
      hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
      hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
      data: dataseto
    })
  }
  //  console.log("WOOOx")
  //  console.log(datasets)
  // return datasets
  return {
    labels: shotsmadeGroupLabels,
    datasets: datasets
  };
}



// /**
//  * Creates an array of chart objects from the results of a sql query. One chart is created for
//  * each distinct value specified in the groupColumn.
//  *
//  * Use this to return several individual charts (one for each groupColumnv value) from the contents of one sql query.
//  *
//  * @param {Object} data - collected data object from sql query
//  * @param {String} labelColumn - name of column which will be the labels of each chart
//  * @param {String} rowColumn  - name of column which will be the values of each chart
//  * @param {String} groupColumn - column by which we will group our charts. For example:
//  * if the product_domain is our groupColumn, and there are two distinct product_domain values
//  * in our dataset, this will create two sets of charts, one for each of the product_domains in our data.
//  */

// export const assembleChartDataCollectionGroupedArray = (
//   data,
//   labelColumn,
//   rowColumn,
//   groupColumn
// )=> {
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



export const assemblePivotedPieChart = (data, shotsmadeGroupLabels, shotsmadeGroupColumns, segmentFilterColumnValue, segmentFilterRowValue, segmentColors, otherOptions = {}) => {



  // TODO - Make this global
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // Group data by our groupColumn
  const grouped = groupBy(data, dataRow => dataRow[segmentFilterColumnValue]);
  var datasets = []

  const dataXDomain = grouped.get(segmentFilterRowValue);
  // console.log("WEEE")
  // console.log(dataXDomain)
  //loop through row columns and compile dataset
  var dataseto = []
  for (var ii in shotsmadeGroupColumns) {
    dataseto.push(dataXDomain[0][shotsmadeGroupColumns[ii]])


  }

  datasets.push({
    label: segmentFilterRowValue,
    backgroundColor: segmentColors || "#8c8a8a",
    borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
    borderWidth: .2,
    hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
    hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
    hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
    data: dataseto
  })

  return {
    labels: shotsmadeGroupLabels,
    datasets: datasets
  };
}




export const assemblePivotedPieChartCollection = (data, shotsmadeGroupLabels, shotsmadeGroupColumns, segmentColumn, segmentColors, otherOptions = {}) => {

  const segmentValues = data.map(item => item[segmentColumn]);

  // TODO - Make this global
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  // Group data by our groupColumn
  const grouped = groupBy(data, dataRow => dataRow[segmentColumn]);
  //  console.log("WOOO")
  // var datasets = []
  var resultPackage = {}

  for (var i in segmentValues) {

    const dataXDomain = grouped.get(segmentValues[i]);
    //  console.log(dataXDomain)

    //loop through row columns and compile dataset
    var dataseto = []
    for (var ii in shotsmadeGroupColumns) {
      dataseto.push(dataXDomain[0][shotsmadeGroupColumns[ii]])

    }
    //  const dataset = dataXDomain[rowColumns];

    //  console.log(dataseto)
    //  dataXDomain.map(item => item[rowColumn]);
    //  console.log(dataset)
    //  datasets.push({
    //    label: segmentValues[i],
    //    backgroundColor: segmentColors[i] || "#8c8a8a",
    //    borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
    //    borderWidth: .2,
    //    hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
    //    hoverBorderColor: otherOptions.hoverBorderColor ||  "rgba(255,99,132,.8)",
    //    hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
    //    data: dataseto
    //  })

    resultPackage[segmentValues[i]] = {
      labels: shotsmadeGroupLabels,
      datasets: [{
        label: segmentValues[i],
        backgroundColor: segmentColors[segmentValues[i]] || "#8c8a8a",
        borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
        borderWidth: .2,
        hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
        hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
        hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
        data: dataseto
      }]
    }

  }

  return resultPackage

  // return {
  //   labels: shotsmadeGroupLabels,
  //   datasets: datasets
  // };
}



/**
* Creates a single chart data object from the results of a sql query. 
* @param {Object} data - collected data object from sql query
* @param {String} labelColumns - array of label column names
* @param {Object} otherOptions  - json object containing other parameters with which we can override the default values in the dataset (colors, bordeWidth, etc)
 */
export const assembleChartDataCollectionSingleRowMultipleColumns = (data, labelColumns, otherOptions = {}) => {
  const labels = otherOptions.labels;

  // const dataset = data.map(item => item[rowColumn]);
  var dataset = []
  // const map = new Map();

  labelColumns.forEach((item) => {
    dataset.push(data[0][item])
  });


  //SORT THE LABELS AND DATA
  // var labelColumns = ["Bob","Tom","Larry"];
  // var values =  ["10", "20", "30"];

  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < labelColumns.length; j++)
    list.push({ 'label': labelColumns[j], 'value': dataset[j] });

  //2) sort:
  list.sort(function (a, b) {
    return ((a.value > b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
    //Sort could be modified to, for example, sort on the value 
    // if the label is the same.
  });

  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
    labelColumns[k] = list[k].label;
    dataset[k] = list[k].value;
  }

  // const colours = data.map((item) => item['current_lead_hometeam'] < 0 ? '#ae4126' : '#64b5f6');
  return {
    labels,
    datasets: [
      {
        label: otherOptions.label || "",
        backgroundColor: otherOptions.backgroundColor || "#64b5f6",
        borderColor: otherOptions.borderColor || "rgba(80,80,80,.8)",
        borderWidth: otherOptions.borderWidth || .2,
        hoverBackgroundColor: otherOptions.hoverBackgroundColor || "rgba(255,99,132,0.4)",
        hoverBorderColor: otherOptions.hoverBorderColor || "rgba(255,99,132,.8)",
        hoverBorderWidth: otherOptions.hoverBorderWidth || 1,
        pointBorderWidth: otherOptions.pointBorderWidth || 1,
        pointRadius: otherOptions.pointRadius || 1.5,
        pointStyle: otherOptions.pointStyle || 'square',
        // pointBorderColor: otherOptions.pointBorderColor || "rgba(255,99,132,.8)",
        data: dataset,
        fill: otherOptions.fill || "false"
      }
    ]
  };
}