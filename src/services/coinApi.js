const BASE_URL = "tps://api.coingecko.com/api/v3/";
const API_KEY = "CG-JcM7P2t3a2XbA2gkgYzxEab5	";

const CoinsApi = () => {
  return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key=${API_KEY}`;
};
export default CoinsApi;
