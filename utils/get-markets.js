const axios = require("axios");

async function getMarkets() {
  const { data } = await axios.get(
    "https://api.coindcx.com/exchange/v1/markets_details"
  );
  return data;
}

module.exports = {
  getMarkets
};
