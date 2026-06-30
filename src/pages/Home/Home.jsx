import { useState, useEffect } from "react";

import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { createInsurance, getAllInsurancesByUser, editInsurance, deleteInsurance } from "../../services/insuranceServices";
import { getInsuredNameById } from '../../services/insuredServices';
import { getUserPersonalData } from "../../services/userServices"; 
import { userLogged } from "../../services/userServices";
import { HomeBody, HomeHeader, Table } from "./HomeStyled";
import Cookies from "js-cookie";

 export default function Home() {
  const [insurances, setInsurances] = useState([]);
  const [topInsurance, setTopInsurance] = useState({});
  const [seguros, setSeguros] = useState([]);
  const [numero, setNumero] = useState();
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState([]);
  const [insured, setInsured] = useState([]);
  const [cobertura, setCobertura] = useState([]);
  let coberturasArr = [];

  async function findInsurances(idParam) {
    let idUser = idParam;
    const insuranceResponse = await getAllInsurancesByUser(idUser);
    const insurance = await insuranceResponse.json();
    setSeguros(insurance.insurance);
  }

  async function fncIncluirSeguro(obj) {                 
    console.log(document.getElementById('seguroID').value);
    //return;                        
    let numapolice = document.getElementById('numapolice').value;
    let coberturas = document.getElementById('coberturas').value;
    let premio = document.getElementById('premio').value;
    let segurado = document.getElementById('segurado').value;
    let idUserLogado = Cookies.get('userid');
    console.log(idUserLogado);
    if(document.getElementById('seguroID').value !== ''){
      console.log(`seguroID: ${document.getElementById('seguroID').value}`)
      console.log(userLogged().then((id) => console.log(id)));
      editInsurance(numapolice, coberturas, premio, segurado, document.getElementById('seguroID').value);
    } else {
      createInsurance({user: Cookies.get('userid'), numapolice, coberturas, premio, segurado});
    }
    const insuranceResponse = await getAllInsurancesByUser(idUserLogado);
    const insurance = await insuranceResponse.json();
    setSeguros(insurance.insurance);
    findInsurances(Cookies.get('userid'));
    document.getElementById('numapolice').value = "";
    document.getElementById('premio').value = "";
    document.getElementById('seguroID').value = "";
    document.getElementById("coberturas").value = "";
    document.getElementById("segurado").value = "";
  }

  async function fncDeletar(obj) {
    if(!confirm("Tem certeza que deseja excluir o seguro?")) return;
    console.log(obj['_id']);
    let idSeguro = obj['_id'];
    let idUserLogado = Cookies.get('userid');
    console.log(idUserLogado);
    deleteInsurance(idSeguro);
    const insurances = seguros.filter(function(insurance) {
      return insurance.id !== obj["_id"]; // Retorna true para manter o elemento, false para remover
    }); 
    findInsurances(Cookies.get('userid'));
    const insuranceResponse = await getAllInsurancesByUser(idUserLogado);
    const insurance = await insuranceResponse.json();
    setSeguros(insurance.insurance);
    seguros.map((seguro) => {
      console.log(seguro);
    });
    document.getElementById('seguroID').value = '';
  }

  async function fncGetUser() {
    let idLogado = Cookies.get('userid'); 
    const user = await getUserPersonalData(idLogado);
    setUser(user);
    console.log('user', user);
    console.log('Usuário Logado: ' + idLogado);
  }

  const fncEditar = (premio, numapolice, coberturas, segurado, obj) => {
    let idUser = (obj["_id"]);
    document.getElementById('seguroID').value = idUser;
    document.getElementById('numapolice').value = numapolice;
    document.getElementById('coberturas').value = coberturas;
    document.getElementById('premio').value = premio;
    document.getElementById('segurado').value = segurado;
    console.log('idUser: ' + idUser);
  }

  useEffect(() => {
    findInsurances(Cookies.get('userid'));
    fncGetUser();
    loadInsuredData();
    loadCoberturaData();
  }, []);

  // console.log(seguros);
  // console.log(`Cookies.get('userid'): ${Cookies.get('userid')}`)

  if(Cookies.get('userid') === ''){
    setSeguros(null);
  }

  function loadInsuredData() {
    let insureds = fetch('http://localhost:3001/insured/').then(response=>{
      return response.json();
    }).then(data => {
        setInsured(data);
      //}
      return data.results;
    });
    //console.log('segurados: ', segurado);
  }

  function loadCoberturaData() {
    let response = fetch('http://localhost:3001/insurances/coberturas').then(response=>{
      console.log('response: ', response);
      return response.json();
    }).then(data => {
        //console.log(data);
        data.response.map(element => {
          //console.log(element);
          console.log(element);
          coberturasArr.push(element);
        })
        setCobertura(data);
      //}
      return data.results;
    });
    //console.log(cobertura);
    //console.log('segurados: ', segurado);
  }


  let seguroList = seguros[0];
  //console.log(seguroList);
  //console.log(seguros);
  //console.log(insured);
  //onsole.log('Coberturas array: ', coberturasArr);
  // cobertura.response.map(c => {
  //   console.log(c);
  // });
  return (
    <>
       <section style={{width: '80%',
  display: 'flex',
  margin: '1rem auto'}}>
    <input type="hidden" id="seguroID" />
    <article>
      Número apólice: <input type="number" id="numapolice" />&nbsp;
      Coberturas: <select id="coberturas">
          <option value="1">Cobertura Básica Contra Incêndio</option>
          <option value="2">Danos Elétricos</option>
          <option value="3">Roubo e Furto</option>
          <option value="4">Responsabilidade Civil</option>
          <option value="5">Danos Materiais a Terceiros</option>
          <option value="6">Danos Corporais a Terceiros</option>
          <option value="7">Acidentes Pessoais</option>
          <option value="8">Morte Acidental</option>
          <option value="9">Invalidez Permanente</option>
          <option value="10">Despesas Médicas</option>
          <option value="11">Assistência Funeral</option>
          <option value="12">Quebra de Vidros</option>
          <option value="13">Fenômenos da Natureza</option>
          <option value="14">Alagamentos e Enchentes</option>
          <option value="15">Equipamentos Eletrônicos</option>
          <option value="16">Lucros Cessantes</option>
          <option value="17">Carro Reserva</option>
          <option value="18">Assistência 24 Horas</option>
          <option value="19">Perda Total</option>
          <option value="20">Cobertura Compreensiva (Completa)</option>
          </select>&nbsp;
      Prêmio: <input type="number" id="premio" />&nbsp;
      Segurado: <select id="segurado">
        {insured.results?.map((ins) => (
          <option value={ins.id}>{ins.fullname}</option>
        ))}
      </select>
      <button onClick={() => fncIncluirSeguro()}>Salvar</button>|<button onClick={() => fncIncluirSeguro()}>Novo</button>
    </article>
    </section>
      <HomeBody>
      <Table>
        <tr>
          <th>Número apólice</th>
          <th>Seguro</th>
          <th>Prêmio</th>
          <th>Cobertura</th>
          <th>Segurado</th>
          {/* <th></th> */}
        </tr>
        {seguros && seguros.map((item, index) => (
          <tr key={index}>
            <td>{item.numapolice}</td>
            <td>{item.coberturas}</td>
            <td>{item.premio}</td>
            <td>{item.coberturas}</td>
            <td>{getInsuredNameById(item.segurado, insured.results)}</td>
            {/* <td><input type="checkbox" id={'chk'+index} onClick={(edit) => {setEdit(!edit);console.log(document.getElementById('chk'+index).checked)}} /></td> */}
            <td><i onClick={() => fncEditar(item.premio, item.numapolice, item.coberturas, item.segurado, item)} style={{marginRight: '10px', marginTop: '10px', cursor: 'pointer'}}>Editar</i>|<i onClick={() => fncDeletar(item)} style={{cursor: 'pointer'}}>X</i></td>
          </tr>
        ))}
      </Table>
      </HomeBody>
    </>
  );
}
