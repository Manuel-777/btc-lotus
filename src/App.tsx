/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

import AlphaLotus from "./assets/lea-black-lotus.jpg";
import BetaLotus from "./assets/leb-black-lotus.jpg";
import UnlimitedLotus from "./assets/2ed-black-lotus.jpg";

function App() {
  const [btcPrice, setBtcPrice] = useState(0);
  const [lotusAlphaPrice, setLotusAlphaPrice] = useState(0);
  const [lotusBetaPrice, setLotusBetaPrice] = useState(0);
  const [lotusUnlimitedPrice, setLotusUnlimitedPrice] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/1FfPag5GIZozcsRn3D9O-2G7I-mheu3hovGFxttcNrbg/gviz/tq?sheet=public"
      )
      .then((response) => {
        console.log(response);
        const str = response.data
          .replace("/*O_o*/", "")
          .replace(`google.visualization.Query.setResponse(`, "")
          .replace(`);`, " ");
        const parsed = JSON.parse(str);
        setLotusAlphaPrice(
          parseFloat(parsed.table.rows[0].c[3].v.replace(",", ""))
        );
        setLotusBetaPrice(
          parseFloat(parsed.table.rows[1].c[3].v.replace(",", ""))
        );
        setLotusUnlimitedPrice(
          parseFloat(parsed.table.rows[2].c[3].v.replace(",", ""))
        );
      })
      .catch(console.error);

    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        try {
          setBtcPrice(response.data.bpi.USD.rate_float);
        } catch (e) {
          console.error(e);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <div className="cards">
        <div className="card-3" />
        <div className="card-2" />
        <div className="card-1" />
      </div>
      <div className="content">
        <div className="header">
          How much is worth a Black Lotus compared to Bitcoin?
        </div>
        <div className="btc" />
        <div>
          {`Black Lotus (LEA): $${lotusAlphaPrice} USD = ${(
            lotusAlphaPrice / btcPrice
          ).toPrecision(3)} BTC`}
        </div>
        <div>
          {`Black Lotus (LEB): $${lotusBetaPrice} USD = ${(
            lotusBetaPrice / btcPrice
          ).toPrecision(3)} BTC`}
        </div>
        <div>
          {`Black Lotus (2ED): $${lotusUnlimitedPrice} USD = ${(
            lotusUnlimitedPrice / btcPrice
          ).toPrecision(3)} BTC`}
        </div>
        <div style={{ marginTop: "16px" }}>
          1 BTC = ${Math.round(btcPrice)} USD
        </div>
      </div>
      <div className="credit">By Manuel Etchegaray, 2021</div>
      <div className="qr-code-container">
        <div className="qr-code" />
        <div>Buy me a coffe!</div>
        <div style={{ marginBottom: "8px" }}>
          1NGSvdocYUzkGXw9AGKrXfwuYBc5WUu1wC
        </div>
      </div>
    </div>
  );
}

export default App;
