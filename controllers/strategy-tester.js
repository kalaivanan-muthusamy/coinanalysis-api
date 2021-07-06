const { TARGET_MARKETS } = require("../configs");
const { getCandleData } = require("../utils/get-candle-data");
const { candleFlowStrategy } = require("../strategies/candle-flow");
const moment = require("moment");

async function strategyTester(req) {
  let startTime = moment()
    .add(-(req.query?.duration || 180), "d")
    .startOf("day")
    .valueOf();
  let endTime = moment().endOf("day").valueOf();
  if (req.query?.startDate) {
    startTime = moment(req.query.startDate, "DD-MM-YYYY")
      .startOf("day")
      .valueOf();
  }
  if (req.query?.endTime) {
    endTime = moment(req.query.endTime, "DD-MM-YYYY").endOf("day").valueOf();
  }

  let coinsToTest = TARGET_MARKETS;
  if (req.query?.coins) {
    const coins = req.query?.coins?.split(",");
    coinsToTest = coinsToTest.filter(a => coins.includes(a));
  }

  let allCandleData = coinsToTest.map(async (market) => {
    const candleData = getCandleData({
      pair: market,
      interval: req.query?.interval || "1d",
      startTime,
      endTime
    });
    return candleData;
  });
  allCandleData = await Promise.all(allCandleData);

  // Modify data
  allCandleData = allCandleData.reduce((acc, cur) => {
    const key = Object.keys(cur)[0];
    const value = Object.values(cur)[0];
    acc[key] = value;
    return acc;
  }, {});

  const allResults = {};
  Object.keys(allCandleData).map((market) => {
    const results = candleFlowStrategy({
      candleData: allCandleData[market],
      buyTarget: req.query.buyTarget || 3,
      amountToInvest: req.query?.amountToInvest ? parseFloat(req.query?.amountToInvest) : 10000
    });
    allResults[market] = results;
  });

  const profitMaretCount = Object.values(allResults).filter(
    (value) => value?.profit > 0
  ).length;
  const lossMarketCount = Object.values(allResults).filter(
    (value) => value?.profit < 0
  ).length;
  const totalInvestment = Object.values(allResults).reduce(
    (acc, cur) => acc + cur.investedAmount,
    0
  );
  const newBalance = Object.values(allResults).reduce(
    (acc, cur) => acc + cur.newBalance,
    0
  );
  const totalProfit = newBalance - totalInvestment;
  const totalProfitPercentage =
    ((newBalance - totalInvestment) * 100 / totalInvestment);
  const totalTransactions = Object.values(allResults).reduce((acc, cur) => acc + cur.totalTransactions, 0)
  const profitTransactions = Object.values(allResults).reduce((acc, cur) => acc + cur.profitTransactions, 0)
  const lossTransactions = Object.values(allResults).reduce((acc, cur) => acc + cur.lossTransactions, 0)
  const totalTransactionFees = Object.values(allResults).reduce((acc, cur) => acc + cur.totalTransactionsFees, 0)

  return {
    startTime: moment(startTime).format(),
    endTime: moment(endTime).format(),
    totalMarketCount: TARGET_MARKETS.length,
    profitMaretCount,
    lossMarketCount,
    totalInvestment,
    newBalance,
    totalProfit,
    totalProfitPercentage,
    totalTransactions,
    profitTransactions,
    lossTransactions,
    totalTransactionFees,
    allResults
  };
}

module.exports = {
  strategyTester
};
