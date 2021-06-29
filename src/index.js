const express = require("express");
const { getMarkets } = require("../utils/get-markets");
const { strategyTester } = require("../controllers/strategy-tester");
const app = express();
const port = process.env.PORT || 80;

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
