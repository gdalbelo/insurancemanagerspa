import { useState, useEffect } from "react";

import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { createInsurance, getAllInsurancesByUser, editInsurance } from "../../services/insuranceServices";
import { HomeBody, HomeHeader } from "./HomeStyled";
import Cookies from "js-cookie";

export default function Home() {
  const [insurances, setInsurances] = useState([]);
  const [topInsurance, setTopInsurance] = useState({});
  const [seguros, setSeguros] = useState([]);
  const [numero, setNumero] = useState();

  async function findInsurances() {
    const insuranceResponse = await getAllInsurancesByUser();
    const insurance = await insuranceResponse.json();
    setSeguros(insurance.results);
  }

  async function fncIncluirSeguro() {
    let numapolice = document.getElementById('numapolice').value;
    let coberturas = document.getElementById('coberturas').value;
    let premio = document.getElementById('premio').value;
    console.log(createInsurance({numapolice, coberturas, premio}));
    findInsurances();
  }

  async function fncEditar(numapolice, coberturas, premio, id) {
    document.getElementById('numapolice').value = numapolice;
    document.getElementById('coberturas').value = coberturas;
    document.getElementById('premio').value = premio;
    let editarReponse = editInsurance({numapolice, coberturas, premio}, id);
    console.log(editarReponse);
    findInsurances();
  }

  useEffect(() => {
    findInsurances();
  }, []);
  console.log('insurances', insurances)
  return (
    <>
       <section style={{width: '80%',
  display: 'flex',
  margin: '1rem auto'}}>
    <article>
      Número apólice: <input type="number" id="numapolice" />&nbsp;
      Coberturas: <select id="coberturas"><option value="">Selecione</option><option value="Pneus">Pneus</option><option value="Vidros">Vidros</option><option value="Ar">Ar Condicionado</option></select>&nbsp;
      Prêmio: <input type="number" id="premio" />&nbsp;
      <button onClick={() => fncIncluirSeguro()}>Salvar</button>
    </article>
    </section>
      <HomeBody>
        {seguros.map((item, index) => (
          <Card
            key={index}
            numapolice={item.numapolice}
            coberturas={item.coberturas}
            premio={item.premio}
            id={item.id}
            seguros={seguros}
            setSeguros={setSeguros}
            fncEditar={fncEditar}
          />
        ))}
      </HomeBody>
    </>
  );
}
