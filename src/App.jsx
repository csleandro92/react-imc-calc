import "./App.css";

import ImcCalc from "./components/ImcCalc";
import ImcTable from "./components/ImcTable";

import { data } from "./data/data";

import React from "react";

function App() {
  const [imc, setImc] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [infoClass, setInfoClass] = React.useState("");

  const calcImc = (e, height, weight) => {
    e.preventDefault();

    if (!weight || !height) return;

    const weightFloat = weight.replace(",", ".");
    const heightFloat = height.replace(",", ".");

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1);

    setImc(imcResult);

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        setInfo(item.info);
        setInfoClass(item.infoClass);
      }
    });

    if (!info) return;
  };

  const resetCalc = (e) => {
    e.preventDefault();
    setImc("");
    setInfo("");
    setInfoClass("");
  };

  return (
    <div className="container">
      {!imc ? (
        <ImcCalc calcImc={calcImc} />
      ) : (
        <ImcTable
          data={data}
          imc={imc}
          info={info}
          infoClass={infoClass}
          resetCalc={resetCalc}
        />
      )}
    </div>
  );
}

export default App;
