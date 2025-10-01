import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchInsurances } from "../../services/insuranceServices";
import { ContainerResults, SearchInsurances, TextResults } from "./SearchStyled";
import { Card } from "../../components/Card/Card";

export function Search() {
  const { title } = useParams();
  const [insurances, setInsurances] = useState([]);

  async function search() {
    try {
      const insurnacesApi = await searchInsurnaces(title);
      setInsurances(insurancesApi.data.foundInsurances);
    } catch (err) {
      console.log(err);
      setInsurances([]);
    }
  }

  useEffect(() => {
    search();
  }, [title]);

  return (
    <ContainerResults>
      <TextResults>
        <span>
          {insurances.length
            ? `Encontramos ${posts.length} ${
                insurances.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não encontramos resultados para:"}
        </span>
        <h2>{title}</h2>
      </TextResults>

      <SearchInsurances>
        {posts.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes}
            comments={item.comments}
          />
        ))}
      </SearchInsurances>
    </ContainerResults>
  );
}
