const USDT_MARKETS = [
  'B-ETH_USDT'
]

const INR_MARKETS = [
  "I-XRP_INR",
  "I-TRX_INR",
  "I-XLM_INR",
  // "I-ATOM_INR",
  "I-BTC_INR",
  "I-BNB_INR",
  // "I-DGTX_INR",
  "I-ONE_INR",
  "I-ETH_INR",
  "I-CHZ_INR",
  // "I-CKB_INR",
  // "I-MKR_INR",
  "I-MATIC_INR",
  // "I-USDT_INR",
  // "I-SXP_INR",
  // "I-YFI_INR",
  // "I-CRO_INR",
  // "I-ETN_INR",
  "I-VET_INR",
  "I-ENJ_INR",
  "I-DOT_INR",
  // "I-OXT_INR",
  // "I-BCH_INR",
  "I-DOGE_INR",
  // "I-EOS_INR",
  "I-THETA_INR",
  "I-LINK_INR",
  "I-UNI_INR",
  // "I-USDC_INR",
  "I-LTC_INR",
  // "I-BAT_INR",
  // "I-STPT_INR",
  "I-ADA_INR",
  // "I-CHR_INR"
];

const TARGET_MARKETS = [...INR_MARKETS, ...USDT_MARKETS]

module.exports = {
  TARGET_MARKETS
};
