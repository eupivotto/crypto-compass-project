import { useState, useEffect } from "react";
import { getCryptosListing } from "../../../services/cryptoApy";
import { CryptoListingType } from "../../types/typesCrypto";
import { Link } from "react-router-dom";

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export const CryptoList = () => {
  const [cryptos, setCryptos] = useState<CryptoListingType[]>([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getCryptosListing();
        console.log(data);
        setCryptos(data);
        console.log(cryptos);
      } catch (error) {
        console.error("Erro ao buscar as criptomoedas:", error);
      }
    };
    fetchCryptos();
  }, [cryptos]);

  return (
    <>
      <div className="container mx-auto ">
        <h1 className="text-2xl font-bold mt-4 mb-8">Top 10 Cryptos</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center items-center">
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
                <div className="flex items-center">
                  {/* Exemplo de uso dos ícones, substitua 'increase' pela sua lógica */}
                  {Math.random() > 0.5 ? (
                    <ArrowUpIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-1xl font-semibold">{crypto.current_price}</p>{" "}
                {/* Substitua com o preço real da API */}
                <p className="text-sm text-gray-400">+0.25%</p>{" "}
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
