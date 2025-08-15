// src/components/AI/AIResponseBox.jsx
import React from 'react';

const AIResponseBox = ({ reply }) => {
  return (
    <div className="border-2 border-purple-300 p-4 rounded-xl min-h-[80px] bg-purple-50 text-purple-900 animate-fade-in">
      {reply || 'AI response will appear here...'}
    </div>
  );
};

export default AIResponseBox;
