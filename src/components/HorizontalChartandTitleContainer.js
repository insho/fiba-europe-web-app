import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
 
/**
 * 
 */
class HorizontalChartandtitleContainer extends Component {
  render() {
    return (
          <div
                style={{
                  width: '20%',
                  'padding-left': '14px',
                  'padding-right': '14px',
                  height: '12%'
                }}>

                
                <div className="chart-title-large">
                  {this.props
                    .chartCollection &&
                    Object.keys(
                      this.props
                        .chartCollection
                    ).length > (this.props.position) &&
                    this.props
                      .chartCollection[this.props.position]
                      .domain}
                </div>

                {this.props
                  .chartCollection &&
                  Object.keys(
                    this.props
                      .chartCollection
                  ).length > (this.props.position) && (
                    <HorizontalBar                      
                      data={
                        this.props
                          .chartCollection[this.props.position]
                          .chartData.data
                      }
                      options={
                        this.props
                          .chartCollection[this.props.position]
                          .chartOptions
                      }
                    />
                  )}
              </div>
    );
  }
}
 
export default HorizontalChartandtitleContainer;


