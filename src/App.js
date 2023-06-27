import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import './Loading.css'
import Loading from './components/Loading';

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
    <div class="container">
      <h1>Click on the button to general a county</h1>
      <div class="content">
        <h2>{slips.advice}</h2>
        {removeLoading && <Loading/>}
      </div>
        <br/>
      <button className="button" onClick={() => setSlips({})}>Click-me</button>
    </div>

  );
}

export default App;
