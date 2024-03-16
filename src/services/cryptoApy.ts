import axios from "axios";
import { CryptoTypes } from "../shared/types/typesCrypto";

const apiKey = '737c1a281d7fc9c276958efb6b92f067b870f7fd512fd693a7d816b6f156fa90';

//Função para buscar os ddados da API e listar as 10 Cryptos por capitalização do mercado
export const getCryptos = async (tsym: string): Promise<CryptoTypes[]> => {
    try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull', {
          params: {
            limit: 10,
            api_key: apiKey,
            tsym: tsym
          }
        });
    
        console.log(response.data.Data);
        return response.data.Data;
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
        return[];
      }
};