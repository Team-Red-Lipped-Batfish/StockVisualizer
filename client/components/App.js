/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Login from './Login';
import Visualizer from './Visualizer';
import LineGraph from './LineGraph';
// eslint-disable-next-line no-unused-vars
import styles from '../styles.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: true,
      searchValue: '',
      start: '',
      end: '',
      tickers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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


    const url = `route/?ticker=${searchValue}&start=${start}&end=${end}`;
    // console.log(url);

    // eslint-disable-next-line no-undef
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tickers: data,
        });
      });
  }

  render() {
    const {
      isLoggedin, start, end, tickers, searchValue,
    } = this.state;
    const { handleChange, handleSubmit } = this;

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
        <Visualizer
          app={
           {
             searchValue,
             start,
             end,
             tickers,
             handleChange,
             handleSubmit,
           }
          }
        />
        <LineGraph
          data={tickers}
        />
      </div>
    );
  }
}
