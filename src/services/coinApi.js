const BASE_URL = "https://api.coingecko.com/api/v3/";
const API_KEY = "CG-JcM7P2t3a2XbA2gkgYzxEab5";

const CoinsApi = (page) => {
  return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};
export default CoinsApi;
