import styled from "styled-components";

export const HomeBody = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin: 1rem auto;
  width: 80%;
`;

export const HomeHeader = styled.section`
  width: 80%;
  display: flex;
  margin: 1rem auto;
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