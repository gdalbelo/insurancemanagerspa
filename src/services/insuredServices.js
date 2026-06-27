import axios from "axios";
import Cookies from "js-cookie";

//const baseURL = "https://insurancemanagerapi.vercel.app";
const baseURL = "http://localhost:3001"

export function createInsured(data) {
  console.log('createInsured: ', data)
  const body = {
    data
  };
  console.log(body);
  const response = axios.post(`${baseURL}/insured/create`, data);
  return response;
}

export function getInsureds() {
  const insureds = axios.get(`${baseURL}/insured`)
}

export function getInsuredNameById(id, segurados) {
  let seguradoName = '';
  console.log(segurados);
  segurados?.map((item, i) => {
    console.log(item.fullname + ' ' + item.id);
    if(item.id == id) {
      seguradoName = item.fullname;
    }
  })
  return seguradoName;
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
  const response = fetch(`${baseURL}/user/userData/` + idLogado)
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

export function updateUserData(name, username, email, id) {
  let data = {name, username, email};
  const response = axios.put(`${baseURL}/user/${id}`, data);
  return response;
}

function generateUserName(name) {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}


export function deleteInsured(id) {
  const insured = axios.delete(`${baseURL}/insured/delete/${id}`);
}