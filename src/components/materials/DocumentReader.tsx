import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Search,
  BookOpen,
} from 'lucide-react';
import { StudyMaterial, ViewMode } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { useStudyData } from '../../context/StudyDataContext';

interface DocumentReaderProps {
  material: StudyMaterial;
  onBack: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const DocumentReader: React.FC<DocumentReaderProps> = ({
  material,
  onBack,
  onNavigate,
}) => {
  const { addToast } = useStudyData();
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(`${material.title}\n\nSummary:\n${material.summary}\n\nKey Concepts:\n${material.keyConcepts.join('\n')}`);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard',
      message: 'Document summary and concepts copied.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.28 }}
      className="space-y-8 pb-16 max-w-4xl mx-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Materials</span>
        </button>

        <div className="flex items-center gap-3">
          <GlowButton
            size="sm"
            variant="outline"
            onClick={handleCopySummary}
            icon={copied ? <Check className="w-3.5 h-3.5 text-[#5B875C]" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Copy Summary'}
          </GlowButton>
          <GlowButton
            size="sm"
            variant="primary"
            onClick={() => onNavigate('flashcards')}
            icon={<Layers className="w-3.5 h-3.5" />}
          >
            Study Flashcards
          </GlowButton>
        </div>
      </div>

      {/* Document Header Card */}
      <GlassCard className="p-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-3 font-sans">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black text-white">
            {material.category}
          </span>
          <span className="text-xs text-[#6F6F6F]">
            {material.fileSize} · Uploaded {material.uploadDate} · {material.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#000000] mb-4 tracking-tight leading-tight">
          {material.title}
        </h1>

        {/* AI Executive Summary Box */}
        <div className="p-5 rounded-2xl bg-black/[0.03] border border-black/[0.06] mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#000000] mb-2 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>AI SYNTHESIZED EXECUTIVE SUMMARY</span>
          </div>
          <p className="text-sm text-[#1A1A1A] leading-relaxed font-sans">
            {material.summary}
          </p>
        </div>

        {/* Key Concepts Tag Cloud */}
        <div>
          <span className="text-xs font-semibold text-[#6F6F6F] mb-2 block font-sans">
            Extracted Key Concepts:
          </span>
          <div className="flex flex-wrap gap-2">
            {material.keyConcepts.map(concept => (
              <span
                key={concept}
                className="px-3.5 py-1 rounded-full text-xs font-medium bg-black/[0.04] text-[#000000] border border-black/5 font-sans"
              >
                #{concept}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Reader Body with Search Filter */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#000000] font-sans">
            <BookOpen className="w-4 h-4 text-[#5B875C]" />
            <span>Document Content View</span>
          </div>

          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#6F6F6F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Find in text..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs bg-black/[0.03] border border-black/10 text-[#000000] placeholder:text-[#6F6F6F] focus:outline-none focus:border-black font-sans"
            />
          </div>
        </div>

        <div className="text-sm text-[#1A1A1A] leading-relaxed font-sans whitespace-pre-wrap p-6 rounded-2xl bg-black/[0.02] border border-black/[0.04]">
          {material.content}
        </div>
      </GlassCard>
    </motion.div>
  );
};
