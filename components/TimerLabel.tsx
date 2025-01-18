import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export const TimerLabel: React.FC<React.HTMLAttributes<HTMLParagraphElement> & { date: Date }> = ({
    date,
    ...props
}) => {
    const timer = useTimer({ expiryTimestamp: date, autoStart: true });
    
    useEffect(() => {
        timer.restart(date);
    }, [date.getTime()]);
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    return <p {...props}>{`${pad(timer.days)}:${pad(timer.hours)}:${pad(timer.minutes)}:${pad(timer.seconds)}`}</p>;
};