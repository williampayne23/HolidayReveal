import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import AnimateOnChange from 'react-animate-on-change';

function RevealList() {
  const [list, updateList] = useState([]);
  const [currentCredits, updateCredits] = useState("?")

  function updateState() {
    fetch("https://notion-api.splitbee.io/v1/table/32fcb112aae743eeab93ca6c9eb97143")
      .then(res => res.json())
      .then(data => {
        updateList(data)
      })
      .catch(err => console.log(err));
  }

  function numCredits() {
    if (list.length === 0)
      return "?"
    const dates = [new Date(2022, 2, 1), new Date(2022, 2, 2), new Date(2022, 2, 3), new Date(2022, 2, 4)];
    const creditsGiven = dates.findIndex((date) => date - Date.now() > 0)
    const creditsUsed = list.filter(i => i.visible).length
    return creditsGiven - creditsUsed;
  }

  useEffect(() => {
    updateState();
  }, [])

  useEffect(() => {
    if (currentCredits == "?") {
      updateCredits(numCredits)
      return;
    }
    const timer = setTimeout(() => {
      updateCredits(numCredits())
    }, 1000);
    return () => clearTimeout(timer);
  }, [list])

  const clickCallback = async (item) => {
    if (item.visible) {
      // Follow link
      return;
    }

    if (numCredits() <= 0) {
      console.log("Not enough credits")
      console.log(numCredits())
      return;
    }

    const newList = [...list]
    const index = newList.findIndex((i) => i.id === item.id)
    if (index < 0)
      return;
    newList[index].visible = true;
    updateList(newList)

    // fetch("https://hooks.zapier.com/hooks/catch/5708500/bifr05e?id=" + item.id)
    // .then(() => {

    // })
    // .catch((err) => console.error(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col>
            You have <Button><ReactCardFlip isFlipped={numCredits() % 2 == 0} flipDirection="vertical" infinite={true}>
              <span>{numCredits() != currentCredits ? (numCredits() % 2 == 0 ? currentCredits : numCredits()) : currentCredits}</span>
              <span>{numCredits() != currentCredits ? (numCredits() % 2 == 0 ? numCredits() : currentCredits) : currentCredits}</span>
            </ReactCardFlip></Button> reveals available
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
        {list ? list.map(item => <Item item={item} callback={clickCallback} />) : ""}
      </Row>
    </Container>
  );
}

function Item({ item, callback }) {
  return (
    <Col>
      <ReactCardFlip isFlipped={item.visible} flipDirection="vertical">
        <Card>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.teaser}
            </Card.Text>
            <Button onClick={() => callback(item)} variant="primary">{"Find the clue!"}</Button>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.summary}
            </Card.Text>
            <Button onClick={() => callback(item)} variant="primary">{"Click for more"}</Button>
          </Card.Body>
        </Card>
      </ReactCardFlip>
    </Col>)
}

export default RevealList;
