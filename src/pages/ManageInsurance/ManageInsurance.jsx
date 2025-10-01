import { useNavigate, useParams } from "react-router-dom";
import { AddInsuranceContainer } from "./ManageInsuranceStyled";
import { insurenceSchema } from "../../schemas/insuranceSchema";
import {
  createInsurance,
  deleteInsurance,
  editInsurance,
  getInsuranceById,
} from "../../services/insuranceServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useEffect } from "react";

export function ManageInsurance() {
  const { action, id } = useParams();
  const navigate = useNavigate();

  const {
    register: registerInsurance,
    handleSubmit: handleRegisterInsurance,
    formState: { errors: errorsRegisterInsurance },
    setValue,
  } = useForm({ resolver: zodResolver(insurenceSchema) });

  async function registerInsuranceSubmit(data) {
    try {
      await createInsurance(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function editInsuranceSubmit(data) {
    try {
      await editInsurance(data, id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function findInsuranceById(id) {
    try {
      const { data } = await getInsuranceById(id);
      setValue("title", data.title);
      setValue("banner", data.banner);
      setValue("text", data.text);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteInsuranceSubmit() {
    try {
      await deleteInsurance(id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (action === "edit" || action === "delete") {
      findInsuranceById(id);
    }
  }, []);

  return (
    <AddInsuranceContainer>
      <h2>
        {action === "add"
          ? "Adicionar"
          : action === "edit"
          ? "Atualizar"
          : "Apagar"}{" "}
        Notícia
      </h2>
      <form
        onSubmit={
          action == "add"
            ? handleRegisterInsurance(registerInsuranceSubmit)
            : action === "edit"
            ? handleRegisterInsurance(editInsuranceSubmit)
            : handleRegisterInsurance(deleteInsuranceSubmit)
        }
      >
        <Input
          type="text"
          placeholder="Titulo"
          name="title"
          register={registerInsurance}
          disabled={action === "delete"}
        />
        {errorsRegisterInsurance.title && (
          <ErrorSpan>{errorsRegisterInsurance.title.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Link da imagem"
          name="banner"
          register={registerInsurance}
          disabled={action === "delete"}
        />
        {errorsRegisterInsurance.banner && (
          <ErrorSpan>{errorsRegisterInsurance.banner.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Texto"
          name="text"
          register={registerInsurance}
          isInput={false}
          disabled={action === "delete"}
        />
        {errorsRegisterInsurance.text && (
          <ErrorSpan>{errorsRegisterInsurance.text.message}</ErrorSpan>
        )}

        <Button
          type="submit"
          text={
            action === "add"
              ? "Adicionar"
              : action === "edit"
              ? "Atualizar"
              : "Apagar"
          }
        />
      </form>
    </AddInsuranceContainer>
  );
}
