import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  ProfileActions,
  ProfileAvatar,
  ProfileBackground,
  ProfileContainer,
  ProfileHeader,
  ProfileIconAdd,
  ProfileIconEdit,
  ProfilePosts,
  ProfileUser,
} from "./ProfileStyled";
import { getAllInsurancesByUser } from "../../services/insuranceServices";
import { User } from "../../components/User/User";
import { Link, useNavigate } from "react-router-dom";
import { getUserPersonalData, updateUserData } from "../../services/userServices"; 
import Cookies from "js-cookie";

export function Profile() {
  const { user } = useContext(UserContext);

  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');

  const navigate = useNavigate();

  async function fncChangeUser() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let idUser = user["_id"];

    console.log(`Nome: ${name}
                Username: ${username}
                Email: ${email}
                id: ${user["_id"]}`);

    let changeUserData = await updateUserData(name, username, email, idUser);

    navigate('/');
    window.location.reload();

    console.log(changeUserData);
  }

  function loadUserData() {
    getUserPersonalData(user["_id"]);
    console.log('Gabriel Dal Belo o id é esse: ', user["_id"]);
    setName(user.name);
    setUsername(user.username)
    setEmail(user.email);
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
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
    <ProfileContainer>
      <ProfileHeader>
        <ProfileUser>
          <h2><label>Nome: </label><input type="text" value={name} name="name" id="name" onChange={handleChange} /></h2>
          <h3><label>Username: </label><input type="text" value={username} name="username" id="username" onChange={handleChange} /></h3>
          <h4><label>Email: </label><input type="text" value={email} name="email" id="email" onChange={handleChange} /></h4>
          {/* <h4><label>Perfil: </label><select id="perfil" value={perfil} name="perfil" onChange={handleChange}><option value="">Selecione</option><option value="subscritor">Subscritor</option><option value="corretor">Corretor</option><option value="adiministrador">Adiministrador</option></select></h4> */}
        </ProfileUser>
      </ProfileHeader>
      <button onClick={fncChangeUser} style={{marginLeft: '20px',
                  paddingRight: '2px',
                  marginRight: '10px', 
                  marginTop: '10px', 
                  cursor: 'pointer',
                  backgroundColor: '#B3490B',
                  color: '#FFF',
                  padding: '5px',
                  borderRadius: '4px'}}>Alterar Dados</button>
    </ProfileContainer>
  );
}
