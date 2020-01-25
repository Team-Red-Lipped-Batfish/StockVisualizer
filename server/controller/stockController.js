import { response } from "express";

// Import some models Eventually
// const db = require('../models/index.js');

const stockController = {

  fetchStockData(req, res, next) {
    console.log('fetchStockData Fired... req.body: ', req.body);

    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.stockName}&datatype=json&outputsize=full&apikey=Y6A15R1X3FBQ97V4`)
      .then((responseData) => JSON.parse(responseData))
      .then((response) => {
        res.locals = response;
        return next();
      })
      .catch((error) => {
        return next({
          log: `stockController.fetchStockData: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.fetchStockData. Check server logs for more details.' },
        });
      });
  },

};

module.export = stockController;
