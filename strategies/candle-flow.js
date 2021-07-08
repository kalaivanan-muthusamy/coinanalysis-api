const moment = require("moment");

function candleFlowStrategy({
  candleData,
  amountToInvest = 10000,
  buyTarget = 3
}) {
  let accountBalance = amountToInvest;
  let redCandleCount = 0;
  let orderDetails = [];
  candleData.map((ohlc, index) => {
    const openOrders = orderDetails.filter(a => a.status === 'OPEN');
    const candleType = ohlc.close < ohlc.open ? 'RED' : 'GREEN';

    if (candleType === 'RED') {
      ++redCandleCount;
    } else {
      redCandleCount = 0;
    }

    if (candleType === "RED" && openOrders.length === 0) {
      if (redCandleCount >= buyTarget) {
        // Buy
        const amountToBuy = accountBalance;
        const transactionFee = amountToBuy * 0.001;
        const actualAmountInvested = amountToBuy - transactionFee;
        const buyOrder = {
          buyAmount: ohlc.close,
          buyTime: moment(ohlc.time).format(),
          buyCandle: ohlc,
          investedAmount: amountToBuy,
          buyTransactionFee: transactionFee,
          buyQuantity: actualAmountInvested / ohlc.close,
          status: "OPEN"
        }
        accountBalance = 0;
        orderDetails.push(buyOrder);
      }
    }
    else if (candleType === 'GREEN' && openOrders.length > 0) {
      const targetSellOrderIndex = orderDetails.findIndex(a => a.status === 'OPEN');
      if (targetSellOrderIndex === -1) return;
      let targetSellOrder = orderDetails[targetSellOrderIndex];
      const newBalance = targetSellOrder.buyQuantity * ohlc.close;
      const transactionFee = 0.001 * newBalance;
      const actualNewBalance = newBalance - transactionFee;
      const profit = actualNewBalance - targetSellOrder.investedAmount;
      targetSellOrder = {
        ...targetSellOrder,
        status: 'COMPLETED',
        sellAmount: ohlc.close,
        sellTransactionFee: transactionFee,
        sellTime: moment(ohlc.time).format(),
        sellCandle: ohlc,
        newAccountBalance: actualNewBalance,
        profit: profit,
        profitPercentage: (profit * 100) / targetSellOrder.investedAmount
      }
      orderDetails[targetSellOrderIndex] = targetSellOrder
      accountBalance = actualNewBalance;
    }
  });

  // Cancel the pending order
  const pendingOrderIndex = orderDetails.findIndex(a => a.status === 'OPEN');
  if (pendingOrderIndex !== -1) {
    accountBalance = accountBalance + orderDetails[pendingOrderIndex].investedAmount;
  }

  const completedOrders = orderDetails.filter(a => a.status === 'COMPLETED');
  const totalTransactions = completedOrders.length;
  const profitTransactions = completedOrders.filter(a => a.profit > 0);
  const lossTransactions = completedOrders.filter(a => a.profit < 0);
  const maxProfitPercentage = Math.max(...profitTransactions.map(a => a.profitPercentage));
  const maxLossPercentage = Math.min(...lossTransactions.map(a => a.profitPercentage));
  const totalTransactionsFees = completedOrders.reduce((acc, cur) => acc + (cur.buyTransactionFee + cur.sellTransactionFee), 0)

  return {
    investedAmount: amountToInvest,
    newBalance: accountBalance,
    profit: accountBalance - amountToInvest,
    profitPercentage: ((accountBalance - amountToInvest) * 100) / amountToInvest,
    totalTransactions,
    profitTransactions: profitTransactions.length,
    lossTransactions: lossTransactions.length,
    maxProfitPercentage,
    maxLossPercentage,
    totalTransactionsFees,
    completedOrders
  };
}

module.exports = {
  candleFlowStrategy
};
