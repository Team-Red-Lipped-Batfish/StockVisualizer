const express = require('express');

const stockController = require('../controller/stockController');

const router = express.Router();

router.get('/getStocks/', stockController.fetchStockData, (req, res) => res.status(200).json([res.locals]));

router.get('/getPortfolio/', stockController.getPortfolio, (req, res) => res.status(200).json([res.locals]));

router.post('/addStocks/', stockController.addStockToPortfolio, stockController.getPortfolio, (req, res) => res.status(200).json([res.locals]));

// router.delete('/deleteStocks', stockController.deleteStockfromPortfolio, stockController.getPortfolio, (req, res) => res.status(200).json([res.locals]));

module.exports = router;
