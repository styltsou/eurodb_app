import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const testAPI = async () => {
      const res = await fetch('/api/countries/most-wins');
      const data = await res.json();
      console.log(data);
    };

    testAPI();
  }, []);

  return <h1>Learn React</h1>;
}

export default App;
