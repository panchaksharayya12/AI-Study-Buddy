import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStudyData();

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-[#5B875C] shrink-0" />,
    info: <Info className="w-4 h-4 text-black shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />,
    error: <XCircle className="w-4 h-4 text-rose-600 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none font-sans">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto relative p-4 rounded-2xl bg-white border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex items-start gap-3 text-xs"
          >
            {iconMap[toast.type]}
            <div className="flex-1 min-w-0 pr-2">
              <h5 className="font-semibold text-[#000000]">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[#6F6F6F] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#6F6F6F] hover:text-black transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
