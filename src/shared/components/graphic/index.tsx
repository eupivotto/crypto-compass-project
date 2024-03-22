// Chart.js
import  { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchChartData } from '../../../services/cryptoApy'; // Ajuste o caminho conforme necessário

interface ChartProps {
    coinId: string;
  }

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart: React.FC<ChartProps> = ({ coinId }) => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets:[
      {
        label: '',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chartOptions, setChartOptions] = useState({});

  

  useEffect(() => {
    const isMobile = window.innerWidth < 768; 
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchChartData(coinId);
        if (data && data.datasets) {
            setChartData(data);
        } else {
            throw new Error('Dados do gráfico malformados ou indefinidos')
        }
        
      } catch (error) {
        setError('Falha ao buscar dados do gráfico.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const options = {
      maintainAspectRatio: !isMobile, // Isso precisa ser true para o aspectRatio ter efeito
      aspectRatio: isMobile ? 1 : 1.3, // Valor padrão, ajuste conforme necessário para mudar a altura
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const, // Posiciona a legenda no topo do gráfico
        },
        title: {
          display: true,
          text: 'Preço da Criptomoeda ao Longo do Tempo', // Título do gráfico
        },
      },
      scales: {
        
        y: {
          beginAtZero: false,
          type: 'linear' as const,
         
        }
      },
      
    };

    loadData();
    setChartOptions(options);
  }, [coinId]);

  if (loading) return <p className='text-gray-400'>Carregando gráfico...</p>;
  if (error) return <p>{error}</p>;




  
  return <Line data={chartData} options={chartOptions}  />;
};

export default Chart;
