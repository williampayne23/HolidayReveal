import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import PopupPage from './PopupPage';
import Loading from './Loading';
import Topbar from './Topbar';
import useCards from '../Hooks/useCards';
import RevealCard from './RevealCard';
import MainCard from './MainCard';

function RevealList() {
  const { isLoading, error, data } = useCards()
  const [currentPage, setFocus] = useState("");

  if (isLoading){
    return <Loading/>
  }

  if (error){
    return <>Error</>
  }

  return (
    <div>
      <PopupPage page={currentPage} show={currentPage !== ""} onHide={() => setFocus("")} />
      <Topbar/>
      <Container fluid>
        <br />
        <Row xs={1} className="g-4">{<MainCard setFocus={setFocus} item={data[0]}/>}</Row>
        <br />
        <Row xs={1} md={2} lg={3} className="g-4">
          {data ? data.map((item, i) => i===0? null : <RevealCard key={i} item={item} setFocus={setFocus}/>) : ""}
        </Row>
      </Container>
    </div>
  );
}

export default RevealList;
