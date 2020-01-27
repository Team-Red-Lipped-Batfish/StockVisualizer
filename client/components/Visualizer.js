import React, { Component } from 'react';


export default class Visualizer extends React.Component {
  render() {
    // let tricker = this.props.tricker.map((tricker) => {


    // ???????????????????????????????????????????????????
    //  console.log('props:', this.props)
    const {
      handleSubmit,
      handleChange,
      start,
      end,
      searchValue,
    } = this.props.app;
    return (
      <div className="SearchBar">
        <form
          onSubmit={handleSubmit}
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
          <button onClick={handleSubmit}>Search</button>
        </form>
      </div>
    );
  }
}
