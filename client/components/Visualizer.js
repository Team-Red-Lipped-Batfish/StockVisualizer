/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';


export default class Visualizer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //  console.log('props:', this.props)
    const { app } = this.props;
    const {
      handleSubmit,
      handleChange,
      start,
      end,
      searchValue,
    } = app;
    return (
      <div className="SearchBar">
        <h3>Portfolio</h3>
        <form
          className="grid-container"
        >
          <input
            field="start"
            type="text"
            placeholder="start ('YYYY-MM-DD')"
            value={start}
            onChange={handleChange}
          />
          <input
            field="end"
            type="text"
            placeholder="end ('YYYY-MM-DD')"
            value={end}
            onChange={handleChange}
          />
          <input
            field="searchValue"
            type="text"
            placeholder="ticker"
            value={searchValue}
            onChange={handleChange}
          />
          <br />
          <button type="submit" onClick={handleSubmit}>Search</button>
        </form>
      </div>
    );
  }
}
