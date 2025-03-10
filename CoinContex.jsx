  import {createContext, useEffect, useState} from "react";

  export const CoinContex = createContext();

  export const CoinContexProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
      name: "usd",
      symbol: "$",
    });

    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-jQng45uKxzMdwGH9sQ3xPpGK",
        },
      };

      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      )
        .then((res) => res.json())
        .then((res) => setAllCoin(res))
        .catch((err) => console.error(err));
    };

    useEffect(() => {
      console.log("Currency Update", currency);
      fetchAllCoin();
    }, [currency]);

    const contexValue = {
      allCoin,
      currency,
      setCurrency,
    };
    return (
      <CoinContex.Provider value={contexValue}>
        {props.children}
      </CoinContex.Provider>
    );
  };
