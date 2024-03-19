import axios from "axios";
import { CryptoListingType, CryptoDetailType} from "../shared/types/typesCrypto";


const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {'x-cg-demo-api-key': 'CG-5huVw4QYJVBpYxAxg7Fo4GbX'}
});

// Função para buscar a listagem de criptomoedas com parâmetros específicos
export const getCryptosListing = async (): Promise<CryptoListingType[]> => {
  const response = await apiClient.get("/coins/markets", {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: '1h,24h',
      locale: 'pt'
    }
  });
  // Mapeamento dos dados para o tipo definido
  return response.data.map((coin: CryptoListingType) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    current_price: coin.current_price,
    image: coin.image
  }));
};


export const getCryptoDetails = async (id: string): Promise<CryptoDetailType> => {
  const response = await apiClient.get(`/coins/${id}`);
  const coin = response.data;
  const market_data = coin.market_data;
  // Mapeamento dos dados para o tipo definido
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    current_price: market_data.current_price.usd,
    price_change_24h: market_data.price_change_24h_in_currency.usd,
    high_24h: market_data.high_24h.usd,
    low_24h: market_data.low_24h.usd,
    total_volume: market_data.total_volume.usd,
    image: coin.image
  };
};