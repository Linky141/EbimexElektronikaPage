import { useEffect, useState } from "react";

function App() {

  const [services, setServices] = useState();

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
    .then(response => response.json())
    .then(data => setServices(data));
  }, [])

  return (
  <>
  <h1 style={{color: 'blue'}}>Ebimex elektronika</h1>

    
  </>
  );
}

export default App;
