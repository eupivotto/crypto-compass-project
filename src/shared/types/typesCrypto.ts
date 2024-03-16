
 export interface CryptoTypes {
    CoinInfo: {
      Id: string;
      Name: string;
      FullName: string;
      Algorithm: string;
      ImageUrl: string;
    
    };
    RAW: {
      USD: {
        PRICE: number;
        VOLUME24HOUR: number;
    
      };
    
    };
    DISPLAY: {
      USD: {
        PRICE: string;
        VOLUME24HOUR: string;
    
      };
    
    };

  }
  
  export interface ApiResponse {
    Data: CryptoTypes[];
  }
  