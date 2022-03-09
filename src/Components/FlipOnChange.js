import { useEffect, useState } from "react"
import ReactCardFlip from 'react-card-flip';


function FlipOnChange({data}){
    const [currentData, updateCurrentData] = useState(data);
    const [flipState, updateFlipState] = useState(false);

    useEffect(() => {
        //Runs on change in data?
        
        updateFlipState(f => !f)
        
        const timer = setTimeout(() => {
            updateCurrentData(data)
            }, 1000);
        return () => clearTimeout(timer);
    }, [data])

    return <ReactCardFlip isFlipped={flipState} flipDirection="vertical" infinite={true}>
        <span>{data !== currentData ? (flipState ? currentData : data) : currentData}</span>
        <span>{data !== currentData ? (flipState ? data : currentData) : currentData}</span>
    </ReactCardFlip>
}

export default FlipOnChange