import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import './Loading.css'
import Loading from './components/Loading';
import { StyledButton, Container } from './StyledComponents.style';

function App() {
  const [slips, setSlips] = useState({});
  const [removeLoading, setRemoveLoading] = useState(true);

  useEffect(() => {
    if (!slips.advice) {
      setRemoveLoading(true)
      setTimeout(() => {
          axios
            .get('https://api.adviceslip.com/advice')
            .then((res) => {
              setSlips(res.data.slip)
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setRemoveLoading(false)
            })
          }, 1000)
        }
  }, [slips]);

  return (
    <Container>
      <h1>Click on the button to general a county</h1>
      <div class="content">
        <h2>{slips.advice}</h2>
        {removeLoading && <Loading/>}
      </div>
        <br/>
      <StyledButton onClick={() => setSlips({})}>Click-me</StyledButton>
    </Container>

  );
}

export default App;
