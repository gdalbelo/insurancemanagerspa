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

export async function getAllInsurancesByUser() {
  var response = await fetch(`${baseURL}/insurances`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }) .then(response => {
        // Handle the response
        console.log(response);
        return response;
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });

  return response;
}

export function createInsurance(body) {
  const response = axios.post(`${baseURL}/insurances/create`, body, {
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

export function editInsurance(body, id) {
  const response = axios.patch(`${baseURL}/insurances/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteInsurance (id) {
  const response = axios.delete(`${baseURL}/insurances/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}