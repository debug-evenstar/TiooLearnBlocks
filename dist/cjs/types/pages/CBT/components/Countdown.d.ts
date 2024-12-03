import React from "react";
interface CountdownProps {
    targetTime: number;
    onTimeUp: () => void;
    onStart: () => void;
}
declare const CountdownTimer: React.FC<CountdownProps>;
export default CountdownTimer;
