require('dotenv').config();
const express = require("express");
const cors = require('cors')
const { getMarkets } = require("../utils/get-markets");
const { strategyTester } = require("../controllers/strategy-tester");
const { candleStrategyAnalysis } = require('../controllers/candle-strategy-analysis');
const app = express();
const port = process.env.PORT || 80;

app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/markets", async (req, res) => {
  const allMarkets = await getMarkets();
  res.json(allMarkets);
});

app.get("/strategy-tester", async (req, res) => {
  const response = await strategyTester(req);
  res.json(response);
});

app.get("/candle-strategy-analysis", async (req, res) => {
  const response = await candleStrategyAnalysis(req);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
