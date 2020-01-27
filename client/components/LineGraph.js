/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.getChartData = this.getChartData.bind(this);
    this.setGradientColor = this.setGradientColor.bind(this);
  }

  componentDidUpdate() {
    // const { data } = this.props;
    // console.log('tickers: ', data);
  }

  // eslint-disable-next-line class-methods-use-this
  setGradientColor(canvas, color) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(30, 30, 30, 400);

    gradient.addColorStop(0, color);
    gradient.addColorStop(0.35, 'rgba(40, 44, 52, 0.85');

    return gradient;
  }

  getChartData(canvas) {
    const { data } = this.props;
    const { labels, datasets } = data;
    if (datasets) {
      const color = 'rgba(255, 0, 255, .75)';
      return {
        labels,
        datasets: datasets.map((set) => {
          const adjSet = JSON.parse(JSON.stringify(set));
          adjSet.backgroundColor = this.setGradientColor(canvas, color);
          adjSet.borderColor = 'grey';
          adjSet.borderWidth = 1;
          adjSet.lineTension = 0;
          return adjSet;
        }),
      };
    }
    return data;
  }

  render() {
    return (
      <div
        className="Line Graph"
        style={{
          position: 'relative',
          width: '80vw',
          height: '40vh',
        }}
      >
        <h3>Stock Data</h3>
        <Line
          options={{
            responsive: true,
            legend: {
              labels: {
                // This more specific font property overrides the global property
                fontColor: 'rgb(221, 221, 222)',
              },
            },
          }}
          data={this.getChartData}
        />
      </div>

    );
  }
}
