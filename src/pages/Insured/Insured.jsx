import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  InsuredContainer,
  InsuredHeader,
  Table
} from "./InsuredStyled";
import { createInsured, deleteInsured } from "../../services/insuredServices";
import { User } from "../../components/User/User";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { getUserPersonalData, updateUserData } from "../../services/userServices"; 
import Cookies from "js-cookie";

export function Insured() {
  const { user } = useContext(UserContext);

  const [ name, setName ] = useState('');
  const [ cpfcnpj, setCpfCnpj ] = useState('');
  const [ dtnascimento, setDtNascimento ] = useState('');
  const [estadocivil, setEstadoCivil] = useState('');
  const [genero, setGenero] = useState('');
  const [profissao, setProfissao] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [contato, setContato] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [segurado, setSegurado] = useState([]);

  const navigate = useNavigate();

  const formatCpfCnpj = (val) => {
    // Remove tudo que não é número
    const cleaned = val.replace(/\D/g, '');

    // Formata CPF (11 dígitos)
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    // Formata CNPJ (14 dígitos)
    return cleaned
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  };

  async function fncCreateInsurer() {
    let segurado = {};
    let fullname = document.getElementById('fullname').value;
    let cpfcnpj = document.getElementById('cpfcnpj').value;
    let dtnascimento = document.getElementById('dtnascimento').value;
    let genero = document.getElementById('genero').value;
    let profissao = document.getElementById('profissao').value;
    let logradouro = document.getElementById('logradouro').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;
    let bairro = document.getElementById('bairro').value;
    let cep = document.getElementById('cep').value;
  
    segurado.fullname = fullname;
    segurado.dtnascimento = dtnascimento;
    segurado.cpfcnpj = cpfcnpj;
    segurado.estadocivil = estadocivil;
    segurado.genero = genero;
    segurado.profissao = profissao;
    segurado.contato = contato;
    segurado.logradouro = logradouro;
    segurado.numero = numero;
    segurado.complemento = complemento;
    segurado.bairro = bairro;
    segurado.cep = new  Number(cep);
    segurado.userid = user["_id"];
    

    console.log('segurado.userid: ', segurado.userid);
    let newInsured = await createInsured(segurado);
    console.log('newInsured: ', newInsured);
    //navigate('/');
    //window.location.reload();

    console.log(newInsured);

    loadInsuredData();

    setName('');
    setCpfCnpj('');
    setDtNascimento('');
    setEstadoCivil('');
    setGenero('');
    setProfissao('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCep('');
    setContato('');
    setUsername('');
    setEmail('');
    setSegurado([]);
  }

  function loadUserData() {

    setName(user.name);
    setUsername(user.username)
    setEmail(user.email);
  }

  function loadInsuredData() {
    let insureds = fetch('http://localhost:3001/insured/').then(response=>{
      return response.json();
    }).then(data => {
      console.log('segurados: ', data.results);
      setSegurado(data);
      return data.results;
    });
    //console.log('segurados: ', segurado);
  }

  async function fncDeletar(id) {
    if(!confirm("Tem certeza que deseja excluir o segurado?")) return;
    deleteInsured(id);
    console.log('loadInsuredData: ', loadInsuredData());
    loadInsuredData();

    setName('');
    setCpfCnpj('');
    setDtNascimento('');
    setEstadoCivil('');
    setGenero('');
    setProfissao('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCep('');
    setContato('');
    setUsername('');
    setEmail('');
    setSegurado([]);
  }
  
  const fncEditar = (obj) => {
    console.log(obj.id);
    let idUser = (obj.id);
    //document.getElementById('seguroID').value = obj.id;
    document.getElementById('fullname').value = obj.fullname;
    document.getElementById('cpfcnpj').value = obj.cpfcnpj;
    document.getElementById('dtnascimento').value = obj.dtnascimento;
    document.getElementById('estadocivil').value = obj.estadocivil;
    document.getElementById('genero').value = obj.genero;
    document.getElementById('profissao').value = obj.profissao;
    document.getElementById('logradouro').value = obj.logradouro;
    document.getElementById('numero').value = obj.numero;
    document.getElementById('complemento').value = obj.complemento;
    document.getElementById('bairro').value = obj.bairro;
    document.getElementById('cep').value = obj.cep;
    document.getElementById('contato').value = obj.contato;
    console.log('idUser: ' + idUser);
  }


  const handleChange = (e) => {
    switch (e.target.name) {
      case 'fullname':
        setName(e.target.value);
        break;
      case 'cpfcnpj':
        const totalCaracteres = e.target.value.length;
        console.log(totalCaracteres);
        if(totalCaracteres == 19) return;
        const formatted = formatCpfCnpj(e.target.value);
        setCpfCnpj(formatted);
        break;
      case 'dtnascimento':
        setDtNascimento(e.target.value);
        break;
      case 'estadocivil':
        setEstadoCivil(e.target.value);
        break;
      case 'genero':
        setGenero(e.target.value);
        break;
      case 'profissao':
        setProfissao(e.target.value);
        break;
      case 'logradouro':
        setLogradouro(e.target.value);
        break;
      case 'numero':
        setNumero(e.target.value);
        break;
      case 'complemento':
        setComplemento(e.target.value);
        break;
      case 'bairro':
        setBairro(e.target.value);
        break;
      case 'cep':
        setCep(e.target.value);
        break;
      case 'contato':
        setContato(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'perfil':
        setPerfil(e.target.value);
        break;
      default:
        break;
    }
  };
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formatDate = (dt) => {
    const date = dt;

    const dd = String(dt.getDate()).padStart(2, '0');
    const mm = String(dt).padStart(2, '0'); // January is 0!
    const yyyy = dt.getFullYear();

    let formatDate = ('0' + dt.getDate()).slice(-2) + '/' + String(dt.getMonth() + 1).padStart(2, '0')+ '/' + dt.getFullYear()

    const formattedDate = `${dd}/${mm}/${yyyy}`;
    return formatDate; // Output: 28/06/2026
  }
  useEffect(() => {
    loadUserData()
    loadInsuredData();
    setName('');
  }, []);
  console.log(segurado);
  return (
      <InsuredContainer>
        <InsuredHeader>
        <p>
          <input type="hidden" id="idSegurado" />
          <table align="left">
            <tr><td colSpan={2} align="center"><h1>Dados Pessoais</h1></td></tr>
            <tr><td align="right"><h3>Nome completo:</h3></td><td><input type="text" name="fullname" id="fullname" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>CPF/CNPJ:</h3></td><td><input type="text" name="cpfcnpj" id="cpfcnpj" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Data de Nascimento:</h3></td><td><input type="date" name="dtnascimento" id="dtnascimento" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Estado Civil:</h3></td><td>
              <select name="estadocivil" id="estadocivil" onChange={handleChange}>
                <option>Selecione</option>
                <option>Solteiro</option>
                <option>Casado</option>
                <option>Divorciado</option>
                <option>Viúvo</option>
              </select>
              </td></tr>
            <tr><td align="right"><h3>Gênero:</h3></td><td><select name="genero" id="genero" onChange={handleChange} ><option>Selecione</option><option>Masculino</option><option>Feminino</option></select></td></tr>
            <tr><td align="right"><h3>Profissão:</h3></td><td><input type="text" name="profissao" id="profissao" onChange={handleChange} /></td></tr>
            <tr><td colSpan={2} align="center"><h1>Contato</h1></td></tr>
            <tr><td align="right"><h3>Logradouro:</h3></td><td><input type="text" name="logradouro" id="logradouro" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Número:</h3></td><td><input type="number" name="numero" id="numero" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Complemento:</h3></td><td><input type="text" name="complemento" id="complemento" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Bairro:</h3></td><td><input type="text" name="bairro" id="bairro" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>CEP:</h3></td><td><input type="text" name="cep" id="cep" onChange={handleChange} /></td></tr>
            <tr><td align="right"><h3>Contato:</h3></td><td><input type="text" name="contato" id="contato" onChange={handleChange} /></td></tr>
            <tr><td colSpan={2} align="center"><button onClick={fncCreateInsurer} style={{
                  marginLeft: '20px',
                  paddingRight: '2px',
                  marginRight: '10px', 
                  marginTop: '10px', 
                  cursor: 'pointer',
                  backgroundColor: '#B3490B',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '4px'
                }} >Cadastrar</button></td></tr>
          </table>
          <table align="center">
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Data de Nascimento</th>
              <th>Estado Civil</th>
            </tr>
            {(segurado.results?.map((item) => (
              <tr key={item.id}>
                <td>{item.fullname}</td>
                <td>{item.cpfcnpj}</td>
                <td>{formatDate(new Date(item.dtnascimento))}</td>
                <td>{item.estadocivil}</td>
                <td><i onClick={() => fncDeletar(item.id)} style={{
                  marginLeft: '20px',
                  paddingRight: '2px',
                  marginRight: '10px', 
                  marginTop: '10px', 
                  cursor: 'pointer',
                  backgroundColor: '#B3490B',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '4px'
                }} >X</i></td>
              </tr>
            )))}
          </table>
        </p>
      </InsuredHeader>
    </InsuredContainer>
  );
}
