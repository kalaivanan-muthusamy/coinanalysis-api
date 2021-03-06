const BNB_MARKETS = [
  "B-VEN_BNB",
  "B-BCC_BNB",
  "B-TRIG_BNB",
  "B-RPX_BNB",
  "B-ADA_BNB",
  "B-BCN_BNB",
  "B-XRP_BNB",
  "B-TRX_BNB",
  "B-PAX_BNB",
  "B-RUNE_BNB",
  "B-DOT_BNB",
  "B-SUSHI_BNB",
  "B-UNI_BNB",
  "B-CAKE_BNB",
  "B-ALPHA_BNB",
  "B-AAVE_BNB"
]
const USDT_MARKETS = [
  "B-BTC_USDT",
  "B-ETH_USDT",
  "B-BNB_USDT",
  "B-LTC_USDT",
  "B-ADA_USDT",
  "B-XRP_USDT",
  "B-EOS_USDT",
  "B-ETC_USDT",
  "B-VET_USDT",
  "B-LINK_USDT",
  "B-THETA_USDT",
  "B-MATIC_USDT",
  "B-ATOM_USDT",
  "B-DOGE_USDT",
  "B-SOL_USDT",
  "B-COMP_USDT",
  "B-SNX_USDT",
  "B-SXP_USDT",
  "B-DOT_USDT",
  "B-LUNA_USDT",
  "B-SUSHI_USDT",
  "B-RUNE_USDT",
  "B-UNI_USDT",
  "B-ALPHA_USDT",
  "B-AAVE_USDT",
  "B-FIL_USDT",
  "B-AXS_USDT",
  "B-CAKE_USDT",
  "B-ALICE_USDT",
  "B-ICP_USDT"
]

const INR_MARKETS = [
  "I-XRP_INR",
  "I-TRX_INR",
  "I-XLM_INR",
  "I-ATOM_INR",
  "I-BTC_INR",
  "I-BNB_INR",
  "I-ONE_INR",
  "I-ETH_INR",
  "I-CHZ_INR",
  "I-MATIC_INR",
  "I-VET_INR",
  "I-ENJ_INR",
  "I-DOT_INR",
  "I-DOGE_INR",
  "I-THETA_INR",
  "I-LINK_INR",
  "I-UNI_INR",
  "I-LTC_INR",
  "I-ADA_INR",
];

const TARGET_MARKETS = [
  ...INR_MARKETS,
  ...USDT_MARKETS,
  ...BNB_MARKETS
]

module.exports = {
  TARGET_MARKETS
};
