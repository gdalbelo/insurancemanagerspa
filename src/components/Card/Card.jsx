import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader } from "./CardStyle";
import { deleteInsurance, editInsurance } from "../../services/insuranceServices";

async function fncExcluir(id, arrSeguros, setSeguros) {
  let deleteResponse = deleteInsurance(id);
  const insurances = arrSeguros.filter(function(insurance) {
    return insurance.id !== id; // Retorna true para manter o elemento, false para remover
  }); 
  setSeguros(insurances);
}

export function Card({
  fncEditar,
  top,
  title,
  seguros,
  numapolice,
  coberturas,
  premio,
  setSeguros,
  id,
}) {
  let identy = id;
  return (
    <CardContainer>
      <CardBody>
        <div>
          <CardHeader top={top}>
            <h2>{title}</h2>
            <TextLimit text={coberturas} limit={150} />
          </CardHeader>

          <CardFooter>
            <section>
              <span>Prêmio: {premio}</span>
            </section>

            <section>
              <span>Número apólice: {numapolice}</span>
            </section>
          </CardFooter>
        </div>

        <i onClick={() => fncEditar(numapolice, coberturas, premio, id)} style={{marginRight: '10px', marginTop: '10px'}}>Editar</i>
        <i onClick={() => fncExcluir(id, seguros, setSeguros)} style={{marginRight: '10px', marginTop: '10px'}}>X</i>
      </CardBody>
    </CardContainer>
  );
}
