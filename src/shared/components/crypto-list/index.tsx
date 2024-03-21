import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCryptos } from "../../redux/cryptoSlice";

import { RootState, AppDispatch } from "../../redux/store";

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
              <div className="mt-4">
                <p className="text-1xl font-semibold">${crypto.current_price}</p>{" "}
                {/* Substitua com o preço real da API */}
                <p className="text-sm text-gray-400">{crypto.price_change_percentage_24h !== null && crypto.price_change_percentage_24h !== undefined ? `${crypto.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}</p>{" "}
                {/* Substitua com a porcentagem real da API */}
              </div>
              {/* Placeholder para a linha do gráfico */}
              <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2" style={{ width: "50%" }}></div>{" "}
                {/* Substitua '50%' pela porcentagem real da API */}
               </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
