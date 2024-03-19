// Para a listagem de criptomoedas
export interface CryptoListingType {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
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
