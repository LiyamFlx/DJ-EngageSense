import React from 'react';
import { Download, Share2 } from 'lucide-react';

export const ReportHeader: React.FC = () => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-semibold text-white">Session Report</h2>
    <div className="flex space-x-3">
      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Download className="h-5 w-5 text-white" />
      </button>
      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Share2 className="h-5 w-5 text-white" />
      </button>
    </div>
  </div>
);