import { useEffect, useState } from "react";

function App() {
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  const fetchData = () => {
    fetch(
      `https://www.cmegroup.com/CmeWS/mvc/Quotes/ContractsByNumber?productIds=22&contractsNumber=1&venue=G&type=VOLUME&isProtected=&_t=${new Date().getTime()}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPrice(parseFloat(json[0].last as string));
        setChange(parseFloat(json[0].change as string));
      });
  };

  useEffect(fetchData, []);

  return (
    <main>
      <h1>Future Cows</h1>
      <h2>
        <code className={change > 0 ? "positive" : "negative"}>${price}</code>
      </h2>
      <h3>
        {change > 0 ? "Up" : "Down"} {change}%
      </h3>
    </main>
  );
}

export default App;
