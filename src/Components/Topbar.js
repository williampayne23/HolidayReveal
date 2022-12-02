import FlipOnChange from './FlipOnChange';
import Countdown from './Countdown';
import { Navbar, Container } from 'react-bootstrap';
import useDates from '../Hooks/useDates';


function Topbar(){
  const {numCredits, nextCredit} = useDates();
   return  <Navbar bg="dark" variant="dark">
       <Container fluid>
      <Navbar.Text>You have <FlipOnChange>{numCredits()}</FlipOnChange> door opens</Navbar.Text>
      <Navbar.Text>Time until next open: <Countdown targetDate={nextCredit()} /></Navbar.Text>
      </Container>
  </Navbar>
}

export default Topbar