import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import FlipOnChange from './FlipOnChange';
import PopupPage from './PopupPage';
import Countdown from './Countdown';

const creditTimings = [new Date(2022, 2, 1), new Date(2022, 2, 2), new Date(2022, 2, 3), new Date(2022, 2, 4)]

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
    let creditsGiven = creditTimings.findIndex((date) => date - Date.now() > 0)
    creditsGiven = creditsGiven < 0 ? creditTimings.length : creditsGiven;
    const creditsUsed = list.filter(i => i.visible).length
    return creditsGiven - creditsUsed;
  }

  function nextCredit(){
    return creditTimings.find((date) => date - Date.now() > 0)
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

    fetch("https://hooks.zapier.com/hooks/catch/5708500/bifr05e?id=" + item.id)
    .then(() => {

    })
    .catch((err) => console.error(err));
  }

  return (
    <div>
      <PopupPage page={currentPage} show={currentPage !== ""} onHide={() => setCurrentPage("")} />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Text>You have <FlipOnChange>{numCredits()}</FlipOnChange> reveals available</Navbar.Text>
          <Navbar.Text><Countdown targetDate={nextCredit()}/></Navbar.Text>
        </Container>
      </Navbar>
      <Container fluid>
        <Row><br/></Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {list ? list.map(item => <Item item={item} callback={clickCallback} />) : ""}
        </Row>
      </Container>
    </div>
  );
}

function Item({ item, callback }) {
  return (
    <Col>
      <ReactCardFlip isFlipped={item.visible} flipDirection="vertical" containerStyle={{height:"100%"}}>
        <Card style={{height:"100%"}}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.teaser}
            </Card.Text>
            <Button onClick={() => callback(item)} variant="primary">{"Find the clue!"}</Button>
          </Card.Body>
        </Card>

        <Card style={{height:"100%"}}>
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
