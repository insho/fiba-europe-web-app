// import chroma from 'chroma-js';
export const chartOptions = {
  noLegend: {
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  },
  horizontalBarchartOverallConsistency: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      // displayColors: false,
      // backgroundColor: "black",
      // enabled: true,
      // mode: "single",
      // bodyFontSize: 15,
      // bodyFontFamily: "Gamja Flower",
      // bodyFontColor: "white",
      // yPadding: 5,
      // xPadding: 15,
      // cornerRadius: 4,
      // bodyFontStyle: "bold",
      callbacks: {
        // title: () => {
        //   return "";
        // },

        label: (tooltipItems, data) => {
          // return tooltipItems.yLabel;
          // console.log(tooltipItems)
          return (tooltipItems.value * 100).toFixed(2) + "%";
        }
      }
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            beginAtZero: true,
            min: 0
          
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1,
            stepSize: 0.2,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value * 100 + "%";
            }
          }
        }
      ]
    }
  }
  // ,
  // brandDetailsPieChartSales: {
  //   maintainAspectRatio: false,
  //   legend: {
  //     display: true,
  //     position: 'right',
  //   labels: {
  //     boxWidth: 10
  //   }
  //   },

  //   tooltips: {
  //     // displayColors: false,
  //     // backgroundColor: "black",
  //     // enabled: true,
  //     // mode: "single",
  //     // bodyFontSize: 15,
  //     // bodyFontFamily: "Gamja Flower",
  //     // bodyFontColor: "white",
  //     // yPadding: 5,
  //     // xPadding: 15,
  //     // cornerRadius: 4,
  //     // bodyFontStyle: "bold",


  //     // callbacks: {
  //       // label: (tooltipItems, data) => {
  //       //   console.log(tooltipItems)
  //       //   return (tooltipItems.value * 100).toFixed(2) + "%";
  //       // }
  //     // }
  //   }
  // },
  , brandDetailsBarChartSales: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {

      // callbacks: {
      //   label: (tooltipItems, data) => {
      //     return (tooltipItems.value * 100).toFixed(2) + "%";
      //   }
      // }
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            // min: 0,
            // max: 1,
            // stepSize: 0.2,
            // Include a dollar sign in the ticks
            // callback: function(value, index, values) {
            //   return value * 100 + "%";
            // }
          }
        }
      ]
    }
  }, 
  featureImportances: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {

      // callbacks: {
      //   label: (tooltipItems, data) => {
      //     return (tooltipItems.value * 100).toFixed(2) + "%";
      //   }
      // }
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            // min: 0,
            // max: 1,
            // stepSize: 0.2,
            // Include a dollar sign in the ticks
            // callback: function(value, index, values) {
            //   return value * 100 + "%";
            // }
          }
        }
      ]
    }
  }
  , brandDetailsBarChartReturns: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {

      // callbacks: {
      //   label: (tooltipItems, data) => {
      //     return (tooltipItems.value * 100).toFixed(2) + "%";
      //   }
      // }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1,
            stepSize: 0.2,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value * 100 + "%";
            }
          }
        }
      ]
    }
  },
  gameMetricsCompBarChart: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0

          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0

          }
        }
      ]
    }
  },
  gameMetricsCompBarChartPercents: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1,
            // stepSize: 0.2,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value * 100 + "%";
            }

          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0

          }
        }
      ]
    }
  },
  timeSeriesStackedBar: {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 10
      }

    },
    tooltips: {
      // displayColors: false,
      // backgroundColor: "black",
      // enabled: true,
      // mode: "single",
      // bodyFontSize: 15,
      // bodyFontFamily: "Gamja Flower",
      // bodyFontColor: "white",
      // yPadding: 5,
      // xPadding: 15,
      // cornerRadius: 4,
      // bodyFontStyle: "bold",
      callbacks: {
        // title: () => {
        //   return "";
        // },

        // label: (tooltipItems, data) => {
        //   // return tooltipItems.yLabel;
        //   // console.log(tooltipItems)
        //   return (tooltipItems.value * 100).toFixed(2) + "%";
        // }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            drawBorder: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            // min: 0,
            // max: 1,
            // stepSize: 0.2,
            // Include a dollar sign in the ticks
            // callback: function(value, index, values) {
            //   return value * 100 + "%";
            // }
          }
        }
      ]
    }
  },
  brandDetailsPieChartSales: {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 10
      }
    },

    tooltips: {
      // displayColors: false,
      // backgroundColor: "black",
      // enabled: true,
      // mode: "single",
      // bodyFontSize: 15,
      // bodyFontFamily: "Gamja Flower",
      // bodyFontColor: "white",
      // yPadding: 5,
      // xPadding: 15,
      // cornerRadius: 4,
      // bodyFontStyle: "bold",


      // callbacks: {
      // label: (tooltipItems, data) => {
      //   console.log(tooltipItems)
      //   return (tooltipItems.value * 100).toFixed(2) + "%";
      // }
      // }
    }
  },
  brandDetailsSalesReturnRateLineChart: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {

      // callbacks: {
      //   label: (tooltipItems, data) => {
      //     return (tooltipItems.value * 100).toFixed(2) + "%";
      //   }
      // }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1,
            stepSize: 0.2,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value * 100 + "%";
            }
          }
        }
      ]
    },
    borderColor: 'rgba(0, 0, 0,1)',
    // borderColor: "rgba(80,80,80,.8)",

    // borderCapStyle: 'butt',
    // borderDash: [1],
    borderDashOffset: 0.0,
    // borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 0,
    pointRadius: 0,
    // pointHoverRadius: 1,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    // pointHoverBorderWidth: 2,
    // pointRadius: 0,
    // pointHitRadius: 1,
    fill: false

    // backgroundColor: 'rgba(250, 250, 250)'
  },





  coloredSingleHorizontalBar: {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    borderSkipped: true,
    borderColor: 'rgba(0, 0, 0,0)',
    borderWidth: 0,
    pointBorderColor: 'rgba(0, 0, 0,0)',
    pointBorderWidth: 0,
    pointRadius: 0,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      // displayColors: false,
      // backgroundColor: "black",
      // enabled: true,
      // mode: "single",
      // bodyFontSize: 15,
      // bodyFontFamily: "Gamja Flower",
      // bodyFontColor: "white",
      // yPadding: 5,
      // xPadding: 15,
      // cornerRadius: 4,
      // bodyFontStyle: "bold",
      callbacks: {
        // title: () => {
        //   return "";
        // },

        label: (tooltipItems, data) => {
          // return tooltipItems.yLabel;
          // console.log(tooltipItems)
          return (tooltipItems.value * 100).toFixed(2) + "%";
        }
      }
    },
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10
          }
        }
      ],
      xAxes: [

        {
          display: false,
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            fontColor: "#656565",
            fontFamily: "Open Sans",
            fontSize: 10,
            min: 0,
            max: 1,
            stepSize: 0.2,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value * 100 + "%";
            }
          }
        }
      ]
    }
  },

  pieChart: {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 10
      }
      // plugins: {
      //   labels: [
      //     {
      //       render: 'label',
      //       position: 'outside'
      //     },
      //     {
      //       render: 'value'
      //     }
      //   ]

      // labels: {
      //   // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
      //   render: 'value',

      //   // precision for percentage, default is 0
      //   precision: 0,

      //   // identifies whether or not labels of value 0 are displayed, default is false
      //   showZero: true,

      //   // font size, default is defaultFontSize
      //   fontSize: 14,

      //   // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
      //   fontColor: '#ffffff',

      //   // font style, default is defaultFontStyle
      //   fontStyle: 'normal',

      //   // font family, default is defaultFontFamily
      //   // fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

      //   // draw text shadows under labels, default is false
      //   textShadow: true,

      //   // text shadow intensity, default is 6
      //   shadowBlur: 10,

      //   // text shadow X offset, default is 3
      //   shadowOffsetX: -5,

      //   // text shadow Y offset, default is 3
      //   shadowOffsetY: 5,


      //   // text shadow color, default is 'rgba(0,0,0,0.3)'
      //   // shadowColor: 'rgba(255,0,0,0.75)',

      //   // draw label in arc, default is false
      //   // bar chart ignores this
      //   arc: true,

      //   // position to draw label, available value is 'default', 'border' and 'outside'
      //   // bar chart ignores this
      //   // default is 'default'
      //   position: 'default',

      //   // draw label even it's overlap, default is true
      //   // bar chart ignores this
      //   overlap: true,

      //   // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
      //   showActualPercentages: true,

      //   // set images when `render` is 'image'
      //   // images: [
      //   //   {
      //   //     src: 'image.png',
      //   //     width: 16,
      //   //     height: 16
      //   //   }
      //   // ],

      //   // add padding when position is `outside`
      //   // default is 2
      //   outsidePadding: 4,

      //   // add margin of text when position is `outside` or `border`
      //   // default is 2
      //   textMargin: 4
      // }
      // }
    },

    tooltips: {
      // displayColors: false,
      // backgroundColor: "black",
      // enabled: true,
      // mode: "single",
      // bodyFontSize: 15,
      // bodyFontFamily: "Gamja Flower",
      // bodyFontColor: "white",
      // yPadding: 5,
      // xPadding: 15,
      // cornerRadius: 4,
      // bodyFontStyle: "bold",


      // callbacks: {
      // label: (tooltipItems, data) => {
      //   console.log(tooltipItems)
      //   return (tooltipItems.value * 100).toFixed(2) + "%";
      // }
      // }
    }, ImpactLineChart: {
      tooltips: {
        callbacks: {

          label: (tooltipItems, data) => {
            return (tooltipItems.value * 100).toFixed(2) + "%";
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value * 100 + "%";
              }
              ,

            }

          }
        ]
      }
    }
  }



}


