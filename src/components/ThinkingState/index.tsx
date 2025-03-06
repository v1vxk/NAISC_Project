import React from 'react';

interface ThinkingStateProps {
  variant?: 'avatar' | 'audio'
}

const ThinkingState: React.FC<ThinkingStateProps> = ({ variant = 'avatar' }) => (
  <div className="absolute w-full flex align-items-center justify-content-center gap-4"
    style={variant === 'audio' ? { bottom: '570px' } : { bottom: '160px' }}>
    <p className="m-0 text-xl text-white">Thinking...</p>
  </div>
);

export default ThinkingState;
