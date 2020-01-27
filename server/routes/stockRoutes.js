const express = require('express');

const stockController = require('../controller/stockController');

const router = express.Router();

router.get('/getStocks/', stockController.fetchStockData, (req, res) => res.status(200).json([res.locals]));

module.exports = router;
