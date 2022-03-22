import './App.css';
import RevealList from './Components/RevealList';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Container, Form, Button } from 'react-bootstrap';
import { CookiesProvider } from "react-cookie";
import useLogin from './Hooks/useLogin';

const queryClient = new QueryClient()

function App() {
  const [loggedIn, setLoggedIn] = useLogin();
  console.log(loggedIn)
  if (!loggedIn)
    return <Login setCodeEntered={setLoggedIn} />;

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RevealList />
      </QueryClientProvider>
    </CookiesProvider>
  );
}


function Login({ setCodeEntered }) {
  function onClick(e) {
    e.preventDefault()
    if (e.target[0].value === "Bobby")
      setCodeEntered(true)
    else
      e.target[0].value = ""
  }

  return <Container style={{ "height": "100vh" }} className="v-100 d-flex align-items-center justify-content-center">
    <Form onSubmit={onClick} autoComplete="off">
      <Form.Group className="mb-3" controlId="secret">
        <Form.Label><b>Security question, are you really Katie?</b></Form.Label><br/>
        <Form.Label>Who is the smartest person in the world?</Form.Label>
        <Form.Control placeholder="Tell me!" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
}

export default App