import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

export function getAllInsurances() {
  const response = fetch(`${baseURL}/insurances`);
  return response;
}

export function getTopInsurance() {
  const response = fetch(`${baseURL}/insurances/top`);
  return response;
}

export function searchInsurances(title) {
  const response = fetch(`${baseURL}/insurances/search?title=${title}`);
  return response;
}

export async function getAllInsurancesByUser(id) {
  console.log(`${baseURL}/insurances/byIdInsurance/` + id);
  var response = await fetch(`${baseURL}/insurances/byIdInsurance/` + id);

  return response;
}

export function createInsurance(body) {
  console.log(body);
  const response = axios.post(`${baseURL}/insurances/create`, body, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getInsuranceById(id) {
  const response = fetch(`${baseURL}/insurances/byIdPost/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function editInsurance(numapolice, coberturas, premio, id) {
  const response = axios.put(`${baseURL}/insurances/update/${id}`, {numapolice, coberturas, premio, id}, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteInsurance (id, idLogado) {
  const response = axios.delete(`${baseURL}/insurances/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}