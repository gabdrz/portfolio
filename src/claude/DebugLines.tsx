import React from 'react';

const DebugLines = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Vertical center line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-red-500 opacity-50" />
      
      {/* Horizontal center line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 opacity-50" />
      
      {/* Card height guides (each card is 1/3 screen height) */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-blue-500 opacity-50" />
      <div className="absolute top-2/3 left-0 w-full h-px bg-blue-500 opacity-50" />
      
      {/* Center box for reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[503px] h-[70vh] border border-green-500 opacity-50 hidden md:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px] h-[70vh] border border-green-500 opacity-50 md:hidden" />
    </div>
  );
};

export default DebugLines;