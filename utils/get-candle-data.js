const axios = require("axios");

async function getCandleData({
  pair,
  startTime,
  endTime,
  interval,
  limit = 1000,
  order = 'ASC'
}) {
  const { data } = await axios.get(
    "https://public.coindcx.com/market_data/candles",
    {
      params: {
        pair,
        interval,
        startTime,
        endTime,
        limit
      }
    }
  );
  return {
    [pair]: order === 'ASC' ? data.reverse() : data
  };
}

module.exports = {
  getCandleData
};
