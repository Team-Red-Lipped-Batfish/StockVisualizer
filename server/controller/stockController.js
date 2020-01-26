import { response } from 'express';

// Import some models Eventually
const db = require('../model/index.js');
const fetch = require('node-fetch');
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

  const workingArray = [];

  for (let i = 0; i < data.length; i += 1) {
    const currentDate = convertDateToSeconds(data[i][0]);

    if (currentDate < startDateSeconds) i = data.length - 1;

    if (currentDate >= startDateSeconds && currentDate <= endDateSeconds) {
      const buildObject = {};

      buildObject.date = data[i][0];
      buildObject.open = data[i][1]['1. open'];
      buildObject.high = data[i][1]['2. high'];
      buildObject.low = data[i][1]['3. low'];
      buildObject.close = data[i][1]['4. close'];
      buildObject.volume = data[i][1]['5. volume'];

      workingArray.push(buildObject);
    }
  }

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
    const sqlQuery = `SELECT people.*, species.name AS species, planets.name AS homeworld
    FROM people JOIN species ON species._id = people.species_id
    JOIN planets ON planets._id = people.homeworld_id`;

    db.query(sqlQuery)
      .then((data) => {
        res.locals = data;
        return next();
      })
      .catch((error) => {
        return next({
          log: `stockController.getPortfolio: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.getPortfolio. Check server logs for more details.' },
        });
      });
  },

  addStockToPortfolio(req, res, next) {
  // write code here
  const {name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld_id} = req.body;
  const sqlQueryObj = { 
    text: `
      INSERT INTO people (name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: [name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld_id],
  };
  db.query(sqlQueryObj)
    .then((response) => next())
    .catch((error) => {
      return next({
          log: `stockController.addStockToPortfolio: ERROR: ${error}`,
          message: { err: 'Error occurred in stockController.addStockToPortfolio. Check server logs for more details.' },
        });
    });
}

  deleteStockfromPortfolio(req, res, next) {

  },
};

module.export = stockController;
