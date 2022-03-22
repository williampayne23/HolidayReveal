import useCardFlip from "../Hooks/useCardFlip";
import { Card, Col, Button, Tooltip, Overlay } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import useDates from "../Hooks/useDates";
import { useRef, useState } from "react";

function RevealCard({ item, setFocus }) {
  const { enoughCredits } = useDates()
  const flipCard = useCardFlip()
  const [showOverlay, setShowOverlay] = useState(false)
  const overlayTarget = useRef(null)

  function onClick() {
    if (item.visible) {
      setFocus(item)
      return;
    }

    if (!enoughCredits()) {
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 2000);
      return
    }

    flipCard.mutate(item.id)
  }

  return (
    <Col>
      <ReactCardFlip isFlipped={item.visible} flipDirection="vertical" containerStyle={{ height: "100%" }}>
        <Card style={{ height: "100%" }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.teaser}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
          <span ref={overlayTarget} onClick={onClick} className="d-inline-block">
            <Button disabled={!enoughCredits()} variant="primary">{"Find the clue!"}</Button>
          </span>
            <Overlay
              placement="top"
              target={overlayTarget.current}
              show={showOverlay}>
              <Tooltip visible={item.visible} id="button-tooltip">You have to wait for the next reveal</Tooltip>
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
          <Card.Footer>
            <Button onClick={onClick} variant="primary">{"Click for more"}</Button>
          </Card.Footer>
        </Card>
      </ReactCardFlip>
    </Col>)
}

export default RevealCard