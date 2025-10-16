import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

export function signup(data) {
  delete data.confirmPassword;
  const body = {
    ...data,
    username: generateUserName(data.name),
    avatar: "https://i.imgur.com/xmI2QAo.jpg",
    background: "https://i.imgur.com/XbRg9D7.png",
  };
  const response = axios.post(`${baseURL}/user/create`, body);
  return response;
}

export function signin(data) {
  const response = axios.post(`${baseURL}/auth/login`, data);
  return response;
}

export async function userLogged() {
  //const data = await (await fetch(`${baseURL}/user/findById`)).json();
  const response = axios.get(`${baseURL}/user/findById/` + Cookies.get('userid'), {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    }
  }).then();
  return response;
}

export function getUserPersonalData(idLogado) {
  const response = fetch('http://localhost:3001/user/userData/' + idLogado)
    .then(response => {
    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    return data; // Log the parsed JSON data
  })
  .catch(error => {
    console.error('Error fetching data:', error); // Handle any errors during the fetch operation
  });
  return response;
}

export function updateUserData(name, username, email, perfil, id) {
  let data = {name, username, email, perfil};
  const response = axios.put(`${baseURL}/user/${id}`, data);
  return response;
}

function generateUserName(name) {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}