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

  

  useEffect(() => {
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

    loadData();
  }, [coinId]);

  if (loading) return <p>Carregando gráfico...</p>;
  if (error) return <p>{error}</p>;




  // Opções de personalização do gráfico
  const options = {
    maintainAspectRatio: true, // Isso precisa ser true para o aspectRatio ter efeito
    aspectRatio: 1.3, // Valor padrão, ajuste conforme necessário para mudar a altura
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
    // Mais opções de personalização aqui
  };

  return <Line data={chartData} options={options}  />;
};

export default Chart;
