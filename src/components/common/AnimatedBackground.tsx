import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAFAF8]">
      {/* Gentle soft ambient atmospheric light */}
      <div className="absolute -top-[15%] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-sky-100/60 via-blue-50/40 to-transparent blur-[120px]" />
      <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-emerald-50/50 via-teal-50/30 to-transparent blur-[130px]" />
      <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-t from-amber-50/40 via-orange-50/20 to-transparent blur-[140px]" />

      {/* Subtle fine grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
