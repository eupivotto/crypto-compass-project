// Para a listagem de criptomoedas
export interface CryptoListingType {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
}

// Para os detalhes de uma criptomoeda específica
export interface CryptoDetailType {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  high_24h: number;
  low_24h: number;
  total_volume: number;
  image: {

    thumb: string;

    small: string;

    large: string;

  };
  
}


export interface CryptoChart {
  
  data: {

    prices: number[][];

    market_caps: number[][];

    total_volumes: number[][];

  };
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
}