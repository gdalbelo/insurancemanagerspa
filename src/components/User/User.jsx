import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { UserBody, UserContainer, UserFooter, UserHeader } from "./UserStyle";
import { deleteInsurance, editInsurance } from "../../services/insuranceServices";

async function fncExcluir(id, arrSeguros, setSeguros) {
  setSeguros(insurances);
}

export function User({
    name,
    username,
    email
}) {
  return (
    <UserContainer>
        <div>
            <section>
              <span>Nome: {name}</span> 
            </section>

            <section>
              <span>Username: {username}</span> 
            </section>

            <section>
              <span>Email: {email}</span>
            </section>
        </div>
    </UserContainer>
  );
}
