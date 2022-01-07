import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const testAPI = async () => {
      const res = await fetch('http://localhost:5000/api/countries/most-wins');
      const data = await res.json();
      console.log(data);
    };

    testAPI();
  }, []);

  return <h1>Learn React</h1>;
}

export default App;
