import  { useEffect, useState } from 'react';

const CountDownTimer = ({ seconds }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      setTime({
        days,
        hours,
        minutes,
        seconds: remainingSeconds,
      });

      if (seconds === 0) {
        clearInterval(countdownInterval);
      } else {
        seconds -= 1;
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds]);

  return (
    <div className="flex gap-5 max-sm:gap-2">
      <div className="countdown-item bg-blue-500 py-2  flex justify-center items-center flex-col rounded-lg max-sm:px-4 flex-1">
        <div className="text-md font-bold">{time.days}</div>
        <div className="text-sm max-sm:text-xs">Days</div>
      </div>
      <div className="countdown-item bg-blue-500 py-2  flex justify-center items-center flex-col rounded-lg max-sm:px-4 flex-1">
        <div className="text-md font-bold max-sm:text-sm">{time.hours}</div>
        <div className="text-sm max-sm:text-xs">Hours</div>
      </div>
      <div className="countdown-item bg-blue-500 py-2  flex justify-center items-center flex-col rounded-lg max-sm:px-4 flex-1">
        <div className="text-md font-bold max-sm:text-sm">{time.minutes}</div>
        <div className="text-sm max-sm:text-xs">Min</div>
      </div>
      <div className="countdown-item bg-blue-500 py-2  flex justify-center items-center flex-col rounded-lg max-sm:px-4 flex-1">
        <div className="text-md font-bold max-sm:text-sm">{parseInt(time.seconds)}</div>
        <div className="text-sm max-sm:text-xs">Sec</div>
      </div>
    </div>
  );
};

export default CountDownTimer;
