import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CryptoDetailType } from "../../types/typesCrypto";
import { getCryptoDetails } from "../../../services/cryptoApy";
import {SkewLoader} from 'react-spinners';
import { Header } from "../header";
import CryptoChart from "../graphic";
import { Footer } from "../footer";

import './styles.scss'

// Pagina de detalhes da Moeda


export const CryptoDetails = () => {
    const { id } = useParams<{id: string}>();
    const [details, setDetails] = useState<CryptoDetailType | null>(null);

    useEffect(() => {
        //chamada da api de detalhes especificos da moeda
        const fetchDetails = async () => {
            try {
                const data = await getCryptoDetails(id!);
                setDetails(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes da criptomoeda:', error);
              }
        };

        fetchDetails();	

    }, [id]);

    // se os dados da api de detalhes da moeda especifica estiver correta, o loading e acionado até que o componente esteja montado
    if (!details) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-900">
                 <SkewLoader color="#36afd6" />
               </div>;
    }

   
    return (
        <>
       <div className=" mx-auto p-4 container-main">
                <Header />
               
                <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen ">
                <div className="main-cont flex flex-wrap bg-gray-900  gap-4 rounded-lg shadow-md p-6 mx-auto w-full lg:w-11/12 xl:w-10/12 h-full mt-16 container-crypto-details">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4 flex-wrap">
                            <img src={details.image.large} alt="Imagem da Moeda" className="w-20 h-20" />
                            <h2 className="text-white capitalize text-2xl">{details.name}</h2>
                            <p className="text-sm py-0.5 px-2.5 ml-2 bg-sky-600 text-sky-600 bg-opacity-25 rounded">{details.symbol}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sky-500">Preço Atual: <span className="text-white text-xl font-bold">${details.current_price}</span></p>
                            <p className="text-sky-500">Variação nas últimas 24h: <span className="text-white text-xl font-bold">${details.price_change_24h}</span></p>
                            <p className="text-sky-500">Alta nas últimas 24h: <span className="text-white text-xl font-bold">${details.high_24h}</span></p>
                            <p className="text-sky-500">Baixa nas últimas 24h: <span className="text-white text-xl font-bold">${details.low_24h}</span></p>
                            <p className="text-sky-500">Volume nas últimas 24h: <span className="text-white text-xl font-bold">${details.total_volume}</span></p>
                           
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12">
                        <CryptoChart coinId={id as string} />
                    </div>
                </div>
                </div>
               
            </div>
            <Footer />
        </>
    );
    
};