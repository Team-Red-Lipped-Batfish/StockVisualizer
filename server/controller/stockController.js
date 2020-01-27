// import { response } from 'express';

const fetch = require('node-fetch');
const db = require('../model/index.js');

const models = require('../model/index');

// Helper Functions
const convertDateToSeconds = (inputString) => {
  const date = new Date(inputString);
  return date.getTime() / 1000;
};

const buildDateRange = (inputData, startDate, endDate) => {
  if (typeof inputData !== 'object') return 'Please provide an Object as the inputData';
  if (typeof startDate !== 'string' || typeof endDate !== 'string') return 'Please provide strings for Dates';

  const data = Object.entries(inputData['Time Series (Daily)']);
  const startDateSeconds = convertDateToSeconds(startDate);
  const endDateSeconds = convertDateToSeconds(endDate);

  const workingObj = {};
  const dates = [];
  const open = [];
  const high = [];
  const low = [];
  const close = [];
  const volume = [];

  for (let i = data.length - 1; i >= 0; i -= 1) {
    const currentDate = convertDateToSeconds(data[i][0]);

    // if (currentDate > endDateSeconds) i = 1;

    if (currentDate >= startDateSeconds && currentDate <= endDateSeconds) {
      dates.push(data[i][0]);
      open.push(data[i][1]['1. open']);
      high.push(data[i][1]['2. high']);
      low.push(data[i][1]['3. low']);
      close.push(data[i][1]['4. close']);
      volume.push(data[i][1]['5. volume']);
    }
  }

  workingObj.dates = dates;
  workingObj.open = open;
  workingObj.high = high;
  workingObj.low = low;
  workingObj.close = close;
  workingObj.volume = volume;

  return workingObj;
};

const stockController = {

  fetchStockData(req, res, next) {
    console.log('request query', req.query);
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.query.ticker}&outputsize=full&apikey=Y6A15R1X3FBQ97V4`)
      .then((responseData) => responseData.json())
      .then((responseData) => {
        res.locals = buildDateRange(responseData, req.query.start, req.query.end);
        return next();
      })
      .catch((error) => {
        console.log(error);
        return next({
          log: `stockController.fetchStockData: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.fetchStockData. Check server logs for more details.' },
        });
      });
  },

  getLoginPortfolio(req, res, next) {
    console.log('req.user', req.user);

    const sqlQuery = `
    SELECT tickers
    FROM StockTable
    WHERE google_id = '${req.user.rows[0].google_id}'`;

    db.query(sqlQuery)
      .then((data) => {
        const dataObject = {};
        dataObject.google_id = req.user.rows[0].google_id;
        dataObject.data = data.rows.map((el) => el.tickers);

        res.locals = dataObject;
        return next();
      })
      .catch((error) => {
        console.log(error);
        return next({
          log: `stockController.getPortfolio: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.getPortfolio. Check server logs for more details.' },
        });
      });
  },

  getPortfolio(req, res, next) {
    console.log('req.user', req.user);

    const { google_id } = req.query;

    const sqlQuery = `
    SELECT tickers
    FROM StockTable
    WHERE google_id = '${google_id}'`;

    db.query(sqlQuery)
      .then((data) => {
        const dataObject = {};
        dataObject.google_id = google_id;
        dataObject.data = data.rows.map((el) => el.tickers);

        res.locals = dataObject;
        return next();
      })
      .catch((error) => {
        console.log(error);
        return next({
          log: `stockController.getPortfolio: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.getPortfolio. Check server logs for more details.' },
        });
      });
  },

  addStockToPortfolio(req, res, next) {
    console.log('request query addStockToPortfolio', req.query);

    const { ticker, google_id } = req.query;
    const sqlQueryObj = {
      text: `INSERT INTO StockTable (tickers, google_id)
      VALUES ($1, $2)`,
      values: [ticker, google_id],
    };

    db.query(sqlQueryObj)
      .then((response) => next())
      .catch((error) => next({
        log: `stockController.addStockToPortfolio: ERROR: ${error}`,
        message: { err: 'Error occurred in stockController.addStockToPortfolio. Check server logs for more details.' },
      }));
  },

  deleteStockFromPortfolio(req, res, next) {
    console.log('request query deleteStockFromPortfolio', req.query);

    const { ticker, google_id } = req.query;
    const sqlQueryStr = `DELETE FROM StockTable WHERE tickers = '${ticker}' AND google_id = '${google_id}';`;

    db.query(sqlQueryStr)
      .then((response) => next())
      .catch((error) => next({
        log: `stockController.deleteStockFromPortfolio: ERROR: ${error}`,
        message: { err: 'Error occurred in stockController.deleteStockFromPortfolio. Check server logs for more details.' },
      }));
  },
};

module.exports = stockController;
