import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import FlipOnChange from './FlipOnChange';
import PopupPage from './PopupPage';

function RevealList() {
  const [list, updateList] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

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
    let creditsGiven = dates.findIndex((date) => date - Date.now() > 0)
    creditsGiven = creditsGiven < 0 ? dates.length : creditsGiven;
    const creditsUsed = list.filter(i => i.visible).length
    return creditsGiven - creditsUsed;
  }

  useEffect(() => {
    updateState();
  }, [])

  const clickCallback = async (item) => {
    if (item.visible) {
      setCurrentPage(item)
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
    <div>
    <PopupPage page={currentPage} show={currentPage !== ""} onHide={() => setCurrentPage("")}/>
    <Container fluid>
      <Row>
        <Col>
            You have <Button><FlipOnChange data={numCredits()}/></Button> reveals available
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4">
        {list ? list.map(item => <Item item={item} callback={clickCallback} />) : ""}
      </Row>
    </Container>
    </div>
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
