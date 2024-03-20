import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CryptoDetailType } from "../../types/typesCrypto";
import { getCryptoDetails } from "../../../services/cryptoApy";
import { Header } from "../header";
import CryptoChart from "../chart";



export const CryptoDetails = () => {
    const { id } = useParams<{id: string}>();
    const [details, setDetails] = useState<CryptoDetailType | null>(null);

    useEffect(() => {
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

    if (!details) {
        return <p>Carregando detalhes...</p>;
    }

   
    return (
        <>
       <div className="container mx-auto p-4 container-main">
                <Header />
                <div className="flex flex-wrap md:flex-nowrap gap-4 bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={details.image.large} alt="Imagem da Moeda" className="w-20 h-20" />
                            <h2 className="text-white capitalize text-2xl">{details.name}</h2>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sky-500">Preço Atual: <span className="text-white text-xl font-bold">${details.current_price}</span></p>
                            <p className="text-sky-500">Variação nas últimas 24h: <span className="text-white text-xl font-bold">${details.price_change_24h}</span></p>
                            <p className="text-sky-500">Alta nas últimas 24h: <span className="text-white text-xl font-bold">${details.high_24h}</span></p>
                            <p className="text-sky-500">Baixa nas últimas 24h: <span className="text-white text-xl font-bold">${details.low_24h}</span></p>
                            <p className="text-sky-500">Volume nas últimas 24h: <span className="text-white text-xl font-bold">${details.total_volume}</span></p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <CryptoChart coinId={id as string} />
                    </div>
                </div>
            </div>

        </>
    );
    
};