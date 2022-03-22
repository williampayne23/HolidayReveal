import ReactCardFlip from "react-card-flip"
import { Card, Button, Overlay, Tooltip } from "react-bootstrap"
import useCardFlip from "../Hooks/useCardFlip"
import useDates from "../Hooks/useDates"
import { useState, useRef } from "react"

function MainCard({item, setFocus}){
    const { allCreditsUsed } = useDates()
    const flipCard = useCardFlip()
    const [showOverlay, setShowOverlay] = useState(false)
    const overlayTarget = useRef(null)

    function onClick() {
        if (item.visible) {
          setFocus(item)
          return;
        }
    
        if (!allCreditsUsed()) {
          setShowOverlay(true);
          setTimeout(() => setShowOverlay(false), 2000);
          return
        }
    
        flipCard.mutate(item.id)
    }

    return (
        <ReactCardFlip isFlipped={item.visible} flipDirection="vertical" containerStyle={{ height: "100%" }}>
          <Card style={{ height: "100%" }}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.teaser}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
          <span ref={overlayTarget} onClick={onClick} className="d-inline-block">
            <Button disabled={!allCreditsUsed()} variant="primary">{"Find out where we're going"}</Button>
          </span>
            <Overlay
              placement="top"
              target={overlayTarget.current}
              show={showOverlay}>
              <Tooltip visible={item.visible} id="button-tooltip">You have to flip all the clues first!</Tooltip>
            </Overlay>
          </Card.Footer>
          </Card>
  
          <Card style={{ height: "100%" }}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.summary}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button onClick={onClick} variant="primary">{"Click for more"}</Button>
            </Card.Footer>
          </Card>
        </ReactCardFlip>)
  }

export default MainCard