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
      price_change_percentage: '24h',
      locale: 'pt'
    }
  });
  console.log(response.data);
  // Mapeamento dos dados para o tipo definido
  return response.data.map((coin: CryptoListingType) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    current_price: coin.current_price,
    image: coin.image
  }));
};

//Função para buscar Crypto moeda por ID
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
    image: coin.image,
   

  };
};


export const fetchChartData = async (coinId: string) => {
  try {
    const { data } = await apiClient.get(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1',
      }
    });
    // Transforme e retorne os dados conforme necessário...
    const chartData = {
      labels: data.prices.map((price: [number, number]) => new Date(price[0]).toLocaleDateString()),
      datasets: [{
        label: 'Preço USD',
        data: data.prices.map((price: [number, number]) => price[1]),
        fill: false,
        borderColor: '#4facfe',
        tension: 0.1,
      }],
      
    };

    return chartData;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Isso vai logar o status do erro e a mensagem se disponível
      console.error(`Erro ao buscar dados do gráfico: ${error.response.status} ${error.response.data.message}`);
    } else {
      console.error("Erro ao buscar dados do gráfico:", error);
    }
    
    throw error; // ou handle o erro conforme necessário
  }
};
