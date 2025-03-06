import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialMinutes?: number;
  variant?: 'avatar' | 'audio';
}

export default function CountdownTimer({ initialMinutes = 10, variant = 'avatar' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`absolute w-full flex align-items-center justify-content-center gap-4`}
      style={variant === 'audio' ? { bottom: '510px' } : { bottom: '110px' }}>
      <div className="text-white text-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
} 