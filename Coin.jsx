import React, {useContext, useEffect, useState} from "react";
import "./Coin.css";
import {useParams} from "react-router-dom";
import {CoinContex} from "../../context/CoinContex";
import LineChart from "../../component/LineChart/LineChart";

const Coin = () => {
  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContex);

  const fetchCoinData = async () => {
    const options = {
      method: "Get",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-91Na3gF37jLkMimFB9B4FtwP",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${encodeURIComponent(
        currency.name
      )}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if ((coinData, historicalData)) {
    return (
      <div className="coin">
        <div className="coin_name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name}({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin_chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin_info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hours high</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hours low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
