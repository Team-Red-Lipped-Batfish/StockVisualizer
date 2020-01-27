/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Login from './Login';
import Visualizer from './Visualizer';
import LineGraph from './LineGraph';
// eslint-disable-next-line no-unused-vars
import styles from '../styles.css';
import Portfolio from './Portfolio';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: true,
      searchValue: '',
      start: '',
      end: '',
      portfolioList: ['MSFT', 'SPOT', 'AAPL'],
      newStock: '',
      data: {
        labels: [],
        datasets: [],
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStockToPortfolio = this.addStockToPortfolio.bind(this);
    this.deleteStock = this.deleteStock.bind(this);
  }

  componentDidMount() {
    // console.log('tickers: ', this.state);
    const rawData = {
      '2020-01-24': {
        '1. open': '167.5100',
        '2. high': '167.5300',
        '3. low': '164.4500',
        '4. close': '165.0400',
        '5. volume': '24468140',
      },
      '2020-01-23': {
        '1. open': '166.1900',
        '2. high': '166.8000',
        '3. low': '165.2700',
        '4. close': '166.7200',
        '5. volume': '19680766',
      },
      '2020-01-22': {
        '1. open': '167.4000',
        '2. high': '167.4900',
        '3. low': '165.6800',
        '4. close': '165.7000',
        '5. volume': '24138777',
      },
      '2020-01-21': {
        '1. open': '166.6800',
        '2. high': '168.1900',
        '3. low': '166.4300',
        '4. close': '166.5000',
        '5. volume': '29223486',
      },
      '2020-01-17': {
        '1. open': '167.4200',
        '2. high': '167.4675',
        '3. low': '165.4300',
        '4. close': '167.1000',
        '5. volume': '34371659',
      },
      '2020-01-16': {
        '1. open': '164.3500',
        '2. high': '166.2400',
        '3. low': '164.0300',
        '4. close': '166.1700',
        '5. volume': '23865360',
      },
      '2020-01-15': {
        '1. open': '162.6200',
        '2. high': '163.9400',
        '3. low': '162.5700',
        '4. close': '163.1800',
        '5. volume': '21417871',
      },
      '2020-01-14': {
        '1. open': '163.3900',
        '2. high': '163.6000',
        '3. low': '161.7200',
        '4. close': '162.1300',
        '5. volume': '23500783',
      },
      '2020-01-13': {
        '1. open': '161.7600',
        '2. high': '163.3100',
        '3. low': '161.2600',
        '4. close': '163.2800',
        '5. volume': '18666414',
      },
      '2020-01-10': {
        '1. open': '162.8235',
        '2. high': '163.2200',
        '3. low': '161.1800',
        '4. close': '161.3400',
        '5. volume': '20733946',
      },
      '2020-01-09': {
        '1. open': '161.8350',
        '2. high': '162.2150',
        '3. low': '161.0300',
        '4. close': '162.0900',
        '5. volume': '21399951',
      },
      '2020-01-08': {
        '1. open': '158.9300',
        '2. high': '160.8000',
        '3. low': '157.9491',
        '4. close': '160.0900',
        '5. volume': '27762026',
      },
      '2020-01-07': {
        '1. open': '159.3200',
        '2. high': '159.6700',
        '3. low': '157.3200',
        '4. close': '157.5800',
        '5. volume': '21881740',
      },
      '2020-01-06': {
        '1. open': '157.0800',
        '2. high': '159.1000',
        '3. low': '156.5100',
        '4. close': '159.0300',
        '5. volume': '20826702',
      },
      '2020-01-03': {
        '1. open': '158.3200',
        '2. high': '159.9450',
        '3. low': '158.0600',
        '4. close': '158.6200',
        '5. volume': '21121681',
      },
      '2020-01-02': {
        '1. open': '158.7800',
        '2. high': '160.7300',
        '3. low': '158.3300',
        '4. close': '160.6200',
        '5. volume': '22634546',
      },
      '2019-12-31': {
        '1. open': '156.7700',
        '2. high': '157.7700',
        '3. low': '156.4500',
        '4. close': '157.7000',
        '5. volume': '18393383',
      },
      '2019-12-30': {
        '1. open': '158.9865',
        '2. high': '159.0200',
        '3. low': '156.7300',
        '4. close': '157.5900',
        '5. volume': '16356720',
      },
      '2019-12-27': {
        '1. open': '159.4500',
        '2. high': '159.5500',
        '3. low': '158.2200',
        '4. close': '158.9600',
        '5. volume': '18414352',
      },
      '2019-12-26': {
        '1. open': '157.5511',
        '2. high': '158.7300',
        '3. low': '157.4000',
        '4. close': '158.6700',
        '5. volume': '14526927',
      },
      '2019-12-24': {
        '1. open': '157.4800',
        '2. high': '157.7100',
        '3. low': '157.1150',
        '4. close': '157.3800',
        '5. volume': '8989150',
      },
      '2019-12-23': {
        '1. open': '158.1200',
        '2. high': '158.1200',
        '3. low': '157.2700',
        '4. close': '157.4100',
        '5. volume': '17726283',
      },
      '2019-12-20': {
        '1. open': '157.3500',
        '2. high': '158.4900',
        '3. low': '156.2900',
        '4. close': '157.4100',
        '5. volume': '53599613',
      },
      '2019-12-19': {
        '1. open': '154.0000',
        '2. high': '155.7700',
        '3. low': '153.7500',
        '4. close': '155.7100',
        '5. volume': '25813825',
      },
      '2019-12-18': {
        '1. open': '154.3000',
        '2. high': '155.4800',
        '3. low': '154.1800',
        '4. close': '154.3700',
        '5. volume': '24132379',
      },
      '2019-12-17': {
        '1. open': '155.4500',
        '2. high': '155.7100',
        '3. low': '154.4500',
        '4. close': '154.6900',
        '5. volume': '25443527',
      },
      '2019-12-16': {
        '1. open': '155.1100',
        '2. high': '155.9000',
        '3. low': '154.8200',
        '4. close': '155.5300',
        '5. volume': '24152770',
      },
      '2019-12-13': {
        '1. open': '153.1106',
        '2. high': '154.8900',
        '3. low': '152.8300',
        '4. close': '154.5300',
        '5. volume': '23850062',
      },
      '2019-12-12': {
        '1. open': '151.6500',
        '2. high': '153.4400',
        '3. low': '151.0200',
        '4. close': '153.2400',
        '5. volume': '24645366',
      },
      '2019-12-11': {
        '1. open': '151.5400',
        '2. high': '151.8700',
        '3. low': '150.3300',
        '4. close': '151.7000',
        '5. volume': '18860001',
      },
    };
    const labels = Object.keys(rawData).reverse();
    const values = labels.map((key) => rawData[key]['4. close']);

    this.setState({
      data: {
        labels,
        datasets: [
          {
            label: 'MSFT Closing Price',
            data: values,
          },
        ],
      },
    });
  }

  handleChange(e) {
    // console.log("HandleDateTrigger")
    // console.log(e.target.getAttribute('field'));
    const newState = {};
    const field = e.target.getAttribute('field');
    newState[field] = e.target.value;

    this.setState(
      newState,
    );
    // console.log(this.state[field]);
  }

  handleSubmit(e) {
    // console.log('hello');
    const { searchValue, start, end } = this.state;
    e.preventDefault();
    let ticker = e.target.getAttribute('ticker');
    if (!ticker) ticker = searchValue;

    console.log('ticker:', ticker);

    const url = `api/stock/getStocks/?ticker=${ticker}&start=${start}&end=${end}`;
    // console.log(url);

    // eslint-disable-next-line no-undef
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: {
            labels: data[0].dates,
            datasets: [
              {
                label: `${ticker} Closing Price`,
                data: data[0].close,
              },
            ],
          },
        });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        console.log('could not fetch data');
      });
  }

  addStockToPortfolio() {
    const { newStock } = this.state;
    console.log(newStock, 'Add new stock to portfolio');
  }

  deleteStock(e) {
    const ticker = e.target.getAttribute('ticker');
    console.log(ticker, 'To be deleted');
  }

  render() {
    const {
      isLoggedin, start, end, data, searchValue, portfolioList, newStock,
    } = this.state;
    const {
      handleChange, handleSubmit, addStockToPortfolio, deleteStock,
    } = this;

    // console.log(isLoggedin);

    if (!isLoggedin) {
      return (
        <div>
          <Login />
        </div>
      );
    }
    return (
      <div>
        <div>
          <Visualizer
            app={
           {
             searchValue,
             start,
             end,
             handleChange,
             handleSubmit,
           }
          }
          />
        </div>
        <Portfolio
          portfolioList={portfolioList}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newStock={newStock}
          addStockToPortfolio={addStockToPortfolio}
          deleteStock={deleteStock}
        />
        <div className="stock-view">
          <LineGraph
            data={data}
          />
        </div>
      </div>
    );
  }
}
