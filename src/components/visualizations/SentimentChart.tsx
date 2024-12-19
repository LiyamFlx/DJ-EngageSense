import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from '../ui/Card';
import type { AudioData } from '../../types/audio';

interface SentimentChartProps {
  data: AudioData;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      label: 'Sentiment Scores',
      data: [
        data.metrics.emotional,
        (100 - data.metrics.emotional) / 2,
        (100 - data.metrics.emotional) / 2
      ],
      backgroundColor: ['rgba(34, 197, 94, 0.5)', 'rgba(234, 179, 8, 0.5)', 'rgba(239, 68, 68, 0.5)'],
      borderColor: ['rgb(34, 197, 94)', 'rgb(234, 179, 8)', 'rgb(239, 68, 68)'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      title: {
        display: true,
        text: 'Sentiment Analysis',
        color: 'rgba(255, 255, 255, 0.9)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  };

  return (
    <Card className="p-4">
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};