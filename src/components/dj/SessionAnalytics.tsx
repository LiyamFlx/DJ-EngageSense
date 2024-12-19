import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Card } from '../ui/Card';
import type { AudioMetrics } from '../../types/audio';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SessionAnalyticsProps {
  history: AudioMetrics[];
}

export const SessionAnalytics: React.FC<SessionAnalyticsProps> = ({ history }) => {
  const labels = history.map((_, i) => 
    new Date(Date.now() - (history.length - i) * 1000).toLocaleTimeString()
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Physical',
        data: history.map(h => h.physical),
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        tension: 0.4
      },
      {
        label: 'Emotional',
        data: history.map(h => h.emotional),
        borderColor: 'rgb(129, 140, 248)',
        backgroundColor: 'rgba(129, 140, 248, 0.1)',
        tension: 0.4
      },
      {
        label: 'Mental',
        data: history.map(h => h.mental),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4
      },
      {
        label: 'Spiritual',
        data: history.map(h => h.spiritual),
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'system-ui'
          }
        }
      },
      title: {
        display: true,
        text: 'Session Engagement Trends',
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          family: 'system-ui',
          weight: '600'
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'system-ui'
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'system-ui'
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};