import { response } from "express";

// Import some models Eventually
// const db = require('../models/index.js');

// Helper Functions

const convertDateToSeconds = (inputString) => {
  const date = new Date(inputString);
  return date.getTime() / 1000;
}

const buildDateRange = (inputData, startDate, endDate) => {
  if (!Array.isArray(inputData)) return 'Please provide an array as the inputData';
  if (typeof startDate !== 'string' || typeof endDate !== 'string') return 'Please provide strings for Dates';

  const startDateSeconds = convertDateToSeconds(startDate);
  const endDateSeconds = convertDateToSeconds(endDate);

  const workingArray = [];

  inputData.forEach((data) => {
    const currentDate = convertDateToSeconds(data[0]);

    if (currentDate >= startDateSeconds && currentDate <= endDateSeconds) {
      const buildObject = {};
      buildObject.date = data[0];
      buildObject.open = data[1]['1. open'];
      buildObject.high = data[1]['2. high'];
      buildObject.low = data[1]['3. low'];
      buildObject.close = data[1]['4. close'];
      buildObject.volume = data[1]['5. volume'];

      workingArray.push(buildObject);
    }
  });

  return workingArray;
};


const stockController = {

  fetchStockData(req, res, next) {
    console.log('fetchStockData Fired... req.body: ', req.body);

    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.stockName}&datatype=json&outputsize=full&apikey=Y6A15R1X3FBQ97V4`)
      .then((responseData) => JSON.parse(responseData))
      .then((responseData) => {
        res.locals = buildDateRange(responseData, req.params.startDate, req.params.endDate);
        return next();
      })
      .catch((error) => {
        return next({
          log: `stockController.fetchStockData: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.fetchStockData. Check server logs for more details.' },
        });
      });
  },

  getPortfolio(req, res, next) {

  },

  addStocktoPortfolio(req, res, next) {

  },

  deleteStockfromPortfolio(req, res, next) {

  },
};

module.export = stockController;
