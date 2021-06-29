const moment = require("moment");

const testData = [
  {
    open: 100,
    close: 99,
    time: 1624924800000
  },
  {
    open: 99,
    close: 98,
    time: 1624838400000
  },
  {
    open: 98,
    close: 97,
    time: 1624752000000
  },
  {
    open: 97,
    close: 100,
    time: 1624752000000
  }
];

function candleFlowStrategy({
  candleData = testData,
  amountToInvest = 10000,
  buyTarget = 3
}) {
  let accountBalance = amountToInvest;
  let redCandleCount = 0;
  let orderDetails = [];
  candleData.map((ohlc, index) => {
    const open = ohlc.open;
    const close = ohlc.close;
    const isRed = close < open;
    const candleType = isRed ? "RED" : "GREEN";
    if (candleType === "RED") {
      ++redCandleCount;
      if (redCandleCount >= buyTarget) {
        // Buy
        const assetsCount = accountBalance / ohlc.close;

        // Sell
        const sellOHLC = candleData?.[index + 1];
        if (sellOHLC) {
          const profit = assetsCount * sellOHLC.close - accountBalance;
          const updatedBalance = accountBalance + profit;

          const orderData = {
            investedAmount: accountBalance,
            buyPrice: ohlc.close,
            buyTime: moment(ohlc.time).format(),
            sellPrice: sellOHLC.close,
            sellTime: moment(sellOHLC.time).format(),
            profit,
            newBalance: updatedBalance
          };
          orderDetails.push(orderData);
          accountBalance = accountBalance + profit;
        }
      }
    } else {
      redCandleCount = 0;
    }
  });

  return {
    investedAmount: amountToInvest,
    newBalance: accountBalance,
    profit: accountBalance - amountToInvest,
    orderDetails
  };
}

module.exports = {
  candleFlowStrategy
};
