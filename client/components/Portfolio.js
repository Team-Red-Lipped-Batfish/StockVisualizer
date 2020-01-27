/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';


export default class Portfolio extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      portfolioList, handleSubmit, addStockToPortfolio, handleChange, newStock, deleteStock,
    } = this.props;
    const jsxList = portfolioList.map((ticker) => (
      <div>
        <button ticker={ticker} type="submit" onClick={handleSubmit}>
          {ticker}
        </button>
        <button ticker={ticker} type="submit" onClick={deleteStock}> Delete</button>
      </div>
    ));
    return (
      <div>
        <div className="addStock">
          <input field="newStock" type="text" placeholder="Add stock" value={newStock} onChange={handleChange} />
        </div>
        <button type="submit" onClick={addStockToPortfolio}>Add stock</button>
        <div className="grid-container">
          <h3>Portfolio</h3>
          {jsxList}
        </div>
      </div>

    );
  }
}
