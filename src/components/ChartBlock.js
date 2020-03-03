
import React, { Component } from "react"
import "./ChartBlock.css";
import { Line } from "react-chartjs-2";

class ChartBlock extends Component {
//   state = {
//     chartOptions: this.props.chartOptions
//   };


  render() {



    return (

      <div className="chart-container">
        <div className="chart-title-large" >{this.props.chartTitle}</div>
        <div className="chart-title-small" >{this.props.chartSubTitle}</div>

        <Line
          data={this.props.chartData}
          options={this.props.chartOptions}
        >
        </Line>

      </div>


    )
  }
}

export default ChartBlock