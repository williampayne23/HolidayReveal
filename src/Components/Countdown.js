import { useEffect, useState } from "react"
import FlipOnChange from "./FlipOnChange";

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function Countdown({targetDate}) {

    function getTimeLeft(targetDate){
        if (!targetDate)
            return {days: 0, hours:0, minutes:0, seconds:0}
        let difference = targetDate - new Date();
      
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
          }, 1000);
        
        return () => clearInterval(timer);
    }, [targetDate])


    return <>
        Time until next reveal: <FlipOnChange>{pad(timeLeft.days, 2)}</FlipOnChange>:
        <FlipOnChange>{pad(timeLeft.hours, 2)}</FlipOnChange>:
        <FlipOnChange>{pad(timeLeft.minutes, 2)}</FlipOnChange>:
        <FlipOnChange>{pad(timeLeft.seconds, 2)}</FlipOnChange>
    </>
}

export default Countdown