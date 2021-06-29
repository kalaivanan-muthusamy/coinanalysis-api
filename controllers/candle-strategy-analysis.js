const moment = require('moment');
const { TARGET_MARKETS } = require("../configs");
const { getObjectKeysMaxNum } = require('../utils');
const { getCandleData } = require('../utils/get-candle-data');

async function candleStrategyAnalysis(req) {
    // Get all coins OHLC data
    console.time('candleStrategyAnalysis');
    let startTime = moment()
        .add(-(req.query?.duration || 180), "d")
        .startOf("day")
        .valueOf();
    let endTime = moment().endOf("day").valueOf();
    if (req.query?.startTime) {
        startTime = moment(req.query.startTime, "YYYY-MM-DD")
            .startOf("day")
            .valueOf();
    }
    if (req.query?.endTime) {
        endTime = moment(req.query.endTime, "YYYY-MM-DD").endOf("day").valueOf();
    }
    const interval = req.query?.interval || '1d';
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
    allCandleData = allCandleData.reduce((acc, cur) => {
        const key = Object.keys(cur)[0];
        const value = Object.values(cur)[0];
        acc[key] = value;
        return acc;
    }, {});

    const candleData = {};
    Object.keys(allCandleData).map(market => {
        let lastCandleType;
        let candleCounts = 0;
        const candleCombinations = {
            GREEN: {},
            RED: {},
        };
        const allOHLC = allCandleData[market];
        allOHLC.map((ohlc) => {
            const open = ohlc.open;
            const close = ohlc.close;
            const isRed = close < open;
            const candleType = isRed ? "RED" : "GREEN";
            if (!lastCandleType) lastCandleType = candleType
            if (candleType === lastCandleType) {
                ++candleCounts;
            } else {
                if (candleCombinations[lastCandleType][candleCounts]) {
                    candleCombinations[lastCandleType][candleCounts] += 1;
                } else {
                    candleCombinations[lastCandleType][candleCounts] = 1;
                }
                lastCandleType = candleType;
                candleCounts = 1;
            }
        })
        candleData[market] = {
            maxRed: getObjectKeysMaxNum(candleCombinations.RED),
            maxGreen: getObjectKeysMaxNum(candleCombinations.GREEN),
            ...candleCombinations
        }
    })
    console.timeEnd('candleStrategyAnalysis');
    return {
        inputDetails: {
            startTime: moment(startTime).format(),
            endTime: moment(endTime).format(),
            interval
        },
        candleData
    }
}

module.exports = {
    candleStrategyAnalysis
}