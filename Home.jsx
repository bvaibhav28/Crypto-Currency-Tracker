import React, {useContext, useEffect, useState} from "react";
import "./Home.css";
import {CoinContex} from "../../context/CoinContex";
import { Link } from "react-router-dom";

const Home = () => {
  const {allCoin, currency} = useContext(CoinContex);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    console.log(" Update Currency: ", currency);
    console.log("Update Coins :", allCoin);
    setDisplayCoin(allCoin);
  }, [allCoin, currency]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest cripto <br />
          marketplace
        </h1>
        <p>
          Welcome to the word's largest criptocurrency marketplace.Sign up to
          explore more about criptos.
        </p>
        <form onSubmit={searchHandler}>


          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search cripto.."
            required
          />

        <datalist id="coinlist">
          {
            allCoin.map((item,index)=>(<option key={index} value={item.name}/>))
          }
        </datalist>

          <button type="submit">Seacrch</button>
        </form>
      </div>
      <div className="crpto_table">
        <div className="table_layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H change</p>
          <p className="market_cap">Market cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table_layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.Symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market_cap">
              {currency.Symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
