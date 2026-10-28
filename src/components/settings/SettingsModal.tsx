import React, { useState } from 'react';
import { Key, Volume2, VolumeX, Eye, Play, Check, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useStudyData } from '../../context/StudyDataContext';
import { Modal } from '../common/Modal';
import { GlowButton } from '../common/GlowButton';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayIntro: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onReplayIntro,
}) => {
  const { reducedMotion, toggleReducedMotion, soundEnabled, toggleSound } = useTheme();
  const { geminiApiKey, setGeminiApiKey } = useStudyData();
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Studio Preferences & AI Configuration">
      <div className="space-y-6 text-sm font-sans">
        {/* Gemini API Key Section */}
        <div className="p-5 rounded-2xl bg-black/[0.03] border border-black/[0.06] space-y-3">
          <div className="flex items-center gap-2 font-semibold text-[#000000]">
            <Key className="w-4 h-4 text-[#5B875C]" />
            <span>Google Gemini AI API Key</span>
          </div>

          <p className="text-xs text-[#6F6F6F] leading-relaxed">
            Connect your personal Google Gemini API key to unlock unconstrained live Socratic tutoring. If left blank, the built-in autonomous knowledge engine handles requests.
          </p>

          <form onSubmit={handleSaveApiKey} className="flex gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full text-xs bg-white border border-black/10 text-[#000000] focus:outline-none focus:border-black"
            />
            <GlowButton
              type="submit"
              size="sm"
              variant="primary"
              icon={savedSuccess ? <Check className="w-3.5 h-3.5 text-[#5B875C]" /> : undefined}
            >
              {savedSuccess ? 'Saved' : 'Save Key'}
            </GlowButton>
          </form>

          <div className="flex items-center gap-1.5 text-[11px] text-[#6F6F6F] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>Keys are stored strictly in client localStorage; never transmitted to third parties.</span>
          </div>
        </div>

        {/* Sensory & Motion Preferences */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider">
            Sensory Preferences
          </h4>

          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05]">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#5B875C]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#6F6F6F]" />
              )}
              <div>
                <div className="font-medium text-[#000000]">
                  Audio Micro-Interactions
                </div>
                <div className="text-xs text-[#6F6F6F]">
                  Subtle synthetic sound effects on flips, clicks, and pomodoro timer
                </div>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                soundEnabled ? 'bg-black' : 'bg-black/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  soundEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] border border-black/[0.05]">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4 text-black" />
              <div>
                <div className="font-medium text-[#000000]">
                  Reduced Motion Mode
                </div>
                <div className="text-xs text-[#6F6F6F]">
                  Disable video motions and 3D flip effects for accessibility
                </div>
              </div>
            </div>
            <button
              onClick={toggleReducedMotion}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                reducedMotion ? 'bg-black' : 'bg-black/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  reducedMotion ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Replay Intro Screen */}
        <div className="pt-2">
          <button
            onClick={() => {
              onClose();
              onReplayIntro();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-medium text-black bg-black/[0.04] hover:bg-black hover:text-white border border-black/10 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Replay Cinematic Intro Sequence</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
