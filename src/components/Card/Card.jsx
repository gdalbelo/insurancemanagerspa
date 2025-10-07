import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader } from "./CardStyle";

export function Card({
  fncEditar,
  fncDeletar,
  top,
  title,
  numapolice,
  coberturas,
  premio,
  seguroId
}) {
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

        <i onClick={() => fncEditar(premio, numapolice, coberturas, seguroId)} style={{marginRight: '10px', marginTop: '10px'}}>Editar</i>
        <i onClick={() => fncDeletar(seguroId)} style={{marginRight: '10px', marginTop: '10px'}}>X</i>
      </CardBody>
    </CardContainer>
  );
}
