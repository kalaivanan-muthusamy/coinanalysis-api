const USDT_MARKETS = [
  "B-XRP_USDT",
  "B-TRX_USDT",
  "B-XLM_USDT",
  "B-BTC_USDT",
  "B-BNB_USDT",
  "B-ONE_USDT",
  "B-ETH_USDT",
  "B-CHZ_USDT",
  "B-MATIC_USDT",
  "B-VET_USDT",
  "B-ENJ_USDT",
  "B-DOT_USDT",
  "B-DOGE_USDT",
  "B-THETA_USDT",
  "B-LINK_USDT",
  "B-UNI_USDT",
  "B-LTC_USDT",
  "B-ADA_USDT",
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

const TARGET_MARKETS = [
  ...INR_MARKETS,
  ...USDT_MARKETS
]

module.exports = {
  TARGET_MARKETS
};
