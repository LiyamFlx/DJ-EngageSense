import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodTransitionAlertProps {
  currentMood: string;
  nextMood: string;
  timeToTransition: number;
  confidence: number;
}

export const MoodTransitionAlert: React.FC<MoodTransitionAlertProps> = ({
  currentMood,
  nextMood,
  timeToTransition,
  confidence
}) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-4 right-4 max-w-sm bg-black/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div>
          <h4 className="font-medium text-white">Mood Transition Predicted</h4>
          <p className="text-sm text-white/70 mt-1">
            Crowd mood shifting from <span className="text-purple-400">{currentMood}</span> to{' '}
            <span className="text-blue-400">{nextMood}</span> in approximately{' '}
            {Math.round(timeToTransition / 60)} minutes
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div
                className="h-1 bg-yellow-400 rounded-full"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className="text-xs text-white/50">
              {Math.round(confidence * 100)}% confidence
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);