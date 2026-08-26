import React, { useState } from 'react';
import { X, RotateCcw, Sparkles, Check } from 'lucide-react';
import { JOURNEY_STAGES } from '../config';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  completedStages: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onReset,
  completedStages,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="romantic-glass-card-bright rounded-3xl p-6 max-w-sm w-full relative border border-rose-400/30 text-white shadow-2xl animate-fadeIn">
        <button
          onClick={onClose}
          id="btn-close-settings"
          className="absolute top-4 right-4 text-rose-300 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif-romantic italic text-2xl text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-400" />
          Our Journey
        </h3>

        {/* Unlocked Reasons Summary */}
        <div className="mb-6 space-y-2">
          <p className="text-xs text-rose-300 uppercase tracking-wider font-semibold">
            Unlocked Moments ({completedStages} / 15)
          </p>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {JOURNEY_STAGES.slice(0, completedStages).map((stg) => (
              <div
                key={stg.id}
                className="p-2.5 rounded-xl bg-black/30 border border-rose-400/20 text-xs text-left"
              >
                <div className="flex items-center justify-between text-rose-300 font-semibold mb-1">
                  <span>
                    {stg.icon} Moment {stg.momentNumber}: {stg.title}
                  </span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-rose-100/80 italic font-serif-romantic">
                  "{stg.romanticMessage}"
                </p>
              </div>
            ))}
            {completedStages === 0 && (
              <p className="text-xs text-rose-200/50 italic py-2 text-center">
                Complete moments to collect special love notes here. 💕
              </p>
            )}
          </div>
        </div>

        {/* Reset Journey Option */}
        <div className="pt-3 border-t border-white/10">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              id="btn-trigger-reset"
              className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-rose-300/80 hover:text-rose-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Journey Progress</span>
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-2">
              <p className="text-xs text-rose-200">
                Are you sure? This will start your journey over from Moment 1.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-full text-xs bg-white/10 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onReset();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  id="btn-confirm-reset"
                  className="flex-1 py-1.5 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
