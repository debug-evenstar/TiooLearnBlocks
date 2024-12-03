import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetTime: number; // Target time in seconds
  onTimeUp: () => void; // Function to call when time is up
  onStart: () => void;
}

const TimeAtom = ({ value, label }: any) => {
  return (
    <div className="flex items-center w-12 justify-center quicksand flex-col">
      <span className="inline-block text-[27px] -mt-1">{value}</span>
      <span className="inline-block text-[10px] -mt-2 relative">{label}</span>
    </div>
  );
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetTime,onStart, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(targetTime);
  const [start, setStart] = useState(false);
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // That 1/hour, 59/minute, 59/seconds stuff

    return (
      <div className="flex items-center gap-1">
        <TimeAtom value={hours} label="Hours" />
        <TimeAtom value={minutes} label="Minutes" />
        <TimeAtom value={secs} label="Seconds" />
      </div>
    );
    // return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    if (!start) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp,start]);

  if (!start) {
    return (
      <button onClick={() => { onStart() ; setStart(true) }} className="bg-[#9C29B2] rounded-md px-3 flex items-center gap-2 py-3 quicksand text-white">
        <span className="inline-block text-[10px]">
          <svg
            width="34"
            height="30"
            viewBox="0 0 34 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 6.375C13.7366 6.375 10.5465 7.34271 7.8331 9.15575C5.11969 10.9688 3.00484 13.5457 1.756 16.5607C0.507149 19.5757 0.180394 22.8933 0.81705 26.094C1.45371 29.2947 3.02518 32.2347 5.33275 34.5423C7.64031 36.8498 10.5803 38.4213 13.781 39.058C16.9817 39.6946 20.2993 39.3679 23.3143 38.119C26.3293 36.8702 28.9062 34.7553 30.7193 32.0419C32.5323 29.3285 33.5 26.1384 33.5 22.875C33.495 18.5005 31.755 14.3065 28.6617 11.2133C25.5685 8.12 21.3745 6.38 17 6.375ZM17 36.625C14.2805 36.625 11.6221 35.8186 9.36092 34.3077C7.09974 32.7968 5.33737 30.6494 4.29666 28.1369C3.25596 25.6244 2.98366 22.8597 3.51421 20.1925C4.04476 17.5253 5.35432 15.0753 7.27729 13.1523C9.20026 11.2293 11.6503 9.91975 14.3175 9.3892C16.9848 8.85866 19.7494 9.13095 22.2619 10.1717C24.7744 11.2124 26.9218 12.9747 28.4327 15.2359C29.9436 17.4971 30.75 20.1555 30.75 22.875C30.7459 26.5205 29.2959 30.0155 26.7182 32.5932C24.1405 35.1709 20.6455 36.6209 17 36.625ZM24.8478 15.0272C24.9757 15.1549 25.0771 15.3065 25.1463 15.4735C25.2155 15.6404 25.2511 15.8193 25.2511 16C25.2511 16.1807 25.2155 16.3596 25.1463 16.5265C25.0771 16.6935 24.9757 16.8451 24.8478 16.9728L17.9728 23.8478C17.8451 23.9756 17.6934 24.0769 17.5265 24.146C17.3596 24.2152 17.1807 24.2508 17 24.2508C16.8193 24.2508 16.6404 24.2152 16.4735 24.146C16.3066 24.0769 16.1549 23.9756 16.0272 23.8478C15.8994 23.7201 15.7981 23.5684 15.729 23.4015C15.6598 23.2346 15.6242 23.0557 15.6242 22.875C15.6242 22.6943 15.6598 22.5154 15.729 22.3485C15.7981 22.1816 15.8994 22.0299 16.0272 21.9022L22.9022 15.0272C23.0299 14.8993 23.1815 14.7979 23.3485 14.7287C23.5154 14.6595 23.6943 14.6239 23.875 14.6239C24.0557 14.6239 24.2346 14.6595 24.4016 14.7287C24.5685 14.7979 24.7201 14.8993 24.8478 15.0272ZM11.5 2.25C11.5 1.88533 11.6449 1.53559 11.9027 1.27773C12.1606 1.01987 12.5103 0.875 12.875 0.875H21.125C21.4897 0.875 21.8394 1.01987 22.0973 1.27773C22.3551 1.53559 22.5 1.88533 22.5 2.25C22.5 2.61467 22.3551 2.96441 22.0973 3.22227C21.8394 3.48013 21.4897 3.625 21.125 3.625H12.875C12.5103 3.625 12.1606 3.48013 11.9027 3.22227C11.6449 2.96441 11.5 2.61467 11.5 2.25Z"
              fill="white"
            />
          </svg>
        </span>
        <span className="text-[20px] font-[600]">Start time</span>
      </button>
    );
  }

  return <div className="border rounded-[8px] p-2">{formatTime(timeLeft)}</div>;
};

export default CountdownTimer;
