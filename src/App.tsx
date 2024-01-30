import { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [change, setChange] = useState(0);

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://www.cmegroup.com/CmeWS/mvc/Quotes/ContractsByNumber?productIds=22&contractsNumber=1&venue=G&type=VOLUME&isProtected=&_t=${new Date().getTime()}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPrice(parseFloat(json[0].last as string));
        setChange(parseFloat(json[0].change as string));
        setLoading(false);
      });
  };

  useEffect(() => {
    setInterval(fetchData, 6000);
    fetchData();
  }, []);

  return (
    <main>
      <div style={{ position: "absolute", top: "0", left: "25px" }}>
        {loading ? (
          <Watch color="white" ariaLabel="loading-cows" width="2rem" />
        ) : null}
      </div>
      <h1>Future Cows</h1>
      <h2>
        <code className={change > 0 ? "positive" : "negative"}>${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</code>
      </h2>
      <h3>
        {change > 0 ? "Up" : "Down"} {change}%
      </h3>
    </main>
  );
}

export default App;
