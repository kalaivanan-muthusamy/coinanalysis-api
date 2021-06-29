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
  if (req.query?.toDate) {
    endTime = moment(req.query.toDate, "DD-MM-YYYY").endOf("day").valueOf();
  }

  let allCandleData = TARGET_MARKETS.map(async (market) => {
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
      buyTarget: req.query.buyTarget || 3
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
    ((newBalance - totalInvestment) / newBalance) * 100;

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
    allResults
  };
}

module.exports = {
  strategyTester
};