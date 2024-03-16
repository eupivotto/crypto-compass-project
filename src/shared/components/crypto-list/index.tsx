import { useState, useEffect } from 'react';
import { getCryptos } from '../../../services/cryptoApy';
import { CryptoTypes } from '../../types/typesCrypto';

export const CryptoList = () => {
    const [cryptos, setCryptos] = useState<CryptoTypes[]>([]);

    useEffect(() => {
        const fetchCryptos = async () => {
          try {
            const data = await getCryptos('USD');
            console.log(data);
            setCryptos(data); 
          } catch (error) {
            console.error('Erro ao buscar as criptomoedas:', error);
          }
        }
        fetchCryptos();
     }, []);

 return (
    <>
    <div className="container mx-auto">
            <h1 className="text-2xl font-bold mt-4 mb-8">Top 10 Cryptos</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cryptos.map((crypto, index) => (
                    <div key={index} className="p-4 border rounded shadow">
                        <img src={`https://www.cryptocompare.com${crypto.CoinInfo.ImageUrl}`} alt={crypto.CoinInfo.FullName} className="w-10 h-10 mx-auto mb-2" />
                        <h2 className="text-lg font-bold">{crypto.CoinInfo.FullName}</h2>
                        <p className="text-gray-600">ID: {crypto.CoinInfo.Id}</p>
                        {/* Adicione mais informações conforme necessário */}
                    </div>
                ))}
            </div>
        </div>
    </>
 )

}
