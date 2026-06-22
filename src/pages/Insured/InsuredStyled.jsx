import styled from "styled-components";

export const InsuredContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  margin: 0 auto;
  tr:nth-child(odd) {
    background-color: #f2f2f2; /* Cinza claro */
  }

  tr:nth-child(even) {
    background-color: #ffffff; /* Branco */
  }
`;

export const InsuredHeader = styled.header`
  width: 80%;
  display: flex;
  margin: 1rem auto;  
`;

export const InsuredIconEdit = styled.i`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #0bade3;
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :hover {
    color: #fff;
    background-color: #0bade3;
  }
`;

export const InsuredBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 50%;
  z-index: -1;
  border-radius: 0.3rem 0.3rem 0 0;
`;

export const InsuredUser = styled.div`
  padding: 2rem;
  align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const InsuredAvatar = styled.img`
  border-radius: 50%;
  width: 13rem;
  border: solid 5px #fff;
  object-fit: cover;
  object-position: center;
`;

export const InsuredActions = styled.div`
  padding: 2rem;
`;

export const InsuredIconAdd = styled.i`
  background-color: transparent;
  border-radius: 50%;
  color: #0bade3;
  outline: none;
  border: none;
  cursor: pointer !important;
  font-weight: bold;
  font-size: 2rem;

  transition: all 0.3s ease-in-out;

  :hover {
    color: #0a86af;
    font-size: 2.1rem;
  }
`;

export const InsuredPosts = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  margin: 1rem auto;
  width: 80%;

  h3 {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #023344;
    margin-top: 1rem;
  }
`;
