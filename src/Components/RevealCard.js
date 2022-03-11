import useCardFlip from "../Hooks/useCardFlip";
import { Card, Col, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import useDates from "../Hooks/useDates";

function RevealCard({ item, setFocus }) {
  const { enoughCredits } = useDates()
  const flipCard = useCardFlip()

  function onClick() {
    if (item.visible) {
      setFocus(item)
      return;
    }

    if (!enoughCredits()) {
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
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip">You have to wait for the next reveal</Tooltip>}>
              <span className="d-inline-block">
                <Button disabled onClick={onClick} variant="primary">{"Find the clue!"}</Button>
              </span>
            </OverlayTrigger>
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