'use client';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props { data?: Record<string, number>; }

export default function CategoryHistogram({ data }: Props) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-gray-400">No category data available.</div>;
  }

  const entries = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const labels = entries.map(e => e.name);
  const values = entries.map(e => e.value);
  const backgroundColors = ['#23B263', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF'];
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Probability',
        data: values,
        backgroundColor: backgroundColors,
      },
    ],
  };
  const options: import('chart.js').ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        color: '#93C5FD',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => `${(value * 100).toFixed(1)}%`,
        font: { weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            const val = context.parsed.y;
            return `Probability: ${(val * 100).toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#93C5FD' }, grid: { display: false } },
      y: {
        ticks: {
          color: '#93C5FD',
          callback: (value: string | number) => {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            return `${(numericValue * 100).toFixed(0)}%`;
          }
        }, grid: { color: '#2d2d2d' }
      },
    },

  };
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 w-full max-h-max">
      <Bar data={chartData} options={options} />
    </div>
  );
}
