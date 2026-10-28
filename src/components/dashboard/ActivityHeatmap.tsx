import React from 'react';
import { motion } from 'framer-motion';
import { useStudyData } from '../../context/StudyDataContext';

export const ActivityHeatmap: React.FC = () => {
  const { activityHeatmap } = useStudyData();

  const getIntensityColor = (count: number) => {
    switch (count) {
      case 1:
        return 'bg-[#5B875C]/25 border-[#5B875C]/35';
      case 2:
        return 'bg-[#5B875C]/50 border-[#5B875C]/60';
      case 3:
        return 'bg-[#5B875C]/75 border-[#5B875C]/85';
      case 4:
        return 'bg-[#5B875C] border-[#5B875C] text-white';
      default:
        return 'bg-black/[0.03] border-black/[0.04]';
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="flex items-center justify-between mb-4 text-xs">
        <span className="font-semibold text-[#000000]">
          Last 30 Days Study Activity
        </span>
        <div className="flex items-center gap-1.5 text-[10px] text-[#6F6F6F]">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-black/[0.03] border border-black/[0.05]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#5B875C]/25" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#5B875C]/50" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#5B875C]" />
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-10 sm:grid-cols-15 gap-2">
        {activityHeatmap.map((item, idx) => (
          <motion.div
            key={item.date}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: idx * 0.01 }}
            className={`
              relative group aspect-square rounded-md border
              ${getIntensityColor(item.count)}
              transition-transform duration-200 hover:scale-125 hover:z-20 cursor-pointer
            `}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-black text-[10px] font-medium text-white shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity duration-150 z-30 font-sans">
              {item.date}: {item.studyMinutes} mins
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
