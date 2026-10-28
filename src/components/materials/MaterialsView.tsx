import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  Search,
  Trash2,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { StudyMaterial, ViewMode } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { DocumentReader } from './DocumentReader';
import { playClickSound, playSuccessSound } from '../../utils/sound';

interface MaterialsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ onNavigate }) => {
  const { materials, addMaterial, removeMaterial } = useStudyData();
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Upload States
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', ...Array.from(new Set(materials.map(m => m.category)))];

  const filteredMaterials = materials.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const processUploadedFile = (file: File) => {
    setIsUploading(true);
    setUploadProgress(10);
    setUploadSuccess(false);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 20;
      });
    }, 120);

    const reader = new FileReader();
    reader.onload = e => {
      const textContent = (e.target?.result as string) || '';

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setUploadSuccess(true);
        playSuccessSound();

        const ext = file.name.split('.').pop()?.toLowerCase() || 'txt';
        const fileType: 'pdf' | 'txt' | 'md' | 'doc' =
          ext === 'pdf' ? 'pdf' : ext === 'md' ? 'md' : 'txt';

        const cleanTitle = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        const words = textContent
          .split(/\s+/)
          .map(w => w.replace(/[^a-zA-Z]/g, ''))
          .filter(w => w.length > 5 && !['between', 'through', 'because', 'without', 'another'].includes(w.toLowerCase()));
        const uniqueWords = Array.from(new Set(words)).slice(0, 5);
        const keyConcepts = uniqueWords.length > 0 ? uniqueWords : ['Core Fundamentals', 'Analytical Methods', 'System Principles'];

        const summary = textContent.slice(0, 260) + (textContent.length > 260 ? '...' : '');

        const newMat = addMaterial({
          title: cleanTitle,
          category: 'User Uploads',
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileType,
          content: textContent || `Uploaded study document: ${cleanTitle}.\n\nContains detailed domain notes and concepts parsed for automated flashcard and quiz generation.`,
          summary: summary || `Comprehensive overview of ${cleanTitle} structured for fast active recall and retention.`,
          keyConcepts,
          readTimeMinutes: Math.max(3, Math.ceil(textContent.length / 900)),
        });

        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setUploadSuccess(false);
          setSelectedMaterial(newMat);
        }, 750);
      }, 700);
    };

    reader.onerror = () => {
      clearInterval(interval);
      setIsUploading(false);
      alert('Error reading file. Please upload a readable text, markdown, or PDF document.');
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  if (selectedMaterial) {
    return (
      <DocumentReader
        material={selectedMaterial}
        onBack={() => setSelectedMaterial(null)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-semibold text-[#000000] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>KNOWLEDGE REPOSITORY</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            Study Materials
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-2 font-sans max-w-xl">
            Upload course slides, textbooks, or notes. Our neural engine extracts flashcards and quizzes instantly.
          </p>
        </div>

        <GlowButton
          size="md"
          variant="primary"
          onClick={() => fileInputRef.current?.click()}
          icon={<UploadCloud className="w-4 h-4" />}
        >
          Upload Document
        </GlowButton>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.md,.json"
          onChange={e => e.target.files && e.target.files[0] && processUploadedFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* Drag & Drop Upload Zone (Minimalist & Clean) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`
          relative rounded-3xl p-10 text-center cursor-pointer select-none transition-all duration-300
          border-2 border-dashed bg-white
          ${
            isDragging
              ? 'border-black bg-black/[0.03] scale-[1.01]'
              : 'border-black/15 hover:border-black/40 hover:bg-black/[0.01]'
          }
          shadow-[0_8px_30px_rgba(28,70,120,0.04)]
        `}
      >
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-black/[0.04] flex items-center justify-center mb-4">
            {uploadSuccess ? (
              <CheckCircle2 className="w-7 h-7 text-[#5B875C]" />
            ) : (
              <UploadCloud className="w-7 h-7 text-black" />
            )}
          </div>

          <h3 className="font-display font-bold text-2xl text-[#000000] mb-1">
            {isUploading
              ? 'Synthesizing Knowledge Base...'
              : uploadSuccess
              ? 'Processing Complete!'
              : 'Drag & Drop Study Documents Here'}
          </h3>

          <p className="text-xs text-[#6F6F6F] max-w-sm mb-4 font-sans">
            {isUploading
              ? 'Parsing sections, extracting formulas, and drafting smart flashcards...'
              : 'Supports PDF lecture slides, TXT notes, and Markdown (.pdf, .txt, .md)'}
          </p>

          {isUploading && (
            <div className="w-full max-w-xs bg-black/10 h-1.5 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full bg-black"
                style={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}

          {!isUploading && (
            <span className="text-xs font-medium text-black bg-black/[0.05] px-4 py-1.5 rounded-full border border-black/10">
              Or click to browse from device
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all font-sans ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-black/[0.04] text-[#6F6F6F] hover:text-black hover:bg-black/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#6F6F6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search titles or concepts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-black/10 text-[#000000] placeholder:text-[#6F6F6F] focus:outline-none focus:border-black font-sans"
          />
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMaterials.map((material, idx) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <GlassCard className="p-7 h-full flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase bg-black/[0.04] text-[#6F6F6F]">
                      {material.category}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        removeMaterial(material.id);
                      }}
                      className="p-1 rounded-full text-[#6F6F6F] hover:text-rose-600 transition-colors"
                      title="Archive Material"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedMaterial(material)}
                    className="font-display font-bold text-xl text-[#000000] mb-2 cursor-pointer group-hover:text-[#5B875C] transition-colors leading-snug line-clamp-2"
                  >
                    {material.title}
                  </h3>

                  <p className="text-xs text-[#6F6F6F] line-clamp-3 leading-relaxed mb-5 font-sans">
                    {material.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {material.keyConcepts.slice(0, 3).map(c => (
                      <span
                        key={c}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/[0.03] text-[#6F6F6F]"
                      >
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-sans">
                  <span className="text-[#6F6F6F] text-[11px]">
                    {material.fileSize} · {material.readTimeMinutes} min read
                  </span>

                  <button
                    onClick={() => setSelectedMaterial(material)}
                    className="flex items-center gap-1 font-semibold text-black hover:text-[#5B875C] transition-colors text-xs"
                  >
                    <span>Read & Study</span>
                    <span className="text-sm">&rsaquo;</span>
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
