import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signupSchema } from "../../schemas/signupSchema";
import { signin, signup } from "../../services/userServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Authentication() {
  const [perfil, setPerfil] = useState('');
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function inHanleSubmit(data) {
    try {
      const response = await signin(data);
      console.log(response.data.user["_id"]);
      Cookies.set("token", response.token, { expires: 1 });
      Cookies.set("userid", response.data.user["_id"], { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  async function upHanleSubmit(data) {
    try {
      data.perfil = perfil;
      const response = await signup(data);
      Cookies.set("token", response.data, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    setPerfil(e.target.value);
    console.log(e.target.value);
  }

  return (
    <AuthContainer>
      <Section type="signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHanleSubmit)}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignin}
          />
          {errorsSignin.email && (
            <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignin}
          />
          {errorsSignin.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Button type="submit" text="Entrar" />
        </form>
      </Section>

      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHanleSubmit)}>
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            register={registerSignup}
          />
          {errorsSignup.name && (
            <ErrorSpan>{errorsSignup.name.message}</ErrorSpan>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignup}
          />
          {errorsSignup.email && (
            <ErrorSpan>{errorsSignup.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignup}
          />
          {errorsSignup.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Confirmar senha"
            name="confirmPassword"
            register={registerSignup}
          />
          {errorsSignup.confirmPassword && (
            <ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>
          )}
          <h4><label>Perfil: </label><select id="perfil" value={perfil} name="perfil" onChange={handleInputChange}><option value="">Selecione</option><option value="subscritor">Subscritor</option><option value="corretor">Corretor</option><option value="adiministrador">Adiministrador</option></select></h4>
          <Button type="submit" text="Cadastrar" />
        </form>
      </Section>
    </AuthContainer>
  );
}
