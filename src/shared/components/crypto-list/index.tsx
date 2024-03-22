import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptos } from "../../redux/cryptoSlice";

import { RootState, AppDispatch } from "../../redux/store";

import { HigthLowIndicator } from "../higth-low-indicator";

import { Link } from "react-router-dom";



export const CryptoList = () => {
  // const [cryptos, setCryptos] = useState<CryptoListingType[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // Acessa o estado das criptomoedas e o status da requisição do Redux store
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);
  const status = useSelector((state: RootState) => state.crypto.status);
  const error = useSelector((state: RootState) => state.crypto.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCryptos());
    }
  }, [status, dispatch]);

 // Lógica de renderização baseada no status da requisição
 if (status === 'loading') {
  return <div>Loading...</div>;
} else if (status === 'failed') {
  return <div>Error: {error}</div>;
}


  return (
    <>
      <div className="container mx-auto">
        <h1 className=" text-white text-2xl font-bold mt-6 mb-8 ms-10">Top 10 Cryptos</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center items-center pb-12">
          {cryptos.map((crypto, index) => (
            <Link to={`crypto/${crypto.id}`}
              key={index}
              className="no-underline"
            >
              <div className="p-4 border-none rounded-lg shadow-lg bg-gray-800 text-white w-52">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-10 h-10"
                  />
                  <div>
                    <h2 className="text-xl font-bold">
                      {crypto.name}
                    </h2>
                    <p className="text-sky-500">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                
              </div>
              <div className="mt-2">
                <p className="text-1xl font-semibold">${crypto.current_price}</p>{" "}
               
              </div>
            
                <div>
                 <p className="text-gray-500 text-xs">Alteração de preço 24h</p> 
                <HigthLowIndicator changePercentage={crypto.market_cap_change_percentage_24h} />
                </div>
                
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
