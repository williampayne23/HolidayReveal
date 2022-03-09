import { useEffect, useState } from "react"
import ReactCardFlip from 'react-card-flip';


function FlipOnChange({children}){
    const [currentData, updateCurrentData] = useState(children);
    const [flipState, updateFlipState] = useState(false);

    useEffect(() => {
        //Runs on change in data?
        updateFlipState(f => !f)
        const timer = setTimeout(() => {
            updateCurrentData(children)
            }, 100);
        return () => clearTimeout(timer);
    }, [children])

    return <div style={{display:"inline-block"}}><ReactCardFlip isFlipped={flipState} flipDirection="vertical" infinite={true}>
        <span>{JSON.stringify(children) !== JSON.stringify(currentData) ? (flipState ? currentData : children) : currentData}</span>
        <span>{JSON.stringify(children) !== JSON.stringify(currentData) ? (flipState ? children : currentData) : currentData}</span>
    </ReactCardFlip></div>
}

export default FlipOnChange