import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  InsuredContainer,
  InsuredHeader,
  Table
} from "./InsuredStyled";
import { cadastroInsured } from "../../services/insuredServices";
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
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');

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
    let fullname = document.getElementById('fullname').value;
    let cpfcnpj = document.getElementById('cpfcnpj').value;
    let dtnascimento = document.getElementById('dtnascimento').value;
    let genero = document.getElementById('genero').value;
    let profissao = document.getElementById('profissao').value;
    let logradouro = document.getElementById('logradouro').value;
    let numero = document.getElementById('complemento').value;
    let complemento = document.getElementById('complemento').value;
    let bairro = document.getElementById('bairro').value;
    let cep = document.getElementById('cep').value;

    console.log(` fullname: ${fullname}
                  cpfcnpj: ${cpfcnpj}
                  dtnascimento: ${dtnascimento}
                  genero: ${genero}
                  profissao: ${profissao}
                  logradouro: ${logradouro}
                  numero: ${numero}
                  complemento: ${complemento}
                  bairro: ${bairro}
                  cep: ${cep}`);
    return;
    let newInsured = await cadastroInsured(fullname, cpfcnpj, dtnascimento, estadocivil, genero, profissao, logradouro, numero, complemento, bairro, cep, user["_id"]);

    navigate('/');
    window.location.reload();

    console.log(newInsured);
  }

  function loadUserData() {
    console.log(user);
    setName(user.name);
    setUsername(user.username)
    setEmail(user.email);
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

  useEffect(() => {
    loadUserData()
  }, []);
  console.log(user);
  return (
      <InsuredContainer>
        <InsuredHeader>
        <p>
          <table align="left">
            <tr><td colSpan={2} align="center"><h1>Dados Pessoais</h1></td></tr>
            <tr><td align="right"><h3>Nome completo:</h3></td><td><input type="text" name="fullname" id="fullname" onChange={handleChange} value={name} /></td></tr>
            <tr><td align="right"><h3>CPF/CNPJ:</h3></td><td><input type="text" name="cpfcnpj" id="cpfcnpj" onChange={handleChange} value={cpfcnpj} /></td></tr>
            <tr><td align="right"><h3>Data de Nascimento:</h3></td><td><input type="date" name="dtnascimento" id="dtnascimento" onChange={handleChange} value={dtnascimento} /></td></tr>
            <tr><td align="right"><h3>Estado Civil:</h3></td><td>
              <select name="estadocivil" id="estadocivil" onChange={handleChange} value={estadocivil}>
                <option>Selecione</option>
                <option>Solteiro</option>
                <option>Casado</option>
                <option>Divorciado</option>
                <option>Viúvo</option>
              </select>
              </td></tr>
            <tr><td align="right"><h3>Gênero:</h3></td><td><select name="genero" id="genero" onChange={handleChange} value={genero}><option>Selecione</option><option>Masculino</option><option>Feminino</option></select></td></tr>
            <tr><td align="right"><h3>Profissão:</h3></td><td><input type="text" name="profissao" id="profissao" onChange={handleChange} value={profissao} /></td></tr>
            <tr><td colSpan={2} align="center"><h1>Contato</h1></td></tr>
            <tr><td align="right"><h3>Logradouro:</h3></td><td><input type="text" name="logradouro" id="logradouro" onChange={handleChange} value={logradouro} /></td></tr>
            <tr><td align="right"><h3>Número:</h3></td><td><input type="text" name="numero" id="numero" onChange={handleChange} value={numero} /></td></tr>
            <tr><td align="right"><h3>Complemento:</h3></td><td><input type="text" name="complemento" id="complemento" onChange={handleChange} value={complemento} /></td></tr>
            <tr><td align="right"><h3>Bairro:</h3></td><td><input type="text" name="bairro" id="bairro" onChange={handleChange} value={bairro} /></td></tr>
            <tr><td align="right"><h3>CEP:</h3></td><td><input type="text" name="cep" id="cep" onChange={handleChange} value={cep} /></td></tr>
            <tr><td colSpan={2} align="center"><button onClick={fncCreateInsurer}>Cadastrar</button></td></tr>
          </table>
          <table align="center">
            <tr>
              <td>Nome</td>
              <td>CPF/CNPJ</td>
              <td>Data de Nascimento</td>
              <td>Esteado Civil</td>
            </tr>
            <tr>
              <td>Nome</td>
              <td>CPF/CNPJ</td>
              <td>Data de Nascimento</td>
              <td>Esteado Civil</td>
            </tr>
          </table>
        </p>
      </InsuredHeader>
    </InsuredContainer>
  );
}
