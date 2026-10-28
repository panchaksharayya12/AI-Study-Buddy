import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Save,
  BookOpen,
  Edit3,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { SmartNote } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { playClickSound, playSuccessSound } from '../../utils/sound';

export const SmartNotesView: React.FC = () => {
  const { notes, updateNoteEdits, addToast } = useStudyData();
  const [selectedNoteId, setSelectedNoteId] = useState<string>(notes[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});
  const [editableNotes, setEditableNotes] = useState<string>('');
  const [saveIndicator, setSaveIndicator] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  React.useEffect(() => {
    if (selectedNote) {
      setEditableNotes(selectedNote.userEdits || '');
    }
  }, [selectedNoteId, selectedNote]);

  const toggleSectionCollapse = (index: number) => {
    playClickSound();
    setCollapsedSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopyNote = () => {
    if (!selectedNote) return;
    const fullText = `# ${selectedNote.title}\n\nSummary:\n${selectedNote.summary}\n\nKey Concepts:\n${selectedNote.keyPoints.join(', ')}\n\n${selectedNote.sections.map(s => `## ${s.title}\n${s.content}`).join('\n\n')}\n\n${editableNotes ? `Personal Notes:\n${editableNotes}` : ''}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    playSuccessSound();
    addToast({
      type: 'success',
      title: 'Copied to Clipboard',
      message: 'All synthesized sections and annotations copied.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEditableNotes(text);
    if (selectedNote) {
      updateNoteEdits(selectedNote.id, text);
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 1200);
    }
  };

  if (!selectedNote) {
    return (
      <div className="text-center py-16">
        <FileText className="w-12 h-12 text-[#6F6F6F] mx-auto mb-2 opacity-50" />
        <p className="text-[#6F6F6F]">No smart notes generated yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            Smart Synthesized Notes
          </h1>
          <p className="text-sm text-[#6F6F6F] font-sans mt-2">
            Structured knowledge distillations with keyword highlights and autosaved revisions.
          </p>
        </div>

        <div className="flex items-center gap-3 font-sans">
          <select
            value={selectedNote.id}
            onChange={e => setSelectedNoteId(e.target.value)}
            className="bg-white text-xs font-medium text-black border border-black/10 rounded-full px-4 py-2 focus:outline-none"
          >
            {notes.map(n => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>

          <GlowButton
            size="sm"
            variant="outline"
            onClick={handleCopyNote}
            icon={copied ? <Check className="w-3.5 h-3.5 text-[#5B875C]" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Copy All'}
          </GlowButton>
        </div>
      </div>

      {/* Main Note Card */}
      <GlassCard className="p-8 space-y-6">
        <div className="border-b border-black/[0.06] pb-5">
          <div className="flex items-center gap-2 mb-2 font-sans">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black text-white">
              {selectedNote.category}
            </span>
            <span className="text-xs text-[#6F6F6F]">
              Modified: {selectedNote.lastModified}
            </span>
            {saveIndicator && (
              <span className="text-xs text-[#5B875C] font-semibold flex items-center gap-1 ml-auto">
                <Save className="w-3.5 h-3.5" /> Auto-saved
              </span>
            )}
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#000000] tracking-tight">
            {selectedNote.title}
          </h2>
        </div>

        {/* Executive Summary */}
        <div className="p-5 rounded-2xl bg-black/[0.03] border border-black/[0.05] font-sans">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#000000] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>EXECUTIVE SUMMARY</span>
          </div>
          <p className="text-sm text-[#1A1A1A] leading-relaxed">
            {selectedNote.summary}
          </p>
        </div>

        {/* Sections Accordion */}
        <div className="space-y-3 font-sans">
          <h3 className="font-display font-bold text-2xl text-[#000000] mb-2">
            Synthesized Sections
          </h3>

          {selectedNote.sections.map((section, idx) => {
            const isCollapsed = collapsedSections[idx];

            return (
              <div
                key={section.title}
                className="rounded-2xl bg-black/[0.02] border border-black/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => toggleSectionCollapse(idx)}
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left font-medium text-sm text-[#000000] hover:bg-black/[0.02] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#5B875C]" />
                    <span>{section.title}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6F6F6F] transition-transform duration-200 ${
                      isCollapsed ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 pt-1 text-sm text-[#1A1A1A] leading-relaxed"
                    >
                      <p className="whitespace-pre-wrap">{section.content}</p>

                      {section.highlights && section.highlights.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-black/[0.06] flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold text-[#6F6F6F] uppercase tracking-wider">
                            Key Terms:
                          </span>
                          {section.highlights.map(h => (
                            <span
                              key={h}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/[0.05] text-[#000000]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Editable Personal Annotations */}
        <div className="pt-2 font-sans">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#000000] flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-[#5B875C]" />
              Personal Annotations & Cornell Notes
            </span>
            <span className="text-[10px] text-[#6F6F6F]">
              Auto-saves to browser memory
            </span>
          </div>

          <textarea
            rows={4}
            value={editableNotes}
            onChange={handleNotesChange}
            placeholder="Type your personal insights, mnemonics, or test reminders here..."
            className="w-full p-4 rounded-2xl bg-black/[0.02] border border-black/10 text-sm text-[#000000] placeholder:text-[#6F6F6F] focus:outline-none focus:border-black font-sans leading-relaxed resize-y"
          />
        </div>
      </GlassCard>
    </div>
  );
};
