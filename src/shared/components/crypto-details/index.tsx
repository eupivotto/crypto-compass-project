import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CryptoDetailType } from "../../types/typesCrypto";
import { getCryptoDetails } from "../../../services/cryptoApy";
import { Header } from "../header";


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
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4 flex-row">
                <h2 className="text-white text-2xl font-bold mb-4">{id}</h2>
                <img src={details.image.large} alt="Imagem da Moeda" className="w-40 h-40" />
                <span className="text-base py-0.5 px-2.5 ml-2 bg-slate-700 text-sky-500 rounded">{details.symbol}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sky-500">Preço Atual:</p>
                        <p className="text-white text-2xl font-bold">${details.current_price}</p>
                    </div>
                    
                    
                    
                    <div>
                        <p className="text-sky-500">Variação nas últimas 24h:</p>
                        <p className="text-white text-2xl font-bold">${details.price_change_24h}</p>
                    </div>
                    <div>
                        <p className="text-sky-500">Alta nas últimas 24h:</p>
                        <p className="text-white text-2xl font-bold">${details.high_24h}</p>
                    </div>
                    <div>
                        <p className="text-sky-500">Baixa nas últimas 24h:</p>
                        <p className="text-white text-2xl font-bold">${details.low_24h}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sky-500">Volume nas últimas 24h:</p>
                        <p className="text-white text-2xl font-bold">${details.total_volume}</p>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
    
};