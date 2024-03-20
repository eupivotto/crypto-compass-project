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
    datasets:[],
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

  

  return <Line data={chartData} />;
};

export default Chart;
